import React, { Suspense, useState, useReducer, useEffect } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, BlitzPage, useQuery, useMutation, setQueryData } from "blitz"
import getMeals from "app/meals/queries/getMeals"
import {
  List,
  ListItem,
  ListIcon,
  Container,
  Button,
  Box,
  Heading,
  Image,
  useColorMode,
  IconButton,
  Icon,
} from "@chakra-ui/react"
import { CaretRight, ForkKnife, Plus, X } from "phosphor-react"
import Nav from "../../../components/Nav"
import updateMeal from "app/meals/mutations/updateMeal"
import MealBlock from "../../../components/MealBlock"

import SearchBar from "../../../components/SearchBar"
import Filters from "../../../components/Filters"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const ITEMS_PER_PAGE = 30

export const MealsList = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const router = useRouter()
  // const page = Number(router.query.page) || 0
  // const [{ meals, hasMore }] = usePaginatedQuery(getMeals, {
  //   orderBy: { id: "asc" },
  //   skip: ITEMS_PER_PAGE * page,
  //   take: ITEMS_PER_PAGE,
  // })

  // const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  // const goToNextPage = () => router.push({ query: { page: page + 1 } })

  const [meals, { setQueryData }] = useQuery(getMeals, { where: {} }, {})
  console.log(meals)
  // const cuisines = [...new Set(meals.meals.map((item) => item.category))] // [ 'A', 'B']
  // const [cuisineFilter, setCuisineFilter] = useState(null)

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
            // console.log("this is filter", filter, document);
            if (!document.name.includes(filter)) flag = false
          })
          return flag
        })
      )
    } else {
      setSearchResults(meals.meals)
    }
  }, [filters])

  const onDragStart = () => {
    console.log("drag started")
  }
  const onDragEnd = () => {
    console.log("drag ended")
  }

  return (
    <Container
      width="100vw"
      maxW="100%"
      // maxH="150vh"
      flexDir="row"
      justifyContent="flex-start"
      d="flex"
      alignItems="flex-start"
      mb="12"
    >
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Box width="md" flexDir="row" justifyContent="flex-start">
          <Heading pl="3" size="lg" mb="3">
            Your Meals
          </Heading>
          <SearchBar onSearch={searchAction} customColor={"gray.900"} />
          {filters.size !== 0 && (
            <Filters
              filters={filters}
              filterDispatcher={filterDispatcher}
              // customBG={colorMode === "dark" ? "blue.700" : "blue.700"}
              customColor={"blue.500"}
            />
          )}
          <Button width="100%" mb="3" colorScheme="gray.900" variant="outline">
            <Link href="/meals/new">
              <a>Add a Meal</a>
            </Link>
          </Button>
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
          <Box>
            <Droppable droppableId="longlist">
              {(provided) => (
                <List spacing={3} width="md" ref={provided.innerRef} {...provided.droppableProps}>
                  {searchResults.map((meal, index) => (
                    <Draggable draggableId={`${meal.id}`} index={index}>
                      {(provided, snapshot) => (
                        <ListItem
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          draggable={true}
                          index={index}
                          // key={`${meal.id}`}
                          key={`${meal.id}`}
                          disabled={filters.size !== 0}
                          borderWidth="1px"
                          borderRadius="lg"
                          boxShadow="sm"
                          p="3"
                          _hover={{ bgColor: "green.900", color: "white" }}
                        >
                          <ListIcon
                            as={meal.selected ? ForkKnife : Plus}
                            color="green.500"
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
                            <a>{meal.name}</a>
                          </Link>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </Box>
        </Box>
        <Box
          d="flex"
          flexDir="column"
          flexWrap="wrap"
          justifyItems="flex-start"
          alignItems="flex-start"
          ml="6"
        >
          <Heading pl="3" size="lg" mb="3">
            Meal Planner
          </Heading>
          <Box
            d="flex"
            flexDir="row"
            flexWrap="wrap"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {meals ? (
              meals.meals.map(
                (meal, index) =>
                  meal.selected && (
                    // <Box
                    //   w="xs"
                    //   borderWidth="1px"
                    //   borderRadius="lg"
                    //   borderColor={colorMode === "dark" ? "gray.900" : "green.700"}
                    //   overflow="hidden"
                    //   marginBottom="1em"
                    //   boxShadow="xl"
                    //   color={colorMode === "dark" ? "gray.900" : "green.700"}
                    //   marginX="3"
                    //   bgColor={colorMode === "dark" ? "gray.900" : "green.700"}
                    //   _hover={{ bgColor: "green.900" }}
                    //   position="relative"
                    // >
                    //   <IconButton
                    //     aria-label="Search database"
                    //     borderRadius="full"
                    //     position="absolute"
                    //     onClick={async () => {
                    //       try {
                    //         const updated = await updateMealMutation({
                    //           where: { id: meal.id },
                    //           data: { selected: !meal.selected },
                    //         })
                    //         await setQueryData(updated)
                    //         refetch({ force: true })
                    //         // alert("Success!" + JSON.stringify(updated))
                    //       } catch (error) {
                    //         console.log(error)
                    //         // alert("Error adding meal " + JSON.stringify(error, null, 2))
                    //       }
                    //     }}
                    //     top="-5"
                    //     left="-5"
                    //     icon={
                    //       <Icon
                    //         aria-label="Meals"
                    //         css={colorMode === "dark" ? "gray.900" : "green.700"}
                    //         as={X}
                    //         weight="fill"
                    //       />
                    //     }
                    //   />
                    //   <Image src={`./${meal.category}.jpg`} alt={"meal picture"} />

                    //   <Box d="flex" flexDir="column">
                    //     <Box d="flex" alignItems="center" p="3">
                    //       <Heading as="h4" size="sm" color="gray.50">
                    //         <Link href={`/meals/${meal.id}`}>{meal.name}</Link>
                    //       </Heading>
                    //     </Box>
                    //     <Heading
                    //       className="category"
                    //       paddingX="3"
                    //       size="xs"
                    //       color={colorMode === "dark" ? "gray.500" : "green.200"}
                    //       bgColor="transparent"
                    //       pb="3"
                    //       as="h5"
                    //     >
                    //       {meal.category?.toUpperCase()}
                    //     </Heading>
                    //   </Box>
                    // </Box>
                    <MealBlock meal={meal} />
                  )
              )
            ) : (
              <h2> Loading...</h2>
            )}
          </Box>
        </Box>
      </DragDropContext>
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
