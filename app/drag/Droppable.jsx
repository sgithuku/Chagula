import { ListItem, Button, ListIcon, Box } from "@chakra-ui/react"
import { Link } from "blitz"
import { CaretRight } from "phosphor-react"

export function Droppable(props) {
  console.log("droppable", props)

  return (
    <Box
      bgColor={props.moving ? "#000" : "#ec7d64"}
      width="md"
      minHeight="100vh"
      // key={"droppable"}
      // id={"droppable"}
      style={style}
    >
      {props.children}
    </Box>
  )
}
