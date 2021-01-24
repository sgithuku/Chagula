// import { Suspense } from "react"
import { Link, useQuery, useParam, useMutation } from "blitz"
import getMeal from "app/meals/queries/getMeal"
import { Button, Box, Heading, Image, IconButton, Icon, useColorMode } from "@chakra-ui/react"
import { Plus, X } from "phosphor-react"

import updateMeal from "app/meals/mutations/updateMeal"

const MealBlock = (props) => {
  // const mealId = useParam("mealId", "number")
  const { colorMode, toggleColorMode } = useColorMode()
  const [meal] = useQuery(getMeal, { where: { id: props.meal.id } })
  const [updateMealMutation] = useMutation(updateMeal)

  return (
    <Box
      w="xs"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={colorMode === "dark" ? "gray.900" : "green.700"}
      marginBottom="1em"
      boxShadow="xl"
      color={colorMode === "dark" ? "gray.900" : "green.700"}
      mr="3"
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
            refetch({ force: true })
            // alert("Success!" + JSON.stringify(updated))
          } catch (error) {
            console.log(error)
            // alert("Error adding meal " + JSON.stringify(error, null, 2))
          }
        }}
        top="-5"
        left="-5"
        icon={<Icon aria-label="Meals" color="gray.50" as={X} weight="fill" />}
      />
      <Image src={`/${meal.category}.jpg`} alt={"meal picture"} />

      <Box d="flex" flexDir="column">
        <Box d="flex" alignItems="center" p="3">
          <Heading as="h4" size="sm" color="gray.50">
            <Link href={`/meals/${meal.id}`}>{meal.name}</Link>
          </Heading>
        </Box>
        <Heading
          className="category"
          paddingX="3"
          size="xs"
          color={colorMode === "dark" ? "gray.500" : "green.200"}
          bgColor="transparent"
          pb="3"
          as="h5"
        >
          {meal.category?.toUpperCase()}
        </Heading>
      </Box>
    </Box>
  )
}

export default MealBlock
