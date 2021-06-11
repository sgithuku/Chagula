import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteDayInput = Pick<Prisma.DayDeleteArgs, "where">

export default async function deleteDay({ where }: DeleteDayInput, ctx: Ctx) {
  ctx.session.$authorize()

  const day = await db.day.delete({ where })

  return day
}
