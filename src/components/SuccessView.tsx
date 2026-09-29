import React from 'react';
import { Patient, Diet, PrescriptionRecord } from '../types';
import {
  CheckCircle2,
  Printer,
  ArrowRight,
  FileCheck,
  Calendar,
  User,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

interface SuccessViewProps {
  patient: Patient;
  diet: Diet;
  prescription: PrescriptionRecord;
  onNewAssignment: () => void;
  onViewDietsAgain: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  patient,
  diet,
  prescription,
  onNewAssignment,
  onViewDietsAgain,
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200">
      {/* SUCCESS CALLOUT HEADER REQUIRED BY SPEC */}
      <div className="bg-emerald-600 text-white rounded-2xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <span className="inline-block text-xs font-black uppercase tracking-widest bg-emerald-700/80 px-3 py-1 rounded-full text-emerald-100 mb-2">
          Asignación Exitosa — Requisito EPC 28 Cumplido
        </span>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Tratamiento nutricional seleccionado correctamente.
        </h1>

        <p className="text-emerald-100 text-sm mt-2 max-w-xl mx-auto">
          El plan terapéutico seguro ha sido registrado y asociado a la historia clínica del paciente
          sin conflictos alergénicos.
        </p>
      </div>

      {/* Official Prescription / Medical Sheet Summary */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden">
        {/* Prescription Header */}
        <div className="bg-slate-900 text-white p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <FileCheck className="w-5 h-5 text-teal-400" />
            <div>
              <div className="text-sm font-bold text-white">Orden Nutricional Oficial</div>
              <div className="text-xs text-slate-400">ID de Prescripción: {prescription.id}</div>
            </div>
          </div>

          <div className="text-right text-xs text-slate-300">
            <div>Fecha: {prescription.assignedAt}</div>
            <div className="text-teal-300 font-semibold">{prescription.verificationStatus}</div>
          </div>
        </div>

        {/* Prescription Details */}
        <div className="p-6 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Info */}
            <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Datos del Paciente
              </span>
              <div className="text-lg font-extrabold text-slate-900">{patient.fullName}</div>
              <div className="text-xs text-slate-600 space-y-1">
                <div>• Edad: {patient.age} años | Sexo: {patient.gender}</div>
                <div>• Expediente: {patient.recordNumber}</div>
                <div>• Diagnóstico: <strong className="text-slate-800">{patient.primaryDiagnosis}</strong></div>
                <div>• Alergias cotejadas: <strong className="text-emerald-700">{patient.allergies.join(', ')}</strong></div>
              </div>
            </div>

            {/* Prescribed Diet Info */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Régimen Nutricional Asignado
              </span>
              <div className="text-lg font-extrabold text-slate-900">{diet.name}</div>
              <div className="text-xs text-slate-600 space-y-1">
                <div>• Aporte: <strong className="text-slate-800">{diet.calorieIntakeKcal} kcal/día</strong></div>
                <div>• Duración: <strong className="text-slate-800">{diet.durationDays} días</strong></div>
                <div>• Vía de administración: {diet.administrationRoute}</div>
                <div>• Pauta: {diet.schedule}</div>
              </div>
            </div>
          </div>

          {/* Safety & Compliance Badge */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex items-center gap-3 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <strong>Seguridad clínica certificada:</strong> El cruce de seguridad EPC 28 valida que
              esta dieta carece de maní y derivados incompatibles.
            </div>
          </div>

          {/* Doctor Signature Block */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
            <div>
              <div>Médico Prescriptor: <strong className="text-slate-900">{CURRENT_USER.name}</strong></div>
              <div>{CURRENT_USER.role} • {CURRENT_USER.department}</div>
              <div className="text-slate-400 font-mono text-[11px] mt-0.5">Matrícula: {CURRENT_USER.license}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir orden</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onViewDietsAgain}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Volver a ver dietas asociadas</span>
          </button>

          <button
            onClick={onNewAssignment}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm shadow-md transition-colors cursor-pointer"
          >
            <span>Realizar nueva asignación de paciente</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
