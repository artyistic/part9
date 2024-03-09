import { HealthCheckEntry } from "../../types";
import { Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnoses";
import { useState, useEffect } from "react";
import { Card, CardContent, Rating } from "@mui/material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface EntryProps {
  entry: HealthCheckEntry;
}

export const HealthCheckEntryInfo = ({ entry }: EntryProps) => {
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
          <br />
          HealthCheckRating:{" "}
          <Rating
            name="HealthCheckRating"
            readOnly
            defaultValue={entry.healthCheckRating}
            max={4}
            icon={<ThumbDownIcon fontSize="inherit" />}
            emptyIcon={<ThumbDownIcon fontSize="inherit" />}
          />
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
      </CardContent>
    </Card>
  );
};
