import React from "react"
import { Box, Button, Text, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react"
// import { X } from "phosphor-react";

const Filters = ({ filters, filterDispatcher, customBG, customColor }) => (
  <Box className="filters" d="flex" flexDir="row" justifyContent="flex-start" mb="3">
    <Text width="inherit" className="filter-label" verticalAlign="center" pr="3">
      Filter:
    </Text>
    {[...filters].map((filter) => (
      <Tag
        key={filter}
        className="tag"
        onClick={() => filterDispatcher({ type: "REMOVE_FILTER", filter: filter })}
        mr="3"
        borderRadius="sm"
        colorScheme={customColor}
        _hover={{ bg: customBG, color: customColor }}
      >
        {filter}
      </Tag>
    ))}
    <Tag
      borderRadius="sm"
      colorScheme={customColor}
      _hover={{ color: customColor }}
      onClick={() => filterDispatcher({ type: "RESET_FILTER" })}
      variant="subtle"
    >
      <TagLabel variant="filled">Clear</TagLabel>
      <TagCloseButton size="sm" />
    </Tag>
  </Box>
)

export default Filters
