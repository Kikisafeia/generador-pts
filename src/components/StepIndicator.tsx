import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    'Descripción del trabajo',
    'Generación del procedimiento',
    'Revisión y ajustes',
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index + 1 <= currentStep ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {index + 1 <= currentStep ? (
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <p className={`mt-2 text-sm ${
                index + 1 === currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>
                {step}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 ${
                index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}