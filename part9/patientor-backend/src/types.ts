export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
