import { Box, Container, Heading, List, Spinner } from "@chakra-ui/react"
import MealListitem from "app/components/Meal_Listitem"
import Nav from "app/components/Nav"
import Layout from "app/layouts/Layout"
import getMeals from "app/meals/queries/getMeals"
import { useQuery } from "blitz"
import React, { Suspense, useState } from "react"
// const ITEMS_PER_PAGE = 30

export const MealsList = (props) => {
  // const { colorMode } = useColorMode()
  // const [withRecipes, setWithRecipes] = useState(true)
  // useEffect(() => {
  //   console.log("withRecipes changed")
  // }, [withRecipes])

  const [meals, { refetch }] = useQuery(getMeals, {
    where: {
      name: {
        contains: "",
      },
    },
    orderBy: { name: "asc" },
  })
  console.log("render", meals)
  // const flipRecipes = async () => {
  //   try {
  //     await setWithRecipes(!withRecipes)
  //     await refetch({ force: true })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // console.log(meals)

  // console.log(refetch)

  // const [search, setSearch] = useState("")
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
      {/* <Text>
        <strong>{search}</strong>
      </Text> */}
      {/* <IconButton
        aria-label="Items with recipes"
        icon={withRecipes ? <Notepad /> : <NoteBlank />}
        onClick={setWithRecipes((prev) => !prev)}
        size="lg"
      /> */}

      <Box w={"100%"}>
        <List d="flex" flexDir="row" flexWrap="wrap" justifyContent="center">
          {meals?.hasRecipe.map((meal, index) => MealListitem(meal, refetch))}
        </List>
      </Box>
    </Container>
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
