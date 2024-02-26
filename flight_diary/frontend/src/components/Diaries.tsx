import { NonSensitiveDiaryEntry } from "../types"
import { Diary } from "./Diary";

interface DiariesProp {
  diaries: NonSensitiveDiaryEntry[];
}

export const Diaries = (props: DiariesProp) => {
  const diaries = props.diaries;

  return (
    <>
      <h2>Diary entries</h2>
      {diaries.map(diary => <Diary key={diary.id} diary={diary}/>)}
    </>
  )
}