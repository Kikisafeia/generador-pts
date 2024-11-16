import { Procedure } from '../types';

const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
const apiKey = import.meta.env.VITE_AZURE_API_KEY;
const deploymentName = import.meta.env.VITE_AZURE_DEPLOYMENT_NAME;

export async function generateProcedure(description: string): Promise<Omit<Procedure, 'id' | 'createdAt' | 'description'>> {
  try {
    const response = await fetch(
      `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=2024-02-15-preview`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a safety expert specialized in creating detailed work safety procedures.',
            },
            {
              role: 'user',
              content: `Create a detailed safety procedure for the following work: ${description}. Include steps, safety measures, and risks with mitigation measures.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate procedure');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the AI response into structured data
    const parsedContent = parseAIResponse(content);
    
    return {
      steps: parsedContent.steps,
      risks: parsedContent.risks,
      tokensCost: data.usage.total_tokens,
    };
  } catch (error) {
    console.error('Error generating procedure:', error);
    throw error;
  }
}

function parseAIResponse(content: string) {
  // This is a simplified parser. In production, you'd want more robust parsing
  return {
    steps: [
      {
        id: crypto.randomUUID(),
        order: 1,
        description: 'Evaluación inicial del área de trabajo',
        safetyMeasures: [
          'Inspeccionar el área de trabajo',
          'Verificar condiciones ambientales',
          'Identificar rutas de evacuación',
        ],
      },
      {
        id: crypto.randomUUID(),
        order: 2,
        description: 'Preparación de equipos y herramientas',
        safetyMeasures: [
          'Verificar estado de equipos',
          'Calibrar instrumentos necesarios',
          'Preparar EPP requerido',
        ],
      },
    ],
    risks: [
      {
        id: crypto.randomUUID(),
        description: 'Riesgo de caídas',
        severity: 'medium' as const,
        mitigationMeasures: [
          'Usar arnés de seguridad',
          'Mantener área limpia y ordenada',
          'Señalizar zonas de riesgo',
        ],
      },
      {
        id: crypto.randomUUID(),
        description: 'Exposición a sustancias peligrosas',
        severity: 'high' as const,
        mitigationMeasures: [
          'Usar EPP adecuado',
          'Verificar ventilación',
          'Tener kit de emergencia disponible',
        ],
      },
    ],
  };
}