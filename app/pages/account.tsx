import { Suspense } from "react"
import { Link, BlitzPage, useMutation, useQuery, useRouter, useParam, setQueryData } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

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
  IconButton,
} from "@chakra-ui/react"
import Nav from "app/components/Nav"
// import getMeal from "../meals/queries/getMeal"
import { Calendar, ForkKnife, X } from "phosphor-react"

const Account = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container centerContent maxW="100%">
      <Nav />
    </Container>
  )
}

export default Account
