import { useState } from 'react'
import { Heading, VStack } from '@chakra-ui/react'

import CardList from './components/CardList'
import SearchBar from './components/SearchBar'
import getMovies, { Movie } from './queries/getMovies'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])

  const handleApiCall = async (value: string) => {
    const result = await getMovies(value)
    setMovies(result)
  }

  return (
    <VStack spacing={4}>
      <Heading>Movie Search</Heading>
      <SearchBar submit={handleApiCall} />
      <CardList movies={movies} />
    </VStack>
  )
}

export default App
