import { Suspense } from "react"
import { Link, BlitzPage, useMutation, useQuery, useRouter, useParam, setQueryData } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import LoginForm from "app/auth/components/LoginForm"

import updateMeal from "app/meals/mutations/updateMeal"

import {
  Heading,
  Container,
  Box,
  Text,
  Image,
  Button,
  ButtonGroup,
  useColorMode,
  Icon,
} from "@chakra-ui/react"
import Nav from "app/components/Nav"
// import getMeal from "../meals/queries/getMeal"
import getMeals from "../meals/queries/getMeals"
import { Calendar, ForkKnife, X } from "phosphor-react"
import MealBlock from "../components/MealBlock"
import Planner from "./planner"

const Home: BlitzPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [logoutMutation] = useMutation(logout)
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
