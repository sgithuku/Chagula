import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateMealInput = Pick<Prisma.MealUpdateArgs, "where" | "data">

export default async function updateMeal({ where, data }: UpdateMealInput, ctx: Ctx) {
  ctx.session.$authorize()

  const meal = await db.meal.update({ where, data })

  return meal
}
