import { Container, Spinner } from "@chakra-ui/react"
import LoginForm from "app/auth/components/LoginForm"
import Nav from "app/components/Nav"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"
import { Suspense } from "react"
import Planner from "../components/planner"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return <Planner />
  } else {
    return (
      <Container centerContent maxW="100%">
        <Nav />
        <LoginForm />
      </Container>
    )
  }
}
console.log("render")

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => (
  <Suspense
    fallback={
      <Container
        centerContent
        maxH="100vh"
        maxW="100%"
        h="100vh"
        d="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Container>
    }
  >
    <Layout title="Home">{page}</Layout>
  </Suspense>
)

export default Home
