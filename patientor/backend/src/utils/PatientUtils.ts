import { Gender, NewPatientEntry } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseStringParam = (param: unknown, paramName: string): string => {
  if (!isString(param)) {
    throw new Error(`Incorrect ${paramName}: ${param}`);
  }
  return param;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect Gender enum: " + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseStringParam(object.name, "name"),
      dateOfBirth: parseStringParam(object.dateOfBirth, "dateOfBirth"),
      ssn: parseStringParam(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseStringParam(object.occupation, "occupation"),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry;
