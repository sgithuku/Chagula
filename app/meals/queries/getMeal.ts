import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetMealInput = Pick<Prisma.FindFirstMealArgs, "where">

export default async function getMeal({ where }: GetMealInput, ctx: Ctx) {
  ctx.session.$authorize()

  const meal = await db.meal.findFirst({ where })

  if (!meal) throw new NotFoundError()

  return meal
}
