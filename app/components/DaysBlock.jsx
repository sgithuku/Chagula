import { Box, Heading, Link, useColorMode } from "@chakra-ui/react"
import getMeals from "app/meals/queries/getMeals"
import { useQuery } from "blitz"

const DaysBlock = (props) => {
  const { colorMode } = useColorMode()
  const [meals] = useQuery(getMeals, { where: {} }, {})
  console.log(meals.hasDays)

  return (
    <Box
      w="xs"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={colorMode === "dark" ? "gray.900" : "green.700"}
      marginBottom="1em"
      boxShadow="xl"
      color={colorMode === "dark" ? "gray.900" : "green.700"}
      mr="6"
      mt="6"
      // bgColor={colorMode === "dark" ? "gray.50" : "green.50"}
      // _hover={{ bgColor: "green.100" }}
      position="relative"
      alignItems="center"
    >
      <Box className="row">
        <Box>
          <Heading as="h3">Su</Heading>
        </Box>
        <Box d="flex" flexDir="column" alignItems="center" pl="3" justifyContent="center">
          {meals.hasDays.map((day, index) =>
            day.day === 0 ? (
              <Link
                href={`/meals/${day.id}`}
                className={day.already_eaten ? "strikethrough" : null}
              >
                {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
              </Link>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="darkrow">
        <Box>
          <Heading as="h3">Mo</Heading>
        </Box>
        <Box d="flex" flexDir="column" alignItems="center" pl="3" justifyContent="center">
          {meals.hasDays.map((day, index) =>
            day.day === 1 ? (
              <Link
                href={`/meals/${day.id}`}
                className={day.already_eaten ? "strikethrough" : null}
              >
                {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
              </Link>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="row">
        <Box>
          <Heading as="h3">Tu</Heading>
        </Box>
        <Box d="flex" flexDir="column" alignItems="center" pl="3" justifyContent="center">
          {meals.hasDays.map((day, index) =>
            day.day === 2 ? (
              <Link
                href={`/meals/${day.id}`}
                className={day.already_eaten ? "strikethrough" : null}
              >
                {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
              </Link>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="darkrow">
        <Box>
          <Heading as="h3">We</Heading>
        </Box>
        <Box d="flex" flexDir="column" alignItems="center" pl="3" justifyContent="center">
          {meals.hasDays.map((day, index) =>
            day.day === 3 ? (
              <Link
                href={`/meals/${day.id}`}
                className={day.already_eaten ? "strikethrough" : null}
              >
                {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
              </Link>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="row">
        <Box>
          <Heading as="h3">Th</Heading>
        </Box>
        <Box d="flex" flexDir="column" alignItems="center" pl="3" justifyContent="center">
          {meals.hasDays.map((day, index) =>
            day.day === 4 ? (
              <Link
                href={`/meals/${day.id}`}
                className={day.already_eaten ? "strikethrough" : null}
              >
                {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
              </Link>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="darkrow">
        <Box>
          <Heading as="h3">Fr</Heading>
        </Box>
        <Box d="flex" flexDir="column" alignItems="center" pl="3" justifyContent="center">
          {meals.hasDays.map((day, index) =>
            day.day === 5 ? (
              <Link
                href={`/meals/${day.id}`}
                className={day.already_eaten ? "strikethrough" : null}
              >
                {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
              </Link>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="row">
        <Box>
          <Heading as="h3">Sa</Heading>
        </Box>
        <Box d="flex" flexDir="column" alignItems="center" pl="3" justifyContent="center">
          {meals.hasDays.map((day, index) =>
            day.day === 6 ? (
              <Link
                href={`/meals/${day.id}`}
                className={day.already_eaten ? "strikethrough" : null}
              >
                {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
              </Link>
            ) : null
          )}
        </Box>
      </Box>
    </Box>
  )
}
export default DaysBlock
