import { useState } from 'react';
import { FlaskConical, ArrowRight, TrendingUp, Check, Code2, Image, Video, Globe } from 'lucide-react';
import { ITERATION_EXAMPLES } from '../lib/iterationData';
import { UseCase } from '../types';

const USE_CASE_ICONS: Record<UseCase, React.ReactNode> = {
  code: <Code2 size={14} />,
  image: <Image size={14} />,
  video: <Video size={14} />,
  website: <Globe size={14} />,
  general: <FlaskConical size={14} />,
};

const USE_CASE_COLORS: Record<UseCase, string> = {
  code: 'bg-blue-100 text-blue-700',
  image: 'bg-teal-100 text-teal-700',
  video: 'bg-rose-100 text-rose-700',
  website: 'bg-amber-100 text-amber-700',
  general: 'bg-slate-100 text-slate-700',
};

function QualityBar({ score, color }: { score: number; color: 'red' | 'green' }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color === 'red' ? 'bg-rose-400' : 'bg-green-500'}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-sm font-bold w-8 text-right ${color === 'red' ? 'text-rose-600' : 'text-green-600'}`}>{score}</span>
    </div>
  );
}

export function IterationLab() {
  const [activeId, setActiveId] = useState(ITERATION_EXAMPLES[0].id);
  const active = ITERATION_EXAMPLES.find(e => e.id === activeId)!;
  const improvement = active.quality_after - active.quality_before;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Iteration Lab</h2>
        <p className="text-slate-500">Real before/after examples showing how prompt refinement dramatically improves output quality.</p>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        {ITERATION_EXAMPLES.map(ex => (
          <button
            key={ex.id}
            onClick={() => setActiveId(ex.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 border ${
              activeId === ex.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
            }`}
          >
            <span className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-md text-xs font-semibold ${USE_CASE_COLORS[ex.use_case]}`}>
              {USE_CASE_ICONS[ex.use_case]}
            </span>
            {ex.title}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold ${USE_CASE_COLORS[active.use_case]}`}>
                {USE_CASE_ICONS[active.use_case]}
                {active.use_case.charAt(0).toUpperCase() + active.use_case.slice(1)}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{active.title}</h3>
            <p className="text-slate-500 text-sm mt-1">{active.description}</p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2 flex-shrink-0">
            <TrendingUp size={16} className="text-green-600" />
            <span className="text-green-700 font-bold text-lg">+{improvement}</span>
            <span className="text-green-600 text-sm">quality pts</span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Before (Initial)</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500">Score:</span>
                <span className="text-sm font-bold text-rose-600">{active.quality_before}/100</span>
              </div>
            </div>
            <QualityBar score={active.quality_before} color="red" />
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 mt-3">
              <p className="text-slate-700 text-sm leading-relaxed font-mono">{active.initial_prompt}</p>
            </div>
            <div className="space-y-1 mt-2">
              {['Vague intent', 'No format specified', 'No constraints', 'No output structure'].map(issue => (
                <div key={issue} className="flex items-center gap-2 text-xs text-rose-600">
                  <span className="w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  {issue}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-0.5 flex-1 bg-slate-200 min-h-[40px]" />
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                <ArrowRight size={16} className="text-white" />
              </div>
              <div className="w-0.5 flex-1 bg-slate-200 min-h-[40px]" />
            </div>
          </div>

          <div className="col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">After (Improved)</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500">Score:</span>
                <span className="text-sm font-bold text-green-600">{active.quality_after}/100</span>
              </div>
            </div>
            <QualityBar score={active.quality_after} color="green" />
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mt-3 max-h-48 overflow-auto">
              <pre className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap font-mono">{active.improved_prompt}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h4 className="font-bold text-slate-900 mb-4">What Changed ({active.changes.length} improvements)</h4>
        <div className="grid grid-cols-2 gap-3">
          {active.changes.map((change, i) => (
            <div key={i} className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={11} className="text-white" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{change}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-blue-700 text-sm font-semibold mb-1">Key Takeaway</p>
          <p className="text-blue-600 text-sm leading-relaxed">
            Quality improved by <strong>{improvement} points</strong> ({Math.round((improvement / active.quality_before) * 100)}% increase) simply by adding structure, specificity, and explicit constraints — no new information was added, only better organization of the same intent.
          </p>
        </div>
      </div>
    </div>
  );
}
