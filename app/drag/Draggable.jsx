import React from "react"
import { ListItem, ListIcon } from "@chakra-ui/react"
import { Link } from "blitz"
import { CaretRight } from "phosphor-react"

export function Draggable(props) {
  // console.log(props)
  return (
    <ListItem
      // key={props.id}
      // id={props.id}
      disabled={props.disabled}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      p="3"
      _hover={{ bgColor: "gray.900", color: "green.50" }}
    >
      <ListIcon as={CaretRight} color="green.500" />
      <Link href={`/meals/${props.id}`}>
        <a>{props.meal.name}</a>
      </Link>
    </ListItem>
  )
}
