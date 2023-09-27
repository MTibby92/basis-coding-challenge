import { BaseSyntheticEvent, useState } from 'react'
import {
  Container,
  Input,
  Button,
  Box,
  Card,
  Image,
  Stack,
  CardBody,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { orderBy, isNull } from 'lodash'

const GET_ENDPOINT = 'https://api.themoviedb.org/3/search/movie'
const BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDQwMTA0NmMxYmJkNDM3NzFlODQ0YmU4YzQxNGFjYiIsInN1YiI6IjVmOTgzODJmZTE4Yjk3MDAzNGQwMzM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UXcm8LSGmfBILHmAZwdHac3aMU2_7Avb2t_D94CZxQQ'
const POSTER_PREFIX = 'https://image.tmdb.org/t/p/w500'

function App() {
  const [movies, setMovies] = useState<any[]>([])

  const handleApiCall = async (value: string) => {
    const result = await axios.get(GET_ENDPOINT, { 
      headers: {
        'Authorization': BEARER_TOKEN,
        'Content-Type': 'application/json;charset=utf-8',
      },
      params: {
        query: value
      }
     })
     
     const sorted = sortMoviesByPopularity(result.data.results)
     setMovies(sorted)
  }

  const sortMoviesByPopularity = (unsortedMovies: any[]) => {
    return orderBy(unsortedMovies, ['popularity'], ['desc'])
  }

  return (
    <Container>
      <h3>Movie Search</h3>
      <SearchBar submit={handleApiCall} />
      <CardList movies={movies} />
    </Container>
  )
}

interface SearchBarProps {
  submit: (value: string) => Promise<void>
}

const SearchBar = ({ submit }: SearchBarProps) => {
  const [search, setSearch] = useState('')

  const handleInput = (e: BaseSyntheticEvent) => {
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  return (
    <Box>
      <Input onChange={handleInput} value={search} size="sm" />
      <Button onClick={() => {
        submit(search)
      }}>Search</Button>
    </Box>
  )
}

const CardList = ({ movies }: { movies: any[] }) => {
  return (
    <Box gap={2}>
      {movies.map(movie => {
        return (
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          key={movie.id}
        >
          <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            src={!isNull(movie.poster_path) ? `${POSTER_PREFIX}${movie.poster_path}`: ''}
            alt='movie poster'
          />

          <Stack>
            <CardBody>
              <Text py='2'>
                {movie.title}
              </Text>
            </CardBody>

            <CardBody>
              <Text py='2'>
                {movie.overview}
              </Text>
            </CardBody>
          </Stack>
          
        </Card>)
      })}
    </Box>
  )
}

export default App
