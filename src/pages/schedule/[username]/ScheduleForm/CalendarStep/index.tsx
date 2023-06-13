import { useState } from 'react'
import { Calendar } from '@/components/Calendar'

import * as S from './styles'
import dayjs from 'dayjs'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describeDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  return (
    <S.Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <S.TimePicker>
          <S.TimePickerHeader>
            {weekDay} <span>{describeDate}</span>
          </S.TimePickerHeader>
          <S.TimePickerList>
            <S.TimePickerItem>08:00h</S.TimePickerItem>
            <S.TimePickerItem disabled>09:00h</S.TimePickerItem>
            <S.TimePickerItem>10:00h</S.TimePickerItem>
            <S.TimePickerItem>11:00h</S.TimePickerItem>
            <S.TimePickerItem>12:00h</S.TimePickerItem>
            <S.TimePickerItem>13:00h</S.TimePickerItem>
            <S.TimePickerItem>14:00h</S.TimePickerItem>
            <S.TimePickerItem>15:00h</S.TimePickerItem>
            <S.TimePickerItem>16:00h</S.TimePickerItem>
            <S.TimePickerItem>17:00h</S.TimePickerItem>
            <S.TimePickerItem>18:00h</S.TimePickerItem>
            <S.TimePickerItem>19:00h</S.TimePickerItem>
            <S.TimePickerItem>20:00h</S.TimePickerItem>
            <S.TimePickerItem>21:00h</S.TimePickerItem>
            <S.TimePickerItem>22:00h</S.TimePickerItem>
          </S.TimePickerList>
        </S.TimePicker>
      )}
    </S.Container>
  )
}
