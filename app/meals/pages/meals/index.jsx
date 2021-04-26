import {
  Box,
  Container,
  Heading,
  IconButton,
  List,
  ListItem,
  Spinner,
  Tag,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import Nav from "app/components/Nav"
import Layout from "app/layouts/Layout"
import updateMeal from "app/meals/mutations/updateMeal"
import getMeals from "app/meals/queries/getMeals"
import { Link, useMutation, useQuery } from "blitz"
import { ForkKnife, Plus } from "phosphor-react"
import React, { Suspense, useState } from "react"
// const ITEMS_PER_PAGE = 30

export const MealsList = (props) => {
  const { colorMode } = useColorMode()

  const [meals, { refetch, isLoading, error }] = useQuery(getMeals, {
    where: {
      name: {
        contains: "",
      },
    },
    orderBy: { name: "asc" },
  })

  const [search, setSearch] = useState("")
  // FIXME: This needs its own hook to work for some reason. useFetch may fix this but I don't understand react-query well enough yet.
  // const searchAction = (value) => {
  //   // console.log(value, search, isLoading)
  //   // try {
  //   //   await setSearch(value)
  //   //   // await refetch({ force: true })
  //   // } catch (err) {
  //   //   console.log(err)
  //   // }

  // }

  return (
    <Container
      width="100%"
      maxW="100%"
      // maxH="150vh"
      m={{ base: 0 }}
      justifyContent="center"
      d="flex"
      flexDir="column"
      alignItems="center"
    >
      <Heading pl="3" size="lg" mb="3">
        Your Meals
      </Heading>
      {/* <SearchBar searchFunction={searchAction} /> */}
      <Text>
        <strong>{search}</strong>
      </Text>

      <Box w={"100%"}>
        <List d="flex" flexDir="row" flexWrap="wrap" justifyContent="center">
          {meals?.meals.map((meal, index) => (
            <ListItem
              // index={index}
              // key={`${meal.id}`}
              key={meal.id}
              // disabled={filters.size !== 0}
              paddingY="2"
              paddingX="2"
              _hover={{ bgColor: "green.900", color: "white" }}
              justifyContent="center"
              width="sm"
              borderWidth="1px"
              borderRadius="lg"
              borderColor={colorMode === "dark" ? "gray.900" : "green.700"}
              color="white"
              marginBottom="1em"
              boxShadow="xl"
              bgColor={colorMode === "dark" ? "gray.900" : "green.700"}
              mr="3"
              d="flex"
              flexDir="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box d="flex" flexDir="row" justifyContent="space-between" flexGrow="1" pr="2">
                <Link href={`/meals/${meal.id}`}>
                  {meal.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                </Link>
                {meal.timesEaten > 0 ? (
                  <Tag variant="subtle" size="lg">
                    {meal.timesEaten}
                  </Tag>
                ) : null}
              </Box>
              <Box>{MealIcon(meal, refetch)}</Box>
            </ListItem>
            /* https://www.digitalocean.com/community/tutorials/js-capitalizing-strings */
          ))}
        </List>
      </Box>
    </Container>
  )
}

const MealIcon = (meal, refetch) => {
  const [updateMealMutation] = useMutation(updateMeal, { useErrorBoundary: true })
  const { colorMode } = useColorMode()

  const setSelectMeal = async () => {
    try {
      await updateMealMutation({
        where: { id: meal.id },
        data: { selected: !meal.selected },
      })
      await refetch({ force: true })
    } catch (error) {
      console.log(error)
      // alert("Error adding meal " + JSON.stringify(error, null, 2))
    }
  }
  return (
    <IconButton
      colorScheme={colorMode === "dark" ? "white" : "blackAlpha"}
      onClick={setSelectMeal}
      variant={colorMode === "dark" ? "outline" : "solid"}
      icon={meal.selected ? <ForkKnife /> : <Plus />}
      key={meal.id + "icon"}
      size="sm"
    />
  )
}

const MealsPage = () => {
  return (
    <Container centerContent w="100%" maxW="100%">
      <Nav />

      <Suspense fallback={<Spinner size="md" />}>
        <MealsList />
      </Suspense>
    </Container>
  )
}

MealsPage.getLayout = (page) => <Layout title={"Meals"}>{page}</Layout>

export default MealsPage
