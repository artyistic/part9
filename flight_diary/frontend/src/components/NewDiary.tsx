import { useState } from "react";
import { addNewDiary } from "../services/diaryService";
import { Visibility, Weather } from "../types";
import axios from "axios"


export const NewDiary = () => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const [error, setError] = useState<string>("");


  const submitNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    addNewDiary({
      date: date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment: comment
    }).then(data => {
      console.log("new Diary added");
      console.log(data);
    }).catch((err: unknown) => {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data);
        setInterval(() => setError(""), 5000);
      }
    })
    }

  return (
    <>
      <h2>Add new entry</h2>
      {error && <div>{error}</div>}
      <form onSubmit={submitNewDiary}>
        date: <input onChange={(event) => setDate(event.target.value)}></input><br/>
        visibility: <input onChange={(event) => setVisibility(event.target.value)}></input><br/>
        weather: <input onChange={(event) => setWeather(event.target.value)}></input><br/>
        comment: <input onChange={(event) => setComment(event.target.value)}></input><br/>
        <button type="submit">submit</button>
      </form>
    </>
  )
  
}