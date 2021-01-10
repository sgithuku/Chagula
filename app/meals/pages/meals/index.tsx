import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getMeals from "app/meals/queries/getMeals"
import { List, ListItem, ListIcon, Container, Button } from "@chakra-ui/react"
import { CaretRight } from "phosphor-react"
import Nav from "../../../components/Nav"

const ITEMS_PER_PAGE = 100

export const MealsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ meals, hasMore }] = usePaginatedQuery(getMeals, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <Container>
      <Button width="100%" mb="3">
        <Link href="/meals/new">
          <a>Add a Meal</a>
        </Link>
      </Button>
      <List spacing={3}>
        {meals.map((meal) => (
          <ListItem
            key={meal.id}
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
      </List>

      <Button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </Button>
      <Button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </Button>
    </Container>
  )
}

const MealsPage: BlitzPage = () => {
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
