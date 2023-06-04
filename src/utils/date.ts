import { format } from 'date-fns'

export function formatDate(date: Date) {
  return format(date, 'MMM do yyyy')
}
