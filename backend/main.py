from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add this CORS middleware block immediately after creating the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In a real app, you'd put "http://localhost:3000" here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
import json
import google.generativeai as genai
from supabase import create_client, Client
from dotenv import load_dotenv
import uuid

# Load environment variables
load_dotenv()

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production (e.g. ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase
# PLACEHOLDER: Replace with your actual Supabase URL and Key
SUPABASE_URL = os.environ.get("SUPABASE_URL", "your_supabase_url")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "your_supabase_key")
try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print(f"Supabase init error: {e}")

# Initialize Gemini
# PLACEHOLDER: Replace with your actual Gemini API Key
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "your_gemini_api_key")
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "models/gemini-2.5-flash-image")
genai.configure(api_key=GEMINI_API_KEY)
# Use a model that supports image inputs for generateContent.
model = genai.GenerativeModel(GEMINI_MODEL)

class IssueStatusUpdate(BaseModel):
    status: str

@app.post("/api/submit")
async def submit_issue(
    image: UploadFile = File(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    description: str = Form(...),
    reporter_id: Optional[str] = Form(None),
    reporter_email: Optional[str] = Form(None),
    reporter_name: Optional[str] = Form(None)
):
    try:
        # 1. Call Gemini API without the image; only use location and description.
        prompt = (
            "Analyze this civic issue based on the report description and location. "
            "Return JSON: {\"category\": string, \"severity\": int 1-10, \"description\": string}\n"
            f"Location: lat {latitude}, lng {longitude}\n"
            f"Report: {description}"
        )
        response = model.generate_content(prompt)
        
        # Parse JSON from response
        text_response = response.text
        if "```json" in text_response:
            text_response = text_response.split("```json")[1].split("```")[0].strip()
        elif "```" in text_response:
            text_response = text_response.split("```")[1].strip()
            
        gemini_data = json.loads(text_response)
        
        # 2. Save mock image URL (In a real app, upload image to Supabase Storage)
        mock_image_url = f"https://example.com/mock-images/{uuid.uuid4()}.jpg"
        
        # 3. Save to Supabase
        db_data = {
            "image_url": mock_image_url,
            "latitude": latitude,
            "longitude": longitude,
            "category": gemini_data.get("category", "Unknown"),
            "severity": gemini_data.get("severity", 1),
            "description": description or gemini_data.get("description", ""),
            "status": "pending"
        }
        if reporter_id:
            db_data["reporter_id"] = reporter_id
        if reporter_email:
            db_data["reporter_email"] = reporter_email
        if reporter_name:
            db_data["reporter_name"] = reporter_name
        
        result = supabase.table("issues").insert(db_data).execute()
        
        return {"message": "Issue submitted successfully", "data": result.data}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/issues")
async def get_issues():
    try:
        # Fetch issues ordered by severity descending
        result = supabase.table("issues").select("*").order("severity", desc=True).execute()
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.patch("/api/issues/{issue_id}")
async def update_issue_status(issue_id: str):
    try:
        # Update status to resolved
        result = supabase.table("issues").update({"status": "resolved"}).eq("id", issue_id).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Issue not found")
        return {"message": "Issue resolved successfully", "data": result.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
