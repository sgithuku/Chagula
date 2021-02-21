import { Box, Button, Container, Heading } from "@chakra-ui/react"
import Nav from "app/components/Nav"
import Layout from "app/layouts/Layout"
import MealForm from "app/meals/components/MealForm"
// import createMeal from "app/meals/mutations/createMeal"
import { BlitzPage, Link } from "blitz"

const NewMealPage: BlitzPage = () => {
  // const [createMealMutation] = useMutation(createMeal)

  return (
    <Container centerContent>
      <Heading>Create New Meal</Heading>

      <MealForm
        initialValues={{}}
        // onSubmit={async () => {
        //   try {
        //     const meal = await createMealMutation({ data: { name: "MyName" } })
        //     alert("Success!" + JSON.stringify(meal))
        //     router.push(`/meals/${meal.id}`)
        //   } catch (error) {
        //     alert("Error creating meal " + JSON.stringify(error, null, 2))
        //   }
        // }}
      />

      <Box mt="6" mb="6">
        <Button width="md" mb="3" colorScheme="gray.900" variant="outline">
          <Link href="/meals">
            <a>Go back to Meals</a>
          </Link>
        </Button>
      </Box>
    </Container>
  )
}

NewMealPage.getLayout = (page) => (
  <Layout title={"Create New Meal"}>
    <Nav />
    {page}
  </Layout>
)

export default NewMealPage
