import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container } from "@chakra-ui/react"
import Nav from "app/components/Nav"
import Layout from "app/layouts/Layout"
import MealForm from "app/meals/components/MealForm"
// import updateMeal from "app/meals/mutations/updateMeal"
import getMeal from "app/meals/queries/getMeal"
import { BlitzPage, useParam, useQuery } from "blitz"
import { Suspense } from "react"

export const EditMeal = () => {
  const mealId = useParam("mealId", "number")
  const [meal] = useQuery(getMeal, { where: { id: mealId } })
  // const [updateMealMutation] = useMutation(updateMeal)
  // console.log("this is the meal", meal)

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
          // onSubmit={async () => {
          //   try {
          //     const updated = await updateMealMutation({
          //       where: { id: meal.id },
          //       data: { name: "MyNewName" },
          //     })
          //     await setQueryData(updated)
          //     alert("Success!" + JSON.stringify(updated))
          //     router.push(`/meals/${updated.id}`)
          //   } catch (error) {
          //     console.log(error)
          //     alert("Error editing meal " + JSON.stringify(error, null, 2))
          //   }
          // }}
        />
      </Box>
    </Container>
  )
}

const EditMealPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditMeal />
    </Suspense>
  )
}

EditMealPage.getLayout = (page) => <Layout title={"Edit Meal"}>{page}</Layout>

export default EditMealPage
