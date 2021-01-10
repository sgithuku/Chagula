import { Link, BlitzPage, useMutation, useQuery, useRouter, useParam } from "blitz"

import logout from "../auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Heading, Container, Box, Text, Image, Button, ButtonGroup } from "@chakra-ui/react"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <Container centerContent>
        <Button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </Container>
    )
  } else {
    return (
      <Container centerContent>
        <ButtonGroup spacing="6">
          <Button href="/signup">Sign Up</Button>
          <Button href="/login">Log In</Button>
        </ButtonGroup>
      </Container>
    )
  }
}
