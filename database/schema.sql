-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create issues table
CREATE TABLE IF NOT EXISTS issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT,
    latitude FLOAT,
    longitude FLOAT,
    category TEXT,
    severity INTEGER CHECK (severity >= 1 AND severity <= 10),
    description TEXT,
    reporter_id UUID,
    reporter_email TEXT,
    reporter_name TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add reporter fields for existing installations.
ALTER TABLE issues
    ADD COLUMN IF NOT EXISTS reporter_id UUID,
    ADD COLUMN IF NOT EXISTS reporter_email TEXT,
    ADD COLUMN IF NOT EXISTS reporter_name TEXT;

-- Note: In a real Supabase setup, you might want to use geography types for postgis,
-- e.g., location GEOGRAPHY(POINT, 4326), but float lat/lon works well for simple cases.
