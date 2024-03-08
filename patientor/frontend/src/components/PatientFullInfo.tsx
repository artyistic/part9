import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";
import { EntryInfo } from "./EntryInfo";

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
            patient.entries.map((e) => {
              return <EntryInfo key={e.id} entry={e} />;
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