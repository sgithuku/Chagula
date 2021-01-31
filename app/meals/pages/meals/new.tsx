import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createMeal from "app/meals/mutations/createMeal"
import MealForm from "app/meals/components/MealForm"
import Nav from "app/components/Nav"
import { Container, Heading, Button, Box } from "@chakra-ui/react"

const NewMealPage: BlitzPage = () => {
  const router = useRouter()
  const [createMealMutation] = useMutation(createMeal)

  return (
    <Container centerContent>
      <Heading>Create New Meal</Heading>

      <MealForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const meal = await createMealMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(meal))
            router.push(`/meals/${meal.id}`)
          } catch (error) {
            alert("Error creating meal " + JSON.stringify(error, null, 2))
          }
        }}
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
