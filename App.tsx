
import React, { useState } from 'react';
import Header from './components/Header';
import AetherMaze from './components/AetherMaze';
import AetherSculpt from './components/AetherSculpt';
import AetherNarrative from './components/AetherNarrative';
import AetherSim from './components/AetherSim';
import AetherLink from './components/AetherLink';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string>('maze');

  const renderContent = () => {
      switch(activeTool) {
          case 'home':
          case 'maze': return <AetherMaze />;
          case 'sculpt': return <AetherSculpt />;
          case 'narrative': return <AetherNarrative />;
          case 'sim': return <AetherSim />;
          case 'link': return <AetherLink />;
          default: return <AetherMaze />;
      }
  };

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      <Header activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="flex-grow container mx-auto px-4 py-8 h-full">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
