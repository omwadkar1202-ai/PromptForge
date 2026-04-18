import { UseCase, GeneratedResult, PromptBreakdown } from '../types';

const TECHNIQUES_MAP: Record<string, string> = {
  role_setting: 'Role Setting',
  chain_of_thought: 'Chain-of-Thought',
  few_shot: 'Few-Shot Examples',
  output_format: 'Output Format Control',
  constraints: 'Explicit Constraints',
  context_injection: 'Context Injection',
  step_by_step: 'Step-by-Step Decomposition',
  negative_prompting: 'Negative Prompting',
  style_anchoring: 'Style Anchoring',
  quality_modifiers: 'Quality Modifiers',
  specificity: 'High Specificity',
  persona: 'Persona Definition',
};

function detectUseCase(requirement: string): UseCase {
  const lower = requirement.toLowerCase();
  if (/\b(code|function|component|api|build|develop|program|script|app|software)\b/.test(lower)) return 'code';
  if (/\b(image|photo|picture|visual|illustration|artwork|render|drawing|design graphic)\b/.test(lower)) return 'image';
  if (/\b(video|reel|clip|animation|film|scene|story|cinematic|short)\b/.test(lower)) return 'video';
  if (/\b(website|webpage|landing page|ui|interface|layout|web design|site)\b/.test(lower)) return 'website';
  return 'general';
}

function generateCodePrompt(requirement: string): { prompt: string; breakdown: PromptBreakdown[] } {
  const breakdown: PromptBreakdown[] = [
    {
      label: 'Role & Persona',
      content: `You are a Senior Software Engineer with 10+ years of experience in building production-grade systems. You write clean, maintainable, and well-structured code.`,
      color: 'blue',
    },
    {
      label: 'Task Definition',
      content: `Your task: ${requirement}`,
      color: 'teal',
    },
    {
      label: 'Step-by-Step Instructions',
      content: `Follow these steps:\n1. Analyze the requirements carefully before writing any code\n2. Define the data structures and interfaces first\n3. Implement core logic with error handling\n4. Add edge case handling\n5. Include brief inline documentation for complex logic`,
      color: 'amber',
    },
    {
      label: 'Output Constraints',
      content: `Output Requirements:\n- Use TypeScript with strict typing\n- Follow SOLID principles\n- No external dependencies unless strictly necessary\n- Code must be production-ready, not pseudocode\n- Include usage example at the end`,
      color: 'green',
    },
    {
      label: 'Quality Check',
      content: `Before finalizing, verify:\n- All edge cases are handled\n- No security vulnerabilities (SQL injection, XSS, etc.)\n- Code is DRY and modular\n- Variable names are descriptive`,
      color: 'rose',
    },
  ];

  const prompt = `You are a Senior Software Engineer with 10+ years of experience building production-grade systems. You write clean, maintainable, and well-structured code following industry best practices.

## Task
${requirement}

## Instructions
Follow these steps precisely:
1. Analyze the requirements carefully before writing any code
2. Define data structures and TypeScript interfaces first
3. Implement core logic with comprehensive error handling
4. Handle all edge cases and validate inputs
5. Write clean, self-documenting code

## Output Requirements
- Use TypeScript with strict typing throughout
- Follow SOLID principles and clean architecture
- Avoid unnecessary external dependencies
- Code must be production-ready, not pseudocode or placeholders
- Include a concise usage example at the end

## Quality Checklist
Before submitting, verify:
- [ ] All edge cases handled
- [ ] No security vulnerabilities present
- [ ] Code is DRY and modular
- [ ] Descriptive variable and function names used`;

  return { prompt, breakdown };
}

function generateImagePrompt(requirement: string): { prompt: string; breakdown: PromptBreakdown[] } {
  const breakdown: PromptBreakdown[] = [
    {
      label: 'Subject & Composition',
      content: `Clear subject definition with foreground, midground, and background elements. Rule of thirds composition.`,
      color: 'blue',
    },
    {
      label: 'Style Anchoring',
      content: `Visual style, artistic movement, and reference artists defined to lock aesthetic direction.`,
      color: 'teal',
    },
    {
      label: 'Technical Specs',
      content: `Lighting setup, camera angle, resolution, and rendering engine specified for photorealism control.`,
      color: 'amber',
    },
    {
      label: 'Negative Prompting',
      content: `Explicit exclusions to prevent unwanted artifacts, distortions, or style bleed.`,
      color: 'green',
    },
    {
      label: 'Quality Modifiers',
      content: `High-fidelity keywords appended to boost output quality and detail level.`,
      color: 'rose',
    },
  ];

  const prompt = `Create a high-quality, photorealistic image based on the following concept:

## Concept
${requirement}

## Composition & Subject
- Primary subject: clearly defined, sharp focus, positioned using rule of thirds
- Background: complementary, non-distracting, adds depth to the scene
- Foreground elements: subtle framing details that add dimension

## Visual Style
- Style: cinematic realism with professional photography aesthetics
- Lighting: soft natural light with dramatic shadows, golden hour ambiance
- Color palette: rich, saturated tones with high dynamic range

## Technical Specifications
- Camera angle: eye-level or slight low-angle for impact
- Lens: 85mm portrait equivalent, shallow depth of field (f/1.8)
- Resolution: ultra-high definition, 4K detail
- Rendering: photorealistic, ray-traced lighting

## Negative Prompt
Exclude: blurry, distorted faces, extra limbs, watermarks, low quality, pixelated, oversaturated, flat lighting, stock photo look, CGI artifacts, noise

## Quality Enhancers
masterpiece, best quality, highly detailed, sharp focus, professional photography, award-winning composition, stunning visuals`;

  return { prompt, breakdown };
}

function generateVideoPrompt(requirement: string): { prompt: string; breakdown: PromptBreakdown[] } {
  const breakdown: PromptBreakdown[] = [
    {
      label: 'Concept & Hook',
      content: `Opening hook defined within the first 3 seconds to capture attention immediately.`,
      color: 'blue',
    },
    {
      label: 'Scene Structure',
      content: `Story arc: Hook → Problem → Solution → CTA with time-coded scene breakdowns.`,
      color: 'teal',
    },
    {
      label: 'Visual Direction',
      content: `Camera movements, transitions, and visual style locked to maintain coherent aesthetic.`,
      color: 'amber',
    },
    {
      label: 'Audio & Pacing',
      content: `Music tempo, voiceover tone, and cut rhythm specified for emotional impact.`,
      color: 'green',
    },
    {
      label: 'Platform Optimization',
      content: `Format constraints (aspect ratio, duration) tailored to target platform requirements.`,
      color: 'rose',
    },
  ];

  const prompt = `Generate a compelling video/reel concept for the following:

## Core Concept
${requirement}

## Story Structure (30-60 second format)

### Act 1 – Hook (0-3 seconds)
- Open with a visually striking or emotionally provocative scene
- No text overlay needed — visual storytelling only
- Objective: Stop the scroll immediately

### Act 2 – Problem/Setup (3-15 seconds)
- Establish the context or pain point clearly
- Use quick cuts (1.5-2 second clips) to maintain energy
- Voiceover or on-screen text reinforces the visual narrative

### Act 3 – Solution/Climax (15-45 seconds)
- Present the core message or product/service value
- Build emotional connection through close-up shots and authentic moments
- Use a music crescendo to heighten emotional impact

### Act 4 – Call to Action (45-60 seconds)
- Clear, single CTA: one action, not multiple
- End frame: strong visual with text overlay

## Visual Direction
- Aspect ratio: 9:16 (vertical for Reels/TikTok) or 16:9 (YouTube/landscape)
- Color grade: warm, high-contrast cinematic look
- Transitions: smooth cuts, no flashy wipes — keep it editorial
- Typography: bold, minimal, high-contrast text overlays

## Audio
- Music: upbeat/emotional track matching the brand tone (120-140 BPM for energy)
- Voiceover: conversational, confident, second-person tone ("You deserve...")
- Sound design: subtle ambient sounds under the VO

## Platform Notes
- Instagram Reels: 15-30s ideal, strong first frame
- TikTok: 30-60s, authentic/raw feel preferred
- YouTube Shorts: up to 60s, more educational tone acceptable`;

  return { prompt, breakdown };
}

function generateWebsitePrompt(requirement: string): { prompt: string; breakdown: PromptBreakdown[] } {
  const breakdown: PromptBreakdown[] = [
    {
      label: 'Design System',
      content: `Color palette, typography scale, spacing system, and component tokens defined upfront.`,
      color: 'blue',
    },
    {
      label: 'Layout & Information Architecture',
      content: `Section hierarchy and page structure designed for optimal user flow and conversion.`,
      color: 'teal',
    },
    {
      label: 'UI Component Specs',
      content: `Each UI component specified with states (default, hover, active, disabled) for completeness.`,
      color: 'amber',
    },
    {
      label: 'Responsive Behavior',
      content: `Breakpoint behavior defined for mobile, tablet, and desktop viewports explicitly.`,
      color: 'green',
    },
    {
      label: 'Interaction & Animation',
      content: `Micro-interactions and transition timings specified to create a premium user experience.`,
      color: 'rose',
    },
  ];

  const prompt = `Design and generate a professional, production-ready website/UI for:

## Project Brief
${requirement}

## Design System

### Color Palette
- Primary: Deep blue (#1d4ed8) — trust, authority
- Secondary: Slate gray (#475569) — sophistication
- Accent: Teal (#0d9488) — energy, action
- Success: Emerald (#059669)
- Warning: Amber (#d97706)
- Error: Rose (#e11d48)
- Background: White (#ffffff) and Light gray (#f8fafc)

### Typography
- Headings: Inter Bold, 48px/36px/28px/22px scale
- Body: Inter Regular, 16px, 1.6 line height
- Caption: Inter Medium, 14px
- Max 3 font weights: 400, 600, 700

### Spacing
- Base unit: 8px
- Section padding: 96px vertical
- Component gap: 24px
- Content max-width: 1280px centered

## Page Structure

### 1. Navigation
- Logo left, links center, CTA button right
- Sticky on scroll with background blur
- Mobile: hamburger menu with slide-out drawer

### 2. Hero Section
- Headline (H1): value proposition, max 8 words
- Subheadline: one sentence expanding on headline
- Primary CTA button + secondary ghost button
- Hero visual: right-aligned on desktop, below text on mobile

### 3. Social Proof / Trust Bar
- Client logos or statistics in a scrolling ticker
- 3-5 key metrics displayed as large numbers

### 4. Features / Benefits
- 3-column grid on desktop, single column on mobile
- Icon + title + description format
- Subtle hover animation: card lifts 4px with shadow

### 5. Testimonials
- Carousel with auto-advance
- Star rating, quote text, avatar, name, title

### 6. CTA Section
- Full-width background with primary color
- Single compelling headline + one action button

### 7. Footer
- 4-column layout: logo/tagline, links, contact, social
- Bottom bar with copyright

## Responsive Behavior
- Mobile (< 768px): single column, 16px padding
- Tablet (768-1024px): 2-column grid, 24px padding
- Desktop (> 1024px): full design as specified

## Interactions & Animations
- Page load: fade-in stagger (100ms delay per element)
- Scroll reveal: elements slide up 20px + fade in on viewport entry
- Button hover: 150ms ease transition, slight scale (1.02)
- Card hover: 4px translateY + box-shadow deepening
- Navigation: smooth scroll to sections, 400ms ease`;

  return { prompt, breakdown };
}

function generateGeneralPrompt(requirement: string): { prompt: string; breakdown: PromptBreakdown[] } {
  const breakdown: PromptBreakdown[] = [
    {
      label: 'Role & Context',
      content: `Expert persona established with relevant domain knowledge and experience level defined.`,
      color: 'blue',
    },
    {
      label: 'Task Clarity',
      content: `Objective stated precisely with success criteria and desired output format specified.`,
      color: 'teal',
    },
    {
      label: 'Constraints',
      content: `Hard limits on length, tone, style, and content to prevent hallucination or drift.`,
      color: 'amber',
    },
    {
      label: 'Chain-of-Thought',
      content: `Reasoning steps required before output to improve accuracy on complex tasks.`,
      color: 'green',
    },
    {
      label: 'Output Format',
      content: `Exact output structure defined to ensure consistent, parseable results.`,
      color: 'rose',
    },
  ];

  const prompt = `## Role
You are a world-class expert with deep domain knowledge relevant to the following task. You think systematically, communicate clearly, and deliver precise, actionable outputs.

## Objective
${requirement}

## Reasoning Process
Before providing your final answer:
1. Identify the core problem or goal
2. Break it down into sub-components
3. Consider 2-3 approaches and select the most effective one
4. Validate your approach against the success criteria

## Constraints
- Be specific, not vague — avoid generic statements
- Prioritize accuracy over comprehensiveness
- Maintain a professional, confident tone
- Do not add disclaimers or hedge unnecessarily
- Length: comprehensive but concise — no padding

## Output Format
Structure your response as:

**Summary**: One-sentence answer (TL;DR)
**Detail**: Full explanation with supporting reasoning
**Action Items**: Numbered list of concrete next steps (if applicable)
**Considerations**: Edge cases or important caveats to be aware of`;

  return { prompt, breakdown };
}

export function generatePrompt(requirement: string, useCase?: UseCase): GeneratedResult {
  const detectedUseCase = useCase || detectUseCase(requirement);

  let result: { prompt: string; breakdown: PromptBreakdown[] };
  let techniques: string[] = [];

  switch (detectedUseCase) {
    case 'code':
      result = generateCodePrompt(requirement);
      techniques = ['role_setting', 'chain_of_thought', 'step_by_step', 'output_format', 'constraints', 'quality_modifiers'];
      break;
    case 'image':
      result = generateImagePrompt(requirement);
      techniques = ['specificity', 'style_anchoring', 'negative_prompting', 'quality_modifiers', 'output_format'];
      break;
    case 'video':
      result = generateVideoPrompt(requirement);
      techniques = ['step_by_step', 'context_injection', 'output_format', 'specificity', 'persona'];
      break;
    case 'website':
      result = generateWebsitePrompt(requirement);
      techniques = ['role_setting', 'output_format', 'specificity', 'constraints', 'step_by_step', 'context_injection'];
      break;
    default:
      result = generateGeneralPrompt(requirement);
      techniques = ['role_setting', 'chain_of_thought', 'output_format', 'constraints', 'specificity'];
  }

  const baseScore = 65;
  const techBonus = Math.min(techniques.length * 5, 25);
  const lengthBonus = requirement.length > 50 ? 8 : requirement.length > 20 ? 4 : 0;
  const quality_score = Math.min(baseScore + techBonus + lengthBonus, 98);

  const words = requirement.trim().split(/\s+/);
  const title = words.slice(0, 6).join(' ') + (words.length > 6 ? '...' : '');

  return {
    prompt: result.prompt,
    techniques: techniques.map(t => TECHNIQUES_MAP[t] || t),
    quality_score,
    title: title.charAt(0).toUpperCase() + title.slice(1),
    breakdown: result.breakdown,
  };
}

export function getUseCaseLabel(useCase: UseCase): string {
  const labels: Record<UseCase, string> = {
    code: 'Code Generation',
    image: 'Image Generation',
    video: 'Video & Reels',
    website: 'Website & UI',
    general: 'General Purpose',
  };
  return labels[useCase];
}

export function getUseCaseColor(useCase: UseCase): string {
  const colors: Record<UseCase, string> = {
    code: 'blue',
    image: 'teal',
    video: 'rose',
    website: 'amber',
    general: 'slate',
  };
  return colors[useCase];
}
