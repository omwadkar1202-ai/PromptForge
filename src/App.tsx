import { useState, useEffect, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { PromptGenerator } from './pages/PromptGenerator';
import { IterationLab } from './pages/IterationLab';
import { ContentStudio } from './pages/ContentStudio';
import { SavedPrompts } from './pages/SavedPrompts';
import { supabase, getSessionId } from './lib/supabase';

type Page = 'dashboard' | 'generator' | 'iteration' | 'content' | 'saved';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [savedCount, setSavedCount] = useState(0);
  const [saveRefreshKey, setSaveRefreshKey] = useState(0);

  const loadSavedCount = useCallback(async () => {
    const sessionId = getSessionId();
    const { count } = await supabase
      .from('prompts')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', sessionId);
    setSavedCount(count || 0);
  }, []);

  useEffect(() => {
    loadSavedCount();
  }, [loadSavedCount]);

  function handleSave() {
    setSavedCount(c => c + 1);
    setSaveRefreshKey(k => k + 1);
  }

  function renderPage() {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} savedCount={savedCount} />;
      case 'generator':
        return <PromptGenerator onSave={handleSave} />;
      case 'iteration':
        return <IterationLab />;
      case 'content':
        return <ContentStudio />;
      case 'saved':
        return <SavedPrompts refreshKey={saveRefreshKey} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} savedCount={savedCount} />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
