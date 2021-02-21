import {
  Heading,
  Box,
  Link,
  Container,
  Switch,
  FormControl,
  useColorMode,
  Icon,
  Text,
  Button,
} from "@chakra-ui/react"
import { ForkKnife, Moon, Sun, Gear, UserCircle } from "phosphor-react"
import { light, dark } from "../colors"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Suspense } from "react"
import { useMutation } from "blitz"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const { colorMode, toggleColorMode } = useColorMode()
  if (currentUser) {
    return (
      <>
        <Link pr={["3", "3", "6"]} d="flex" alignItems="center" href="/meals">
          <Icon
            aria-label="Meals"
            css={{ background: "transparent" }}
            as={ForkKnife}
            weight="fill"
            mr="3"
          />
          Meals
        </Link>
        <Link pr={["3", "3", "6"]} d="flex" alignItems="center" href="/account">
          <Icon
            aria-label="Meals"
            css={{ background: "transparent" }}
            as={UserCircle}
            weight="fill"
            mr="3"
          />
          Account
        </Link>
        <Button
          colorScheme={colorMode === "dark" ? dark.link : light.link}
          variant="outline"
          mr={["3", "3", "6"]}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        {/* <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div> */}
      </>
    )
  } else {
    return (
      <>
        <Button
          colorScheme={colorMode === "dark" ? "gray.50" : "white"}
          p="3"
          mr="3"
          variant="outline"
        >
          <Link href="/signup">Sign up</Link>
        </Button>
        <Button
          colorScheme={colorMode === "dark" ? "gray.50" : "white"}
          p="3"
          mr="3"
          variant="outline"
        >
          <Link href="/login">Login</Link>
        </Button>
      </>
    )
  }
}

function Nav() {
  // const isLight = true;
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxWidth="100%">
      <Box
        d="flex"
        flexDirection={["column", "column", "row"]}
        justifyContent={["center", "center", "space-between"]}
        p={["3", "3", "6"]}
        // borderBottom="2"
        borderBottomColor={colorMode === "dark" ? dark.text : light.text}
        borderBottomWidth="1px"
        mb="6"
      >
        <Box justifyContent="flex-start">
          <Heading as="h1" textAlign="center">
            <Link href="/">Chagula</Link>
          </Heading>
        </Box>
        <Box
          alignSelf={["center", "center", "flex-end"]}
          d="flex"
          flex="1"
          justifyContent={"flex-end"}
          flexDirection="row"
        >
          <Suspense fallback={<Text>Loading...</Text>}>
            <UserInfo />
          </Suspense>
          <Box d="flex" alignItems="center">
            <FormControl display="flex" alignItems="center">
              <Icon
                fontSize="lg"
                aria-label="theme"
                // css={{ background: "transparent" }}
                weight="fill"
                fill={colorMode === "dark" ? dark.text : light.text}
                as={colorMode === "dark" ? Moon : Sun}
                mr="3"
              />
              <Switch
                onChange={toggleColorMode}
                isChecked={colorMode === "dark"}
                colorScheme="orange.500"
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Nav
