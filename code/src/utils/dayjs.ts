import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/ja'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
dayjs.locale('ja')

export default dayjs
