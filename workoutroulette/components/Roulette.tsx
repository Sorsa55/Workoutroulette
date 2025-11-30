'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import RandomNumberGenerator from './RandomNumberGenerator';

interface Exercise {
  id: string;
  name: string;
  category: string;
  color: string;
  selected?: boolean;
}

const Roulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [currentReps, setCurrentReps] = useState<number | null>(null);
  const [currentSets, setCurrentSets] = useState<number | null>(null);

  const [allExercises, setAllExercises] = useState<Exercise[]>([
    { id: '1', name: 'Push-ups', category: 'upper body', color: 'red' },
    { id: '2', name: 'Squats', category: 'lower body', color: 'black' },
    { id: '3', name: 'Burpees', category: 'full body', color: 'red' },
    { id: '4', name: 'Lunges', category: 'lower body', color: 'black' },
    { id: '5', name: 'Plank', category: 'core', color: 'red' },
    { id: '6', name: 'Jumping Jacks', category: 'cardio', color: 'black' },
    { id: '7', name: 'Mountain Climbers', category: 'cardio', color: 'red' },
    { id: '8', name: 'Deadlifts', category: 'lower body', color: 'black' },
    { id: '9', name: 'Bench Press', category: 'upper body', color: 'red' },
    { id: '10', name: 'Pull-ups', category: 'upper body', color: 'black' },
    { id: '11', name: 'Dips', category: 'upper body', color: 'red' },
    { id: '12', name: 'Leg Press', category: 'lower body', color: 'black' },
    { id: '13', name: 'Shoulder Press', category: 'upper body', color: 'red' },
    { id: '14', name: 'Bicep Curls', category: 'upper body', color: 'black' },
    { id: '15', name: 'Tricep Extensions', category: 'upper body', color: 'red' },
    { id: '16', name: 'Lat Pulldowns', category: 'upper body', color: 'black' },
    { id: '17', name: 'Calf Raises', category: 'lower body', color: 'red' },
    { id: '18', name: 'Crunches', category: 'core', color: 'black' },
    { id: '19', name: 'Russian Twists', category: 'core', color: 'red' },
    { id: '20', name: 'Box Jumps', category: 'plyometric', color: 'black' },
    { id: '21', name: 'Kettlebell Swings', category: 'full body', color: 'red' },
    { id: '22', name: 'Wall Sit', category: 'lower body', color: 'black' },
    { id: '23', name: 'Hip Thrusts', category: 'lower body', color: 'red' },
    { id: '24', name: 'Face Pulls', category: 'upper body', color: 'black' },
    { id: '25', name: 'Farmers Walk', category: 'full body', color: 'red' },
    { id: '26', name: 'Turkish Get-up', category: 'full body', color: 'black' },
    { id: '27', name: 'Battle Ropes', category: 'cardio', color: 'red' },
    { id: '28', name: 'Sled Push', category: 'full body', color: 'black' },
    { id: '29', name: 'Medicine Ball Slams', category: 'full body', color: 'red' },
    { id: '30', name: 'Prowler Pull', category: 'full body', color: 'black' },
    { id: '31', name: 'Rest Day', category: 'recovery', color: 'green' },
  ]);

  const [exercises, setExercises] = useState<Exercise[]>(
    allExercises.map(ex => ({ ...ex, selected: true }))
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleExercise = (id: string) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.id === id ? { ...ex, selected: !ex.selected } : ex
      )
    );
  };

  const selectAllExercises = () => {
    setExercises(prev => prev.map(ex => ({ ...ex, selected: true })));
  };

  const clearAllExercises = () => {
    setExercises(prev => prev.map(ex => ({ ...ex, selected: false })));
  };

  const handleGenerateWorkout = (reps: number, sets: number) => {
    setCurrentReps(reps);
    setCurrentSets(sets);
  };

  const getSelectedExercises = () => {
    return exercises.filter(ex => ex.selected);
  };

  const spinWheel = () => {
    if (isSpinning) return;

    const selectedExercises = getSelectedExercises();
    if (selectedExercises.length === 0) {
      setMessage('Please select at least one exercise!');
      return;
    }

    setIsSpinning(true);
    setMessage('');

    // Calculate random spin result
    const randomIndex = Math.floor(Math.random() * selectedExercises.length);
    const winningExercise = selectedExercises[randomIndex];
    const degreesPerExercise = 360 / selectedExercises.length;
    const targetRotation = randomIndex * degreesPerExercise;
    
    // Add multiple rotations for better effect
    const spins = 5 + Math.floor(Math.random() * 3);
    const finalRotation = rotation + (360 * spins) + (360 - targetRotation);
    
    setRotation(finalRotation);
    setSelectedExercise(winningExercise);

    setTimeout(() => {
      setIsSpinning(false);
      displayWorkout(winningExercise);
    }, 4000);
  };

  const displayWorkout = (winningExercise: Exercise) => {
    if (winningExercise.name === 'Rest Day') {
      setMessage(`Lucky! Today is your ${winningExercise.name}! 🎉`);
    } else {
      const workoutInfo = currentReps && currentSets
        ? `${currentSets} sets × ${currentReps} reps of ${winningExercise.name}! 💪`
        : `${winningExercise.name}! 💪`;
      setMessage(`Today's workout: ${workoutInfo}`);
    }
  };

  const markAsCompleted = () => {
    if (selectedExercise && !completedWorkouts.includes(selectedExercise.name)) {
      setCompletedWorkouts([...completedWorkouts, selectedExercise.name]);
      setMessage(`Great job! You completed ${selectedExercise.name}! ✅`);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black p-8">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Workout Roulette</h1>
        <div className="relative w-96 h-96 mb-8">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            {/* Static wheel segments for SSR */}
            {allExercises.map((exercise, index) => {
              const angle = (360 / allExercises.length) * index;
              const nextAngle = (360 / allExercises.length) * (index + 1);
              const startAngle = (angle - 90) * (Math.PI / 180);
              const endAngle = (nextAngle - 90) * (Math.PI / 180);
              const largeArcFlag = nextAngle - angle > 180 ? 1 : 0;
              
              const x1 = 100 + 90 * Math.cos(startAngle);
              const y1 = 100 + 90 * Math.sin(startAngle);
              const x2 = 100 + 90 * Math.cos(endAngle);
              const y2 = 100 + 90 * Math.sin(endAngle);
              
              return (
                <path
                  key={index}
                  d={`M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={
                    exercise.color === 'red' ? '#dc2626' :
                    exercise.color === 'black' ? '#000000' : '#16a34a'
                  }
                  stroke="#92400e"
                  strokeWidth="0.5"
                />
              );
            })}
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-amber-900 rounded-full shadow-lg z-10 border-4 border-amber-800" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-yellow-400 z-20" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Sidebar
        exercises={exercises}
        onToggleExercise={toggleExercise}
        onClearAll={clearAllExercises}
        onSelectAll={selectAllExercises}
      />
      
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Workout Roulette</h1>
        
        <div className="mb-8 text-center">
          <p className="text-xl text-black dark:text-white">Completed: {completedWorkouts.length} workouts</p>
        </div>

        <div className="relative w-96 h-96 mb-8">
          <svg
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            }}
            viewBox="0 0 200 200"
          >
            {getSelectedExercises().map((exercise, index) => {
              const angle = (360 / getSelectedExercises().length) * index;
              const nextAngle = (360 / getSelectedExercises().length) * (index + 1);
              const startAngle = (angle - 90) * (Math.PI / 180);
              const endAngle = (nextAngle - 90) * (Math.PI / 180);
              const largeArcFlag = nextAngle - angle > 180 ? 1 : 0;
              
              const x1 = 100 + 90 * Math.cos(startAngle);
              const y1 = 100 + 90 * Math.sin(startAngle);
              const x2 = 100 + 90 * Math.cos(endAngle);
              const y2 = 100 + 90 * Math.sin(endAngle);
              
              // Calculate text position
              const midAngle = (startAngle + endAngle) / 2;
              const textRadius = 65;
              const textX = 100 + textRadius * Math.cos(midAngle);
              const textY = 100 + textRadius * Math.sin(midAngle);
              
              return (
                <g key={index}>
                  <path
                    d={`M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={
                      exercise.color === 'red' ? '#dc2626' :
                      exercise.color === 'black' ? '#000000' : '#16a34a'
                    }
                    stroke="#92400e"
                    strokeWidth="0.5"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="8"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${angle + (360 / getSelectedExercises().length) / 2} ${textX} ${textY})`}
                  >
                    {exercise.name.length > 12 ? exercise.name.substring(0, 10) + '...' : exercise.name}
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-amber-900 rounded-full shadow-lg z-10 border-4 border-amber-800" />
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-l-transparent border-r-transparent border-b-yellow-400 z-20" />
        </div>

        {selectedExercise && !isSpinning && (
          <div className="mb-4 text-center">
            <p className="text-lg text-black dark:text-white">Last workout: {selectedExercise.name}</p>
          </div>
        )}

        {message && (
          <div className="mb-4 text-center">
            <p className="text-lg text-black dark:text-white">{message}</p>
          </div>
        )}

        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          <div className="flex space-x-2 w-full">
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className={`flex-1 py-3 px-6 rounded-lg font-bold text-white ${
                isSpinning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSpinning ? 'Spinning...' : 'Spin for Workout'}
            </button>
            
            {selectedExercise && !isSpinning && selectedExercise.name !== 'Rest Day' && (
              <button
                onClick={markAsCompleted}
                disabled={completedWorkouts.includes(selectedExercise.name)}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-white ${
                  completedWorkouts.includes(selectedExercise.name)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {completedWorkouts.includes(selectedExercise.name) ? 'Completed ✓' : 'Mark as Done'}
              </button>
            )}
          </div>
          
          {completedWorkouts.length > 0 && (
            <div className="w-full mt-6">
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Completed Workouts:</h3>
              <div className="flex flex-wrap gap-2">
                {completedWorkouts.map((workout, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm dark:bg-green-900 dark:text-green-200">
                    {workout}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <RandomNumberGenerator
          onGenerate={handleGenerateWorkout}
          currentReps={currentReps}
          currentSets={currentSets}
        />
      </div>
    </>
  );
};

export default Roulette;