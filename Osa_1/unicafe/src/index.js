import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const good=props.good
  const neutral=props.neutral
	const bad=props.bad
	const total=good+neutral+bad
	const average=(good-bad) / total
	const positive=good/total * 100

	if (total > 0) {
		return (
			<div>
				<table>
					<Statistic text="hyvä" value={good} />
					<Statistic text="neutraali" value={neutral} />
					<Statistic text="paha" value={bad} />
					<Statistic text="yhteensä" value={total} />
					<Statistic text="keskiarvo" value={average} />
					<Statistic text="positiivisia" value={positive} mark="%" />
				</table>
			</div>
		)
	}
	return (
		<div>
			<p>Ei yhtään palautetta annettu</p>
		</div>
	) 
}

const Statistic = (props) => {
	const text=props.text
	const value=props.value
	const mark=props.mark

	return (
		<tbody>
			<tr>
				<td>{text} {value} {mark}</td>
			</tr>
		</tbody>
	)
}

const Button = ({ handleClick, text}) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={() => setGood(good + 1)} text="hyvä" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutraali" />
			<Button handleClick={() => setBad(bad + 1)} text="huono" />
			<h1>statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
