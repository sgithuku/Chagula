// import { Suspense } from "react"
import { IconButton, useColorMode } from "@chakra-ui/react"
import updateMeal from "app/meals/mutations/updateMeal"
import { useMutation } from "blitz"
import { ForkKnife, Plus } from "phosphor-react"

const MealIcon = (meal, refetch) => {
  // console.log(refetch)
  const [updateMealMutation] = useMutation(updateMeal, { useErrorBoundary: true })
  const { colorMode } = useColorMode()

  const setSelectMeal = async () => {
    try {
      await updateMealMutation({
        where: { id: meal.id },
        data: { selected: !meal.selected },
      })
      await refetch({ force: true })
    } catch (error) {
      console.log(error)
      // alert("Error adding meal " + JSON.stringify(error, null, 2))
    }
  }
  return (
    <IconButton
      colorScheme={colorMode === "dark" ? "white" : "blackAlpha"}
      onClick={setSelectMeal}
      variant={colorMode === "dark" ? "outline" : "solid"}
      icon={meal.selected ? <ForkKnife /> : <Plus />}
      key={meal.id + "icon"}
      size="sm"
    />
  )
}

export default MealIcon
