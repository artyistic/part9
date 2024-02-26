import { useEffect, useState } from "react"
import axios from "axios"
import { NonSensitiveDiaryEntry } from "./types"
import { Diaries } from "./components/Diaries"

const App = () => {

  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    axios.get<NonSensitiveDiaryEntry[]>("http://localhost:3000/api/diaries")
      .then(res => {
        console.log(res.data);
        setDiaries(res.data);
      })
  }, [])

  return (
    <>
      <h1>Flight diaries</h1>
      <Diaries diaries={diaries}/>
    </>
  )
}

export default App

