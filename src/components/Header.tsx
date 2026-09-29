import React from 'react';
import { Stethoscope, ShieldAlert, Award, Clock, User, ChevronRight } from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

interface HeaderProps {
  onOpenEvaluatorGuide: () => void;
  timerSeconds?: number;
  isTimerRunning?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEvaluatorGuide,
  timerSeconds = 0,
  isTimerRunning = false,
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Academic & Prototype Notice Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            PROTOTIPO ACADÉMICO
          </span>
          <span className="text-slate-300 font-medium">
            Ingeniería de Requisitos — Requisito EPC 28: “Asignación tratamiento nutricional”
          </span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline text-slate-400">Datos simulados con fines de validación</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Optional evaluator timer pill */}
          {timerSeconds > 0 || isTimerRunning ? (
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${
              isTimerRunning ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse' : 'bg-slate-800 text-slate-300'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>Cronómetro CA4: {formatTime(timerSeconds)}</span>
            </div>
          ) : null}

          <button
            onClick={onOpenEvaluatorGuide}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs transition-colors cursor-pointer"
            title="Ver criterios de aceptación CA1, CA2, CA3 y CA4"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Guía de Evaluación EPC 28</span>
            <ChevronRight className="w-3 h-3 opacity-80" />
          </button>
        </div>
      </div>

      {/* Main Clinical Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo & System Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-sm ring-2 ring-teal-600/20">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                Dietas al Día
              </h1>
              <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                SADC Nutrición
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Sistema de Apoyo a la Decisión Clínica — {CURRENT_USER.department}
            </p>
          </div>
        </div>

        {/* User Profile in Header */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 sm:pl-6">
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-semibold text-xs shadow-xs">
            <User className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-slate-800 leading-tight">
              {CURRENT_USER.name}
            </div>
            <div className="text-xs text-teal-700 font-medium">
              {CURRENT_USER.department}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
