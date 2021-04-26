import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetMealsInput = Pick<Prisma.MealFindManyArgs, "where" | "orderBy" | "skip" | "take">

export default async function getMeals(
  { where, orderBy, skip = 0, take }: GetMealsInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  const meals = await db.meal.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.meal.count()
  const chosen = await db.meal.count({
    where: {
      selected: true,
    },
  })

  const hasDays = await db.meal.findMany({
    where: {
      day: {
        not: null,
      },
    },
  })
  // FIXME: That is heinous.

  // const filtered = await db.meal.findMany({
  //   where: {
  //     name: {
  //       contains:
  //      },
  //   },
  // })

  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    meals,
    nextPage,
    hasMore,
    count,
    chosen,
    hasDays,
  }
}
