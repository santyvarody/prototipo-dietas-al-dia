import React from 'react';
import { Patient, Diet } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Flame,
  Clock,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  Layers,
  Utensils,
  Pill,
  BookOpen,
  Activity,
  HeartPulse,
  Ban,
  Check,
} from 'lucide-react';

interface DietTechnicalSheetViewProps {
  patient: Patient;
  diet: Diet;
  onBackToDiets: () => void;
  onSelectDiet: (diet: Diet) => void;
  onAttemptIncompatibleDiet: (diet: Diet) => void;
}

export const DietTechnicalSheetView: React.FC<DietTechnicalSheetViewProps> = ({
  patient,
  diet,
  onBackToDiets,
  onSelectDiet,
  onAttemptIncompatibleDiet,
}) => {
  const isCompatible = diet.status === 'COMPATIBLE';

  return (
    <div className="space-y-6">
      {/* Top Navigation Strip */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDiets}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white px-3.5 py-2 rounded-lg border border-slate-300 shadow-xs transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>← Volver a dietas</span>
        </button>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          Criterio CA3: Ficha técnica con contexto persistente
        </span>
      </div>

      {/* Main Grid: Left/Top persistent patient context + Right/Bottom Technical Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* PERSISTENT PATIENT CONTEXT PANEL (CA3 - Lateral/Sticky Panel) */}
        <aside
          aria-label="Panel lateral persistente del paciente"
          className="lg:col-span-4 bg-white rounded-2xl border-2 border-slate-300 shadow-sm p-5 space-y-5 lg:sticky lg:top-20"
        >
          {/* Header of Context Panel */}
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Contexto Clínico del Paciente
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">CA3 Activo</span>
          </div>

          {/* Patient Identity */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              PACIENTE
            </div>
            <div className="text-xl font-extrabold text-slate-900 leading-tight">
              {patient.fullName}
            </div>
            <div className="text-xs text-slate-600 font-medium">
              {patient.age} años • {patient.gender} • HC: {patient.recordNumber}
            </div>
          </div>

          {/* Diagnosis */}
          <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-3.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-700" />
              <span>Diagnóstico Base</span>
            </div>
            <div className="text-sm font-black text-amber-950">
              {patient.primaryDiagnosis}
            </div>
            <div className="text-xs text-amber-800 font-mono mt-0.5">
              {patient.diagnosisCode}
            </div>
          </div>

          {/* CRITICAL PERSISTENT ALLERGY BOX */}
          <div className="bg-rose-50 border-2 border-rose-500 rounded-xl p-4 shadow-xs">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-black uppercase tracking-wider text-rose-900">
                  ⚠️ Alergia Registrada
                </div>
                <div className="text-base font-extrabold text-rose-950">
                  {patient.allergies.join(', ')}
                </div>
                <div className="text-xs text-rose-800 font-medium pt-1 border-t border-rose-200">
                  <strong>Incompatibilidad:</strong> {patient.incompatibilities.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Somatometry Quick Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Peso actual:</span>
              <span className="font-bold text-slate-900">{patient.weightKg} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Talla:</span>
              <span className="font-bold text-slate-900">{patient.heightM} m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">IMC:</span>
              <span className="font-bold text-slate-900">{patient.bmi} kg/m²</span>
            </div>
          </div>

          {/* Cross-Check Status with this Diet */}
          <div
            className={`p-3.5 rounded-xl border text-xs font-semibold ${
              isCompatible
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-100 border-rose-400 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1 font-bold">
              {isCompatible ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Compatibilidad Verificada</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Incompatibilidad Crítica Detectada</span>
                </>
              )}
            </div>
            <p className="text-[11px] font-normal leading-relaxed">
              {isCompatible
                ? 'Esta fórmula dietética respeta las restricciones de alérgenos registradas.'
                : 'Esta fórmula dietética contiene alérgenos que provocan conflicto de seguridad clínica con la paciente.'}
            </p>
          </div>
        </aside>

        {/* DETAILED TECHNICAL SHEET (Right Column) */}
        <main className="lg:col-span-8 bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden space-y-0">
          {/* Header of the Diet Sheet */}
          <div
            className={`p-6 sm:p-7 border-b ${
              isCompatible
                ? 'bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white'
                : 'bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 bg-white/10 px-2.5 py-1 rounded">
                Ficha Técnica Nutricional — Código: {diet.id.toUpperCase()}
              </span>

              {isCompatible ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  COMPATIBLE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white uppercase tracking-wider shadow-xs">
                  <Ban className="w-3.5 h-3.5" />
                  INCOMPATIBLE
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {diet.name}
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Indicación clínica objetivo: {diet.targetDiagnosis}
            </p>
          </div>

          {/* Incompatible Allergen Banner if applicable */}
          {!isCompatible && diet.allergenWarning && (
            <div className="bg-rose-50 border-y-2 border-rose-500 p-5">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-rose-800">
                    ⚠️ ALERTA DE ALERGIA INEQUÍVOCA
                  </div>
                  <div className="text-base font-extrabold text-rose-950 mt-0.5">
                    {diet.allergenWarning.message}
                  </div>
                  <div className="text-xs text-rose-800 font-medium mt-1">
                    Esta dieta está bloqueada administrativamente para esta paciente. No es posible su
                    asignación.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Technical Sheet Sections (Exact items requested) */}
          <div className="p-6 sm:p-7 space-y-6">
            {/* 1. Objetivos / Indicaciones */}
            <section className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span>1. Objetivos e Indicaciones Clínicas</span>
              </h2>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-800 font-medium leading-relaxed">
                {diet.objective}
              </div>
            </section>

            {/* 2. Definición Técnica */}
            <section className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-600" />
                <span>2. Definición Técnica y Macronutrientes</span>
              </h2>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-800 leading-relaxed">
                {diet.technicalDefinition}
              </div>
            </section>

            {/* 3. Aporte Calórico, Ingesta Necesaria, Vía y Duración */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5">
                <div className="text-xs text-amber-800 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>Aporte Calórico</span>
                </div>
                <div className="text-xl font-black text-amber-950 mt-1">
                  {diet.calorieIntakeKcal}{' '}
                  <span className="text-xs font-semibold text-amber-800">kcal/día</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>Duración Pautada</span>
                </div>
                <div className="text-xl font-black text-slate-900 mt-1">
                  {diet.durationDays} <span className="text-xs font-semibold text-slate-600">días</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Vía Administración</span>
                </div>
                <div className="text-base font-extrabold text-slate-900 mt-1">
                  {diet.administrationRoute.split(' ')[0]} {diet.administrationRoute.split(' ')[1] || ''}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
                  <span>Estado de Seguridad</span>
                </div>
                <div
                  className={`text-base font-black mt-1 ${
                    isCompatible ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {isCompatible ? 'Apta para paciente' : 'Bloqueada por Alergia'}
                </div>
              </div>
            </section>

            {/* 4. Componentes Básicos (Highlighting allergens) */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-600" />
                  <span>3. Componentes Básicos e Ingredientes Formulados</span>
                </h2>
                <span className="text-xs text-slate-400">Verificación ítem por ítem</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {diet.basicComponents.map((comp, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                        comp.isAllergen
                          ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      {comp.isAllergen ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      ) : (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className={comp.isAllergen ? 'font-extrabold text-rose-950 text-sm' : 'font-medium'}>
                          {comp.ingredient}
                        </div>
                        {comp.allergenNote && (
                          <div className="text-[11px] font-bold text-rose-700 mt-0.5">
                            ⚠️ {comp.allergenNote}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 5. Ingesta Necesaria */}
            <section className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
                4. Ingesta Necesaria
              </h2>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-800">
                {diet.requiredIntake}
              </div>
            </section>

            {/* 6. Dosificación y Pauta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <section className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  5. Dosificación / Fraccionamiento
                </h2>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-800 leading-relaxed h-full">
                  {diet.dosage}
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  6. Pauta Horaria e Hidratación
                </h2>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-800 leading-relaxed h-full">
                  {diet.schedule}
                </div>
              </section>
            </div>

            {/* 7. Suplementos Necesarios */}
            <section className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-600" />
                <span>7. Suplementos y Micronutrientes Necesarios</span>
              </h2>
              <div className="bg-teal-50/40 rounded-xl p-4 border border-teal-200 text-sm text-slate-800">
                {diet.requiredSupplements}
              </div>
            </section>

            {/* Action Buttons at bottom of sheet */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={onBackToDiets}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
              >
                <span>← Volver al catálogo de dietas</span>
              </button>

              {isCompatible ? (
                <button
                  onClick={() => onSelectDiet(diet)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Seleccionar esta dieta para {patient.fullName}</span>
                </button>
              ) : (
                <button
                  onClick={() => onAttemptIncompatibleDiet(diet)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 font-bold text-sm cursor-not-allowed"
                >
                  <Ban className="w-4 h-4 text-rose-600" />
                  <span>No es posible confirmar (Alérgeno detectado)</span>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
