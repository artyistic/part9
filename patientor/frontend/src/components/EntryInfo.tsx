import { Diagnosis, Entry } from "../types";
import diagnosisService from "../services/diagnoses";
import { useState, useEffect } from "react";

interface EntryProps {
  entry: Entry;
}

export const EntryInfo = ({ entry }: EntryProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientById = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchPatientById();
  }, []);

  return (
    <>
      <p>{entry.date} {entry.description}</p>
      {entry.diagnosisCodes?.map((dc) => {
        return (
          <ul key={dc}>
            <li>{dc} {diagnoses.find(d => d.code === dc)?.name}</li>
          </ul>
        );
      })}
    </>
  );
};
