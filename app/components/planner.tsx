import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  Icon,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import Nav from "app/components/Nav"
import updateMeal from "app/meals/mutations/updateMeal"
import { Link, useMutation, useQuery } from "blitz"
import { Calendar, ForkKnife, X } from "phosphor-react"
// import getMeal from "../meals/queries/getMeal"
import getMeals from "../meals/queries/getMeals"
import DaysBlock from "./DaysBlock"
import MealBlock from "./MealBlock"

const Planner = () => {
  const [meals, { refetch }] = useQuery(getMeals, { where: {} }, {})
  const [updateMealMutation] = useMutation(updateMeal)
  const { colorMode } = useColorMode()

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
            <Link href="/meals">{`Meal List [${meals.chosen}]`}</Link>
          </Button>
        </ButtonGroup>
        <Box w="100%">
          {meals.chosen < 1 ? (
            <Box>
              <Text size="lg" mb="3">
                <Icon aria-label="add-meal" as={ForkKnife} weight="fill" mr="1" />
                Head to the <b>Meal Planner</b> to add some meals or use the <b>Add new meal</b>{" "}
                button above.
              </Text>
              <Image src="/plate.jpg" alt="Meal Image" w="50%" borderRadius="xl" />
            </Box>
          ) : null}
          {meals.chosen > 0 && <Heading>Planner</Heading>}

          <Box
            d="flex"
            flexDir="row"
            justifyContent="flex-start"
            w="100%"
            flexWrap="wrap"
            pl="0"
            ml="0"
          >
            <DaysBlock />
            {meals.meals.map(
              (meal, index) => meal.selected && <MealBlock meal={meal} key={index} />
            )}
          </Box>
        </Box>
        <Box>
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
                    return updateMealMutation({
                      where: { id: index },
                      data: { selected: false },
                    })
                  })
                  // await setQueryData(updated)
                  await refetch()
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
