import {
  Diagnosis,
  EntryWithoutId,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

const parseStringParam = (param: unknown, paramName: string): string => {
  if (!isString(param)) {
    throw new Error(`Incorrect ${paramName}: ${param}`);
  }
  return param;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDischarge = (
  object: unknown
): { date: string; criteria: string } => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("date" in object && "criteria" in object) {
    return {
      date: parseStringParam(object.date, "dischargeDate"),
      criteria: parseStringParam(object.criteria, "dischargeCriteria"),
    };
  }
  throw new Error("Incorrect data: date/criteria missing");
};

const parseSickLeave = (
  object: unknown
): { startDate: string; endDate: string } => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("startDate" in object && "endDate" in object) {
    return {
      startDate: parseStringParam(object.startDate, "sickLeaveStartDate"),
      endDate: parseStringParam(object.endDate, "sickLeaveEndDate"),
    };
  }
  throw new Error("Incorrect data: date/criteria missing");
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
  if (!isNumber(param) || !isHealthCheckRating(param)) {
    throw new Error("Incorrect HealthCheckRating: " + param);
  }
  return param;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (!("type" in object)) {
    throw new Error("Missing type");
  }
  let base = { diagnosisCodes: parseDiagnosisCodes(object) };

  switch (object.type) {
    case "Hospital":
      if (
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "discharge" in object
      ) {
        const newEntry: Omit<HospitalEntry, "id"> = {
          ...base,
          type: object.type,
          description: parseStringParam(object.description, "description"),
          date: parseStringParam(object.date, "date"),
          specialist: parseStringParam(object.specialist, "specialist"),
          discharge: parseDischarge(object.discharge),
        };
        return newEntry;
      }
      throw new Error("Incorrect or missing Hospital data");
    case "HealthCheck":
      if (
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "healthCheckRating" in object
      ) {
        const newEntry: Omit<HealthCheckEntry, "id"> = {
          ...base,
          type: object.type,
          description: parseStringParam(object.description, "description"),
          date: parseStringParam(object.date, "date"),
          specialist: parseStringParam(object.specialist, "specialist"),
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return newEntry;
      }
      throw new Error("Incorrect or missing HealthCheck data");
    case "OccupationalHealthcare":
      if (
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "employerName" in object
      ) {
        const newEntry: Omit<OccupationalHealthcareEntry, "id"> = {
          ...base,
          type: object.type,
          description: parseStringParam(object.description, "description"),
          date: parseStringParam(object.date, "date"),
          specialist: parseStringParam(object.specialist, "specialist"),
          employerName: parseStringParam(object.employerName, "employerName"),
        };
        if ("sickLeave" in object) {
          return { ...newEntry, sickLeave: parseSickLeave(object.sickLeave) };
        } else {
          return newEntry;
        }
      }
      throw new Error("Incorrect or missing HealthCheck data");
  }
  throw new Error("Incorrect data: a field missing");
};
