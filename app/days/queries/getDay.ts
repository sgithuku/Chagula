import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetDayInput = Pick<Prisma.FindFirstDayArgs, "where">

export default async function getDay({ where }: GetDayInput, ctx: Ctx) {
  ctx.session.$authorize()

  const day = await db.day.findFirst({ where })

  if (!day) throw new NotFoundError()

  return day
}
