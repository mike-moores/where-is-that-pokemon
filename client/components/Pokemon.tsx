import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchPokemmon } from '../apiClient'
import type { PokemonData } from '../models/pokemon'

export default function Pokemon() {
  const {
    data: pokemonData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['pokemon'],
    queryFn: fetchPokemmon,
  })

  if (isError) {
    return <p>There was an error</p>
  }

  if (isLoading) {
    return <p>Pokemon are loading</p>
  }

  console.log(pokemonData)

  return (
    <div>
      <h2>Pokemon list</h2>
      {pokemonData.data.map((p) => (
        <>
          <li key={p.id}>{p.name}</li>
          <img src={p.images.small}></img>
        </>
      ))}
    </div>
  )
}
