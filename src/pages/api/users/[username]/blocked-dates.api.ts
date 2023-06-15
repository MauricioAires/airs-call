import { prisma } from '@/lib/prisma'
// import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { year, month } = req.query

  if (!year || !month) {
    return res.status(400).json({
      message: 'Year or month not specified.',
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

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })

  const blockedDateRaw: Array<{ date: number }> = await prisma.$queryRaw`
  SELECT x.date FROM (
    SELECT
    EXTRACT(DAY FROM s.date) AS date,
    COUNT(s.id) AS amount,
    (( uti.time_end_in_minutes - uti.time_start_in_minutes) / 60) as size
    FROM schedulings as s

    LEFT JOIN user_time_intervals AS uti
    ON uti.week_day = WEEKDAY(DATE_ADD(s.date, INTERVAL 1 DAY))

    WHERE s.user_id = ${user.id}
        AND DATE_FORMAT(s.date, "%Y-%m") = ${`${year}-${month}`}

    GROUP BY EXTRACT(DAY FROM s.date), size

    HAVING amount >= size
  ) AS x
  `

  return res.send({
    blockedWeekDays,
    blockedDates: blockedDateRaw.map((date) => date.date),
  })
}
