import React from 'react';
import { Patient } from '../types';
import { AlertTriangle, User, Activity, Scale, ShieldAlert, Sparkles } from 'lucide-react';

interface PatientContextBannerProps {
  patient: Patient;
  compact?: boolean;
  onViewRecord?: () => void;
}

export const PatientContextBanner: React.FC<PatientContextBannerProps> = ({
  patient,
  compact = false,
  onViewRecord,
}) => {
  const hasPeanutAllergy = patient.allergies.some((a) =>
    a.toLowerCase().includes('maní') || a.toLowerCase().includes('cacahuate')
  );

  return (
    <aside
      aria-label="Contexto persistente del paciente"
      className="bg-white rounded-xl border-2 border-slate-200 shadow-sm overflow-hidden mb-6"
    >
      <div className="bg-slate-900 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400"></span>
          <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-300">
            Contexto del Paciente Activo (CA3: Persistencia en Consulta)
          </span>
        </div>
        <div className="text-slate-400 font-mono text-[11px]">
          Expediente: <span className="text-slate-200 font-semibold">{patient.recordNumber}</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Main Patient Identity */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 font-bold text-base shrink-0 shadow-xs">
              {patient.fullName
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  {patient.fullName}
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  {patient.age} años ({patient.birthDate})
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  {patient.gender}
                </span>
              </div>

              {/* Diagnosis line */}
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-sm">
                <span className="text-slate-500 font-medium">Diagnóstico registrado:</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-slate-900 bg-amber-50 text-amber-950 px-2.5 py-0.5 rounded border border-amber-200">
                  <Activity className="w-3.5 h-3.5 text-amber-600" />
                  {patient.primaryDiagnosis}
                </span>
                <span className="text-xs font-mono text-slate-400">({patient.diagnosisCode})</span>
              </div>
            </div>
          </div>

          {/* Right Side: Biometrics & CRITICAL ALLERGY ALERT */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Biometrics */}
            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex items-center gap-4 text-xs">
              <div>
                <div className="text-slate-400 font-medium">Peso / Talla</div>
                <div className="font-semibold text-slate-800">
                  {patient.weightKg} kg / {patient.heightM} m
                </div>
              </div>
              <div className="h-6 w-px bg-slate-200"></div>
              <div>
                <div className="text-slate-400 font-medium">IMC</div>
                <div className="font-bold text-slate-900">
                  {patient.bmi} <span className="font-normal text-slate-500 text-[10px]">kg/m²</span>
                </div>
              </div>
            </div>

            {/* CRITICAL ALLERGY BADGE */}
            {patient.allergies.length > 0 ? (
              <div className="bg-rose-50 border-2 border-rose-400/80 rounded-lg px-3.5 py-2 flex items-center gap-2.5 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-rose-800 uppercase tracking-wide">
                    ⚠️ Alergia Registrada
                  </div>
                  <div className="text-sm font-extrabold text-rose-950">
                    {patient.allergies.join(', ')}
                  </div>
                  <div className="text-[11px] font-medium text-rose-700">
                    Incompatibilidad: {patient.incompatibilities.join(', ')}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-emerald-800">
                <span>Sin alergias alimentarias registradas</span>
              </div>
            )}

            {onViewRecord && (
              <button
                onClick={onViewRecord}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 underline underline-offset-2 ml-1 cursor-pointer"
              >
                Ver historia clínica completa
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
