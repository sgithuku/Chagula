import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
// import { FiSearch } from "react-icons/fi";
import { MagnifyingGlass } from "phosphor-react"
import React from "react"

const SearchBar = ({ onSearch, customColor }) => {
  return (
    <InputGroup width="100%" maxW="md">
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
