import { Button, ButtonGroup, Container } from "@chakra-ui/react"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Link, useMutation } from "blitz"
import logout from "../auth/mutations/logout"

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
          <Button>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button>
            <Link href="/login">Log In</Link>
          </Button>
        </ButtonGroup>
      </Container>
    )
  }
}

export default UserInfo
