export const getCurrentDateTime = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1) + ''
  const day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate() + ''
  const hour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours() + ''
  const minute = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes() + ''
  const seconds = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds() + ''
  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    seconds: seconds
  }
}
export const converDateToStr = (date) => {
  return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`
}
