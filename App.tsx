
import React, { useState } from 'react';
import Header from './components/Header';
import AetherSculpt from './components/AetherSculpt';
import AetherWorld from './components/AetherWorld';
import AetherCode from './components/AetherCode';
import AetherMetrics from './components/AetherMetrics';
import AetherLink from './components/AetherLink';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string>('sculpt');

  const renderContent = () => {
      switch(activeTool) {
          case 'home':
          case 'sculpt': return <AetherSculpt />;
          case 'world': return <AetherWorld />;
          case 'code': return <AetherCode />;
          case 'metrics': return <AetherMetrics />;
          case 'link': return <AetherLink />;
          default: return <AetherSculpt />;
      }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-100">
      <Header activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="flex-grow container mx-auto px-4 py-8 h-full">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
