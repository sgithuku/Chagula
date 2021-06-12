// import { Suspense } from "react"
import { Box, Link, ListItem, Tag, useColorMode } from "@chakra-ui/react"
// import { Link } from "blitz"
import MealIcon from "app/components/Meal_Icon"

const MealListitem = (meal, refetch) => {
  // console.log(refetch)
  const { colorMode } = useColorMode()

  return (
    <ListItem
      key={meal.id}
      paddingY="2"
      paddingX="2"
      _hover={{ bgColor: "green.900", color: "white" }}
      justifyContent="center"
      width="sm"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={colorMode === "dark" ? "gray.900" : "green.700"}
      color="white"
      marginBottom="1em"
      boxShadow="xl"
      bgColor={colorMode === "dark" ? "gray.900" : "green.700"}
      mr="3"
      d="flex"
      flexDir="row"
      alignItems="center"
    >
      <Box d="flex" flexDir="row" justifyContent="space-between" flexGrow="1" pr="2">
        <Link href={`/meals/${meal.id}`}>
          {meal.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
        </Link>
        {meal.timesEaten > 0 ? (
          <Tag variant="subtle" size="lg">
            {meal.timesEaten}
          </Tag>
        ) : null}
      </Box>
      <Box>{MealIcon(meal, refetch)}</Box>
    </ListItem>
    /* https://www.digitalocean.com/community/tutorials/js-capitalizing-strings */
  )
}

export default MealListitem
