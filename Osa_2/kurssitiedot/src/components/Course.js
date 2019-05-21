import React from 'react'

const Header = ({ header }) => {

    return (
      <div>
        <h1>{header}</h1>
      </div>
    )
  }
  
  const Content = ({ parts }) => {

    const rows = () => parts.map(part => <Part key={part.id} part={part} />)
  
    return (
      <div>
        {rows()}
      </div>
    )
  }
  
  const Total = ({ parts }) => {

    const total = parts.reduce( (s, p) => {
      return (
        s + p.exercises
      )
    }, 0)
  
    return (
      <div>
        <p>yhteensä {total} tehtävää</p>
      </div>
    )
  }
  
  const Part = ({ part }) => {

    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }
  
  const Course = ({ course }) => {
  
    return (
      <div>
        <Header header={course.name} />
        <Content parts={course.parts} />  
        <Total parts={course.parts} />     
      </div>
    )
  }

  export default Course