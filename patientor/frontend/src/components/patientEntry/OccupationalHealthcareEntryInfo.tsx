import { OccupationalHealthcareEntry } from "../../types";
import { Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnoses";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";

interface EntryProps {
  entry: OccupationalHealthcareEntry;
}

export const OccupationalHealthcareEntryInfo = ({ entry }: EntryProps) => {
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
          Employer: {entry.employerName}
          <br />
          {entry.sickLeave && (
            <>
              Sick Leave: {entry.sickLeave.startDate} to{" "}
              {entry.sickLeave.endDate}
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
};
