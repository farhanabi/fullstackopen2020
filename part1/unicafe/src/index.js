import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({text,value}) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({good,neutral,bad}) => {
	if (good+neutral+bad === 0) {
		return (
			<p>No feedback given</p>
		)
	}

	return (
		<div>
			<table>
				<tbody>
			   	<Statistic text='good' value={good} />
			   	<Statistic text='neutral' value={neutral} />
			   	<Statistic text='bad' value={bad} />
			   	<Statistic text='all' value={good+neutral+bad} />
			   	<Statistic text='average' value={(good-bad)/(good+neutral+bad)} />
			   	<Statistic text='positive' value={good/(good+neutral+bad)*100 + ' %'} />
				</tbody>
			</table>
		</div>
	)
}

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
       	<h2>give feedback</h2>
        <Button onClick={() => {setGood(good + 1)}} text='Good'/>
        <Button onClick={() => {setNeutral(neutral + 1)}} text='Neutral'/>
        <Button onClick={() => {setBad(bad + 1)}} text='Bad'/>
       </div>
       <div>
       	<h2>statistics</h2>
       	<Statistics good={good} neutral={neutral} bad={bad}/>
       </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
