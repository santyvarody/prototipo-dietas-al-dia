import React, { useState } from 'react';
import { Patient } from '../types';
import {
  Search,
  UserCheck,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Calendar,
  Activity,
  FileText,
  Sparkles,
} from 'lucide-react';

interface PatientSelectionViewProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onDirectConsultDiets: (patient: Patient) => void;
}

export const PatientSelectionView: React.FC<PatientSelectionViewProps> = ({
  patients,
  onSelectPatient,
  onDirectConsultDiets,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'ALLERGIES' | 'DEMO'>('ALL');

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.recordNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.allergies.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'ALLERGIES') {
      return patient.allergies.length > 0;
    }
    if (filterType === 'DEMO') {
      return patient.id === 'pat-001';
    }
    return true;
  });

  const demoPatient = patients.find((p) => p.id === 'pat-001');

  return (
    <div className="space-y-6">
      {/* Title & Section Intro */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Paso 1: Selección de Paciente</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Asignación de tratamiento nutricional
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Consulte y seleccione el paciente para evaluar su diagnóstico clínico y prescribir un régimen
              dietoterapéutico seguro según el catálogo y las alertas de incompatibilidad de alergias registradas (EPC 28).
            </p>
          </div>

          {/* Demonstration Shortcut Card */}
          {demoPatient && (
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-400/80 rounded-xl p-4 md:max-w-xs shrink-0 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-900 bg-teal-200/70 px-2 py-0.5 rounded">
                  Caso de Prueba Principal
                </span>
                <span className="text-xs font-mono font-bold text-teal-800">EPC 28</span>
              </div>
              <div className="font-bold text-slate-900 text-base">{demoPatient.fullName}</div>
              <div className="text-xs text-slate-700 mt-0.5">
                {demoPatient.age} años • {demoPatient.primaryDiagnosis}
              </div>
              <div className="text-xs text-rose-700 font-semibold mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Alergia registrada: {demoPatient.allergies.join(', ')}</span>
              </div>
              <button
                onClick={() => onSelectPatient(demoPatient)}
                className="mt-3 w-full inline-flex items-center justify-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <span>Ver ficha de demostración</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Patient Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar paciente por nombre, N° de expediente (HC-...), o diagnóstico..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm text-slate-800 placeholder-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todos ({patients.length})
            </button>
            <button
              onClick={() => setFilterType('DEMO')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === 'DEMO'
                  ? 'bg-teal-700 text-white'
                  : 'bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100'
              }`}
            >
              Caso Laura Martínez
            </button>
            <button
              onClick={() => setFilterType('ALLERGIES')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === 'ALLERGIES'
                  ? 'bg-rose-700 text-white'
                  : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              Con Alergias
            </button>
          </div>
        </div>
      </div>

      {/* Patient Cards List */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
          Pacientes Registrados en el Servicio ({filteredPatients.length})
        </div>

        {filteredPatients.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">No se encontraron pacientes</h3>
            <p className="text-sm text-slate-500 mt-1">
              Intente con otro término de búsqueda o limpie los filtros.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterType('ALL');
              }}
              className="mt-4 text-xs font-semibold text-teal-700 hover:underline cursor-pointer"
            >
              Restablecer búsqueda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {filteredPatients.map((patient) => {
              const isMainDemo = patient.id === 'pat-001';

              return (
                <div
                  key={patient.id}
                  className={`bg-white rounded-xl border-2 transition-all p-5 shadow-xs hover:shadow-md ${
                    isMainDemo
                      ? 'border-teal-500/80 bg-teal-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Info */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base shrink-0 ${
                          isMainDemo
                            ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {patient.fullName
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900">
                            {patient.fullName}
                          </h3>
                          {isMainDemo && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-300">
                              Caso de Estudio EPC 28
                            </span>
                          )}
                          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {patient.recordNumber}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600">
                          <span>
                            <strong className="text-slate-700">Edad:</strong> {patient.age} años ({patient.birthDate})
                          </span>
                          <span>•</span>
                          <span>
                            <strong className="text-slate-700">Sexo:</strong> {patient.gender}
                          </span>
                          <span>•</span>
                          <span>
                            <strong className="text-slate-700">Peso:</strong> {patient.weightKg} kg
                          </span>
                          <span>•</span>
                          <span>
                            <strong className="text-slate-700">Talla:</strong> {patient.heightM} m
                          </span>
                          <span>•</span>
                          <span>
                            <strong className="text-slate-700">IMC:</strong> {patient.bmi} kg/m²
                          </span>
                        </div>

                        {/* Diagnóstico */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-xs font-semibold text-slate-500">Diagnóstico:</span>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                            <Activity className="w-3 h-3 text-amber-600" />
                            {patient.primaryDiagnosis}
                          </span>
                          <span className="text-xs font-mono text-slate-400">({patient.diagnosisCode})</span>
                        </div>

                        {/* Alergias / Incompatibilidades */}
                        <div className="pt-1">
                          {patient.allergies.length > 0 ? (
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-rose-50 border border-rose-300 px-2.5 py-1 rounded-md">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                              <span>ALERGIA REGISTRADA: {patient.allergies.join(', ')}</span>
                              <span className="text-rose-600 font-normal">
                                (Incompatibilidad: {patient.incompatibilities.join(', ')})
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-500 font-medium">
                              Sin alergias alimentarias registradas
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                      <button
                        onClick={() => onSelectPatient(patient)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors cursor-pointer"
                        title="Ver ficha completa de la historia clínica"
                      >
                        <FileText className="w-4 h-4 text-slate-500" />
                        <span>Ver ficha del paciente</span>
                      </button>

                      <button
                        onClick={() => onDirectConsultDiets(patient)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                        title="Consultar dietas compatibles asociadas en un único paso (CA1)"
                      >
                        <span>Consultar dietas</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
