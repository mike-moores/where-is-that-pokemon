import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { fetchPokemmon } from '../apiClient'
import type { PokemonData } from '../models/pokemon'
import Loading from './Loading'

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
    queryFn: fetchPokemmon,
  })

  const [revealedCards, setRevealedCards] = useState<number[]>([])
  const [choiceOne, setChoiceOne] = useState<selctedCard | null>(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne === choiceTwo) {
        console.log('those cards match')
      } else {
        console.log('those cards do not match')
      }
    }
  }, [choiceOne, choiceTwo])

  const handleCardClick = (index: number) => {
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
        }, 3000)
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

  if (isLoading) {
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

  const revealedDeck = [
    pokemonData.data[0].images.small,
    pokemonData.data[1].images.small,
    pokemonData.data[2].images.small,
    pokemonData.data[4].images.small,
    pokemonData.data[5].images.small,
    pokemonData.data[6].images.small,
    pokemonData.data[7].images.small,
    pokemonData.data[8].images.small,
    pokemonData.data[9].images.small,
    pokemonData.data[0].images.small,
    pokemonData.data[1].images.small,
    pokemonData.data[2].images.small,
    pokemonData.data[4].images.small,
    pokemonData.data[5].images.small,
    pokemonData.data[6].images.small,
    pokemonData.data[7].images.small,
    pokemonData.data[8].images.small,
    pokemonData.data[9].images.small,
  ]

  return (
    <div>
      <h2>Pokemon list</h2>
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
