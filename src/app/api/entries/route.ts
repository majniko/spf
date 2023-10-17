import { getDecodedToken } from '@/features/helpers/server/getDecodedToken'
import { NextResponse } from 'next/server'
import { postEntryCallProps } from '@/features/helpers/clientAPICalls/entries/postEntryCall'
import prisma from '@/lib/prisma/prisma'
import { validateNewEntryOnServer } from '@/features/helpers/validation/entry/validateNewEntry'

type postReqProps = postEntryCallProps

export async function POST(req: Request) {
  const decodedCookie = getDecodedToken()
  if (!decodedCookie) {
    return NextResponse.json({ message: 'invalid_token' })
  }

  const { newEntry }: postReqProps = await req.json()
  const { title, amount, isExpense, categoryId, date } = newEntry

  if (!title || !amount || !isExpense || !categoryId || !date) {
    return NextResponse.json({ message: 'invalid_request' })
  }

  if (validateNewEntryOnServer({ newEntry })) {
    return NextResponse.json({ message: 'invalid_request' })
  }

  try {
    await prisma.entries.create({
      data: {
        title,
        amount,
        isExpense,
        categoryId,
        date,
        userId: decodedCookie.userId,
      },
    })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: 'unexpected_prisma_error' })
  }

  return NextResponse.json({ message: 'entry_created' })
}
