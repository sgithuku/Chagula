import { Box, Button, Container, Heading } from "@chakra-ui/react"
import Nav from "app/components/Nav"
import Layout from "app/layouts/Layout"
import MealForm from "app/meals/components/MealForm"
import createMeal from "app/meals/mutations/createMeal"
import { BlitzPage, Link, useMutation } from "blitz"

const NewMealPage: BlitzPage = () => {
  const [createMealMutation] = useMutation(createMeal)

  return (
    <Container centerContent>
      <Heading>Create New Meal</Heading>

      <MealForm
        initialValues={{}}
        onSubmit={async (state, event) => {
          console.log("onSubmit called", state, event)
          // event.preventDefault()
          try {
            // createMeal({ data: state })
            createMealMutation({ data: state })
            // alert("Success!" + JSON.stringify(state))
            // setIsOpen(true)
          } catch (error) {
            console.log("Error creating meal", error)
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
