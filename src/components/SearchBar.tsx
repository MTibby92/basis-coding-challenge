import { useState, BaseSyntheticEvent, KeyboardEventHandler } from 'react'
import { Input, Button, Box, Container } from '@chakra-ui/react'

interface SearchBarProps {
  submit: (value: string) => Promise<void>
}

const SearchBar = ({ submit }: SearchBarProps) => {
  const [search, setSearch] = useState('')

  const handleInput = (e: BaseSyntheticEvent) => {
    setSearch(e.target.value)
  }

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.code === 'Enter') {
      submit(search)
    }
  }

  return (
    <Container maxW="container.lg">
      <Box display="flex" gap={4} alignItems="center">
        <Input
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          value={search}
          size="sm"
        />
        <Button
          onClick={() => {
            submit(search)
          }}
        >
          Search
        </Button>
      </Box>
    </Container>
  )
}

export default SearchBar
