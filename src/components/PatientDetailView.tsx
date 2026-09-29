import React from 'react';
import { Patient } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Activity,
  Heart,
  FileSpreadsheet,
  Calendar,
  Scale,
  Ruler,
  Dna,
  ShieldAlert,
  ClipboardList,
  Sparkles,
} from 'lucide-react';

interface PatientDetailViewProps {
  patient: Patient;
  onBackToSelection: () => void;
  onConsultCompatibleDiets: () => void;
}

export const PatientDetailView: React.FC<PatientDetailViewProps> = ({
  patient,
  onBackToSelection,
  onConsultCompatibleDiets,
}) => {
  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToSelection}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver al buscador de pacientes</span>
        </button>

        <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded border border-slate-200">
          N° Expediente: {patient.recordNumber}
        </span>
      </div>

      {/* Main Patient Card Banner */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden">
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white p-6 sm:p-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border-2 border-teal-400/40 text-teal-300 font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-inner">
                {patient.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {patient.fullName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-400/20 text-teal-200 border border-teal-400/30">
                    {patient.age} años
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-200">
                    {patient.gender}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300 mt-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    Fecha de nacimiento: <strong className="text-white">{patient.birthDate}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Servicio: <strong className="text-white">Nutrición Clínica y Dietética</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* CA1 KEY ACTION BUTTON - High Visibility Callout */}
            <div className="shrink-0 bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20">
              <div className="text-[11px] font-semibold text-teal-200 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                Requisito EPC 28 — Criterio CA1
              </div>
              <button
                onClick={onConsultCompatibleDiets}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-bold text-base transition-all shadow-lg hover:shadow-teal-500/25 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Consultar dietas compatibles</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
              <div className="text-[11px] text-center text-slate-300 mt-1">
                Consulta en un único paso con filtro de alergias
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Grid Details */}
        <div className="p-6 sm:p-7 space-y-6">
          {/* Diagnostic & Allergy Warning Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Registered Diagnosis */}
            <div className="bg-amber-50/60 rounded-xl border-2 border-amber-200 p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                <Activity className="w-4 h-4 text-amber-700" />
                <span>Diagnóstico Principal Registrado</span>
              </div>
              <div className="text-xl font-extrabold text-amber-950">
                {patient.primaryDiagnosis}
              </div>
              <div className="text-xs font-mono text-amber-800 font-semibold mt-1">
                Código: {patient.diagnosisCode}
              </div>
              <p className="text-xs text-amber-900/80 mt-2">
                Diagnóstico de base utilizado como criterio principal para la búsqueda de dietas
                prediseñadas en el catálogo.
              </p>
            </div>

            {/* CRITICAL ALLERGIES & INCOMPATIBILITIES */}
            <div className="bg-rose-50 rounded-xl border-2 border-rose-400 p-5 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-rose-900 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Alergias e Incompatibilidades (Alerta Crítica)</span>
                </div>
                <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Filtro EPC 28
                </span>
              </div>

              {patient.allergies.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-rose-950">Alergia confirmada:</span>
                    <span className="px-3 py-1 bg-rose-600 text-white font-extrabold text-sm rounded-md shadow-xs flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {patient.allergies.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-900">Incompatibilidad de alimentos:</span>
                    <div className="text-sm font-semibold text-rose-950 mt-0.5">
                      {patient.incompatibilities.join(' • ')}
                    </div>
                  </div>
                  <div className="text-xs text-rose-800 bg-rose-100/70 p-2 rounded border border-rose-300 font-medium">
                    ⚠️ El sistema cruzará automáticamente este alérgeno frente al catálogo de dietas
                    para prevenir shock o reacción alérgica grave.
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-600">
                  No se registran antecedentes de anafilaxia ni alergias alimentarias.
                </div>
              )}
            </div>
          </div>

          {/* Somatometry / Physical Measurements */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <Scale className="w-4 h-4 text-slate-600" />
              <span>Somatometría y Estado Nutricional</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
                <div className="text-xs text-slate-500 font-medium">Peso Actual</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {patient.weightKg} <span className="text-sm font-normal text-slate-500">kg</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
                <div className="text-xs text-slate-500 font-medium">Talla / Estatura</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {patient.heightM} <span className="text-sm font-normal text-slate-500">m</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
                <div className="text-xs text-slate-500 font-medium">Índice Masa Corporal (IMC)</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {patient.bmi} <span className="text-sm font-normal text-slate-500">kg/m²</span>
                </div>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  Sobrepeso leve
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
                <div className="text-xs text-slate-500 font-medium">Diagnósticos Secundarios</div>
                <div className="text-xs text-slate-700 font-medium mt-1.5 space-y-1">
                  {patient.secondaryDiagnoses.map((sec, idx) => (
                    <div key={idx} className="truncate" title={sec}>
                      • {sec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Family History & Registered Pathologies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <Dna className="w-4 h-4 text-teal-600" />
                <span>Antecedentes Familiares</span>
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {patient.familyHistory.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-teal-600" />
                <span>Enfermedades y Condiciones Registradas</span>
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {patient.registeredDiseases.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Confirmation Action Banner */}
          <div className="bg-slate-50 rounded-xl border-2 border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-slate-600 text-sm text-center sm:text-left">
              ¿Listo para consultar las dietas asociadas a{' '}
              <strong className="text-slate-900">{patient.fullName}</strong>?
              <div className="text-xs text-slate-500 mt-0.5">
                Se contrastará la lista de componentes frente a su alergia a{' '}
                <strong className="text-rose-700">{patient.allergies.join(', ')}</strong>.
              </div>
            </div>

            <button
              onClick={onConsultCompatibleDiets}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md transition-colors cursor-pointer shrink-0"
            >
              <span>Consultar dietas compatibles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
