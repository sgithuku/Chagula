import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { Container, Heading, Box } from "@chakra-ui/react"

export default function Column(props) {
  // console.log("this is the column", props)
  return (
    <Box
      width="sm"
      height="sm"
      borderWidth="1px"
      borderRadius="lg"
      mx="3"
      mb="3"
      p="3"
      alignSelf="flex-start"
      boxShadow="base"
    >
      <Heading pl="3" size="lg">
        {props.day.name}
        {/* props.day.name,id, createdAt */}
      </Heading>
      {/* <Droppable droppableId={props.id}>
          {(provided) => (
            <TaskList innerRef={provided.innerRef} {...provided.droppableProps}>
              {props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable> */}
    </Box>
  )
}
