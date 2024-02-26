import axios from "axios";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(res => res.data)
}

export const addNewDiary = (object: NewDiaryEntry) => {
  return axios
    .post<NonSensitiveDiaryEntry>(baseUrl, object)
    .then(res => res.data)
}