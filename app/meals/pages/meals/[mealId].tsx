import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Container,
} from "@chakra-ui/react"
import MealBlock from "app/components/MealBlock"
import Nav from "app/components/Nav"
import RecipeDetails from "app/components/Recipe_Details"
import Layout from "app/layouts/Layout"
import deleteMeal from "app/meals/mutations/deleteMeal"
import getMeal from "app/meals/queries/getMeal"
import { BlitzPage, Link, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const Meal = () => {
  const router = useRouter()
  const mealId = useParam("mealId", "number")
  const [meal] = useQuery(getMeal, { where: { id: mealId } })
  const [deleteMealMutation] = useMutation(deleteMeal)

  return (
    <Container
      width="100vw"
      maxW="100%"
      maxH="150vh"
      flexDir="column"
      justifyContent="flex-start"
      d="flex"
      alignItems="flex-start"
    >
      <Nav />
      <Box ml="3">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/meals">Meals</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">
              {meal.name?.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box d="flex" flexDir="row" height="inherit">
          <MealBlock meal={meal} />
          {meal.recipe || meal.link ? <RecipeDetails meal={meal} /> : null}
        </Box>

        <ButtonGroup>
          <Button width="100%" mb="3" colorScheme="gray.900" variant="outline">
            <Link href={`/meals/${meal.id}/edit`}>
              <a>Edit</a>
            </Link>
          </Button>

          <Button
            width="100%"
            mb="3"
            colorScheme="gray.900"
            variant="outline"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteMealMutation({ where: { id: meal.id } })
                router.push("/meals")
              }
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  )
}

const ShowMealPage: BlitzPage = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Meal />
      </Suspense>
    </Layout>
  )
}

ShowMealPage.getLayout = (page) => <Layout title={"Meal"}>{page}</Layout>

export default ShowMealPage
