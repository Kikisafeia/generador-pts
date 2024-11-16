import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Procedure, Risk } from '../types';

interface ProcedureDisplayProps {
  procedure: Procedure;
}

export function ProcedureDisplay({ procedure }: ProcedureDisplayProps) {
  const getSeverityColor = (severity: Risk['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Pasos del Procedimiento</h3>
        <div className="space-y-4">
          {procedure.steps.map((step) => (
            <div key={step.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Paso {step.order}</h4>
                  <p className="text-gray-700 mb-2">{step.description}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {step.safetyMeasures.map((measure, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {measure}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Riesgos Identificados</h3>
        <div className="space-y-4">
          {procedure.risks.map((risk) => (
            <div key={risk.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 rounded-full p-2 mt-1">
                  <AlertTriangle className={`h-4 w-4 ${getSeverityColor(risk.severity)}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{risk.description}</h4>
                    <span className={`text-sm ${getSeverityColor(risk.severity)} font-medium`}>
                      {risk.severity.toUpperCase()}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    {risk.mitigationMeasures.map((measure, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {measure}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        Tokens utilizados: {procedure.tokensCost}
      </div>
    </div>
  );
}