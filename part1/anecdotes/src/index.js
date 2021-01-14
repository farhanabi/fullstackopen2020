import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = props => {
  const [selected, setSelected] = useState(0)
	const [points, setPoints] = useState({0:0,1:0,2:0,3:0,4:0,5:0})
	let max = Object.keys(points).reduce((a, b) => points[a] > points[b] ? a : b);
  return (
    <div>
	    <div>
		    <div>
		    	<h2>Anecdote of the day</h2>
		      {props.anecdotes[selected]}
		      <div> has {points[selected]} votes </div>
		    </div>
		    <button
		    	onClick={()=>{
						const copy = { ...points }
						copy[selected] += 1 
		    		setPoints(copy)
		    	}}
		    >
		    	vote
		    </button>
		    <button onClick={()=>setSelected(Math.round(Math.random()*5))}>next anecdote</button>
	  	</div>
	  	<div>
		    <h2>Anecdote with most votes</h2>
		      {props.anecdotes[max]}		    
	  	</div>
	  </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)