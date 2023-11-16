import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Pokemon from './Pokemon.tsx'

const App = () => {
  return (
    <>
      <Pokemon />
    </>
  )
}

export default App
