import {
  Card,
  Image,
  Stack,
  CardBody,
  Text,
  Center,
  Container,
  VStack,
} from '@chakra-ui/react'
import { isNull } from 'lodash'
import constants from '../constants'
import { Movie } from '../queries/getMovies'

const { POSTER_URL_PREFIX } = constants

const CardList = ({ movies }: { movies: Movie[] }) => {
  return (
    <Container maxW="container.lg" gap={3}>
      <VStack spacing={4}>
        {movies.map((movie) => {
          return (
            <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow="hidden"
              variant="outline"
              key={movie.id}
            >
              <Center>
                <Image
                  objectFit="cover"
                  maxW={{ base: '100%', sm: '200px' }}
                  fallbackSrc=""
                  src={
                    !isNull(movie.poster_path)
                      ? `${POSTER_URL_PREFIX}${movie.poster_path}`
                      : ''
                  }
                  alt="movie poster"
                  padding="3"
                />
              </Center>

              <Stack spacing={2}>
                <CardBody>
                  <Text py="1">{movie.title}</Text>
                </CardBody>

                <CardBody>
                  <Text py="1">{movie.overview}</Text>
                </CardBody>
              </Stack>
            </Card>
          )
        })}
      </VStack>
    </Container>
  )
}

export default CardList
