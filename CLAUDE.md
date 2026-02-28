# Personal Portfolio Website - Project Specification

## Project Overview
A bold, brutalist personal website for Matthew Kay, a software engineer specializing in modern development with subtle expertise in AI integration and prompt engineering. The site features a unique greyscale aesthetic with unconventional layouts, asymmetric grids, and overlapping elements that break traditional web design norms.

## Developer Information
- **Name**: Matthew Kay
- **Title**: Software Developer (with subtle implication of prompt engineering/AI expertise)
- **Freelance Brand**: MGKCodes
- **Website**: mgkcodes.com
- **GitHub**: github.com/MattKay02
- **LinkedIn**: linkedin.com/in/matthew-kay-
- **Email**: mattykay2002@gmail.com

## Design Philosophy

### Brutalist Greyscale Aesthetic
- **Color Palette**: Exclusively greyscale (blacks, greys, whites) with varying shades for high contrast
- **Color Source**: Images are the ONLY source of color on the site — no blue, no accent colors anywhere
- **Typography**: Large, bold, statement fonts used as design elements
- **Layout**: Asymmetric grids, unconventional positioning, elements breaking traditional alignment
- **Overlapping**: Text and images intentionally overlap in creative ways
- **Raw Edges**: No rounded corners, hard edges, stark contrasts
- **Breaking Norms**: Layouts that deliberately challenge standard website conventions

### Section Heading Pattern
All sections use a consistent two-line heading style:
- Line 1: Solid white text (smaller, e.g. `SELECTED`, `ABOUT`, `MGK`)
- Line 2: Larger outline text with `--mid` greyscale stroke (e.g. `WORK`, `ME`, `CODES`), offset right with `margin-left`
- Followed by a short `--grey` horizontal bar (120px × 3px)

### Interactions & Animations
- Subtle hover effects throughout
- Smooth scroll navigation via anchor links
- Clickable elements with creative feedback
- Animations that feel intentional, not decorative

## Technical Stack
- **Framework**: React (Vite, plain React — not Next.js)
- **Styling**: CSS Modules per component
- **Structure**: Single-page application
- **Navigation**: Anchor links that scroll to sections
- **Responsive**: Mobile-friendly design
- **Performance**: Fast loading, optimized images

## Navigation

### Navbar (fixed, top)
- **Logo**: `MK.` — left side, scrolls to `#hero`
- **Desktop links** (centered): `PORTFOLIO` → `#work`, `STACK` → `#stack`, `MGKCODES` → `#freelance`, `ABOUT ME` → `#about`
- **Right side icons** (left to right): MGKCodes logo (links to mgkcodes.com), GitHub, LinkedIn, Email — all same visual hierarchy, no separators
- **Mobile**: Burger menu with slide-down panel; socials hidden, burger replaces them

## Site Structure & Sections

### 1. Hero Section (`#hero`)
**Purpose**: Bold introduction to Matthew Kay

**Content**:
- Name: Matthew Kay
- Title: Software Developer
- Subtle implication of AI/prompt engineering expertise through copy
- Headshot image
- Contact links: LinkedIn, Email, GitHub profile

**Design Notes**:
- Large, bold typography
- Asymmetric layout
- Overlapping text and image elements
- High contrast greyscale

### 2. Portfolio Section (`#work`)
**Purpose**: PRIMARY FOCUS — showcase development projects

**Implementation**:
- Vertical stack of project cards, scroll-driven scale animation
- Cards alternate left/right layout (odd/even index)
- Each card has: long scrollable image preview, category badge, status badge (optional), title, description, tech tags, GitHub link, optional live link
- Some projects support carousel images (multiple screenshots), dual mobile images, or desktop/mobile view toggle
- Filter tabs: Featured, Mobile Apps, Web Apps, Landing Pages, All
- Background large text slides in/anchors/slides out per card as you scroll

**Heading**: `SELECTED` / `WORK`

### 3. Tech Stack Section (`#stack`)
**Purpose**: Display technologies and tools used

**Categories**: Languages (JS, TS, Python, HTML/CSS, C++, C#), Frameworks (React, Next.js, Vue.js, Node.js), CSS (Bootstrap), Databases (MongoDB, MySQL, Supabase), APIs (REST), Tools (GitHub, Vercel, Netlify), AI Tools (Claude, ChatGPT, Gemini — subtly included)

**Design Notes**:
- Official logos in greyscale
- Creative asymmetric layout
- AI tools present but not emphasized

### 4. MGKCodes Section (`#freelance`)
**Purpose**: Showcase freelance work and business

**Content**:
- MGKCodes logo (links to mgkcodes.com)
- Description of freelance services and own products
- Links: MGKCODES.COM (primary) + GITHUB (ghost)
- Background: scrolling text ticker (`MGKCODES`) + scrolling logo ticker

**Heading**: `MGK` / `CODES` — greyscale style matching rest of site (NOT blue)

**Design Notes**:
- Significant section presence, not overshadowing portfolio
- Left column: logo link; right column: text + action buttons
- Section bordered top and bottom with `--mgk-border`

### 5. About Me Section (`#about`)
**Purpose**: Personal touch — humanise the developer

**Implementation**: Interactive card deck (Passions component)

**Layout**: Two-column side-by-side
- **Left**: `ABOUT` / `ME` heading + 3 bio paragraphs with left-border styling
- **Right**: Interactive card deck + hint text above the deck

**Card Deck**:
- 3 cards: `GYM` (01, front), `GOLF` (02, middle), `GAMING` (03, back)
- **Idle**: cards stacked with slight offsets and rotations
- **Hover**: fans out into an arc (3-card fan)
- **Click card**: selected card flies up and enlarges (translateY -198px, scale 1.5); remaining 2 cards fan to a 2-card spread; hover still fans them further
- **Click again / Escape**: card returns to deck
- Cards show: index number (top-right) + label (bottom-left) only — no descriptive notes
- Hint text (`Hover to explore` / `Select a card` / `Click card to return`) sits **above** the deck

**Background**: 21 animated shapes (12 squares + 9 lines), low opacity, dramatic float/scale/rotate keyframe animations — gives the section subtle movement

**Heading**: `ABOUT` / `ME`

### 6. Footer
**Purpose**: Creative closing element

**Content**:
- Minimal relevant information
- Contact links (LinkedIn, Email, GitHub)
- Brutalist aesthetic maintained

## Images
All real images are in place (no placeholders remaining for passions):
- `src/assets/passions/Gym_image.PNG` — GYM card
- `src/assets/passions/Golf_image.JPG` — GOLF card
- `src/assets/passions/Playstation_image.png` — GAMING card
- `src/assets/MGKCodes/logo-white-elements.svg` — MGKCodes logo (navbar + MGKCodes section)
- Project screenshots in `src/assets/` per project

## Content Tone & Style
- **Voice**: Short, semi-formal, professional but approachable
- **Copy**: Concise and impactful
- **Avoid**: Flowery language, corporate jargon, excessive buzzwords, lorem ipsum, AI-generated sounding copy
- **Embrace**: Directness, clarity, personality, confidence

## Design Specifications

### Color Variables (`src/index.css`)
```
--black:     #0a0a0a
--dark:      #1a1a1a
--mid:       #333333
--grey:      #666666
--light:     #cccccc
--off-white: #e8e8e8
--white:     #f5f5f5
```
No blue or accent colors used anywhere in the UI — greyscale only.

### Typography
- **Heading font**: Space Grotesk (bold, 800–900 weight)
- **Body font**: Inter (400 weight)
- Bold, oversized headings used as design elements
- High contrast between text and background

### Layout Principles
- Asymmetric grids
- Elements bleeding off edges
- Overlapping sections
- Breaking traditional alignment

### Interactions
- Smooth scrolling between sections
- Hover states on all interactive elements
- Spring cubic-bezier transitions on card deck: `cubic-bezier(0.34, 1.35, 0.64, 1)`
- CSS keyframe animations for background geometry shapes

## What to Avoid
- Traditional, conventional layouts
- Rounded corners or soft edges
- Any color accent (blue, brand color, etc.) — greyscale only
- Generic templates or Bootstrap-style components
- Overly flashy animations
- Symmetrical, balanced layouts
- Corporate/professional website clichés
