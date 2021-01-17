import React, { Suspense, useState, useReducer, useEffect } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage, useQuery } from "blitz"
import getMeals from "app/meals/queries/getMeals"
import { List, ListItem, ListIcon, Container, Button, Box, forwardRef } from "@chakra-ui/react"
import { CaretRight } from "phosphor-react"
import Nav from "../../../components/Nav"

import SearchBar from "../../../components/SearchBar"
import Filters from "../../../components/Filters"

import { DragDropContext, Droppable } from "react-beautiful-dnd"

const ITEMS_PER_PAGE = 150

export const MealsList = ({ allMeals }) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ meals, hasMore }] = usePaginatedQuery(getMeals, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  // const [{ allMeals, getAllMeals }] = useQuery(getMeals, {where: {}})

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  const [searchResults, setSearchResults] = useState(meals)
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
        [...meals].filter((document) => {
          let flag = true
          ;[...filters].map((filter) => {
            // console.log("this is filter", filter, document);
            if (!document.name.includes(filter)) flag = false
          })
          return flag
        })
      )
    } else {
      setSearchResults(meals)
    }
  }, [filters])

  const onDragStart = () => {
    console.log("drag started")
  }
  const onDragEnd = () => {
    console.log("drag ended")
  }

  return (
    <Container width="100%" maxW="100%" justifyContent="flex-start">
      <SearchBar onSearch={searchAction} customColor={"gray.500"} />
      {filters.size !== 0 && (
        <Filters
          filters={filters}
          filterDispatcher={filterDispatcher}
          // customBG={colorMode === "dark" ? "blue.700" : "blue.700"}
          customColor={"blue.500"}
        />
      )}
      <Button width="md" mb="3">
        <Link href="/meals/new">
          <a>Add a Meal</a>
        </Link>
      </Button>
      <Box d="flex" flexDir="row" justifyContent="flex-start">
        <DragDropContext onDragStart={() => console.log("drag started")} onDragEnd={onDragEnd}>
          <Droppable droppableId={"longlist"}>
            {(provided) => (
              <List spacing={3} width="md" {...provided.droppableProps} ref={provided.innerRef}>
                {searchResults.map((meal, index) => (
                  <ListItem
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    draggableId={meal.id}
                    index={index}
                    key={meal.id}
                    id={meal.id}
                    disabled={filters.size !== 0}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="sm"
                    p="3"
                    _hover={{ bgColor: "gray.900", color: "green.50" }}
                  >
                    <ListIcon as={CaretRight} color="green.500" />
                    <Link href={`/meals/${meal.id}`}>
                      <a>{meal.name}</a>
                    </Link>
                  </ListItem>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Box>

      <Button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </Button>
      <Button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </Button>
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
