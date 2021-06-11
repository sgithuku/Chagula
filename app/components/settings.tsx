import {
  Box,
  Container,
  Heading,
  Icon,
  IconButton,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { dark, light } from "app/colors"
import Nav from "app/components/Nav"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Coffee, GithubLogo, Newspaper, TwitterLogo } from "phosphor-react"

const Settings = () => {
  const { colorMode } = useColorMode()
  const currentUser = useCurrentUser()

  if (currentUser) {
    console.log(currentUser)
    return (
      <Container centerContent maxW="100%">
        <Nav />
        <Box
          backgroundColor={colorMode === "dark" ? "rgba(0, 0, 0, 0.7)" : "#F0F7EE"}
          width={{ base: "100%", md: "md" }}
          borderRadius="lg"
          p="6"
          border="3"
          boxShadow="base"
        >
          <Heading as="h2" mb="6">
            Account Details
          </Heading>
          <Heading as="h4" mt="3" size="md">
            Email
          </Heading>
          <Text>{currentUser.email}</Text>
          <Heading as="h4" size="md" marginTop="6">
            Password
          </Heading>
          <Link href="change-password" mb="3">
            Change your password
          </Link>
        </Box>
        <Box
          backgroundColor={colorMode === "dark" ? "rgba(0, 0, 0, 0.7)" : "#F0F7EE"}
          width={{ base: "100%", md: "md" }}
          borderRadius="lg"
          p="6"
          border="3"
          boxShadow="base"
          mt="6"
          d="flex"
          flexDir="column"
        >
          <Heading as="h2" marginY="6">
            About Chagula
          </Heading>
          <Text mb="6">
            We built Chagula to help us plan the meals we'd make each week because lockdowns make it
            hard to keep the food we eat interesting.
          </Text>
          <Link href="https://github.com/sgithuku/Chagula" mb="3">
            <IconButton
              aria-label="Github link"
              _hover={{ bgColor: dark.switches }}
              variant="unstyled"
              mr="3"
              icon={
                <Icon
                  aria-label="github"
                  color={colorMode === "dark" ? dark.text : light.text}
                  as={GithubLogo}
                  weight="fill"
                />
              }
            />
            Source on Github
          </Link>
          <Link href="https://shaung.dev" mb="3">
            <IconButton
              aria-label="Shaun_g blog"
              _hover={{ bgColor: dark.switches }}
              variant="unstyled"
              mr="3"
              color={colorMode === "dark" ? "#F0F7EE" : dark.backgroundColor}
              borderRadius="md"
              icon={
                <Icon
                  aria-label="github"
                  // color={colorMode === "dark" ? light.text : dark.text}
                  as={Newspaper}
                  weight="fill"
                />
              }
            />
            My blog
          </Link>
          <Link href="https://twitter.com/shaun_g">
            <IconButton
              aria-label="Shaun_g twitter"
              _hover={{ bgColor: dark.switches }}
              variant="unstyled"
              mr="3"
              color={colorMode === "dark" ? "#F0F7EE" : dark.backgroundColor}
              borderRadius="md"
              icon={
                <Icon
                  aria-label="github"
                  color={colorMode === "dark" ? dark.switches : light.text}
                  as={TwitterLogo}
                  weight="fill"
                />
              }
            />
            Reach out on twitter
          </Link>
        </Box>
        <Box
          backgroundColor={colorMode === "dark" ? "rgba(0, 0, 0, 0.7)" : "#F0F7EE"}
          width={{ base: "100%", md: "md" }}
          borderRadius="lg"
          p="6"
          border="3"
          boxShadow="base"
          mt="6"
          d="flex"
          flexDir="row"
        >
          <Text mr="1">All (default) images available on </Text>{" "}
          <Link href="https://unsplash.com"> Unsplash.</Link>
        </Box>
        <Box d="flex" flexDir="row" justifyContent="center" alignItems="center" mt="3">
          <Text>Made with </Text>
          <Icon
            aria-label="coffee"
            color={colorMode === "dark" ? dark.text : light.text}
            as={Coffee}
            weight="fill"
            mx="3"
          />
        </Box>
      </Container>
    )
  } else {
    return null
  }
}

export default Settings
