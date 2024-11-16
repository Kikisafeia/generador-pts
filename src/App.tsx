import React, { useState } from 'react';
import { WorkDescriptionForm } from './components/WorkDescriptionForm';
import { TokenDisplay } from './components/TokenDisplay';
import { UserLevel } from './components/UserLevel';
import { StepIndicator } from './components/StepIndicator';
import { ProcedureDisplay } from './components/ProcedureDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import { generateProcedure } from './services/openai';
import { Hammer, ShieldCheck } from 'lucide-react';
import type { Procedure } from './types';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [procedure, setProcedure] = useState<Procedure | null>(null);
  const [user] = useState({
    tokensRemaining: 10000,
    totalTokens: 10000,
    level: 1,
    completedProcedures: 0,
  });

  const handleSubmit = async (data: { description: string }) => {
    try {
      setLoading(true);
      setError(null);
      const result = await generateProcedure(data.description);
      setProcedure({
        id: crypto.randomUUID(),
        createdAt: new Date(),
        description: data.description,
        ...result,
      });
    } catch (err) {
      setError('No se pudo generar el procedimiento. Por favor, intente nuevamente.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="h-8 w-8 text-neutral-900" />
            <Hammer className="h-8 w-8 text-neutral-900" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">
            Generador de PTS
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Crea Procedimientos de Trabajo Seguro de manera inteligente y eficiente
            con la ayuda de IA. Ingresa la descripción del trabajo y obtén
            sugerencias personalizadas.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <TokenDisplay
            tokensRemaining={user.tokensRemaining}
            totalTokens={user.totalTokens}
          />
          <UserLevel
            level={user.level}
            completedProcedures={user.completedProcedures}
          />
        </div>

        <StepIndicator currentStep={procedure ? 2 : 1} totalSteps={3} />

        <main className="max-w-2xl mx-auto">
          {error && <ErrorDisplay message={error} />}
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            {!procedure ? (
              <WorkDescriptionForm onSubmit={handleSubmit} loading={loading} />
            ) : (
              <ProcedureDisplay procedure={procedure} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;