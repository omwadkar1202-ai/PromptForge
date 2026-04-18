import { Zap, LayoutDashboard, Wand2, FlaskConical, Layers, BookMarked } from 'lucide-react';

type Page = 'dashboard' | 'generator' | 'iteration' | 'content' | 'saved';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'generator', label: 'Prompt Generator', icon: <Wand2 size={18} /> },
  { id: 'iteration', label: 'Iteration Lab', icon: <FlaskConical size={18} /> },
  { id: 'content', label: 'Content Studio', icon: <Layers size={18} /> },
  { id: 'saved', label: 'Saved Prompts', icon: <BookMarked size={18} /> },
];

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 flex flex-col z-50">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">PromptForge</h1>
            <p className="text-slate-400 text-xs mt-0.5">Prompt Engineering Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
              currentPage === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

    </aside>
  );
}
