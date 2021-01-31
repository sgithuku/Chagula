import React, { useState } from "react"
import { useRouter, useMutation } from "blitz"
import {
  Input,
  Box,
  Heading,
  Button,
  Link,
  FormControl,
  FormLabel,
  FormHelperText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select,
} from "@chakra-ui/react"

import createMeal from "app/meals/mutations/createMeal"
import updateMeal from "app/meals/mutations/updateMeal"

type MealFormProps = {
  initialValues: any
  // onSubmit: React.FormEventHandler<HTMLFormElement>
}

const MealForm = ({ initialValues }: MealFormProps) => {
  const [formState, setFormState] = useState(initialValues)
  const [createMealMutation] = useMutation(createMeal)

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () =>
    setInterval(() => {
      setIsOpen(false)
    }, 3000)

  const onChange = (event) => {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const onSubmit = (state, event) => {
    // console.log("onSubmit called", formState)
    event.preventDefault()
    try {
      // createMeal({ data: state })
      createMealMutation({ data: state })
      alert("Success!" + JSON.stringify(state))
      setIsOpen(true)
    } catch (error) {
      console.log("Error creating meal", error)
    }
  }

  const Success = () => {
    if (isOpen) {
      return (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle mr={2}>Meal Added</AlertTitle>
          <AlertDescription>{formState.name}</AlertDescription>
          {/* <CloseButton position="absolute" right="8px" top="8px" /> */}
        </Alert>
      )
    } else {
      return <></>
    }
  }

  return (
    <Box
      border="1px"
      borderRadius="xl"
      borderColor="gray.500"
      p="3"
      mt="3"
      width="md"
      boxShadow="xl"
    >
      <FormControl onSubmit={(event) => onSubmit(formState, event)}>
        <Box d="flex" flexDir="column" mb="3" justifyContent="flex-start">
          <FormLabel mt="3">Meal</FormLabel>
          <Input type="text" name="name" value={formState.name} onChange={onChange} />
          <FormHelperText>What is the meal?</FormHelperText>
        </Box>
        <Box d="flex" flexDir="column" mb="3" justifyContent="flex-start">
          <FormLabel mt="3">Custom image</FormLabel>
          <Input type="text" name="image_url" value={formState.image_url} onChange={onChange} />
          <FormHelperText>Upload a custom image for the meal (not required)</FormHelperText>
        </Box>

        <Box d="flex" flexDir="column" mb="3" justifyContent="flex-start">
          <FormLabel pr="0" width="100%">
            Type of Cuisine
            <Select
              placeholder="Select cuisine"
              value={formState.category}
              onChange={onChange}
              name="category"
            >
              <option value="baking">Baking</option>
              <option value="dessert">Dessert</option>
              <option value="asian">East Asian</option>
              <option value="european">European</option>
              <option value="indian">Indian</option>
              <option value="mexican">Mexican</option>
            </Select>
          </FormLabel>
          {/* <Input type="text" name="category" value={formState.category} onChange={onChange} /> */}
          <FormHelperText>What kind of food is it?</FormHelperText>
          <Box d="flex" flexDir="column" mb="3" justifyContent="flex-start">
            <FormLabel mt="3">Recipe</FormLabel>
            <Input type="text" name="recipe" value={formState.name} onChange={onChange} />
            <FormHelperText>Add a link to a recipe here (not required)</FormHelperText>
          </Box>
        </Box>

        <Button width="100%" mb="3" colorScheme="gray.900" variant="outline">
          Submit
        </Button>
      </FormControl>
      <Box p="3">
        <Success />
      </Box>
    </Box>
  )
}

export default MealForm
