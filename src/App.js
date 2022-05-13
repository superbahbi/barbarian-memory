import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "img/Barbarian_icons_01_t.PNG", matched: false },
  { "src": "/img/Barbarian_icons_02_t.PNG", matched: false },
  { "src": "/img/Barbarian_icons_03_t.PNG", matched: false },
  { "src": "/img/Barbarian_icons_04_t.PNG", matched: false },
  { "src": "/img/Barbarian_icons_05_t.PNG", matched: false },
  { "src": "/img/Barbarian_icons_06_t.PNG", matched: false }
]
function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5 )
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards)
    setTurns(0)
  }
  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    console.log(card)
  }
  // compare cards
  useEffect(() => {
    if(choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return { ...card, matched: true } 
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => 
          resetTurn(), 1000
        );
      }
    }
  }, [choiceOne, choiceTwo])
  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
  }
  console.log(cards, turns)
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="cardGrid">
         { cards.map(card => (
           <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
         ))
          
         }
      </div>
    </div>
  );
}

export default App;
