import {
  Heading,
  Box,
  Link,
  Container,
  Divider,
  IconButton,
  Switch,
  FormControl,
  useColorMode,
  Icon,
} from "@chakra-ui/react"
import { ForkKnife, Moon, Sun, Gear } from "phosphor-react"
import { light, dark } from "../colors"

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
          <Link pr={["3", "6", "12"]} d="flex" alignItems="center" href="/meals">
            <Icon
              aria-label="Meals"
              css={{ background: "transparent" }}
              as={ForkKnife}
              weight="fill"
              mr="3"
            />
            Meals
          </Link>
          <Link pr={["3", "6", "12"]} d="flex" alignItems="center" href="/account">
            <Icon
              aria-label="Account"
              css={{ background: "transparent" }}
              as={Gear}
              weight="fill"
              mr="3"
            />
            Account
          </Link>
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
