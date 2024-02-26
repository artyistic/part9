import { useEffect, useState } from "react"
import { NonSensitiveDiaryEntry } from "./types"
import { getAllDiaries } from "./services/diaryService"
import { Diaries } from "./components/Diaries"
import { NewDiary } from "./components/NewDiary"

const App = () => {

  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries()
      .then(data => setDiaries(data))
  }, [])

  return (
    <>
      <NewDiary/>
      <h1>Flight diaries</h1>
      <Diaries diaries={diaries}/>
    </>
  )
}

export default App

