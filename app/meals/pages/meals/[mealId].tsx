import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import Nav from "app/components/Nav"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"

import {
  Container,
  Button,
  Box,
  Heading,
  Image,
  useColorMode,
  IconButton,
  Icon,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react"

import getMeal from "app/meals/queries/getMeal"
import deleteMeal from "app/meals/mutations/deleteMeal"
import MealBlock from "app/components/MealBlock"

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
            <BreadcrumbLink href="#">{meal.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <MealBlock meal={meal} />
        {/* <pre>{JSON.stringify(meal, null, 2)}</pre> */}
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
