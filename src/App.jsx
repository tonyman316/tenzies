import { useState } from 'react'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import useWindowSize from 'react-use/lib/useWindowSize'
import Die from './components/Die'
import Confetti from 'react-confetti'
import './App.css'


/** TODO: 
 * Save your best time to localStorage
*/
function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, setRollCount] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const {width, height} = useWindowSize()
  const [bestTime, setBestTime] = useState(
    () => JSON.parse(localStorage.getItem("bestTime")) || 0
  )

  useEffect(() => {
    validateWinning()
  }, [dice])

  const diceElements = dice.map(die => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    )
  })

  function validateWinning() {
    const allHeld = dice.every(die => die.isHeld),
          firstValue = dice[0].value,
          allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
      stopTimer()
    }
  }

  function getRandomDieNumber() {
    return Math.ceil(Math.random() * 6)
  }

  function allNewDice() {
    const newDice = []
    
    for (let i = 0; i < 10; i++) {
      newDice.push(
        {
          value: getRandomDieNumber(),
          isHeld: false,
          id: nanoid()
        }
      )
    }
    return newDice
  }

  function rollDice() {
    if (rollCount === 0) {
      setStartTime(new Date().getTime())
    }

    setRollCount(prevRollCount => prevRollCount + 1)
    tenzies ? resetDice() :
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : {...die, value: getRandomDieNumber()}
    }))
  }

  function stopTimer() {
    let endTime = new Date().getTime()
    setTimeElapsed(((endTime - startTime) / 1000).toFixed(2))
    setBestTime(prevBestTime => {
      let pBestTime = parseFloat(prevBestTime)
      console.log(pBestTime, timeElapsed)
      return !pBestTime ? timeElapsed :
              pBestTime > timeElapsed ? timeElapsed : pBestTime
    })
    localStorage.setItem("bestTime", JSON.stringify(bestTime))
  }

  function resetDice() {
    setTenzies(false)
    setDice(allNewDice())
    setRollCount(0)
  }

  /* 
    Need to value of oldDice, use map to compare each die's id to the id 
    that passed in from the function. If ids are the same, keep all other properties of the die
    and flip isHeld. Else return die.
  */
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  return (
    <div className="App">
      {tenzies && <Confetti width={width} height={height} />}
      <div className="card">
        <h2 className="title">Tenzies</h2>
        <p className="subTitle">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
        {rollCount > 0 && <div className="dice-container">
          {diceElements}
        </div>}
        <button onClick={rollDice} className="roll-button">{tenzies ? "New Game" : rollCount === 0 ? "Start" : "Roll"}</button>
        {tenzies && <div className="stats">
          <span>Total Rolls: {rollCount}</span>
          <span>New Time: {timeElapsed} (s)</span>
          <br />
          {bestTime > 0 && <span>Previous Best Time: {bestTime} (s)</span>}
        </div>}
      </div>
    </div>
  )
}

export default App
