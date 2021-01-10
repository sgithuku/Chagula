import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateMealInput = Pick<Prisma.MealCreateArgs, "data">
export default async function createMeal({ data }: CreateMealInput, ctx: Ctx) {
  ctx.session.authorize()

  const meal = await db.meal.create({ data })

  return meal
}
