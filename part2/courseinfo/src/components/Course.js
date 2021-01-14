import React from 'react'

const Header = props => {
	return (
		<h2>{props.course}</h2>
	)
}

const Part = props => {
	return (
		<p>
			{props.part} {props.exercises}
		</p>
	)
}

const Content = ({parts}) => parts.map(part => <Part part={part.name} exercises={part.exercises} key={part.id}/>)

const Total = ({parts}) => {
  const sum = parts.map(part => part.exercises).reduce((a,b) => a + b, 0)
	return (
		<p><b>Total of {sum} exercises</b></p>
	)
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course