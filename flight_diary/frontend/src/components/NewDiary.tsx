import { useState } from "react";
import { addNewDiary } from "../services/diaryService";
import { Visibility, Weather } from "../types";
import { parseVisibility, parseWeather } from "../utils";
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
      visibility: parseVisibility(visibility),
      weather: parseWeather(weather),
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
        date: <input type="date" onChange={(event) => setDate(event.target.value)}></input><br/>
        visibility:
        {Object.values(Visibility).map(v => {
                    return <div key={v}>
                    <input type="radio" id={v} name={v} value={v} onChange={(event) => setVisibility(event.target.value)}/>
                    <label htmlFor={v}>{v}</label>
                  </div>
        })}
        <br/>weather:
        {Object.values(Weather).map(w => {
                    return <div key={w}>
                    <input type="radio" id={w} name={w} value={w} onChange={(event) => setWeather(event.target.value)}/>
                    <label htmlFor={w}>{w}</label>
                  </div>
        })}
        <br/>comment: <input onChange={(event) => setComment(event.target.value)}></input><br/>
        <button type="submit">submit</button>
      </form>
    </>
  )
  
}