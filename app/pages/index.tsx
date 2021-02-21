import { Container } from "@chakra-ui/react"
import LoginForm from "app/auth/components/LoginForm"
import Nav from "app/components/Nav"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"
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

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
