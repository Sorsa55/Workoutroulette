'use client';

import { useState } from 'react';

interface RandomNumberGeneratorProps {
  onGenerate: (reps: number, sets: number) => void;
  currentReps?: number | null;
  currentSets?: number | null;
}

const RandomNumberGenerator = ({ onGenerate, currentReps, currentSets }: RandomNumberGeneratorProps) => {
  const [repsMin, setRepsMin] = useState(5);
  const [repsMax, setRepsMax] = useState(15);
  const [setsMin, setSetsMin] = useState(1);
  const [setsMax, setSetsMax] = useState(4);

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleGenerate = () => {
    const reps = generateRandomNumber(repsMin, repsMax);
    const sets = generateRandomNumber(setsMin, setsMax);
    onGenerate(reps, sets);
  };

  return (
    <div className="backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Workout Generator</h3>
      
      {currentReps && currentSets && (
        <div className="mb-4 p-3 backdrop-blur-sm rounded-lg">
          <p className="text-center text-lg font-semibold text-white drop-shadow-lg">
            {currentSets} sets × {currentReps} reps
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Reps Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="1"
              max="50"
              value={repsMin}
              onChange={(e) => setRepsMin(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Min"
            />
            <span className="flex items-center text-gray-500 dark:text-gray-400">to</span>
            <input
              type="number"
              min="1"
              max="50"
              value={repsMax}
              onChange={(e) => setRepsMax(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Max"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sets Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="1"
              max="10"
              value={setsMin}
              onChange={(e) => setSetsMin(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Min"
            />
            <span className="flex items-center text-gray-500 dark:text-gray-400">to</span>
            <input
              type="number"
              min="1"
              max="10"
              value={setsMax}
              onChange={(e) => setSetsMax(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
      >
        Generate Random Workout
      </button>
    </div>
  );
};

export default RandomNumberGenerator;