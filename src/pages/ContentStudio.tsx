import { useState } from 'react';
import { Video, Image, Globe, Copy, Check, Wand2, ChevronRight } from 'lucide-react';

type Category = 'video' | 'image' | 'website';

interface Template {
  id: string;
  category: Category;
  title: string;
  description: string;
  fields: { key: string; label: string; placeholder: string; type: 'text' | 'select'; options?: string[] }[];
  generate: (values: Record<string, string>) => string;
}

const TEMPLATES: Template[] = [
  {
    id: 'product-reel',
    category: 'video',
    title: 'Product Launch Reel',
    description: 'A high-energy reel to announce a new product with structured scene breakdown.',
    fields: [
      { key: 'product', label: 'Product Name', placeholder: 'e.g. AirPods Pro Max', type: 'text' },
      { key: 'audience', label: 'Target Audience', placeholder: 'e.g. tech enthusiasts aged 25-40', type: 'text' },
      { key: 'platform', label: 'Platform', placeholder: '', type: 'select', options: ['Instagram Reels', 'TikTok', 'YouTube Shorts'] },
      { key: 'tone', label: 'Tone', placeholder: '', type: 'select', options: ['Energetic & Bold', 'Premium & Sleek', 'Playful & Fun', 'Emotional & Inspiring'] },
    ],
    generate: (v) => `Create a 30-second ${v.platform} video concept to launch ${v.product}.

## Target Audience
${v.audience}

## Tone & Feel
${v.tone} — every visual and audio choice must reflect this consistently.

## Scene Breakdown

**0-3s (Hook):** Dramatic reveal — ${v.product} emerging from darkness with a single light beam. No text. Pure visual impact.

**3-10s (Problem):** Quick montage of the "before" state — relatable pain points your audience recognizes instantly. 1.5s clips, fast cuts synced to beat.

**10-22s (Solution):** ${v.product} in action. Real usage scenarios, authentic reactions, feature highlights shown through demonstration not explanation. Text overlay: single benefit per scene.

**22-30s (CTA):** End card — product beauty shot, brand logo, clear CTA text: "Available Now" or "Shop Today". Music swells and fades.

## Visual Direction
- Color grade: match brand palette, high contrast, cinematic
- Camera: mix of close-up detail shots and wide establishing shots
- Transitions: clean cuts on beat, no flashy effects

## Audio
- Music: ${v.tone.toLowerCase().includes('energetic') ? 'high-BPM electronic/hip-hop, 130+ BPM' : v.tone.toLowerCase().includes('premium') ? 'minimal ambient electronic, 80-100 BPM' : 'upbeat indie pop, 110-120 BPM'}
- Sound design: product interaction sounds (clicks, swooshes) as micro-moments
- No voiceover — let visuals and music carry the story

## Platform Specs
- ${v.platform}: ${v.platform === 'TikTok' ? '9:16, native-feel, raw/authentic aesthetic preferred' : v.platform === 'Instagram Reels' ? '9:16, polished, strong first frame for discovery' : '9:16, up to 60s, slightly more educational pacing acceptable'}`,
  },
  {
    id: 'brand-story',
    category: 'video',
    title: 'Brand Story Documentary',
    description: 'Emotional long-form video concept exploring a brand\'s origin and mission.',
    fields: [
      { key: 'brand', label: 'Brand Name', placeholder: 'e.g. Patagonia', type: 'text' },
      { key: 'mission', label: 'Core Mission', placeholder: 'e.g. sustainable outdoor gear for adventurers', type: 'text' },
      { key: 'duration', label: 'Duration', placeholder: '', type: 'select', options: ['60 seconds', '2-3 minutes', '5 minutes'] },
    ],
    generate: (v) => `Create a ${v.duration} brand documentary concept for ${v.brand}.

## Brand Mission
${v.mission}

## Narrative Arc

**Opening (10%):** Begin in media res — a powerful, wordless moment that embodies the brand's soul. No logos, no product. Just emotion and atmosphere.

**The Origin (25%):** Founder's story told through intimate interview footage + archival b-roll. Authentic, raw, unpolished. Show the struggle.

**The Why (30%):** What problem does ${v.brand} exist to solve? Intercut between real customer stories and product craftsmanship close-ups. Build emotional connection.

**The Impact (25%):** Proof points. Real people, real change. Data shown through motion graphics — not dry stats, but human-scale impact numbers.

**The Future (10%):** Forward-looking. Hopeful. End on a visual that circles back to the opening — bookend structure for emotional resonance.

## Visual Language
- Color: desaturated, film grain aesthetic — feels real, not produced
- Camera movement: handheld for interviews, locked-off for beauty shots
- Aspect ratio: 16:9 cinematic
- Typography: minimal serif, restrained

## Music
- Original or licensed acoustic/orchestral score
- Swells timed to narrative emotional peaks
- Silence used deliberately before key moments`,
  },
  {
    id: 'photorealistic-product',
    category: 'image',
    title: 'Photorealistic Product Shot',
    description: 'Studio-quality product photography for e-commerce or marketing use.',
    fields: [
      { key: 'product', label: 'Product', placeholder: 'e.g. ceramic coffee mug', type: 'text' },
      { key: 'surface', label: 'Surface/Setting', placeholder: 'e.g. white marble countertop', type: 'text' },
      { key: 'style', label: 'Visual Style', placeholder: '', type: 'select', options: ['Minimalist/Apple', 'Warm/Lifestyle', 'Dark/Moody', 'Natural/Organic'] },
      { key: 'purpose', label: 'Purpose', placeholder: '', type: 'select', options: ['E-commerce listing', 'Social media', 'Print advertising', 'Website hero'] },
    ],
    generate: (v) => `Ultra-high-quality product photography of a ${v.product} on ${v.surface}.

## Shot Composition
- Primary subject: ${v.product}, sharp focus, positioned at 1/3 rule golden section
- Camera angle: slightly elevated (15° above eye level) for optimal product proportion display
- Lens: 85mm equivalent, f/2.8 — enough depth of field for full product sharpness, blurred background
- Distance: close enough to fill 70% of frame, leaving breathing room on all sides

## Lighting Setup
${v.style === 'Minimalist/Apple' ? '- Main: large softbox from upper-right at 45°\n- Fill: white reflector card left side\n- Result: clean shadows, no harsh edges, clinical precision' :
  v.style === 'Warm/Lifestyle' ? '- Main: warm window light simulation from left\n- Practical: candle/warm ambient in background out of focus\n- Result: golden, inviting, "I want to be there" atmosphere' :
  v.style === 'Dark/Moody' ? '- Main: single hard spotlight from directly above\n- No fill lights — dramatic shadows intentional\n- Result: cinematic, high-contrast, luxury editorial feel' :
  '- Main: diffused natural daylight simulation, overcast sky\n- No artificial feel — authentic, organic\n- Result: earthy, honest, sustainability brand aesthetic'}

## Visual Style
${v.style} aesthetic — reference: ${v.style === 'Minimalist/Apple' ? 'apple.com product photography, completely white/neutral environment' : v.style === 'Warm/Lifestyle' ? 'Kinfolk magazine, warm film aesthetic, slight grain' : v.style === 'Dark/Moody' ? 'high-end whiskey ads, Rolls-Royce product photography' : 'Aesop brand imagery, linen textures, muted earth tones'}

## Technical Specifications
- Resolution: 8K, suitable for ${v.purpose}
- Format: RAW equivalent quality
- No watermarks, no brand overlays — clean product only
- Post-processing: subtle retouching, keep material textures authentic

## Negative Prompt
Exclude: artificial looking, plastic sheen, overexposed, harsh shadows, stock photo clichés, busy background, visible studio equipment, low resolution, blurry, distorted proportions`,
  },
  {
    id: 'brand-illustration',
    category: 'image',
    title: 'Brand Illustration / Hero Visual',
    description: 'Custom illustration for website hero section or brand materials.',
    fields: [
      { key: 'concept', label: 'Core Concept', placeholder: 'e.g. collaboration and growth', type: 'text' },
      { key: 'style', label: 'Illustration Style', placeholder: '', type: 'select', options: ['Flat / Modern', 'Isometric', 'Hand-drawn / Organic', '3D Render', 'Abstract / Geometric'] },
      { key: 'palette', label: 'Color Palette', placeholder: 'e.g. blue and teal, warm earth tones', type: 'text' },
    ],
    generate: (v) => `Create a professional ${v.style} illustration representing: ${v.concept}

## Visual Concept
Central theme: ${v.concept} — expressed through symbolic visual metaphor, not literal representation.

## Style Reference
${v.style} illustration style:
${v.style === 'Flat / Modern' ? '- Clean geometric shapes, no gradients, solid fills\n- Reference: Intercom, Stripe, Linear brand illustrations\n- Minimal detail, maximum visual clarity' :
  v.style === 'Isometric' ? '- 30° isometric projection throughout\n- Consistent light source from top-left\n- Reference: Shopify product illustrations' :
  v.style === 'Hand-drawn / Organic' ? '- Intentional imperfection, visible brush/pen texture\n- Warm, human, approachable feel\n- Reference: Mailchimp, Headspace brand art' :
  v.style === '3D Render' ? '- Cinema 4D/Blender quality 3D objects\n- Photorealistic materials but abstract scene\n- Reference: Apple Vision Pro concept art' :
  '- Geometric abstraction, overlapping shapes with transparency\n- Rhythm and movement through repetition\n- Reference: Stripe abstract art'}

## Color Palette
Primary: ${v.palette}
Usage: 60% background/space, 30% primary elements, 10% accent highlights
Background: light neutral or white to ensure versatility

## Composition
- Rule of thirds applied to primary focal element
- Visual weight balanced across the frame
- Clean edges — suitable for use on white website backgrounds
- Aspect ratio: 16:9 (landscape) for hero use

## Quality Specifications
- Vector-quality sharpness
- Suitable for retina displays
- No text or typography embedded
- Scalable to billboard size without quality loss`,
  },
  {
    id: 'saas-landing',
    category: 'website',
    title: 'SaaS Landing Page',
    description: 'Conversion-optimized landing page with full design system specification.',
    fields: [
      { key: 'product', label: 'Product Name', placeholder: 'e.g. FlowTask', type: 'text' },
      { key: 'value_prop', label: 'Value Proposition', placeholder: 'e.g. Project management for remote teams', type: 'text' },
      { key: 'audience', label: 'Target Audience', placeholder: 'e.g. startup founders and PMs', type: 'text' },
      { key: 'primary_color', label: 'Brand Color Direction', placeholder: '', type: 'select', options: ['Blue (Trust)', 'Green (Growth)', 'Slate (Professional)', 'Teal (Modern)'] },
    ],
    generate: (v) => `Design a high-converting SaaS landing page for ${v.product} — ${v.value_prop}.

## Brand & Design System

### Color Palette
- Primary: ${v.primary_color.includes('Blue') ? '#1d4ed8' : v.primary_color.includes('Green') ? '#059669' : v.primary_color.includes('Slate') ? '#334155' : '#0d9488'} — used for primary CTA and key headings
- Secondary: #64748b (slate gray) — body text and supporting elements
- Accent: #f59e0b (amber) — badges, highlights, urgency indicators
- Background: #ffffff primary, #f8fafc secondary sections
- Border: #e2e8f0 on all cards and inputs

### Typography Scale
- H1: Inter 700, 56px, line-height 1.1
- H2: Inter 700, 36px, line-height 1.2
- H3: Inter 600, 24px, line-height 1.3
- Body: Inter 400, 16px, line-height 1.6
- Caption: Inter 500, 14px

### Spacing System
- Base unit: 8px
- Section padding: 96px vertical
- Component gap: 24px (16px mobile)
- Content max-width: 1280px, centered

## Page Architecture

### 1. Navigation Bar (sticky)
- Left: ${v.product} logo (wordmark or icon + wordmark)
- Center: Features | Pricing | Customers | Blog
- Right: "Log in" ghost button + "Start Free" filled button (primary color)
- Scroll behavior: background becomes white with subtle shadow after 60px scroll

### 2. Hero Section
- Pre-headline badge: "Trusted by 500+ teams" with avatar stack
- H1: Maximum 8 words capturing ${v.value_prop}
- Subheadline: One sentence expanding the H1, max 20 words, #64748b color
- CTA row: Primary button "Start Free — No Credit Card" + "Watch 2-min Demo" text link with play icon
- Hero image: Product screenshot at 110% size, right-aligned on desktop, below text on mobile. Subtle drop shadow + border-radius: 12px

### 3. Social Proof Strip (full-width, light gray bg)
- "Loved by teams at:" followed by 6 company logos in grayscale
- Below logos: 3 key metrics in large type — "99.9% Uptime", "2M+ Tasks Created", "4.9★ Rating"

### 4. Features Section
- Section headline: "Everything ${v.audience} need to move faster"
- 3-column card grid (2 on tablet, 1 on mobile)
- Card anatomy: Lucide icon (24px, primary color) → Feature title (18px/600) → Description (14px/400, #64748b) → "Learn more →" link
- Card hover: translateY(-4px), box-shadow deepens, 200ms ease

### 5. Testimonials Section
- Dark background (#1e293b) for visual contrast section
- Carousel: 3 testimonials visible on desktop, 1 on mobile
- Card: Avatar + Name + Title + Company logo + Star rating (5 stars) + Quote text

### 6. Pricing (if applicable)
- 3 tiers: Starter / Pro / Enterprise
- Pro tier highlighted with primary color border and "Most Popular" badge
- Annual/monthly toggle with 20% savings indicator for annual

### 7. CTA Banner
- Full-width primary color background
- Centered headline + single CTA button (white, filled)
- Urgency element: "Join 500+ teams already using ${v.product}"

### 8. Footer
- 4 columns: Logo/tagline + Product links + Company links + Legal
- Bottom bar: Copyright + Privacy + Terms + Social icons

## Interaction Specifications
- Page load: elements fade in with 100ms stagger delay
- Scroll reveal: translateY(20px) + opacity(0) → normal, triggered at 80% viewport
- All transitions: 150-200ms ease
- Hover states defined for every interactive element

## Conversion Optimization
- Primary CTA text identical throughout: "Start Free Trial"
- Secondary CTA: "Book a Demo" for enterprise consideration`,
  },
  {
    id: 'portfolio-site',
    category: 'website',
    title: 'Personal Portfolio / Agency Site',
    description: 'Stunning portfolio website to showcase work and convert leads.',
    fields: [
      { key: 'name', label: 'Name / Agency', placeholder: 'e.g. Alex Chen Design', type: 'text' },
      { key: 'specialty', label: 'Specialty', placeholder: 'e.g. Brand identity and UI/UX design', type: 'text' },
      { key: 'style', label: 'Design Style', placeholder: '', type: 'select', options: ['Minimal & Clean', 'Bold & Editorial', 'Dark & Premium', 'Playful & Creative'] },
    ],
    generate: (v) => `Design a stunning portfolio website for ${v.name} specializing in ${v.specialty}.

## Design Direction
${v.style} aesthetic — this must permeate every design decision.

## Design System
${v.style === 'Dark & Premium' ?
'- Background: #0a0a0a near-black\n- Primary text: #f8fafc\n- Accent: single vibrant color (gold or electric blue)\n- Cards: #161616 with 1px border #2a2a2a' :
v.style === 'Bold & Editorial' ?
'- Large, dominant typography (90px+ hero text)\n- High contrast: pure black on white\n- Accent: one bold color used sparingly\n- Asymmetric layouts, intentional tension' :
v.style === 'Minimal & Clean' ?
'- Background: #ffffff\n- Primary: #0f172a near-black text\n- Accent: single refined color\n- Plenty of white space, grid discipline' :
'- Unexpected color combinations\n- Custom cursor or micro-interactions\n- Expressive typography mixing weights/styles\n- Easter eggs and delightful details'}

## Page Sections

### Hero
- Full viewport height
- Headline: "[Name] — [specialty distilled to 3-4 words]"
- Animated element: subtle text reveal, particle system, or cursor-following effect
- Scroll indicator: animated arrow or text

### About / Credentials
- Photo: authentic, not stock — personality visible
- 3-4 line bio: specific, not generic
- Client logos or notable work listed
- "Selected clients" or award badges

### Work / Case Studies (Primary Section)
- 3-6 featured projects, full-width cards
- Hover: case study preview expands or title reveals
- Each card: project name, category tags, year
- Grid: masonry or asymmetric for visual interest

### Services / Process (Optional)
- ${v.specialty.split('/')[0].trim()} process visualized
- 3-5 steps with micro-animations
- Pricing tiers or "Starting from" indicator

### Contact / CTA
- Simple, friction-free form or email link
- Availability indicator: "Available from [month]" or "Currently booking Q3"
- Response time expectation set

## Key Interactions
- Project hover: smooth zoom or overlay reveal
- Navigation: minimal, out of the way — content leads
- Scroll: smooth momentum scrolling throughout
- Mobile: full-featured, not degraded — same impact`,
  },
];

const CATEGORY_CONFIG: Record<Category, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  video: { label: 'Video & Reels', icon: <Video size={16} />, color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
  image: { label: 'Image Generation', icon: <Image size={16} />, color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },
  website: { label: 'Website & UI', icon: <Globe size={16} />, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
};

export function ContentStudio() {
  const [activeCategory, setActiveCategory] = useState<Category>('video');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredTemplates = TEMPLATES.filter(t => t.category === activeCategory);

  function selectTemplate(template: Template) {
    setSelectedTemplate(template);
    setFieldValues({});
    setGeneratedPrompt('');
  }

  function handleGenerate() {
    if (!selectedTemplate) return;
    const prompt = selectedTemplate.generate(fieldValues);
    setGeneratedPrompt(prompt);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const allFilled = selectedTemplate?.fields.every(f => fieldValues[f.key]?.trim()) ?? false;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Content Studio</h2>
        <p className="text-slate-500">Fill in a template and generate a fully structured prompt for any content type.</p>
      </div>

      <div className="flex gap-3 mb-6">
        {(Object.keys(CATEGORY_CONFIG) as Category[]).map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSelectedTemplate(null); setGeneratedPrompt(''); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 ${
              activeCategory === cat
                ? `${CATEGORY_CONFIG[cat].bg} ${CATEGORY_CONFIG[cat].color} border-current`
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {CATEGORY_CONFIG[cat].icon}
            {CATEGORY_CONFIG[cat].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2 space-y-3">
          {filteredTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => selectTemplate(template)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 ${
                selectedTemplate?.id === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'bg-white border-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`font-semibold text-sm ${selectedTemplate?.id === template.id ? 'text-blue-900' : 'text-slate-900'}`}>
                    {template.title}
                  </h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{template.description}</p>
                </div>
                <ChevronRight size={14} className={`flex-shrink-0 mt-0.5 transition-colors ${selectedTemplate?.id === template.id ? 'text-blue-500' : 'text-slate-300'}`} />
              </div>
            </button>
          ))}
        </div>

        <div className="col-span-3">
          {!selectedTemplate ? (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-12 text-center h-full flex items-center justify-center">
              <div>
                <Wand2 size={32} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">Select a template</p>
                <p className="text-slate-400 text-sm mt-1">Choose a template from the left to get started</p>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg mb-1">{selectedTemplate.title}</h3>
              <p className="text-slate-500 text-sm mb-5">{selectedTemplate.description}</p>

              <div className="space-y-4 mb-5">
                {selectedTemplate.fields.map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        value={fieldValues[field.key] || ''}
                        onChange={e => setFieldValues(v => ({ ...v, [field.key]: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select...</option>
                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={fieldValues[field.key] || ''}
                        onChange={e => setFieldValues(v => ({ ...v, [field.key]: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={!allFilled}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 shadow-sm"
              >
                <Wand2 size={16} />
                Generate Template Prompt
              </button>

              {generatedPrompt && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700">Generated Prompt</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-xs text-slate-700 bg-slate-50 rounded-xl p-4 overflow-auto max-h-64 whitespace-pre-wrap font-mono leading-relaxed border border-slate-100">
                    {generatedPrompt}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
