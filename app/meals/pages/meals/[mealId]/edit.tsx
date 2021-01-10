import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getMeal from "app/meals/queries/getMeal"
import updateMeal from "app/meals/mutations/updateMeal"
import MealForm from "app/meals/components/MealForm"

export const EditMeal = () => {
  const router = useRouter()
  const mealId = useParam("mealId", "number")
  const [meal, { setQueryData }] = useQuery(getMeal, { where: { id: mealId } })
  const [updateMealMutation] = useMutation(updateMeal)

  return (
    <div>
      <h1>Edit Meal {meal.id}</h1>
      <pre>{JSON.stringify(meal)}</pre>

      <MealForm
        initialValues={meal}
        onSubmit={async () => {
          try {
            const updated = await updateMealMutation({
              where: { id: meal.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/meals/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing meal " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditMealPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMeal />
      </Suspense>

      <p>
        <Link href="/meals">
          <a>Meals</a>
        </Link>
      </p>
    </div>
  )
}

EditMealPage.getLayout = (page) => <Layout title={"Edit Meal"}>{page}</Layout>

export default EditMealPage
