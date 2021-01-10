import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getMeal from "app/meals/queries/getMeal"
import deleteMeal from "app/meals/mutations/deleteMeal"

export const Meal = () => {
  const router = useRouter()
  const mealId = useParam("mealId", "number")
  const [meal] = useQuery(getMeal, { where: { id: mealId } })
  const [deleteMealMutation] = useMutation(deleteMeal)

  return (
    <div>
      <h1>Meal {meal.id}</h1>
      <pre>{JSON.stringify(meal, null, 2)}</pre>

      <Link href={`/meals/${meal.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteMealMutation({ where: { id: meal.id } })
            router.push("/meals")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowMealPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/meals">
          <a>Meals</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Meal />
      </Suspense>
    </div>
  )
}

ShowMealPage.getLayout = (page) => <Layout title={"Meal"}>{page}</Layout>

export default ShowMealPage
