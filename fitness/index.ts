import express from "express";
import { calculateBMI } from "./bmiCalculator";

const qs = require('qs');
const app = express();

app.set('query parser',
  (str: string) => qs.parse(str, { /* custom options */ }))

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const queryParams = req.query;

  // error checking
  if (!queryParams.height || !queryParams.weight || isNaN(Number(queryParams.weight)) || isNaN(Number(queryParams.height))) {
    res.send({
      error: "malformatted parameters"
    })
    return
  }

  res.send({
    ...queryParams,
    bmi: calculateBMI({height: Number(queryParams.height), weight: Number(queryParams.weight)})
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
