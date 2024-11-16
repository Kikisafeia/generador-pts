import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ClipboardList, Loader2 } from 'lucide-react';

interface WorkDescriptionFormProps {
  onSubmit: (data: { description: string }) => void;
  loading?: boolean;
}

export function WorkDescriptionForm({ onSubmit, loading }: WorkDescriptionFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<{ description: string }>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Descripción del Trabajo
        </label>
        <Textarea
          id="description"
          placeholder="Describe detalladamente el trabajo a realizar..."
          {...register('description', { 
            required: 'Este campo es requerido',
            minLength: { 
              value: 20, 
              message: 'La descripción debe tener al menos 20 caracteres' 
            }
          })}
          className="min-h-[150px]"
          disabled={loading}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <ClipboardList className="mr-2 h-4 w-4" />
        )}
        {loading ? 'Generando...' : 'Generar Sugerencias'}
      </Button>
    </form>
  );
}