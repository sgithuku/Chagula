import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetMealsInput = Pick<Prisma.FindManyMealArgs, "where" | "orderBy" | "skip" | "take">

export default async function getMeals(
  { where, orderBy, skip = 0, take }: GetMealsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const meals = await db.meal.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.meal.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    meals,
    nextPage,
    hasMore,
    count,
  }
}
