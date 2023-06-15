import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { date } = req.query

  if (!date) {
    return res.status(400).json({
      message: 'Date not provided.',
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({
      message: 'User does not exist.',
    })
  }

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.status(200).json({
      availability: [],
      possibleTimes: [],
    })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return res.status(200).json({
      availability: [],
      possibleTimes: [],
    })
  }

  // eslint-disable-next-line camelcase
  const { time_end_in_minutes, time_start_in_minutes } = userAvailability

  // NOTE: Só é possível realizar essa divisão porque só é possível selecionar intervalos de hora em hora
  // caso contrário daria erro durante a divisão

  // eslint-disable-next-line camelcase
  const startHour = time_start_in_minutes / 60 // ex 08:00
  // eslint-disable-next-line camelcase
  const endHour = time_end_in_minutes / 60 // ex 18:00

  const possibleTimes = Array.from({
    length: endHour - startHour,
  }).map((_, i) => {
    return startHour + i
  })

  // GTE = GREATER THAN OR EQUAL => maior ou igual
  // LTE  LESS THAN OR EQUAL => MENOR OU IGUAL
  const blockedTimes = await prisma.scheduling.findMany({
    // retornar apenas a data
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = !blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    )

    const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())

    return !isTimeBlocked || !isTimeInPast
  })

  return res.send({
    availableTimes,
    possibleTimes,
  })
}
