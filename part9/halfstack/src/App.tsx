import React from 'react';

interface HeaderProps {
  name: string
}

const Header = ({ name }: HeaderProps): JSX.Element => {
  return <h1>{name}</h1>
}

interface CoursePartBase {
  name: string,
  exerciseCount: number,
  type: string
}

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescription{
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescription {
  type: "special",
  requirements: string[]
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;



interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps): JSX.Element => {
  switch (part.type) {
    case 'normal':
      return <p>{part.name} {part.exerciseCount} {part.description}</p>
    case 'groupProject':
      return <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
    case 'submission':
      return <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
    case 'special':
      return <p>{part.name} {part.exerciseCount} {part.description} required skills: <span>{part.requirements.join(', ')}</span></p>
  }
}

interface ContentProps {
  parts: CoursePart[]
}

const Content = ({ parts }: ContentProps): JSX.Element => {
  return (
    <>
      {parts.map(part => <Part key={part.name} part={part} />)}
    </>
  )
}

interface TotalProps {
  parts: CoursePart[]
}

const Total = ({ parts }: TotalProps): JSX.Element => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
