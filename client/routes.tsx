import { Navigate, Route, createRoutesFromElements } from 'react-router-dom'

import App from './components/App.tsx'
import Pokemon from './components/Pokemon.tsx'

export const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route index element={<Navigate to="pokemon" />} />
    <Route path="pokemon" element={<Pokemon />} />
  </Route>
)
