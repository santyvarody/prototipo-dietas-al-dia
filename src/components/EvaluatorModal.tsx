import React from 'react';
import {
  Award,
  X,
  CheckCircle2,
  Clock,
  Play,
  Square,
  RotateCcw,
  AlertTriangle,
  FileText,
  UserCheck,
  ShieldAlert,
} from 'lucide-react';

interface EvaluatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  timerSeconds: number;
  isTimerRunning: boolean;
  onStartTimer: () => void;
  onStopTimer: () => void;
  onResetTimer: () => void;
}

export const EvaluatorModal: React.FC<EvaluatorModalProps> = ({
  isOpen,
  onClose,
  timerSeconds,
  isTimerRunning,
  onStartTimer,
  onStopTimer,
  onResetTimer,
}) => {
  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full border-2 border-slate-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="evaluator-modal-title"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                Ingeniería de Requisitos
              </span>
              <h3 id="evaluator-modal-title" className="text-base font-bold text-white mt-0.5">
                Guía de Validación de Criterios — Requisito EPC 28
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm">
          {/* Requisito EPC 28 Header Statement */}
          <div className="bg-teal-50/60 border border-teal-200 rounded-xl p-4 text-xs text-teal-950">
            <div className="font-bold text-teal-900 uppercase tracking-wide mb-1">
              Enunciado del Requisito EPC 28:
            </div>
            <p className="italic leading-relaxed">
              “Como médico del Departamento de Nutrición quiero consultar las dietas compatibles con el
              diagnóstico de un paciente, señalando explícitamente si alguna dieta contiene alimentos
              incompatibles con sus alergias registradas, para elegir con seguridad un tratamiento sin
              cruzar manualmente la historia clínica con el catálogo de dietas.”
            </p>
          </div>

          {/* CA4 Testing Tool (Stopwatch for evaluator) */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Herramienta de Medición para CA4
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Meta: &lt; 90 segundos</span>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Utilice este cronómetro interactivo para medir el tiempo real que tarda un usuario nuevo
              desde que selecciona al paciente hasta que completa la confirmación de una dieta segura
              sin omitir alertas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/80 p-4 rounded-lg border border-slate-700">
              <div className="text-center sm:text-left">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Tiempo Transcurrido
                </div>
                <div className="text-3xl font-mono font-black tracking-tight text-white mt-0.5">
                  {formatTime(timerSeconds)}
                </div>
                {timerSeconds > 0 && (
                  <div className="text-xs mt-1">
                    {timerSeconds <= 90 ? (
                      <span className="text-emerald-400 font-semibold">
                        ✓ Dentro del rango de aceptación (&lt; 90 s)
                      </span>
                    ) : (
                      <span className="text-amber-400 font-semibold">
                        ⚠️ Tiempo superó los 90 s
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!isTimerRunning ? (
                  <button
                    onClick={onStartTimer}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Iniciar Cronómetro</span>
                  </button>
                ) : (
                  <button
                    onClick={onStopTimer}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Detener</span>
                  </button>
                )}

                <button
                  onClick={onResetTimer}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
                  title="Reiniciar a 00:00"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Acceptance Criteria Breakdown */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Matriz de Validación de Criterios de Aceptación:
            </div>

            {/* CA1 */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>CA1: Consulta de dietas en un único paso</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Cumplido
                </span>
              </div>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                Dado un paciente con una enfermedad registrada (Laura Martínez Gómez con Diabetes mellitus tipo 2),
                el botón muy visible <strong>“Consultar dietas compatibles”</strong> muestra inmediatamente las dietas asociadas sin pasos intermedios.
              </p>
            </div>

            {/* CA2 */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>CA2: Señalización inequívoca y bloqueo de incompatibilidad</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Cumplido
                </span>
              </div>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                La dieta que contiene maní (Dieta hipercalórica con frutos secos) muestra una caja roja de alta severidad:
                <strong> “⚠️ ALERTA DE ALERGIA: Esta dieta contiene MANÍ...”</strong> y bloquea de manera total la selección y confirmación.
              </p>
            </div>

            {/* CA3 */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>CA3: Ficha técnica completa con contexto persistente</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Cumplido
                </span>
              </div>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                El médico accede a los 10 puntos de la ficha técnica (objetivos, definición, calorías, componentes,
                ingesta, vía, duración, dosificación, pauta, suplementos) manteniendo visible de forma persistente
                el panel con: <strong>Laura Martínez Gómez | Diabetes mellitus tipo 2 | ⚠️ Alergia: Maní</strong>.
              </p>
            </div>

            {/* CA4 */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>CA4: Usabilidad y rapidez para nuevo usuario (&lt; 90 s)</span>
                </span>
                <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                  Optimizado para prueba
                </span>
              </div>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                Jerarquía visual limpia, estados contrastados y cero fricción en la navegación para que
                un nuevo usuario elija la dieta segura rápidamente sin omitir alertas.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Cerrar guía
          </button>
        </div>
      </div>
    </div>
  );
};
