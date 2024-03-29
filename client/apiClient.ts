import request from 'superagent'
import { Pokemon, PokemonGeneration, PokemonData } from './models/pokemon'

// const serverURL = '/api/v2'

export async function fetchPokemon(): Promise<PokemonData> {
  const response = await request.get(`/api/v2/cards`)
  console.log(response.body)
  return response.body
}

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  return request
    .get(`https://pokeapi.co/api/v1/pokemon/${name}`)
    .then((res) => res.body.pokemon)
}
