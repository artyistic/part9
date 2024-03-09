import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Entry, EntryWithoutId, Patient } from "../types";
import { HospitalEntryInfo } from "./patientEntry/HospitalEntryInfo";
import { OccupationalHealthcareEntryInfo } from "./patientEntry/OccupationalHealthcareEntryInfo";
import { HealthCheckEntryInfo } from "./patientEntry/HealthCheckEntryInfo";
import AddPatientEntryModal from "./AddPatientEntryModal";
import axios from "axios";

type PatientId = {
  id: string;
};

export const PatientFullInfo = () => {
  const { id } = useParams<PatientId>();

  const [patient, setPatient] = useState<Patient>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (patient) {
      try {
        const newEntry = await patientService.addEntry(values, patient.id);
        setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
        setModalOpen(false);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace(
              "Something went wrong. Error: ",
              ""
            );
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
  };

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
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <HospitalEntryInfo key={entry.id} entry={entry}></HospitalEntryInfo>
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareEntryInfo
            key={entry.id}
            entry={entry}
          ></OccupationalHealthcareEntryInfo>
        );
      case "HealthCheck":
        return (
          <HealthCheckEntryInfo
            key={entry.id}
            entry={entry}
          ></HealthCheckEntryInfo>
        );
      default:
        return assertNever(entry);
    }
  };

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
          <AddPatientEntryModal
            modalOpen={modalOpen}
            onClose={closeModal}
            onSubmit={submitNewEntry}
            error={error}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
          {patient.entries.length !== 0 ? (
            patient.entries.map((entry) => {
              return EntryDetails({ entry });
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
