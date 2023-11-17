import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useMemo } from 'react'
import { fetchPokemon } from '../apiClient'
import type { PokemonData } from '../models/pokemon'
import Loading from './Loading'

function shuffleArray<T>(inputArray: Array<T>): Array<T> {
  const array = [...inputArray]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

interface selctedCard {
  id: number
  image: string
}

export default function Pokemon() {
  const {
    data: pokemonData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['pokemon'],
    queryFn: fetchPokemon,
  })

  const [revealedCards, setRevealedCards] = useState<number[]>([])
  const [choiceOne, setChoiceOne] = useState<selctedCard | null>(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [revealedDeck, setRevealedDeck] = useState(null as null | string[])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne === choiceTwo) {
        console.log('those cards match')
      } else {
        console.log('those cards do not match')
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    if (pokemonData != undefined) {
      const cards = shuffleArray(pokemonData.data)
        .slice(0, 9)
        .map((_) => _.images.small)
      const cards2 = shuffleArray([...cards, ...cards])
      setRevealedDeck(cards2)
    } else {
      setRevealedDeck(null)
    }
  }, [pokemonData])

  const handleCardClick = (index: number) => {
    if (revealedDeck == undefined) {
      return
    }

    // Toggle the card's visibility by adding or removing it from the revealedCards array
    console.log(revealedCards.length + ',' + revealedDeck.length)
    if (choiceOne == null) {
      setChoiceOne({ id: index, image: revealedDeck[index] })
    }
    if (choiceOne !== null && choiceTwo == null) {
      if (choiceOne.image == revealedDeck[index]) {
        console.log('matched')
        setChoiceOne(null)
        if (revealedCards.length == revealedDeck.length - 1) {
          console.log('YOU WIN')
        }
      } else {
        setTimeout(() => {
          flipCard(index)
          flipCard(choiceOne.id)
        }, 1000)
        setChoiceOne(null)
      }
    }
    flipCard(index)
  }

  function flipCard(index: number) {
    setRevealedCards((prevRevealed) => {
      if (prevRevealed.includes(index)) {
        return prevRevealed.filter((revealedIndex) => revealedIndex !== index)
      } else {
        return [...prevRevealed, index]
      }
    })
  }

  if (isError) {
    return <p>There was an error</p>
  }

  if (isLoading || pokemonData == undefined || revealedDeck == undefined) {
    return <Loading />
  }

  const initialDeck = [
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
    './client/images/pokemon-card.png',
  ]

  // Shuffle the revealedDeck array

  return (
    <div>
      <h2>WHERE&apos;S THAT POKEMON?</h2>
      {/* <button onClick={shuffleArray}>New Game</button> */}
      <div className="deck">
        {initialDeck.map((card, index) => (
          <div
            key={index}
            onClick={
              revealedCards.includes(index)
                ? () => {}
                : () => handleCardClick(index)
            }
          >
            <img
              className={`card ${
                revealedCards.includes(index) ? 'revealed' : ''
              }`}
              src={revealedCards.includes(index) ? revealedDeck[index] : card}
              width="180px"
              alt={`Card ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
