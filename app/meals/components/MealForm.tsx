import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Progress,
  Select,
  Textarea,
} from "@chakra-ui/react"
import createMeal from "app/meals/mutations/createMeal"
import { useMutation } from "blitz"
import React, { useState } from "react"
import { Field, Form, useField, useForm } from "react-final-form"
import validate from "./validate"
type MealFormProps = {
  initialValues: any
  onSubmit: any
  // onSubmit: React.FormEventHandler<HTMLFormElement>
}

const MealForm = ({ initialValues, onSubmit }: MealFormProps) => {
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

  // const onSubmit = (state, event) => {
  //   console.log("onSubmit called", state, event)
  //   // event.preventDefault()
  //   try {
  //     // createMeal({ data: state })
  //     createMealMutation({ data: state })
  //     // alert("Success!" + JSON.stringify(state))
  //     setIsOpen(true)
  //   } catch (error) {
  //     console.log("Error creating meal", error)
  //   }
  // }

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

  const Control = ({ name, ...rest }) => {
    const {
      meta: { error, touched },
    } = useField(name, { subscription: { touched: true, error: true } })
    return <FormControl {...rest} isInvalid={error && touched} />
  }

  const Error = ({ name }) => {
    const {
      meta: { error },
    } = useField(name, { subscription: { error: true } })
    return <FormErrorMessage>{error}</FormErrorMessage>
  }

  const InputControl = ({ name, label }) => {
    const { input, meta } = useField(name)
    return (
      <Control name={name} my={4}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input {...input} isInvalid={meta.error && meta.touched} id={name} placeholder={label} />
        <Error name={name} />
      </Control>
    )
  }

  const TextareaControl = ({ name, label }) => (
    <Control name={name} my={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field name={name} component={AdaptedTextarea} placeholder={label} id={name} />
      <Error name={name} />
    </Control>
  )
  const SelectControl = ({ name, label, children }) => (
    <Control name={name} my={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Field name={name} placeholder={label} id={name} component={AdaptedSelect}>
        {children}
      </Field>
      <Error name={name} />
    </Control>
  )

  const PercentComplete = (props) => {
    const form = useForm()
    const numFields = form.getRegisteredFields().length
    const numErrors = Object.keys(form.getState().errors).length
    // console.log("form", numFields, numErrors)
    return (
      <Progress
        value={numFields === 0 ? 0 : ((numFields - numErrors) / numFields) * 100}
        colorScheme="green"
        {...props}
      />
    )
  }

  const AdaptedTextarea = ({ input, meta, ...rest }) => (
    <Textarea {...input} {...rest} isInvalid={meta.error && meta.touched} />
  )
  const AdaptedSelect = ({ input, meta, ...rest }) => (
    <Select {...input} {...rest} isInvalid={meta.error && meta.touched} />
  )

  return (
    <Box
      border="1px"
      borderRadius="xl"
      borderColor="gray.500"
      p="3"
      mt="3"
      width={["100%", "100%", "md"]}
      boxShadow="xl"
    >
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, errors, submitting, pristine, values }) => (
          <Box as="form" onSubmit={handleSubmit}>
            <InputControl name="name" label="Meal" />
            <SelectControl name="category" label="Select cuisine">
              <option value="african">African</option>
              <option value="baking">Baking</option>
              <option value="dessert">Dessert</option>
              <option value="asian">East Asian</option>
              <option value="european">European</option>
              <option value="indian">Indian</option>
              <option value="mexican">Mexican</option>
            </SelectControl>
            {values.category ? (
              <Image
                src={`/${values.category}.jpg`}
                alt={"meal picture"}
                borderRadius="lg"
                // maxH="200px"
              />
            ) : null}
            <InputControl name="link" label="Link to recipe" />
            <TextareaControl name="recipe" label="Recipe / Notes" />
            <PercentComplete size="sm" my={2} isAnimated />
            <ButtonGroup spacing={4}>
              <Button
                type="submit"
                loadingText="Submitting"
                colorScheme="gray.900"
                variant="outline"
                isLoading={submitting}
              >
                Submit
              </Button>
              <Button
                colorScheme="gray.900"
                variant="outline"
                onClick={form.reset}
                isDisabled={submitting || pristine}
              >
                Reset
              </Button>
            </ButtonGroup>
          </Box>
        )}
      />
      <Box p="3">
        <Success />
      </Box>
    </Box>
  )
}

export default MealForm
