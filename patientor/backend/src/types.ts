export enum Gender{
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type Diagnosis = {
  code: string,
  name: string,
  latin?: string 
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type PatientEntry = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
};


export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

// no entries for now
export type NewPatientEntry = Omit<PatientEntry, 'id' | 'entries'>;