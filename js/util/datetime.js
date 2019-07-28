import dayjs from 'dayjs'

export const humanizeTime = datetime => dayjs(datetime).format('h:mm A')

export const humanizeDate = datetime => dayjs(datetime).format('MMMM D, YYYY')
