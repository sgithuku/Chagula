// import { Suspense } from "react"
import { Link, useQuery, useParam, useMutation, setQueryData } from "blitz"
import getMeal from "app/meals/queries/getMeal"
import {
  Button,
  Box,
  Heading,
  Image,
  IconButton,
  Icon,
  useColorMode,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react"
import { Plus, X } from "phosphor-react"
import { dark, light } from "app/colors"

import updateMeal from "app/meals/mutations/updateMeal"

const MealBlock = (props) => {
  // const mealId = useParam("mealId", "number")
  const { colorMode, toggleColorMode } = useColorMode()
  const [meal, { setQueryData }] = useQuery(getMeal, { where: { id: props.meal.id } }, {})
  const [updateMealMutation] = useMutation(updateMeal)

  const setEatenAlready = async () => {
    try {
      const updated = await updateMealMutation({
        where: { id: meal.id },
        data: { already_eaten: !meal.already_eaten },
      })
      await setQueryData(updated)
      // alert("Success!" + JSON.stringify(updated))
    } catch (error) {
      console.log(error)
      // alert("Error adding meal " + JSON.stringify(error, null, 2))
    }
  }

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
      bgColor={colorMode === "dark" ? "gray.900" : "green.700"}
      _hover={{ bgColor: "green.900" }}
      position="relative"
    >
      <IconButton
        aria-label="Search database"
        bgColor={colorMode === "dark" ? "green.700" : "green.500"}
        _hover={{ bgColor: "orange.500" }}
        borderRadius="full"
        position="absolute"
        onClick={async () => {
          try {
            const updated = await updateMealMutation({
              where: { id: meal.id },
              data: { selected: !meal.selected },
            })
            await setQueryData(updated)
            await refetch({ force: true })
            // alert("Success!" + JSON.stringify(updated))
          } catch (error) {
            console.log(error)
            // alert("Error adding meal " + JSON.stringify(error, null, 2))
          }
        }}
        top="-5"
        left="-5"
        icon={<Icon aria-label="Meals" color={dark.text} as={X} weight="fill" />}
      />
      <Image src={`/${meal.image_url ? meal.image_url : meal.category}.jpg`} alt={"meal picture"} />

      <Box d="flex" flexDir="column">
        <Box d="flex" alignItems="center" p="3">
          <Heading as="h4" size="sm" color={dark.text}>
            <Link href={`/meals/${meal.id}`}>{meal.name}</Link>
          </Heading>
        </Box>
        <Heading
          className="category"
          paddingX="3"
          size="xs"
          color={colorMode === "dark" ? dark.blockSubtitle : light.blockSubtitle}
          bgColor="transparent"
          pb="3"
          as="h5"
        >
          {meal.category?.toUpperCase()}
        </Heading>
        <FormControl display="flex" alignItems="center" width="100%" pl="3" mb="3">
          <FormLabel
            htmlFor="already_eaten"
            color={colorMode === "dark" ? dark.blockSubtitle : light.blockSubtitle}
          >
            Eaten this already?
          </FormLabel>
          <Switch
            isChecked={meal.already_eaten}
            id="already_eaten"
            onChange={setEatenAlready}
            // colorScheme={colorMode === "dark" ? dark.blockSubtitle : light.blockSubtitle}
          />
        </FormControl>
      </Box>
    </Box>
  )
}

export default MealBlock
