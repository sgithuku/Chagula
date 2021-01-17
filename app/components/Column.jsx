import React from "react"
import styled from "styled-components"
import { Droppable } from "react-beautiful-dnd"
import { Container, Heading } from "@chakra-ui/react"

export default class Column extends React.Component {
  render() {
    return (
      <Box width="md" height="80vh">
        <Heading>{this.props.column.title}</Heading>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <TaskList innerRef={provided.innerRef} {...provided.droppableProps}>
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Box>
    )
  }
}
