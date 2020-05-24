import dayjs from 'dayjs'

export const humanizeTime = (datetime: string) =>
  dayjs(datetime).format('h:mm A')

export const humanizeDate = (datetime: string) =>
  dayjs(datetime).format('MMMM D, YYYY')
