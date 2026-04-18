import { IterationExample } from '../types';

export const ITERATION_EXAMPLES: IterationExample[] = [
  {
    id: '1',
    title: 'React Authentication Component',
    use_case: 'code',
    description: 'Building a login form component — from a vague request to a production-ready output.',
    initial_prompt: 'Write a login component in React.',
    improved_prompt: `You are a Senior Frontend Engineer specializing in React and TypeScript.

## Task
Build a production-ready LoginForm component with the following requirements:
- Email and password fields with real-time validation
- Loading state during form submission
- Error state handling with user-friendly messages
- Accessible (ARIA labels, keyboard navigation)
- TypeScript interfaces for all props and state

## Technical Constraints
- Use React Hook Form for form management
- Tailwind CSS for styling
- No class components — functional components with hooks only
- Component must be fully testable (no hardcoded API calls)

## Output Format
1. TypeScript interface definitions
2. The component code
3. Usage example with mock submit handler

## Quality Requirements
- Handle all edge cases: empty fields, invalid email format, network errors
- Implement proper loading/disabled states to prevent double submission`,
    changes: [
      'Added expert role persona to set quality expectations',
      'Specified exact technical requirements (React Hook Form, TypeScript)',
      'Defined accessibility requirements (ARIA, keyboard nav)',
      'Added explicit output format structure',
      'Included edge case handling requirements',
      'Specified testing considerations',
    ],
    quality_before: 32,
    quality_after: 91,
  },
  {
    id: '2',
    title: 'Product Launch Hero Image',
    use_case: 'image',
    description: 'Creating a marketing visual — demonstrating style control through prompt refinement.',
    initial_prompt: 'A professional product photo of a phone.',
    improved_prompt: `Ultra-high-quality product photography of a premium smartphone, centered on a minimal white marble surface, soft directional studio lighting from the upper-left creating subtle shadow fall-off, lens flare subtly catching the device screen edge, 85mm macro lens perspective, shallow depth of field (f/2.0), phone displaying a clean gradient UI on screen, surrounding props: single sprig of eucalyptus plant placed artfully to the right at 1/3 rule position, chrome and glass material rendering with photorealistic reflections

Style: Apple.com product photography, editorial, minimalist luxury aesthetic, Jony Ive industrial design sensibility

Technical: 8K resolution, RAW format quality, studio HDRI lighting, zero chromatic aberration, tack-sharp product focus

Negative prompt: watermarks, dust, fingerprints, low quality, oversaturated, stock photo feel, busy background, HDR overdone, plastic-looking materials, CGI uncanny valley`,
    changes: [
      'Specified exact camera lens (85mm) and aperture (f/2.0) for depth of field control',
      'Defined precise lighting setup (upper-left, soft directional)',
      'Added style anchor reference (Apple.com aesthetic)',
      'Included negative prompting to exclude unwanted elements',
      'Added quality modifiers (8K, RAW, HDRI)',
      'Specified composition using rule of thirds explicitly',
    ],
    quality_before: 28,
    quality_after: 94,
  },
  {
    id: '3',
    title: 'Brand Awareness Instagram Reel',
    use_case: 'video',
    description: 'Generating a video concept — from a general idea to a scene-by-scene production brief.',
    initial_prompt: 'Make a video about our coffee brand.',
    improved_prompt: `Create a 30-second Instagram Reel concept for a specialty coffee brand targeting urban millennials aged 25-35.

## Hook (0-3s)
- Scene: Extreme close-up of coffee being poured in slow motion into a ceramic cup, steam rising dramatically
- No text — pure visual impact
- Sound: Rich, deep liquid pouring sound

## Build-Up (3-12s)
- Quick montage: barista hands, coffee bean close-up, espresso shot pulling, latte art forming
- Cut rhythm: 1.5 seconds per clip, synced to music beat drop
- Color grade: warm golden tones, high contrast

## Core Message (12-25s)
- Wide shot: person receiving coffee in a sunlit café, genuine smile reaction
- Text overlay: "Craft. Ritual. Perfection." (white text, center screen, 2s intervals)
- Voiceover: "Every cup is a moment worth savoring." (warm, intimate tone)

## CTA (25-30s)
- End card: Logo + "Find your nearest café" + location pin icon
- Music fade to silence on last frame for impact

## Production Notes
- Aspect: 9:16 vertical
- Music: Lo-fi acoustic guitar with subtle beats, 110 BPM
- Platform: Instagram Reels + TikTok dual-publish`,
    changes: [
      'Defined target audience demographics (age, lifestyle)',
      'Added time-coded scene structure with exact durations',
      'Specified exact music style and BPM for pacing',
      'Included sound design instructions',
      'Added voiceover script with tone guidance',
      'Specified platform-specific technical requirements',
      'Included color grading direction',
    ],
    quality_before: 22,
    quality_after: 89,
  },
  {
    id: '4',
    title: 'SaaS Landing Page Design',
    use_case: 'website',
    description: 'Generating a website UI — demonstrating design system control and layout specificity.',
    initial_prompt: 'Design a landing page for my SaaS product.',
    improved_prompt: `Design a high-converting SaaS landing page for a project management tool targeting startup founders.

## Design System
- Primary color: #1d4ed8 (blue) — trust and reliability
- Accent: #0d9488 (teal) — used exclusively for CTAs and highlights
- Typography: Inter — H1: 56px/700, H2: 36px/600, Body: 16px/400
- Spacing: 8px base unit, sections: 96px vertical padding
- Border radius: 8px components, 16px cards, 24px large elements

## Section Specifications

### Hero
- Headline: Bold value proposition, max 8 words, left-aligned
- Subheadline: One sentence, 20px, #64748b color
- CTA layout: Primary button (teal) + "Watch Demo" ghost button, side-by-side
- Hero visual: Right-side product screenshot at 110% size with subtle shadow

### Social Proof Strip
- 5 company logos in grayscale, 48px height, horizontal scroll on mobile
- Below: "Trusted by 2,000+ teams" in small caps

### Features Grid
- 3-column layout, 4 feature cards per row on desktop
- Card: white background, 1px #e2e8f0 border, icon (24px teal) + title (18px/600) + description (14px/400)
- Hover: translateY(-4px) + box-shadow: 0 20px 40px rgba(0,0,0,0.08), 200ms ease

## Conversion Optimization
- Primary CTA appears in: hero, after features, after testimonials
- All CTAs use identical text: "Start Free Trial" for consistent messaging
- Exit-intent popup with 20% discount offer

## Responsive Breakpoints
- Mobile (<768px): single column, 16px horizontal padding, stacked CTAs
- Tablet (768-1024px): 2-column grid where applicable
- Desktop (>1024px): full layout as specified above`,
    changes: [
      'Added complete design system with exact hex values and type scale',
      'Defined target user persona (startup founders)',
      'Specified exact section hierarchy and content structure',
      'Added conversion optimization strategies (CTA placement, messaging consistency)',
      'Included precise hover state specifications with timing',
      'Added responsive breakpoint behavior for all viewports',
    ],
    quality_before: 25,
    quality_after: 96,
  },
];
