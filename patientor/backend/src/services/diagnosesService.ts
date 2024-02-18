import data from "../../data/diagnoses";
import { Diagnosis} from '../types'

const getDiagnoses = ():Diagnosis[] => {
  return data;
};
  
const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses
}