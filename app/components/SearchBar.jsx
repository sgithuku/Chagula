import React from "react"
// import { FiSearch } from "react-icons/fi";
import { MagnifyingGlass } from "phosphor-react"
import {
  Container,
  Input,
  Button,
  IconButton,
  InputGroup,
  InputLeftElement,
  colorMode,
  Icon,
} from "@chakra-ui/react"

const SearchBar = ({ onSearch, customColor }) => {
  return (
    <InputGroup width="100%">
      <InputLeftElement pointerEvents="none" children={<Icon as={MagnifyingGlass} />} />
      <Input
        id="search-input"
        className="search-input"
        size="md"
        maxW="100vw"
        variant="outline"
        // colorScheme={customColor}
        // bgColor={customColor}
        // color="gray.900"
        // colorScheme="blackAlpha"
        // borderColor="green.500"
        onKeyPress={(e) => {
          e.key === "Enter" && onSearch()
        }}
        placeholder="Search"
        mb="3"
      />
    </InputGroup>
  )
}

export default SearchBar
