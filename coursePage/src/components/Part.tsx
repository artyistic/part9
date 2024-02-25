import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error (
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = (props: PartProps) => {
  switch(props.coursePart.kind) {
    case "basic":
      return (
        <p>
          <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong>
          <br></br><em>{props.coursePart.description}</em>
        </p>
      )
      // break;
    case "group":
      return (
        <p>
          <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong>
          <br></br>project exercises: {props.coursePart.groupProjectCount}
        </p>
      )
      // break;
    case "background":
      return (
        <p>
          <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong>
          <em>{props.coursePart.description}</em>
          <br></br>background material: <a href={props.coursePart.backgroundMaterial}>{props.coursePart.backgroundMaterial}</a>
        </p>
      )
      // break;
    case "special":
      return (
        <p>
          <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong>
          <em>{props.coursePart.description}</em>
          <br></br>required skills: {props.coursePart.requirements.join(", ")}
        </p>
      )
      // break;
    default:
      return assertNever(props.coursePart)
  };
};