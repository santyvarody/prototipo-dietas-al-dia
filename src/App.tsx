/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Patient, Diet, PrescriptionRecord } from './types';
import { MOCK_PATIENTS, MOCK_DIETS_FOR_DIABETES, CURRENT_USER } from './data/mockData';
import { Header } from './components/Header';
import { PatientSelectionView } from './components/PatientSelectionView';
import { PatientDetailView } from './components/PatientDetailView';
import { AssociatedDietsView } from './components/AssociatedDietsView';
import { DietTechnicalSheetView } from './components/DietTechnicalSheetView';
import { ConfirmationModal } from './components/ConfirmationModal';
import { BlockedDietModal } from './components/BlockedDietModal';
import { SuccessView } from './components/SuccessView';
import { EvaluatorModal } from './components/EvaluatorModal';

type AppView =
  | 'PATIENT_SELECTION'
  | 'PATIENT_DETAIL'
  | 'ASSOCIATED_DIETS'
  | 'DIET_TECHNICAL_SHEET'
  | 'SUCCESS';

export default function App() {
  // Current active view
  const [currentView, setCurrentView] = useState<AppView>('PATIENT_SELECTION');

  // Currently selected patient (defaults to Laura Martínez Gómez)
  const [selectedPatient, setSelectedPatient] = useState<Patient>(MOCK_PATIENTS[0]);

  // Available diets for current patient
  const [availableDiets, setAvailableDiets] = useState<Diet[]>(MOCK_DIETS_FOR_DIABETES);

  // Selected diet for technical sheet inspection or confirmation
  const [selectedDiet, setSelectedDiet] = useState<Diet>(MOCK_DIETS_FOR_DIABETES[0]);

  // Modal states
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
  const [isEvaluatorModalOpen, setIsEvaluatorModalOpen] = useState(false);

  // Prescription result
  const [latestPrescription, setLatestPrescription] = useState<PrescriptionRecord | null>(null);

  // CA4 Timer functionality (for evaluators)
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isTimerRunning && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  // Flow handlers
  const handleSelectPatientForDetail = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('PATIENT_DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectConsultDiets = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('ASSOCIATED_DIETS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultCompatibleDiets = () => {
    // CA1: Single-step navigation to associated diets
    setCurrentView('ASSOCIATED_DIETS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewTechnicalSheet = (diet: Diet) => {
    // CA3: Access technical sheet with persistent patient context
    setSelectedDiet(diet);
    setCurrentView('DIET_TECHNICAL_SHEET');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDietToConfirm = (diet: Diet) => {
    if (diet.status === 'INCOMPATIBLE') {
      // CA2: Block confirmation
      setSelectedDiet(diet);
      setIsBlockedModalOpen(true);
      return;
    }
    setSelectedDiet(diet);
    setIsConfirmModalOpen(true);
  };

  const handleAttemptIncompatibleDiet = (diet: Diet) => {
    // CA2: Explictly prevent selection and show allergy alert modal
    setSelectedDiet(diet);
    setIsBlockedModalOpen(true);
  };

  const handleConfirmPrescription = () => {
    const record: PrescriptionRecord = {
      id: `RX-NUT-${Math.floor(100000 + Math.random() * 900000)}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.fullName,
      dietId: selectedDiet.id,
      dietName: selectedDiet.name,
      diagnosis: selectedPatient.primaryDiagnosis,
      calorieIntakeKcal: selectedDiet.calorieIntakeKcal,
      assignedBy: CURRENT_USER.name,
      assignedAt: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      verificationStatus: 'VERIFICADA SIN INCOMPATIBILIDADES (EPC 28)',
    };

    setLatestPrescription(record);
    setIsConfirmModalOpen(false);
    setCurrentView('SUCCESS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewAssignment = () => {
    setCurrentView('PATIENT_SELECTION');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        onOpenEvaluatorGuide={() => setIsEvaluatorModalOpen(true)}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'PATIENT_SELECTION' && (
          <PatientSelectionView
            patients={MOCK_PATIENTS}
            onSelectPatient={handleSelectPatientForDetail}
            onDirectConsultDiets={handleDirectConsultDiets}
          />
        )}

        {currentView === 'PATIENT_DETAIL' && (
          <PatientDetailView
            patient={selectedPatient}
            onBackToSelection={() => setCurrentView('PATIENT_SELECTION')}
            onConsultCompatibleDiets={handleConsultCompatibleDiets}
          />
        )}

        {currentView === 'ASSOCIATED_DIETS' && (
          <AssociatedDietsView
            patient={selectedPatient}
            diets={availableDiets}
            onBackToPatient={() => setCurrentView('PATIENT_DETAIL')}
            onViewTechnicalSheet={handleViewTechnicalSheet}
            onSelectDiet={handleSelectDietToConfirm}
            onAttemptIncompatibleDiet={handleAttemptIncompatibleDiet}
          />
        )}

        {currentView === 'DIET_TECHNICAL_SHEET' && (
          <DietTechnicalSheetView
            patient={selectedPatient}
            diet={selectedDiet}
            onBackToDiets={() => setCurrentView('ASSOCIATED_DIETS')}
            onSelectDiet={handleSelectDietToConfirm}
            onAttemptIncompatibleDiet={handleAttemptIncompatibleDiet}
          />
        )}

        {currentView === 'SUCCESS' && latestPrescription && (
          <SuccessView
            patient={selectedPatient}
            diet={selectedDiet}
            prescription={latestPrescription}
            onNewAssignment={handleNewAssignment}
            onViewDietsAgain={() => setCurrentView('ASSOCIATED_DIETS')}
          />
        )}
      </main>

      {/* Confirmation Modal for Compatible Diet */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        patient={selectedPatient}
        diet={selectedDiet}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmPrescription}
      />

      {/* Blocked Diet Modal for Incompatible Diet (CA2) */}
      <BlockedDietModal
        isOpen={isBlockedModalOpen}
        patient={selectedPatient}
        diet={selectedDiet}
        onClose={() => setIsBlockedModalOpen(false)}
      />

      {/* Academic Evaluator Guide Modal (EPC 28: CA1, CA2, CA3, CA4) */}
      <EvaluatorModal
        isOpen={isEvaluatorModalOpen}
        onClose={() => setIsEvaluatorModalOpen(false)}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        onStartTimer={handleStartTimer}
        onStopTimer={handleStopTimer}
        onResetTimer={handleResetTimer}
      />

      {/* Clinical Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <strong className="text-slate-700">Dietas al Día</strong> — Sistema de Apoyo a la Decisión Clínica
            <div className="text-[11px] text-slate-400 mt-0.5">
              Prototipo académico de Ingeniería de Requisitos • Validación EPC 28: Asignación tratamiento nutricional
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Datos simulados no destinados para uso clínico real</span>
            <button
              onClick={() => setIsEvaluatorModalOpen(true)}
              className="text-teal-700 hover:text-teal-900 font-bold underline cursor-pointer"
            >
              Matriz CA1 - CA4
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
