import { useDroppable } from "@dnd-kit/core"
import { ListItem, Button, ListIcon, Box } from "@chakra-ui/react"
import { Link } from "blitz"
import { CaretRight } from "phosphor-react"

export function Droppable(props) {
  console.log("droppable", props)
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  })
  const style = {
    bgColor: isOver ? "white" : "#000",
  }

  return (
    <Box
      ref={setNodeRef}
      bgColor={props.moving ? "#000" : "#ec7d64"}
      width="md"
      minHeight="100vh"
      key={"droppable"}
      id={"droppable"}
      style={style}
    >
      {props.children}
    </Box>
  )
}
