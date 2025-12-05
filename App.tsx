
import React, { useState } from 'react';
import Header from './components/Header';
import LevelGenerator from './components/LevelGenerator';
import AssetGenerator from './components/AssetGenerator';
import Footer from './components/Footer';

type Tool = 'level' | 'asset';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('level');

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col font-sans">
      <Header activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeTool === 'level' && <LevelGenerator />}
        {activeTool === 'asset' && <AssetGenerator />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
