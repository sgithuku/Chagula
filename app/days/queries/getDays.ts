import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetDaysInput = Pick<Prisma.FindManyDayArgs, "where" | "orderBy" | "skip" | "take">

export default async function getDays({ where, orderBy, skip = 0, take }: GetDaysInput, ctx: Ctx) {
  ctx.session.authorize()

  const days = await db.day.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.day.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    days,
    nextPage,
    hasMore,
    count,
  }
}
