import React from 'react';

interface HeaderProps {
  name: string
}

const Header = ({ name }: HeaderProps): JSX.Element => {
  return <h1>{name}</h1>
}

interface CoursePart {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  parts: CoursePart[]
}

const Content = ({ parts }: ContentProps): JSX.Element => {
  return (
    <>
      {parts.map(part => <p key={part.name}>{part.name} {part.exerciseCount}</p>)}
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
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
