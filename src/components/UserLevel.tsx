import React from 'react';
import { Trophy } from 'lucide-react';

interface UserLevelProps {
  level: number;
  completedProcedures: number;
}

export function UserLevel({ level, completedProcedures }: UserLevelProps) {
  const nextLevel = level + 1;
  const proceduresForNextLevel = level * 5;
  const progress = (completedProcedures / proceduresForNextLevel) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="h-5 w-5 text-yellow-500" />
        <h3 className="font-medium">Nivel {level}</h3>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-yellow-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">
        {completedProcedures} / {proceduresForNextLevel} para nivel {nextLevel}
      </p>
    </div>
  );
}