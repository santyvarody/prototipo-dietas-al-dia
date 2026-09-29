import React from 'react';
import { Patient, Diet } from '../types';
import { AlertTriangle, X, Ban, ShieldAlert } from 'lucide-react';

interface BlockedDietModalProps {
  isOpen: boolean;
  patient: Patient;
  diet: Diet;
  onClose: () => void;
}

export const BlockedDietModal: React.FC<BlockedDietModalProps> = ({
  isOpen,
  patient,
  diet,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl max-w-lg w-full border-4 border-rose-600 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="blocked-modal-title"
      >
        {/* Modal Red Alert Header */}
        <div className="bg-rose-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-rose-600 flex items-center justify-center font-bold">
              <Ban className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <span className="text-[11px] font-black tracking-widest uppercase bg-rose-700 px-2 py-0.5 rounded text-rose-100">
                BLOQUEO DE SEGURIDAD CLÍNICA
              </span>
              <h3 id="blocked-modal-title" className="text-lg font-black text-white leading-tight mt-0.5">
                Acción Denegada por Incompatibilidad
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-rose-200 hover:text-white hover:bg-rose-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Main Error Callout Required verbatim by specification */}
          <div className="bg-rose-50 border-2 border-rose-400 rounded-xl p-5">
            <div className="flex items-start gap-3.5">
              <AlertTriangle className="w-7 h-7 text-rose-600 shrink-0 mt-0.5 stroke-[2.5]" />
              <div className="space-y-2">
                <h4 className="text-base font-black text-rose-950 leading-tight">
                  ⚠️ No es posible confirmar esta dieta.
                </h4>
                <p className="text-sm font-extrabold text-rose-900 leading-snug">
                  La dieta contiene un alimento incompatible con las alergias registradas del paciente.
                </p>
              </div>
            </div>
          </div>

          {/* Details breakdown */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Paciente:</span>
              <span className="font-bold text-slate-800">{patient.fullName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Alergia registrada:</span>
              <span className="font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                {patient.allergies.join(', ')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Dieta rechazada:</span>
              <span className="font-bold text-slate-800">{diet.name}</span>
            </div>
            <div className="flex justify-between items-start pt-1 border-t border-slate-200">
              <span className="text-slate-500 font-medium">Componente conflictivo:</span>
              <span className="font-bold text-rose-900 text-right">
                {diet.allergenWarning?.detectedAllergen || 'Maní / Cacahuates'}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-slate-100 p-3 rounded-lg border border-slate-200 leading-relaxed">
            <strong>Protección EPC 28:</strong> El sistema previene errores humanos y no permite bajo
            ninguna circunstancia forzar la confirmación de una dieta con incompatibilidad directa.
            Por favor, seleccione una dieta con estado <span className="text-emerald-700 font-bold">Compatible</span>.
          </div>
        </div>

        {/* Modal Action */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
          >
            Entendido, volver a dietas compatibles
          </button>
        </div>
      </div>
    </div>
  );
};
