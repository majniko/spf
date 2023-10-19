import dayjs, { Dayjs } from 'dayjs'

export const dateToString = (date: Date | Dayjs): string => {
  const utcOffset = dayjs(date).utcOffset()

  return dayjs(date).hour(0).minute(utcOffset).second(0).millisecond(0).toISOString()
}
