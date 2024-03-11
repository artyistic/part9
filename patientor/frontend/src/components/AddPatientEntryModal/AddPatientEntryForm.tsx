import { useState, SyntheticEvent, useEffect } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
} from "@mui/material";

import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../types";
import diagnosisService from "../../services/diagnoses";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions = (): HealthCheckRatingOption[] => {
  const keys = Object.values(HealthCheckRating).filter(
    (v) => typeof v === "number"
  ) as number[];
  return keys.map((k) => ({
    value: k,
    label: HealthCheckRating[k],
  }));
};

enum EntrySelection {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

interface entrySelectionOptions {
  value: EntrySelection;
  label: string;
}

const entrySelectionOptions: entrySelectionOptions[] = Object.values(
  EntrySelection
).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddNewPatientEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [entrySelection, setEntrySelection] = useState(EntrySelection.Hospital);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [criteria, setCriteria] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([]);

  useEffect(() => {
    const fetchPatientById = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchPatientById();
  }, []);

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      if (value) {
        setHealthCheckRating(value);
      }
    }
  };

  const onEntrySelectionChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const entrySelection = Object.values(EntrySelection).find(
        (g) => g.toString() === value
      );
      if (entrySelection) {
        setEntrySelection(entrySelection);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (entrySelection) {
      case EntrySelection.HealthCheck:
        onSubmit({
          description,
          type: "HealthCheck",
          date,
          specialist,
          healthCheckRating,
          diagnosisCodes,
        });
        break;
      case EntrySelection.Hospital:
        onSubmit({
          description,
          type: "Hospital",
          date,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria: criteria,
          },
          diagnosisCodes,
        });
        break;
      case EntrySelection.OccupationalHealthcare:
        let submit: EntryWithoutId = {
          description,
          type: "OccupationalHealthcare",
          date,
          specialist,
          employerName,
          diagnosisCodes,
        };

        if (sickLeaveEnd && sickLeaveStart) {
          submit = {
            ...submit,
            sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
          };
        }

        onSubmit(submit);
        break;
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <InputLabel id="entryType">Entry Type</InputLabel>
        <Select
          id="entryType"
          labelId="entryType"
          label="Entry Type"
          fullWidth
          value={entrySelection}
          onChange={onEntrySelectionChange}
        >
          {entrySelectionOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="date">Entry Date</InputLabel>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel id="diagnosisCodes">Diagnoses Codes</InputLabel>
        <Select
          multiple
          id="diagnosisCodes"
          labelId="diagnosisCodes"
          label="Diagnoses Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={handleChange}
          renderValue={(diagnosisCodes) => diagnosisCodes.join(", ")}
        >
          {diagnoses.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {/* {option.code} */}
              <Checkbox checked={diagnosisCodes.indexOf(option.code) > -1} />
              <ListItemText primary={option.code} />
            </MenuItem>
          ))}
        </Select>
        {entrySelection === EntrySelection.HealthCheck && (
          <>
            <InputLabel id="healthCheckRating">HealthCheckRating</InputLabel>
            <Select
              labelId="healthCheckRating"
              id="healthCheckRating"
              label="HealthCheckRating"
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions().map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}

        {entrySelection === EntrySelection.Hospital && (
          <>
            <InputLabel id="dischargeDate">Discharge date</InputLabel>
            <input
              type="date"
              id="dischargeDate"
              value={dischargeDate}
              onChange={(event) => setDischargeDate(event.target.value)}
            />
            <TextField
              label="discharge criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </>
        )}

        {entrySelection === EntrySelection.OccupationalHealthcare && (
          <>
            <TextField
              label="employerName"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel id="sickLeaveStart">Discharge date</InputLabel>
            <input
              type="date"
              id="sickLeaveStart"
              value={sickLeaveStart}
              onChange={(event) => setSickLeaveStart(event.target.value)}
            />
            <InputLabel id="sickLeaveEnd">Discharge date</InputLabel>
            <input
              type="date"
              id="sickLeaveEnd"
              value={sickLeaveEnd}
              onChange={(event) => setSickLeaveEnd(event.target.value)}
            />
          </>
        )}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddNewPatientEntryForm;
