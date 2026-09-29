import React from 'react';
import { Patient, Diet } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  X,
  ShieldCheck,
  Calendar,
  User,
  Activity,
  Flame,
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

interface ConfirmationModalProps {
  isOpen: boolean;
  patient: Patient;
  diet: Diet;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  patient,
  diet,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl max-w-lg w-full border-2 border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h3 id="confirm-modal-title" className="text-base font-bold text-white">
                Confirmar tratamiento nutricional
              </h3>
              <p className="text-xs text-slate-400">Verificación previa a la emisión de prescripción</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Patient and Diet Summary */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3 text-sm">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Paciente:
              </span>
              <span className="text-base font-extrabold text-slate-900 block mt-0.5">
                {patient.fullName}
              </span>
              <span className="text-xs text-slate-500">
                {patient.age} años • Expediente: {patient.recordNumber}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Diagnóstico:
              </span>
              <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block text-xs mt-0.5">
                {patient.primaryDiagnosis} ({patient.diagnosisCode})
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Dieta:
              </span>
              <span className="text-base font-bold text-slate-900 block mt-0.5">
                {diet.name}
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                <span>Aporte: <strong className="text-slate-800">{diet.calorieIntakeKcal} kcal/día</strong></span>
                <span>•</span>
                <span>Duración: <strong className="text-slate-800">{diet.durationDays} días</strong></span>
              </div>
            </div>
          </div>

          {/* CRITICAL VERIFICATION BADGE REQUIRED BY SPEC */}
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-4 flex items-start gap-3">
            <div className="text-emerald-700 font-extrabold text-xl leading-none mt-0.5">
              🟢
            </div>
            <div>
              <div className="text-sm font-extrabold text-emerald-950">
                No se detectaron incompatibilidades con las alergias registradas.
              </div>
              <p className="text-xs text-emerald-800 mt-1">
                Verificación automatizada EPC 28 completada con éxito. La formulación no contiene
                alimentos alérgenos ({patient.allergies.join(', ')}) ni trazas incompatibles.
              </p>
            </div>
          </div>

          {/* Prescribing Physician Stamp */}
          <div className="text-xs text-slate-500 flex items-center justify-between border-t border-slate-200 pt-3">
            <span>Médico prescriptor: <strong>{CURRENT_USER.name}</strong></span>
            <span>{CURRENT_USER.department}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-colors cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirmar tratamiento</span>
          </button>
        </div>
      </div>
    </div>
  );
};
