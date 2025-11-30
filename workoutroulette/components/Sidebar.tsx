'use client';

import { useState } from 'react';

interface Exercise {
  id: string;
  name: string;
  category: string;
  color: string;
  selected?: boolean;
}

interface SidebarProps {
  exercises: Exercise[];
  onToggleExercise: (id: string) => void;
  onClearAll: () => void;
  onSelectAll: () => void;
}

const Sidebar = ({ exercises, onToggleExercise, onClearAll, onSelectAll }: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(exercises.map(ex => ex.category)))];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedCount = exercises.filter(ex => ex.selected).length;

  return (
    <div className="w-80 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50 h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Exercise Selection</h2>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Selected: {selectedCount} / {exercises.length}
            </span>
            <div className="space-x-2">
              <button
                onClick={onSelectAll}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Select All
              </button>
              <button
                onClick={onClearAll}
                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredExercises.map(exercise => (
            <label
              key={exercise.id}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={exercise.selected}
                onChange={() => onToggleExercise(exercise.id)}
                className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {exercise.name}
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  {exercise.category}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;