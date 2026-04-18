import { useState } from 'react';
import { Wand2, Copy, Save, Check, ChevronDown, AlertCircle, Code2, Image, Video, Globe, HelpCircle, Loader2 } from 'lucide-react';
import { generatePrompt } from '../lib/promptEngine';
import { supabase, getSessionId } from '../lib/supabase';
import { UseCase, GeneratedResult } from '../types';

const USE_CASE_OPTIONS: { value: UseCase; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: 'code', label: 'Code Generation', icon: <Code2 size={16} />, desc: 'Apps, APIs, components, scripts' },
  { value: 'image', label: 'Image Generation', icon: <Image size={16} />, desc: 'Photos, illustrations, artwork' },
  { value: 'video', label: 'Video & Reels', icon: <Video size={16} />, desc: 'Scripts, concepts, scene breakdowns' },
  { value: 'website', label: 'Website & UI', icon: <Globe size={16} />, desc: 'Layouts, design systems, components' },
  { value: 'general', label: 'General Purpose', icon: <HelpCircle size={16} />, desc: 'Analysis, writing, ideation' },
];

const BREAKDOWN_COLOR_MAP: Record<string, string> = {
  blue: 'border-l-blue-500 bg-blue-50',
  teal: 'border-l-teal-500 bg-teal-50',
  amber: 'border-l-amber-500 bg-amber-50',
  green: 'border-l-green-500 bg-green-50',
  rose: 'border-l-rose-500 bg-rose-50',
};

const BREAKDOWN_LABEL_COLOR: Record<string, string> = {
  blue: 'text-blue-700',
  teal: 'text-teal-700',
  amber: 'text-amber-700',
  green: 'text-green-700',
  rose: 'text-rose-700',
};

interface PromptGeneratorProps {
  onSave: () => void;
}

export function PromptGenerator({ onSave }: PromptGeneratorProps) {
  const [requirement, setRequirement] = useState('');
  const [useCase, setUseCase] = useState<UseCase>('general');
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(true);

  function handleGenerate() {
    if (!requirement.trim()) return;
    setGenerating(true);
    setSaved(false);
    setTimeout(() => {
      const generated = generatePrompt(requirement, useCase);
      setResult(generated);
      setGenerating(false);
    }, 600);
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSave() {
    if (!result) return;
    setSaving(true);
    const sessionId = getSessionId();
    await supabase.from('prompts').insert({
      session_id: sessionId,
      requirement,
      use_case: useCase,
      generated_prompt: result.prompt,
      techniques: result.techniques,
      quality_score: result.quality_score,
      title: result.title,
      is_saved: true,
    });
    setSaving(false);
    setSaved(true);
    onSave();
  }

  const scoreColor = result
    ? result.quality_score >= 90 ? 'text-green-600' : result.quality_score >= 75 ? 'text-blue-600' : 'text-amber-600'
    : '';
  const scoreBg = result
    ? result.quality_score >= 90 ? 'bg-green-50 border-green-200' : result.quality_score >= 75 ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'
    : '';

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Prompt Generator</h2>
        <p className="text-slate-500">Describe what you need and get a structured, optimized prompt with technique breakdown.</p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2 space-y-5">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <label className="block text-sm font-semibold text-slate-700 mb-3">Use Case</label>
            <div className="space-y-2">
              {USE_CASE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setUseCase(opt.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-150 ${
                    useCase === opt.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className={useCase === opt.value ? 'text-blue-600' : 'text-slate-400'}>{opt.icon}</span>
                  <div>
                    <p className="text-sm font-semibold leading-none">{opt.label}</p>
                    <p className="text-xs mt-0.5 opacity-60">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <p className="text-blue-700 text-xs font-semibold mb-1">Tip</p>
            <p className="text-blue-600 text-xs leading-relaxed">
              Be specific in your requirement. The more detail you provide, the higher the quality score of the generated prompt.
            </p>
          </div>
        </div>

        <div className="col-span-3 space-y-5">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Your Requirement
            </label>
            <textarea
              value={requirement}
              onChange={e => setRequirement(e.target.value)}
              placeholder="e.g. Build a REST API endpoint for user authentication with JWT tokens, refresh token rotation, and rate limiting..."
              rows={5}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
            />
            <div className="flex items-center justify-between mt-3">
              <span className={`text-xs ${requirement.length > 20 ? 'text-green-600' : 'text-slate-400'}`}>
                {requirement.length} chars — {requirement.length > 50 ? 'detailed' : requirement.length > 20 ? 'good' : 'add more detail for better quality'}
              </span>
              <button
                onClick={handleGenerate}
                disabled={!requirement.trim() || generating}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 shadow-sm disabled:cursor-not-allowed"
              >
                {generating ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                {generating ? 'Generating...' : 'Generate Prompt'}
              </button>
            </div>
          </div>

          {result && (
            <>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900">Generated Prompt</h3>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${scoreBg} ${scoreColor}`}>
                      <span>{result.quality_score}</span>
                      <span className="font-normal opacity-75">/ 100</span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving || saved}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                        saved ? 'border-green-200 bg-green-50 text-green-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                      {saved ? 'Saved!' : saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
                <pre className="text-xs text-slate-700 bg-slate-50 rounded-xl p-4 overflow-auto max-h-72 whitespace-pre-wrap font-mono leading-relaxed border border-slate-100">
                  {result.prompt}
                </pre>
              </div>

              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <button
                  className="flex items-center justify-between w-full"
                  onClick={() => setShowBreakdown(b => !b)}
                >
                  <h3 className="font-bold text-slate-900">Technique Breakdown</h3>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${showBreakdown ? 'rotate-180' : ''}`} />
                </button>

                {showBreakdown && (
                  <div className="mt-4 space-y-3">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.techniques.map(t => (
                        <span key={t} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium">{t}</span>
                      ))}
                    </div>
                    {result.breakdown.map(item => (
                      <div key={item.label} className={`border-l-4 rounded-r-xl p-4 ${BREAKDOWN_COLOR_MAP[item.color] || 'border-l-slate-400 bg-slate-50'}`}>
                        <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${BREAKDOWN_LABEL_COLOR[item.color] || 'text-slate-600'}`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{item.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {!result && !generating && (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-10 text-center">
              <AlertCircle size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No prompt generated yet</p>
              <p className="text-slate-400 text-sm mt-1">Enter your requirement above and click Generate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
