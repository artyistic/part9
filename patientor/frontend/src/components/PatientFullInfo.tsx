import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Entry, Patient } from "../types";
import { HospitalEntryInfo } from "./patientEntry/HospitalEntryInfo"
import { OccupationalHealthcareEntryInfo } from "./patientEntry/OccupationalHealthcareEntryInfo";
import { HealthCheckEntryInfo } from "./patientEntry/HealthCheckEntryInfo";

type PatientId = {
  id: string;
};

export const PatientFullInfo = () => {
  const { id } = useParams<PatientId>();

  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatientById = async () => {
      if (id) {
        const patient = await patientService.getPatientById(id);
        setPatient(patient);
      }
    };
    void fetchPatientById();
  }, [id]);

  const assertNever = (value: never): never => {
    throw new Error (
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }; 

  const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
    switch(entry.type) {
      case "Hospital":
        return <HospitalEntryInfo entry={entry}></HospitalEntryInfo>
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryInfo entry={entry}></OccupationalHealthcareEntryInfo>
      case "HealthCheck":
        return <HealthCheckEntryInfo entry={entry}></HealthCheckEntryInfo>
      default:
        return assertNever(entry);
    }
  }

  return (
    <>
      {patient ? (
        <Box>
          <h2>{patient.name}</h2>
          <p>
            gender: {patient.gender}
            <br />
            ssn: {patient?.ssn}
            <br />
            occupation: {patient.occupation}
          </p>
          <h3>entries</h3>
          {patient.entries.length !== 0 ? (
            patient.entries.map((entry) => {
              return EntryDetails({entry});
            })
          ) : (
            <p>No entries</p>
          )}
        </Box>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
};
