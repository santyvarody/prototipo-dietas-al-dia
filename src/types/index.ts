export interface Patient {
  id: string;
  recordNumber: string;
  fullName: string;
  age: number;
  birthDate: string;
  gender: 'Femenino' | 'Masculino' | 'Otro';
  weightKg: number;
  heightM: number;
  bmi: number;
  primaryDiagnosis: string;
  diagnosisCode: string;
  secondaryDiagnoses: string[];
  allergies: string[];
  incompatibilities: string[];
  familyHistory: string[];
  registeredDiseases: string[];
  clinicalObservations?: string;
}

export interface Diet {
  id: string;
  name: string;
  status: 'COMPATIBLE' | 'INCOMPATIBLE';
  targetDiagnosis: string;
  calorieIntakeKcal: number;
  durationDays: number;
  objective: string;
  technicalDefinition: string;
  basicComponents: {
    ingredient: string;
    isAllergen?: boolean;
    allergenNote?: string;
  }[];
  requiredIntake: string;
  administrationRoute: string;
  dosage: string;
  schedule: string;
  requiredSupplements: string;
  allergenWarning?: {
    detectedAllergen: string;
    message: string;
  };
}

export interface PrescriptionRecord {
  id: string;
  patientId: string;
  patientName: string;
  dietId: string;
  dietName: string;
  diagnosis: string;
  calorieIntakeKcal: number;
  assignedBy: string;
  assignedAt: string;
  verificationStatus: string;
}
