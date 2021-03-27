import { Box, Container, Heading, List, ListIcon, ListItem, useColorMode } from "@chakra-ui/react"
import Layout from "app/layouts/Layout"
import updateMeal from "app/meals/mutations/updateMeal"
import getMeals from "app/meals/queries/getMeals"
import { Link, useMutation, useQuery, useRouter } from "blitz"
import { ForkKnife, Plus } from "phosphor-react"
import React, { Suspense, useEffect, useReducer, useState } from "react"
import Filters from "../../../components/Filters"
import Nav from "../../../components/Nav"
import SearchBar from "../../../components/SearchBar"

const ITEMS_PER_PAGE = 30

export const MealsList = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const router = useRouter()

  const [meals, { setQueryData }] = useQuery(getMeals, { where: {}, orderBy: { name: "asc" } }, {})

  const [updateMealMutation] = useMutation(updateMeal)

  const [searchResults, setSearchResults] = useState(meals.meals)
  const filterReducer = (state = new Set([]), action) => {
    switch (action.type) {
      case "ADD_FILTER":
        return new Set([...state, action.filter.trim()])
      case "REMOVE_FILTER":
        return new Set([...state].filter((filter) => filter !== action.filter))
      case "RESET_FILTER":
        return new Set([])
      case "LIST_FILTERS":
        return new Set(...state)
      default:
        return state
    }
  }

  const [filters, filterDispatcher] = useReducer(filterReducer, new Set([]))

  const searchAction = () => {
    const searchInput = document.getElementById("search-input")

    if (searchInput.value.length !== 0) {
      searchInput.value.split(",").map((filter) => {
        filterDispatcher({ type: "ADD_FILTER", filter: filter })
      })
      searchInput.value = ""
    }
  }

  useEffect(() => {
    if (filters.size !== 0) {
      setSearchResults(
        [...meals.meals].filter((document) => {
          let flag = true
          ;[...filters].map((filter) => {
            console.log("this is filter", filter)
            if (!document.name.includes(filter)) flag = false
          })
          return flag
        })
      )
    } else {
      setSearchResults(meals.meals)
    }
  }, [filters])

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
      <SearchBar onSearch={searchAction} customColor={"gray.50"} />
      {filters.size !== 0 && (
        <Filters
          filters={filters}
          filterDispatcher={filterDispatcher}
          // customBG={colorMode === "dark" ? "blue.700" : "blue.700"}
          customColor={"green.500"}
        />
      )}
      {/* <Box d="flex" justifyContent="space-between" mt="3" mb="3">
            {cuisines.map((food, index) => (
              <Button
                // color={colorMode === "dark" ? "gray.50" : "gray.700"}
                colorScheme="gray.50"
                variant="ghost"
                p="3"
                variant="outline"
                size="sm"
              >
                {food.replace(/^\w/, (c) => c.toUpperCase())}
              </Button>
            ))}
          </Box> */}
      <Box w={"100%"}>
        <List d="flex" flexDir="row" flexWrap="wrap" justifyContent="center">
          {searchResults.map((meal, index) => (
            <ListItem
              index={index}
              // key={`${meal.id}`}
              key={`${meal.id}`}
              disabled={filters.size !== 0}
              paddingY="2"
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
            >
              <ListIcon
                as={meal.selected ? ForkKnife : Plus}
                verticalAlign="center"
                color="green.500"
                ml="3"
                color={colorMode === "dark" ? "green.700" : "gray.50"}
                onClick={async () => {
                  try {
                    const updated = await updateMealMutation({
                      where: { id: meal.id },
                      data: { selected: !meal.selected },
                    })
                    await setQueryData(updated)
                    await refetch({ force: true })
                    // alert("Success!" + JSON.stringify(updated))
                  } catch (error) {
                    console.log(error)
                    // alert("Error adding meal " + JSON.stringify(error, null, 2))
                  }
                }}
              />
              <Link href={`/meals/${meal.id}`}>
                {meal.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
              </Link>
            </ListItem>
            /* https://www.digitalocean.com/community/tutorials/js-capitalizing-strings */
          ))}
        </List>
      </Box>
    </Container>
  )
}

const MealsPage = () => {
  return (
    <Container centerContent w="100%" maxW="100%">
      <Nav />

      <Suspense fallback={<div>Loading...</div>}>
        <MealsList />
      </Suspense>
    </Container>
  )
}

MealsPage.getLayout = (page) => <Layout title={"Meals"}>{page}</Layout>

export default MealsPage
