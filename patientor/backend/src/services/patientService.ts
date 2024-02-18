import patientData from "../../data/patients";
import { NonSensitivePatientEntry, Patient } from '../types'

const getPatients = ():Patient[] => {
  return patientData;
};

const getNonSensitivePatients = ():NonSensitivePatientEntry[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}
  
const getPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient
}