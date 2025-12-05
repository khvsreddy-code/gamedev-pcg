
import React, { useState, useCallback } from 'react';
import { generateAssetConcept } from '../services/geminiService';
import { GeneratedAsset } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Select from './common/Select';
import Spinner from './common/Spinner';

const AssetGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A majestic, ancient oak tree with glowing runes carved into its bark');
  const [assetType, setAssetType] = useState<string>('Tree');
  const [style, setStyle] = useState<string>('Fantasy');
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedAssets([]);

    const fullPrompt = `Concept art for a video game asset. 
      Asset Type: ${assetType}. 
      Style: ${style}, highly detailed, 8k, epic. 
      Description: ${prompt}.
      The asset should be isolated on a neutral background, suitable for a 3D model reference sheet.`;

    try {
      const images = await generateAssetConcept(fullPrompt);
      const newAssets: GeneratedAsset[] = images.map((src, index) => ({
        id: `${Date.now()}-${index}`,
        src,
        prompt: fullPrompt,
      }));
      setGeneratedAssets(newAssets);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, assetType, style]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b-2 border-purple-500 pb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4H7zM10 21h4a2 2 0 002-2v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4a2 2 0 002 2zM15 5a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v0z" /></svg>
            Asset Parameters
          </h2>
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-2">
                Asset Description
            </label>
            <textarea
                id="prompt"
                rows={4}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 focus:ring-purple-500 focus:border-purple-500 transition"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A rusty, medieval sword..."
            />
          </div>

          <Select 
            id="asset-type" 
            label="Asset Type"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
          >
            <option>Tree</option>
            <option>Rock</option>
            <option>Building</option>
            <option>Weapon</option>
            <option>Character</option>
            <option>Prop</option>
          </Select>

          <Select 
            id="asset-style" 
            label="Art Style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option>Fantasy</option>
            <option>Sci-Fi</option>
            <option>Realistic</option>
            <option>Stylized</option>
            <option>Cartoon</option>
          </Select>
          
          <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
            Generate Asset Concept
          </Button>
        </div>
      </Card>
      
      <div className="lg:col-span-2">
         <Card className="h-full flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4 self-start">Generated Asset Concepts</h2>
             {isLoading && <div className="flex-grow flex items-center justify-center"><Spinner size="16"/></div>}
             {error && <p className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</p>}
             {!isLoading && !error && generatedAssets.length === 0 && 
                <div className="flex-grow flex items-center justify-center text-center text-gray-400">
                    <p>Describe an asset, choose its type and style, then click "Generate" to see the AI's creation.</p>
                </div>
             }
             {generatedAssets.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {generatedAssets.map(asset => (
                        <div key={asset.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                            <img src={asset.src} alt="Generated asset" className="w-full h-auto object-cover" />
                        </div>
                    ))}
                </div>
             )}
         </Card>
      </div>
    </div>
  );
};

export default AssetGenerator;
