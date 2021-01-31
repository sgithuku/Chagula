import { Link, BlitzPage, useMutation, useQuery, useRouter, useParam } from "blitz"
import Layout from "app/layouts/Layout"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import updateMeal from "app/meals/mutations/updateMeal"

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
  IconButton,
} from "@chakra-ui/react"
import Nav from "app/components/Nav"
import getMeal from "../meals/queries/getMeal"
import getMeals from "../meals/queries/getMeals"
import { X } from "phosphor-react"
import MealBlock from "../components/MealBlock"

const Home: BlitzPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  // const router = useRouter()
  // const mealId = useParam("mealId", "number")
  const [{ meals }] = useQuery(getMeals, { where: {} })
  const [updateMealMutation] = useMutation(updateMeal)

  return (
    <Container centerContent maxW="100vw">
      <Nav />
      <Container maxW="100vw">
        <Heading as="h2">On the menu</Heading>
        <ButtonGroup spacing="3" mt="3" mb="3">
          <Button colorScheme={colorMode === "dark" ? "gray.50" : "white"} p="3" variant="outline">
            <Link href="/addmeal">Add new meals</Link>
          </Button>
          <Button colorScheme={colorMode === "dark" ? "gray.50" : "white"} p="3" variant="outline">
            <Link href="/meals">Meal Planner</Link>
          </Button>
        </ButtonGroup>
        <Box w="100%">
          <Heading>Not Eaten Yet</Heading>
          <Box
            d="flex"
            flexDir="row"
            justifyContent="flex-start"
            w="100%"
            flexWrap="wrap"
            pl="0"
            ml="0"
          >
            {meals.map(
              (meal, index) => meal.selected && meal.already_eaten && <MealBlock meal={meal} />
            )}
          </Box>
        </Box>
        <Box>
          <Heading>Eaten</Heading>
          <Box
            d="flex"
            flexDir="row"
            justifyContent="flex-start"
            w="100%"
            flexWrap="wrap"
            pl="0"
            ml="0"
          >
            {meals.map(
              (meal, index) => meal.selected && !meal.already_eaten && <MealBlock meal={meal} />
            )}
          </Box>
        </Box>
      </Container>
    </Container>
  )
}

Home.getLayout = (page) => <Layout title="Chagula">{page}</Layout>

export default Home
