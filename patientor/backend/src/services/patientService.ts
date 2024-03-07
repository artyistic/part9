import patientEntries from "../../data/patients";
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients : PatientEntry[] = patientEntries;

const getPatients = ():PatientEntry[] => {
  return patients;
};

const getNonSensitivePatients = ():NonSensitivePatientEntry[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};
  
const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatientById = (id: string): PatientEntry => {
  const target =  patients.find(p => p.id === id);

  if (target) {
    return target;
  }
  throw new Error("patient not found");
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById
};