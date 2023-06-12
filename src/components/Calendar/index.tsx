import { CaretLeft, CaretRight } from 'phosphor-react'

import * as S from './styles'
import { getWeekDays } from '@/utils/get-week-days'
import { Tooltip } from '@airs-ui/react'

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.CalendarTitle>
          Janeiro <span>2023</span>
        </S.CalendarTitle>
        <S.CalendarActions>
          <button>
            <CaretLeft />
          </button>
          <button>
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
