import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Heading,
} from "@chakra-ui/react"
import Nav from "app/components/Nav"
import Layout from "app/layouts/Layout"
import MealForm from "app/meals/components/MealForm"
import updateMeal from "app/meals/mutations/updateMeal"
import getMeal from "app/meals/queries/getMeal"
import { BlitzPage, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

export const EditMeal = () => {
  const mealId = useParam("mealId", "number")
  const [meal, { setQueryData }] = useQuery(getMeal, { where: { id: mealId } })
  const [updateMealMutation] = useMutation(updateMeal)
  // console.log("this is the meal", meal)
  const router = useRouter()

  return (
    <Container
      width="100vw"
      maxW="100%"
      flexDir="column"
      d="flex"
      alignItems="flex-start"
      centerContent
      mb="12"
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

        <MealForm
          initialValues={meal}
          onSubmit={async (state, event) => {
            try {
              // await console.log(state.id)
              const updated = await updateMealMutation({
                where: { id: state.id },
                data: state,
              })
              await setQueryData(updated)
              // alert("Success!" + JSON.stringify(updated))
              router.push(`/meals/${updated.id}`)
            } catch (error) {
              console.log(error)
              // alert("Error editing meal " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </Box>
    </Container>
  )
}

const EditMealPage: BlitzPage = () => {
  return (
    <Suspense fallback={<Heading>Loading...</Heading>}>
      <EditMeal />
    </Suspense>
  )
}

EditMealPage.getLayout = (page) => <Layout title={"Edit Meal"}>{page}</Layout>

export default EditMealPage
