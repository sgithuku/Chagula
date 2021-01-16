import React from "react"
import { useDraggable } from "@dnd-kit/core"
import { ListItem, Button, ListIcon } from "@chakra-ui/react"
import { Link } from "blitz"
import { CaretRight } from "phosphor-react"
import { useSortable } from "@dnd-kit/sortable"

export function Draggable(props) {
  // console.log(props)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <ListItem
      // key={props.id}
      // id={props.id}
      disabled={props.disabled}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
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
