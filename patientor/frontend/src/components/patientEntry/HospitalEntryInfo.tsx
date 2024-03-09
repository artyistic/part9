import { HospitalEntry } from "../../types";
import { Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnoses";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";

interface EntryProps {
  entry: HospitalEntry;
}

export const HospitalEntryInfo = ({ entry }: EntryProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientById = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchPatientById();
  }, []);

  return (
    <Card variant="outlined">
      <CardContent>
        <p>
          {entry.date}
          <br />
          Diagnosis By: {entry.specialist}
          <br />
          <em>{entry.description}</em>
        </p>
        {entry.diagnosisCodes?.map((dc) => {
          return (
            <ul key={dc}>
              <li>
                {dc} {diagnoses.find((d) => d.code === dc)?.name}
              </li>
            </ul>
          );
        })}
        <p>
          Discharge criteria: {entry.discharge.criteria}
          <br />
          Discharge date: {entry.discharge.date}
        </p>
      </CardContent>
    </Card>
  );
};
