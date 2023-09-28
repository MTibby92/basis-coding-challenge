import axios from 'axios'
import { orderBy } from 'lodash'

import constants from '../constants'

const { GET_MOVIES_ENDPOINT, MOVIE_BEARER_TOKEN } = constants

type MovieFilter = 'popularity' | 'release_date' | 'title' | 'vote_count' | 'vote_average'

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface GetMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

const getMovies = async (value: string, sortBy: MovieFilter = 'popularity') => {
  const result = await axios.get<GetMoviesResponse>(GET_MOVIES_ENDPOINT, {
    headers: {
      Authorization: MOVIE_BEARER_TOKEN,
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      query: value,
      include_adult: false,
    },
  })

  return orderBy(result.data.results, [sortBy], ['desc'])
}

export default getMovies
