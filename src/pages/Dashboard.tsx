import { Wand2, FlaskConical, Layers, BookMarked, ArrowRight, CheckCircle, Target, Lightbulb, TrendingUp, Code2, Image, Video, Globe } from 'lucide-react';

type Page = 'dashboard' | 'generator' | 'iteration' | 'content' | 'saved';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  savedCount: number;
}

const PRINCIPLES = [
  { icon: <Target size={16} />, title: 'Clear Intent', desc: 'Define the exact outcome before writing a single word of the prompt.' },
  { icon: <Lightbulb size={16} />, title: 'Structured Logic', desc: 'Break complex tasks into sequential, numbered instructions the model can follow.' },
  { icon: <CheckCircle size={16} />, title: 'Hard Constraints', desc: 'Use explicit limits on format, length, tone, and content to prevent drift.' },
  { icon: <TrendingUp size={16} />, title: 'Iterate & Refine', desc: 'Treat prompts as code — version them, test them, and improve them systematically.' },
];

const USE_CASES = [
  { icon: <Code2 size={20} />, label: 'Code Generation', color: 'blue', desc: 'Generate production-ready code with type safety and edge case handling.' },
  { icon: <Image size={20} />, label: 'Image Creation', color: 'teal', desc: 'Control style, composition, and quality for high-fidelity visuals.' },
  { icon: <Video size={20} />, label: 'Video & Reels', color: 'rose', desc: 'Scene-by-scene scripts with audio and platform-specific specs.' },
  { icon: <Globe size={20} />, label: 'Website & UI', color: 'amber', desc: 'Full design systems with components, spacing, and responsive behavior.' },
];

const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  teal: 'bg-teal-50 text-teal-700 border-teal-100',
  rose: 'bg-rose-50 text-rose-700 border-rose-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
};

const ICON_COLOR_MAP: Record<string, string> = {
  blue: 'text-blue-600',
  teal: 'text-teal-600',
  rose: 'text-rose-600',
  amber: 'text-amber-600',
};

export function Dashboard({ onNavigate, savedCount }: DashboardProps) {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
<h2 className="text-4xl font-bold text-slate-900 mb-3">Prompt Engineering Platform</h2>
        <p className="text-slate-500 text-lg max-w-2xl">
          A comprehensive tool demonstrating advanced prompt engineering techniques for code generation, content creation, and UI design.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Techniques', value: '12+', sub: 'engineering patterns' },
          { label: 'Use Cases', value: '4', sub: 'content categories' },
          { label: 'Iterations', value: '4', sub: 'before/after examples' },
          { label: 'Saved Prompts', value: savedCount.toString(), sub: 'in your session' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-slate-700 font-semibold text-sm mt-1">{stat.label}</p>
            <p className="text-slate-400 text-xs mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-lg mb-5">Core Principles</h3>
          <div className="space-y-4">
            {PRINCIPLES.map(p => (
              <div key={p.title} className="flex gap-3">
                <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600 mt-0.5">
                  {p.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{p.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-lg mb-5">Supported Use Cases</h3>
          <div className="space-y-3">
            {USE_CASES.map(uc => (
              <div key={uc.label} className={`flex gap-3 items-start p-3 rounded-xl border ${COLOR_MAP[uc.color]}`}>
                <div className={`mt-0.5 flex-shrink-0 ${ICON_COLOR_MAP[uc.color]}`}>{uc.icon}</div>
                <div>
                  <p className="font-semibold text-sm">{uc.label}</p>
                  <p className="text-xs mt-0.5 opacity-75">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { page: 'generator' as Page, icon: <Wand2 size={20} />, title: 'Generate a Prompt', desc: 'Enter your requirements and get an optimized, structured prompt instantly.', color: 'blue' },
          { page: 'iteration' as Page, icon: <FlaskConical size={20} />, title: 'Iteration Lab', desc: 'See real before/after examples demonstrating prompt refinement techniques.', color: 'teal' },
          { page: 'content' as Page, icon: <Layers size={20} />, title: 'Content Studio', desc: 'Use curated templates for video, image, and website prompt generation.', color: 'amber' },
        ].map(card => (
          <button
            key={card.page}
            onClick={() => onNavigate(card.page)}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm text-left hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
              card.color === 'blue' ? 'bg-blue-100 text-blue-600' :
              card.color === 'teal' ? 'bg-teal-100 text-teal-600' :
              'bg-amber-100 text-amber-600'
            }`}>
              {card.icon}
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">{card.title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
            <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-blue-600 group-hover:gap-2 transition-all">
              Get started <ArrowRight size={12} />
            </div>
          </button>
        ))}
      </div>

      {savedCount > 0 && (
        <button
          onClick={() => onNavigate('saved')}
          className="mt-4 w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <BookMarked size={18} className="text-slate-500" />
            <span className="text-slate-700 text-sm font-medium">You have {savedCount} saved prompt{savedCount !== 1 ? 's' : ''}</span>
          </div>
          <ArrowRight size={16} className="text-slate-400" />
        </button>
      )}
    </div>
  );
}
