// import { Suspense } from "react"
import { Box, Icon, Link, useColorMode } from "@chakra-ui/react"
import { light } from "app/colors"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import { ArrowSquareUpRight } from "phosphor-react"
import ReactMarkdown from "react-markdown"

const RecipeDetails = (props) => {
  //   console.log("these are your props", props)
  const { colorMode } = useColorMode()

  return (
    <Box
      w="md"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={colorMode === "dark" ? "gray.900" : "green.700"}
      marginBottom="1em"
      boxShadow="xl"
      color="white"
      mr="6"
      mt="6"
      bgColor={colorMode === "dark" ? "gray.900" : "green.700"}
      _hover={{ bgColor: "green.900" }}
      // maxH="350px"
    >
      <Box borderTopRadius="lg" p="3" bgColor={colorMode === "dark" ? "gray.50" : "green.50"}>
        {props.meal.link ? (
          <Link
            href={props.meal.link}
            color={colorMode === "dark" ? "gray.900" : "green.700"}
            isExternal
            textDecoration="underline"
            _hover={{ textDecoration: "none" }}
          >
            Link to recipe{" "}
            <Icon
              aria-label="recipe link"
              color={light.text}
              as={ArrowSquareUpRight}
              weight="fill"
              px="3"
            />
          </Link>
        ) : null}
      </Box>
      <Box px="3" pb="3" pt="1">
        {props.meal.recipe ? (
          <ReactMarkdown
            renderers={ChakraUIRenderer()}
            source={props.meal.recipe}
            escapeHtml={false}
          />
        ) : null}
      </Box>
    </Box>
  )
}

export default RecipeDetails
