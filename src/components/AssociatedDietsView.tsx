import React, { useState } from 'react';
import { Patient, Diet } from '../types';
import { PatientContextBanner } from './PatientContextBanner';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  ArrowRight,
  Flame,
  Clock,
  Ban,
  ShieldCheck,
  ShieldAlert,
  Info,
  ChevronLeft,
} from 'lucide-react';

interface AssociatedDietsViewProps {
  patient: Patient;
  diets: Diet[];
  onBackToPatient: () => void;
  onViewTechnicalSheet: (diet: Diet) => void;
  onSelectDiet: (diet: Diet) => void;
  onAttemptIncompatibleDiet: (diet: Diet) => void;
}

export const AssociatedDietsView: React.FC<AssociatedDietsViewProps> = ({
  patient,
  diets,
  onBackToPatient,
  onViewTechnicalSheet,
  onSelectDiet,
  onAttemptIncompatibleDiet,
}) => {
  const [filterState, setFilterState] = useState<'ALL' | 'COMPATIBLE' | 'INCOMPATIBLE'>('ALL');

  const filteredDiets = diets.filter((diet) => {
    if (filterState === 'COMPATIBLE') return diet.status === 'COMPATIBLE';
    if (filterState === 'INCOMPATIBLE') return diet.status === 'INCOMPATIBLE';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToPatient}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver a la ficha de {patient.fullName}</span>
        </button>

        <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
          Requisito EPC 28 — Catálogo Asociado
        </span>
      </div>

      {/* Persistent Patient Context Banner (Mandatory requirement & CA3) */}
      <PatientContextBanner patient={patient} onViewRecord={onBackToPatient} />

      {/* Screen Title & Automation Notice */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Cruce Automático EPC 28
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">
                Diagnóstico: <strong className="text-slate-800">{patient.primaryDiagnosis}</strong>
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Dietas asociadas al diagnóstico
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-3xl">
              El sistema ha cruzado automáticamente el catálogo de dietas con el diagnóstico de la
              paciente y las <strong className="text-slate-900">alergias e incompatibilidades registradas ({patient.allergies.join(', ')})</strong>.
              Las dietas con componentes alérgenos son marcadas de forma inequívoca y bloqueadas.
            </p>
          </div>

          {/* Quick Filter */}
          <div className="flex items-center gap-1.5 shrink-0 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setFilterState('ALL')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filterState === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({diets.length})
            </button>
            <button
              onClick={() => setFilterState('COMPATIBLE')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filterState === 'COMPATIBLE'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Compatibles ({diets.filter((d) => d.status === 'COMPATIBLE').length})
            </button>
            <button
              onClick={() => setFilterState('INCOMPATIBLE')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filterState === 'INCOMPATIBLE'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              Incompatibles ({diets.filter((d) => d.status === 'INCOMPATIBLE').length})
            </button>
          </div>
        </div>
      </div>

      {/* Diets Cards Grid / List */}
      <div className="space-y-5">
        {filteredDiets.map((diet) => {
          const isCompatible = diet.status === 'COMPATIBLE';

          return (
            <div
              key={diet.id}
              className={`rounded-2xl border-2 transition-all overflow-hidden shadow-sm ${
                isCompatible
                  ? 'bg-white border-emerald-500/80 hover:border-emerald-600 ring-1 ring-emerald-500/20'
                  : 'bg-white border-rose-500/90 ring-2 ring-rose-500/30'
              }`}
            >
              {/* Card Status Strip */}
              <div
                className={`px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b text-xs font-bold uppercase tracking-wider ${
                  isCompatible
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-100 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCompatible ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Estado: COMPATIBLE — Apta para prescripción</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-700" />
                      <span className="text-rose-950 font-black">
                        Estado: INCOMPATIBLE — BLOQUEO POR RIESGO DE ALERGIA
                      </span>
                    </>
                  )}
                </div>

                <div className="text-[11px] font-mono normal-case tracking-normal">
                  {isCompatible ? (
                    <span className="text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                      ✓ Sin alérgenos detectados
                    </span>
                  ) : (
                    <span className="text-rose-950 font-bold bg-rose-200/90 px-2 py-0.5 rounded border border-rose-300">
                      ⚠️ Contiene alérgeno registrado: {diet.allergenWarning?.detectedAllergen}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Main Body */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left: Diet Info */}
                  <div className="space-y-4 flex-1">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                          {diet.name}
                        </h3>

                        {/* Visual Badge Status */}
                        {isCompatible ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                            Compatible
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white uppercase tracking-wider shadow-xs">
                            <Ban className="w-3.5 h-3.5" />
                            INCOMPATIBLE
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-700 mt-2 font-medium">
                        <strong className="text-slate-900">Objetivo:</strong> {diet.objective}
                      </p>
                    </div>

                    {/* Calorie & Duration Metrics */}
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                        <Flame className="w-4 h-4 text-amber-500" />
                        <div>
                          <span className="text-slate-500 font-medium">Aporte calórico: </span>
                          <strong className="text-slate-900 text-sm">
                            {diet.calorieIntakeKcal} kcal/día
                          </strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                        <Clock className="w-4 h-4 text-teal-600" />
                        <div>
                          <span className="text-slate-500 font-medium">Duración pautada: </span>
                          <strong className="text-slate-900 text-sm">
                            {diet.durationDays} días
                          </strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        <div>
                          <span className="text-slate-500 font-medium">Vía: </span>
                          <strong className="text-slate-900 text-sm">
                            {diet.administrationRoute.split(' ')[0]} {diet.administrationRoute.split(' ')[1] || ''}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* CA2: CRITICAL ALLERGEN WARNING BOX (Must be impossible to confuse with a simple recommendation) */}
                    {!isCompatible && diet.allergenWarning && (
                      <div
                        role="alert"
                        aria-live="assertive"
                        className="bg-rose-50 border-4 border-rose-600 rounded-xl p-5 shadow-md animate-in fade-in"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                            <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
                          </div>
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black tracking-widest text-rose-800 bg-rose-200/90 px-2.5 py-0.5 rounded uppercase">
                                ALERTA DE ALERGIA CRÍTICA
                              </span>
                              <span className="text-xs font-bold text-rose-700">
                                Requisito EPC 28 — Criterio CA2
                              </span>
                            </div>

                            <h4 className="text-lg font-black text-rose-950 leading-tight">
                              ⚠️ ALERTA DE ALERGIA
                            </h4>

                            <p className="text-base font-extrabold text-rose-900 leading-snug">
                              {diet.allergenWarning.message}
                            </p>

                            <p className="text-xs font-semibold text-rose-800 mt-2 bg-white/70 p-2.5 rounded-lg border border-rose-300">
                              🛑 <strong>Acción Bloqueada:</strong> El sistema de apoyo a la decisión clínica
                              inhabilita estrictamente la prescripción y confirmación de este tratamiento para
                              prevenir shock anafiláctico u otra respuesta adversa severa.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Safe Diet Assurance */}
                    {isCompatible && (
                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 flex items-center gap-2.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          <strong>Verificación alergológica satisfactoria:</strong> Esta formulación no
                          incluye maní ni derivados cacahuateros. Compatible con el diagnóstico de{' '}
                          {patient.primaryDiagnosis}.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right: Actions Column */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 shrink-0 lg:w-56 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                    <button
                      onClick={() => onViewTechnicalSheet(diet)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm transition-colors cursor-pointer shadow-xs"
                      title="Acceder a la ficha técnica completa de la dieta sin perder el contexto del paciente"
                    >
                      <FileText className="w-4 h-4 text-slate-600" />
                      <span>Ver ficha técnica</span>
                    </button>

                    {isCompatible ? (
                      <button
                        onClick={() => onSelectDiet(diet)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
                        title="Seleccionar dieta compatible para confirmar tratamiento"
                      >
                        <span>Seleccionar dieta</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="space-y-1.5">
                        <button
                          onClick={() => onAttemptIncompatibleDiet(diet)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-200 text-slate-400 font-bold text-sm cursor-not-allowed opacity-80 border border-slate-300"
                          title="No permitida: contiene alérgenos incompatibles con la paciente"
                        >
                          <Ban className="w-4 h-4 text-rose-600" />
                          <span>Selección bloqueada</span>
                        </button>
                        <div className="text-[10px] text-center text-rose-800 font-bold leading-tight">
                          No seleccionable por riesgo de alergia
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
