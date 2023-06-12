import { useState } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '@/utils/get-week-days'
import { Tooltip } from '@airs-ui/react'
import dayjs from 'dayjs'

import * as S from './styles'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonth)
  }
  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const shortWeekDays = getWeekDays({ short: true })

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </S.CalendarTitle>
        <S.CalendarActions>
          <button
            type="button"
            onClick={handlePreviousMonth}
            title="Previous month"
          >
            <CaretLeft />
          </button>
          <button type="button" onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </S.CalendarActions>
      </S.CalendarHeader>
      <S.CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <Tooltip
                content="Segunda dia 01"
                open={false}
                defaultOpen={false}
              >
                <S.CalendarDay disabled>1</S.CalendarDay>
              </Tooltip>
            </td>
            <td>
              <S.CalendarDay>2</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>3</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>4</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>5</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>6</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>7</S.CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <Tooltip
                content="Segunda dia 01"
                open={false}
                defaultOpen={false}
              >
                <S.CalendarDay disabled>1</S.CalendarDay>
              </Tooltip>
            </td>
            <td>
              <S.CalendarDay>2</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>3</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>4</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>5</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>6</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>7</S.CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <Tooltip
                content="Segunda dia 01"
                open={false}
                defaultOpen={false}
              >
                <S.CalendarDay disabled>1</S.CalendarDay>
              </Tooltip>
            </td>
            <td>
              <S.CalendarDay>2</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>3</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>4</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>5</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>6</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>7</S.CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <Tooltip
                content="Segunda dia 01"
                open={false}
                defaultOpen={false}
              >
                <S.CalendarDay disabled>1</S.CalendarDay>
              </Tooltip>
            </td>
            <td>
              <S.CalendarDay>2</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>3</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>4</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>5</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>6</S.CalendarDay>
            </td>
            <td>
              <S.CalendarDay>7</S.CalendarDay>
            </td>
          </tr>
        </tbody>
      </S.CalendarBody>
    </S.CalendarContainer>
  )
}
