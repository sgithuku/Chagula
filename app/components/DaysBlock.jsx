import { Box, FormControl, Heading, Link, Switch, useColorMode } from "@chakra-ui/react"
import updateMeal from "app/meals/mutations/updateMeal"
import getMeals from "app/meals/queries/getMeals"
import { useMutation, useQuery } from "blitz"

const DaysBlock = (props) => {
  const { colorMode } = useColorMode()
  const [meals, { setQueryData, refetch }] = useQuery(getMeals, { where: {} }, {})
  // console.log(meals.hasDays)
  const long_date = new Date()
  const date = long_date.getDay()

  return (
    <Box
      w="sm"
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
      <Box
        className="row"
        borderTopLeftRadius="lg"
        borderTopRightRadius="lg"
        d="flex"
        flexDir="row"
        justifyContent="space-between"
        w="100%"
      >
        <Box w="4em">
          <Heading as="h3">Su</Heading>
        </Box>
        <Box d="flex" flexDir="column" pl="3" justifyContent="space-between" flexGrow="1">
          {meals.hasDays.map((day, index) =>
            day.day === 0 ? (
              <Box
                d="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                flexGrow="1"
              >
                <Link
                  href={`/meals/${day.id}`}
                  className={day.already_eaten ? "strikethrough" : null}
                  key={day.day + index}
                  fontWeight={day.day === date ? "700" : "inherit"}
                >
                  {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                </Link>
                <Box>{EatenSwitch(day, refetch)}</Box>
              </Box>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="darkrow">
        <Box w="4em">
          <Heading as="h3">Mo</Heading>
        </Box>
        <Box d="flex" flexDir="column" pl="3" justifyContent="space-between" flexGrow="1">
          {meals.hasDays.map((day, index) =>
            day.day === 1 ? (
              <Box
                d="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                flexGrow="1"
              >
                <Link
                  href={`/meals/${day.id}`}
                  className={day.already_eaten ? "strikethrough" : null}
                  key={day.day + index}
                  fontWeight={day.day === date ? "700" : "inherit"}
                >
                  {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                </Link>
                <Box>{EatenSwitch(day, refetch)}</Box>
              </Box>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="row">
        <Box w="4em">
          <Heading as="h3">Tu</Heading>
        </Box>
        <Box d="flex" flexDir="column" pl="3" justifyContent="space-between" flexGrow="1">
          {meals.hasDays.map((day, index) =>
            day.day === 2 ? (
              <Box
                d="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                flexGrow="1"
              >
                <Link
                  href={`/meals/${day.id}`}
                  className={day.already_eaten ? "strikethrough" : null}
                  key={day.day + index}
                  fontWeight={day.day === date ? "700" : "inherit"}
                >
                  {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                </Link>
                <Box>{EatenSwitch(day, refetch)}</Box>
              </Box>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="darkrow">
        <Box w="4em">
          <Heading as="h3">We</Heading>
        </Box>
        <Box d="flex" flexDir="column" pl="3" justifyContent="space-between" flexGrow="1">
          {meals.hasDays.map((day, index) =>
            day.day === 3 ? (
              <Box
                d="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                flexGrow="1"
              >
                <Link
                  href={`/meals/${day.id}`}
                  className={day.already_eaten ? "strikethrough" : null}
                  key={day.day + index}
                  fontWeight={day.day === date ? "700" : "inherit"}
                >
                  {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                </Link>
                <Box>{EatenSwitch(day, refetch)}</Box>
              </Box>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="row">
        <Box w="4em">
          <Heading as="h3">Th</Heading>
        </Box>
        <Box d="flex" flexDir="column" pl="3" justifyContent="space-between" flexGrow="1">
          {meals.hasDays.map((day, index) =>
            day.day === 4 ? (
              <Box
                d="flex"
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                flexGrow="1"
              >
                <Link
                  href={`/meals/${day.id}`}
                  className={day.already_eaten ? "strikethrough" : null}
                  key={day.day + index}
                  fontWeight={day.day === date ? "700" : "inherit"}
                >
                  {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                </Link>
                <Box>{EatenSwitch(day, refetch)}</Box>
              </Box>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="darkrow">
        <Box w="4em">
          <Heading as="h3">Fr</Heading>
        </Box>
        <Box d="flex" flexDir="column" pl="3" justifyContent="space-between" flexGrow="1">
          {meals.hasDays.map((day, index) =>
            day.day === 5 ? (
              <Box d="flex" flexDir="row" justifyContent="space-between" flexGrow="1">
                <Link
                  href={`/meals/${day.id}`}
                  className={day.already_eaten ? "strikethrough" : null}
                  key={day.day + index}
                  fontWeight={day.day === date ? "700" : "inherit"}
                >
                  {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                </Link>
                <Box>{EatenSwitch(day, refetch)}</Box>
              </Box>
            ) : null
          )}
        </Box>
      </Box>
      <Box className="row" borderBottomLeftRadius="lg" borderBottomRightRadius="lg">
        <Box w="4em">
          <Heading as="h3">Sa</Heading>
        </Box>
        <Box d="flex" flexDir="column" pl="3" justifyContent="space-between" flexGrow="1">
          {meals.hasDays.map((day, index) =>
            day.day === 6 ? (
              <Box d="flex" flexDir="row" justifyContent="space-between" flexGrow="1">
                <Link
                  href={`/meals/${day.id}`}
                  className={day.already_eaten ? "strikethrough" : null}
                  key={day.day + index}
                  fontWeight={day.day === date ? "700" : "inherit"}
                >
                  {day.name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}
                </Link>
                <Box>{EatenSwitch(day, refetch)}</Box>
              </Box>
            ) : null
          )}
        </Box>
      </Box>
    </Box>
  )
}
export default DaysBlock

const EatenSwitch = (meal, refetch) => {
  const [updateMealMutation] = useMutation(updateMeal)

  const setEatenAlready = async () => {
    try {
      await updateMealMutation({
        where: { id: meal.id },
        data: { already_eaten: !meal.already_eaten },
      })
      await refetch({ force: true })
      // await setQueryData(updated)
      // alert("Success!" + JSON.stringify(updated))
    } catch (error) {
      console.log(error)
      // alert("Error adding meal " + JSON.stringify(error, null, 2))
    }
  }

  return (
    <FormControl>
      <Switch
        isChecked={meal.already_eaten}
        id="already_eaten"
        onChange={setEatenAlready}
        // colorScheme={colorMode === "dark" ? dark.blockSubtitle : light.blockSubtitle}
      />
    </FormControl>
  )
}
