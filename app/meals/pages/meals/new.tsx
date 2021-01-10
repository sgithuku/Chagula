import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createMeal from "app/meals/mutations/createMeal"
import MealForm from "app/meals/components/MealForm"

const NewMealPage: BlitzPage = () => {
  const router = useRouter()
  const [createMealMutation] = useMutation(createMeal)

  return (
    <div>
      <h1>Create New Meal</h1>

      <MealForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const meal = await createMealMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(meal))
            router.push(`/meals/${meal.id}`)
          } catch (error) {
            alert("Error creating meal " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/meals">
          <a>Meals</a>
        </Link>
      </p>
    </div>
  )
}

NewMealPage.getLayout = (page) => <Layout title={"Create New Meal"}>{page}</Layout>

export default NewMealPage
