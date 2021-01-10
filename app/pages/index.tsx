import { Link, BlitzPage, useMutation, useQuery, useRouter, useParam } from "blitz"
import Layout from "app/layouts/Layout"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Heading, Container, Box, Text, Image, Button, ButtonGroup } from "@chakra-ui/react"
import Nav from "app/components/Nav"
import getMeal from "../meals/queries/getMeal"
import getMeals from "../meals/queries/getMeals"

const Home: BlitzPage = () => {
  // const router = useRouter()
  // const mealId = useParam("mealId", "number")
  const [meals] = useQuery(getMeals, { where: {} })
  const [meal] = useQuery(
    getMeal,
    { where: { id: Math.floor(Math.random() * meals.count) } },
    { refetchOnWindowFocus: false, refetchOnMount: false, staleTime: 3000 }
  )

  return (
    <Container centerContent maxW="100%" h="100vh" justifyContent="space-between" paddingX="0">
      <Nav />
      <Container centerContent maxW="100%" h="100vh" justifyContent="center" paddingX="0">
        <Heading as="h2" size="xl">
          So what should we eat today?
        </Heading>
        <Text>Refresh for more options</Text>
        <Box
          maxW="md"
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
          overflow="hidden"
          marginBottom="1em"
          boxShadow="xl"
          justifyContent="center"
          alignItems="center"
          m="12"
        >
          <Image src={`../${meal.category}.jpg`} alt={"meal picture"} />

          <Box d="flex" flexDir="column">
            <Box d="flex" alignItems="center" p="3">
              <Heading as="h4">
                <Link href={`/meals/${meal.id}`}>{meal.name}</Link>
              </Heading>
            </Box>
            <Box mt="1" as="h6" className="category" p="3">
              {meal.category?.toUpperCase()}
            </Box>
          </Box>
        </Box>

        <ButtonGroup spacing="6">
          <Button variant="fill">
            <Link href="/addmeal">Add meals</Link>
          </Button>
          <Button variant="fill">
            <Link href="/meals">Meal list</Link>
          </Button>
        </ButtonGroup>
      </Container>
    </Container>
  )
}

Home.getLayout = (page) => <Layout title="Chagula">{page}</Layout>

export default Home
