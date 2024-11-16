export interface User {
  id: string;
  tokensRemaining: number;
  completedProcedures: number;
  level: number;
}

export interface Procedure {
  id: string;
  title: string;
  description: string;
  steps: ProcedureStep[];
  risks: Risk[];
  tokensCost: number;
  createdAt: string;
}

export interface ProcedureStep {
  id: string;
  order: number;
  description: string;
  safetyMeasures: string[];
}

export interface Risk {
  id: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  mitigationMeasures: string[];
}

export interface UserProgress {
  currentStep: number;
  stepsCompleted: number;
  tokensUsed: number;
}