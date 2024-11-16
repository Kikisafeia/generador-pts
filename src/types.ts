export interface Step {
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

export interface Procedure {
  id: string;
  createdAt: Date;
  description: string;
  steps: Step[];
  risks: Risk[];
  tokensCost: number;
}