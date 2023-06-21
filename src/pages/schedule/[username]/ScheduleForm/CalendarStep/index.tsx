import { useState } from 'react'
import { Calendar } from '@/components/Calendar'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import * as S from './styles'

interface Availability {
  availableTimes: number[]
  possibleTimes: number[]
}

interface CalendarStepProps {
  onSelectedDateTime: (date: Date | null) => void
}

export function CalendarStep({ onSelectedDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describeDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime, username],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectedDateTime(dateWithTime)
  }

  const unavailableTimes = availability?.availableTimes.map((availableTime) => {
    return dayjs(availableTime).get('hour')
  })

  return (
    <S.Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <S.TimePicker>
          <S.TimePickerHeader>
            {weekDay} <span>{describeDate}</span>
          </S.TimePickerHeader>
          <S.TimePickerList>
            {availability?.possibleTimes?.map((hour) => (
              <S.TimePickerItem
                key={hour}
                onClick={() => handleSelectTime(hour)}
                disabled={
                  unavailableTimes?.includes(hour) ||
                  dayjs(selectedDate).set('hour', hour).isBefore(new Date())
                }
              >
                {String(hour).padStart(2, '0')}:00h
              </S.TimePickerItem>
            ))}
          </S.TimePickerList>
        </S.TimePicker>
      )}
    </S.Container>
  )
}
