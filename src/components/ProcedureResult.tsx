import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import type { ProcedureStep, Risk } from '../types';

interface ProcedureResultProps {
  steps: ProcedureStep[];
  risks: Risk[];
  tokensCost: number;
}

export function ProcedureResult({ steps, risks, tokensCost }: ProcedureResultProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Pasos del Procedimiento
        </h3>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium mb-2">
                {step.order}. {step.description}
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {step.safetyMeasures.map((measure, index) => (
                  <li key={index}>{measure}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Riesgos Identificados
        </h3>
        <div className="space-y-4">
          {risks.map((risk) => (
            <div key={risk.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{risk.description}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  risk.severity === 'high' ? 'bg-red-100 text-red-700' :
                  risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {risk.severity}
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {risk.mitigationMeasures.map((measure, index) => (
                  <li key={index}>{measure}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500 text-right">
        Tokens utilizados: {tokensCost}
      </div>
    </div>
  );
}