interface ContentProps {
  courseParts: {
    name: string,
    exerciseCount: number
  }[]
}

export const Content = (props: ContentProps) => {
  console.log(props.courseParts)
  return <>
    {props.courseParts.map(coursePart => 
      <p key={coursePart.name}>
          {coursePart.name} {coursePart.exerciseCount}
      </p>
    )}
  </>
}