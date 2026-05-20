---
name: Civic Utility System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#410004'
  on-tertiary-container: '#ef4444'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  h2:
    fontFamily: Public Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  h3:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 20px
---

## Brand & Style

The brand personality for this design system is rooted in **institutional reliability** and **modern civic duty**. It aims to evoke a sense of calm efficiency, ensuring users feel supported and informed during critical utility interactions. The target audience spans a broad demographic, requiring a high degree of accessibility and clarity.

The chosen design style is **Corporate / Modern** with a lean toward **Minimalism**. By utilizing generous whitespace and a structured information hierarchy, the system reduces cognitive load. The aesthetic avoids unnecessary ornamentation, focusing instead on functional clarity and a systematic approach to utility management.

## Colors

The color palette is strategically chosen to communicate status and build trust:
- **Primary (Deep Navy):** Used for navigation, headers, and core branding to establish a foundation of stability and authority.
- **Secondary (Vibrant Green):** Reserved exclusively for positive confirmations, resolved service requests, and "Paid" statuses.
- **Tertiary (Clear Red):** Utilized for critical alerts, overdue balances, and immediate service interruptions.
- **Neutrals:** A range of Slate grays provides soft contrast for secondary text and structural borders, ensuring the interface feels airy and modern.

The system defaults to a **Light Mode** to maximize readability in various lighting conditions, particularly for outdoor or mobile use.

## Typography

This design system utilizes **Public Sans** for headlines to provide an institutional, government-standard feel that is both clear and authoritative. **Inter** is used for all body and UI elements due to its exceptional legibility on mobile screens and neutral, functional tone.

The type scale emphasizes a strong vertical rhythm. Use `label-caps` for small metadata or section overlines to differentiate from interactive body text. All paragraph text should maintain a line height of at least 1.5x the font size to ensure high readability for users of all ages.

## Layout & Spacing

The system employs a **Fluid Grid** model designed for mobile-first responsiveness. On mobile devices, the layout uses a 4-column grid with 16px margins; on desktop, it expands to a 12-column grid with a 1280px maximum container width.

A strict 4px / 8px baseline rhythm is used for all internal component spacing. This ensures that every element—from the height of a button to the padding of a card—remains mathematically aligned, creating a cohesive and professional visual "tightness."

## Elevation & Depth

This design system uses **Tonal Layers** supplemented by **Ambient Shadows** to create a clear functional hierarchy. Depth is used sparingly to signify interactivity:

- **Level 0 (Base):** The background (`#F8FAFC`), used for the main canvas.
- **Level 1 (Card/Surface):** White surfaces with a very subtle 1px border (`#E2E8F0`) and no shadow, used for static information groupings.
- **Level 2 (Interactive):** Elements like input fields and primary buttons use a soft, diffused shadow (0px 4px 6px rgba(15, 23, 42, 0.05)) to suggest they can be pressed or moved.
- **Level 3 (Overlay):** Modals and dropdowns use a more pronounced shadow to float above the UI, focusing the user's attention on critical tasks.

## Shapes

The shape language is **Soft** and precise. A standard corner radius of 4px (`0.25rem`) is applied to buttons, input fields, and small UI components. Larger containers like cards use 8px (`0.5rem`). This subtle rounding balances the professional "square" nature of civic institutions with a modern, approachable friendliness. It avoids the playfulness of pill shapes while moving away from the harshness of sharp corners.

## Components

- **Buttons:** Primary buttons use the Navy Blue background with White text for maximum contrast. "Resolved" actions use a Green ghost button (outline) style. Buttons must have a minimum height of 48px to ensure they are "thumb-friendly" for mobile users.
- **Chips/Badges:** Use these for status indication. "Pending" uses a Tertiary Red background with 10% opacity and Solid Red text. "Resolved" uses a Secondary Green background with 10% opacity and Solid Green text.
- **Input Fields:** Feature a 1px Slate border that transitions to a 2px Navy Blue border on focus. Labels must always be visible (no floating labels) to maintain accessibility standards.
- **Cards:** Cards are the primary vessel for utility data (e.g., usage charts, billing summaries). They should use a 16px internal padding and an 8px corner radius.
- **Alert Banners:** Full-width banners placed at the top of the viewport. Use Tertiary Red for emergency outages and Navy Blue for scheduled maintenance updates.
- **Lists:** Use for historical billing or service logs. Each item should be separated by a subtle 1px divider and include a chevron icon to indicate tap-through capability.