import React from 'react';
import { Battery } from 'lucide-react';

interface TokenDisplayProps {
  tokensRemaining: number;
  totalTokens: number;
}

export function TokenDisplay({ tokensRemaining, totalTokens }: TokenDisplayProps) {
  const percentage = (tokensRemaining / totalTokens) * 100;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <Battery className="h-5 w-5 text-blue-600" />
        <h3 className="font-medium">Tokens Disponibles</h3>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">
        {tokensRemaining.toLocaleString()} / {totalTokens.toLocaleString()}
      </p>
    </div>
  );
}