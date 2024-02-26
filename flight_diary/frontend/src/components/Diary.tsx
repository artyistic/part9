import { NonSensitiveDiaryEntry } from "../types";

interface DiaryProps {
  diary: NonSensitiveDiaryEntry;
};

export const Diary = (props: DiaryProps) => {
  const diary = props.diary;

  return (
    <>
      <h3>{diary.date}</h3>
      <p>
        visibility: {diary.visibility}
        <br/>weather: {diary.weather}
      </p>
    </>
  )
}