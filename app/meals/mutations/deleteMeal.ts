import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteMealInput = Pick<Prisma.MealDeleteArgs, "where">

export default async function deleteMeal({ where }: DeleteMealInput, ctx: Ctx) {
  ctx.session.authorize()

  const meal = await db.meal.delete({ where })

  return meal
}
