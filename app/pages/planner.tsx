import updateMeal from "app/meals/mutations/updateMeal"
import { Link, BlitzPage, useMutation, useQuery, useRouter, useParam, setQueryData } from "blitz"

import {
  Heading,
  Container,
  Box,
  Text,
  Image,
  Button,
  ButtonGroup,
  useColorMode,
  Icon,
} from "@chakra-ui/react"
import Nav from "app/components/Nav"
// import getMeal from "../meals/queries/getMeal"
import getMeals from "../meals/queries/getMeals"
import { Calendar, ForkKnife, X } from "phosphor-react"
import MealBlock from "../components/MealBlock"

const Planner = () => {
  const [meals, { setQueryData }] = useQuery(getMeals, { where: {} }, {})
  const [updateMealMutation] = useMutation(updateMeal)
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container centerContent maxW="100%">
      <Nav />
      <Container maxW="100vw">
        <ButtonGroup spacing="3" marginBottom="6">
          <Button
            colorScheme={colorMode === "dark" ? "gray.50" : "white"}
            p="3"
            variant="outline"
            aria-label="add new meal"
          >
            <Icon aria-label="add-meal" as={ForkKnife} weight="fill" mr="1" />
            <Link href="/meals/new"> Add new meal</Link>
          </Button>
          <Button colorScheme={colorMode === "dark" ? "gray.50" : "white"} p="3" variant="outline">
            <Icon aria-label="add-meal" as={Calendar} weight="fill" mr="1" />
            <Link href="/meals">Meal Planner</Link>
          </Button>
        </ButtonGroup>
        <Box w="100%">
          {meals.chosen > 0 && <Heading>Not Eaten Yet</Heading>}
          <Box
            d="flex"
            flexDir="row"
            justifyContent="flex-start"
            w="100%"
            flexWrap="wrap"
            pl="0"
            ml="0"
          >
            {meals.meals.map(
              (meal, index) =>
                meal.selected && !meal.already_eaten && <MealBlock meal={meal} key={index} />
            )}
          </Box>
        </Box>
        <Box>
          {meals.chosen > 0 && <Heading>Eaten</Heading>}
          <Box
            d="flex"
            flexDir="row"
            justifyContent="flex-start"
            w="100%"
            flexWrap="wrap"
            pl="0"
            ml="0"
          >
            {meals.meals.map(
              (meal, index) =>
                meal.selected && meal.already_eaten && <MealBlock meal={meal} key={index} />
            )}
          </Box>
          {meals.chosen > 0 && (
            <Button
              colorScheme={colorMode === "dark" ? "gray.50" : "white"}
              p="3"
              marginY="3"
              variant="outline"
              onClick={async () => {
                try {
                  // const updated = await updateMealMutation({
                  //   where: {},
                  //   data: { selected: false },
                  // })
                  await meals.meals.map((meal, index) => {
                    updateMealMutation({
                      where: { id: index },
                      data: { selected: false },
                    })
                  })
                  // await setQueryData(updated)
                  // await refetch({ force: true })
                  // alert("Success!" + JSON.stringify(updated))
                } catch (error) {
                  console.log(error)
                  // alert("Error adding meal " + JSON.stringify(error, null, 2))
                }
              }}
            >
              <Icon aria-label="add-meal" as={X} weight="fill" mr="1" />
              Reset All Meals
            </Button>
          )}
        </Box>
      </Container>
    </Container>
  )
}
export default Planner
