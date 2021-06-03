export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk,
  HighRisk,
  CriticalRisk
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HosipitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HosipitalEntry;

export type NewEntry = Omit<HealthCheckEntry, "id"> | Omit<OccupationalHealthcareEntry, "id"> | Omit<HosipitalEntry, "id">;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth?: string,
  ssn?: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type NewPatient = Omit<Patient, "id" | "entries">;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
