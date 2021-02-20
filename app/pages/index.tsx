import { Suspense } from "react"
import { Link, BlitzPage, useMutation, useQuery, useRouter, useParam, setQueryData } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

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
// import getMeal from "../meals/queries/getMeal"
import getMeals from "../meals/queries/getMeals"
import { Calendar, ForkKnife, X } from "phosphor-react"
import MealBlock from "../components/MealBlock"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href="/signup">
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href="/login">
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  // const router = useRouter()
  // const mealId = useParam("mealId", "number")
  const [meals, { setQueryData }] = useQuery(getMeals, { where: {} }, {})
  const [updateMealMutation] = useMutation(updateMeal)

  return (
    <Container centerContent maxW="100vw">
      <Nav />
      <Container maxW="100vw">
        <ButtonGroup spacing="3" marginBottom="6">
          <Button
            colorScheme={colorMode === "dark" ? "gray.50" : "white"}
            p="3"
            variant="outline"
            aria-label="add meal"
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
              Reset Meals You've Eaten
            </Button>
          )}
        </Box>
      </Container>
    </Container>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
