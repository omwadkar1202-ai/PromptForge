import { useState, useEffect, useCallback } from 'react';
import { BookMarked, Copy, Trash2, Check, Code2, Image, Video, Globe, HelpCircle, Loader2, Search, RefreshCw } from 'lucide-react';
import { supabase, getSessionId } from '../lib/supabase';
import { Prompt, UseCase } from '../types';

const USE_CASE_ICONS: Record<UseCase, React.ReactNode> = {
  code: <Code2 size={13} />,
  image: <Image size={13} />,
  video: <Video size={13} />,
  website: <Globe size={13} />,
  general: <HelpCircle size={13} />,
};

const USE_CASE_COLORS: Record<UseCase, string> = {
  code: 'bg-blue-100 text-blue-700',
  image: 'bg-teal-100 text-teal-700',
  video: 'bg-rose-100 text-rose-700',
  website: 'bg-amber-100 text-amber-700',
  general: 'bg-slate-100 text-slate-700',
};

interface SavedPromptsProps {
  refreshKey: number;
}

export function SavedPrompts({ refreshKey }: SavedPromptsProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadPrompts = useCallback(async () => {
    setLoading(true);
    const sessionId = getSessionId();
    const { data } = await supabase
      .from('prompts')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });
    setPrompts((data as Prompt[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPrompts();
  }, [loadPrompts, refreshKey]);

  async function handleCopy(prompt: Prompt) {
    await navigator.clipboard.writeText(prompt.generated_prompt);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    await supabase.from('prompts').delete().eq('id', id);
    setPrompts(p => p.filter(x => x.id !== id));
    setDeletingId(null);
  }

  const filtered = prompts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.requirement.toLowerCase().includes(search.toLowerCase()) ||
    p.use_case.toLowerCase().includes(search.toLowerCase())
  );

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  const scoreColor = (score: number) =>
    score >= 90 ? 'text-green-600 bg-green-50' : score >= 75 ? 'text-blue-600 bg-blue-50' : 'text-amber-600 bg-amber-50';

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Saved Prompts</h2>
        <p className="text-slate-500">Your generated prompts, stored in this session.</p>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={loadPrompts}
          className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="text-blue-500 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
          <BookMarked size={36} className="text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 font-semibold text-lg">
            {prompts.length === 0 ? 'No saved prompts yet' : 'No prompts match your search'}
          </p>
          <p className="text-slate-400 text-sm mt-1">
            {prompts.length === 0 ? 'Generate and save prompts from the Prompt Generator.' : 'Try a different search term.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(prompt => (
            <div
              key={prompt.id}
              className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className="flex items-center justify-between p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === prompt.id ? null : prompt.id)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ${USE_CASE_COLORS[prompt.use_case as UseCase]}`}>
                    {USE_CASE_ICONS[prompt.use_case as UseCase]}
                    {prompt.use_case}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">{prompt.title}</h4>
                    <p className="text-slate-500 text-xs truncate mt-0.5">{prompt.requirement}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scoreColor(prompt.quality_score)}`}>
                    {prompt.quality_score}/100
                  </span>
                  <span className="text-slate-400 text-xs">{formatDate(prompt.created_at)}</span>
                  <button
                    onClick={e => { e.stopPropagation(); handleCopy(prompt); }}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                    title="Copy prompt"
                  >
                    {copiedId === prompt.id ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(prompt.id); }}
                    disabled={deletingId === prompt.id}
                    className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete prompt"
                  >
                    {deletingId === prompt.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>

              {expandedId === prompt.id && (
                <div className="border-t border-slate-100 px-5 pb-5">
                  <div className="flex flex-wrap gap-2 mt-4 mb-3">
                    {prompt.techniques.map((t: string) => (
                      <span key={t} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                  <pre className="text-xs text-slate-700 bg-slate-50 rounded-xl p-4 overflow-auto max-h-60 whitespace-pre-wrap font-mono leading-relaxed border border-slate-100">
                    {prompt.generated_prompt}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="text-center text-slate-400 text-xs mt-6">
          Showing {filtered.length} of {prompts.length} prompt{prompts.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
