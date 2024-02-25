import { CoursePart } from "../types";
import { Part } from "./Part";

interface ContentProps {
  courseParts: CoursePart[]
}

export const Content = (props: ContentProps) => {
  console.log(props.courseParts)
  return <>
    {props.courseParts.map(coursePart => 
      <p key={coursePart.name}>
        <Part coursePart={coursePart}/>
      </p>
    )}
  </>
}