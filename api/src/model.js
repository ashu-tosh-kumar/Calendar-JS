import { constants } from './constants.js'
import { utils } from './utils.js'

/**
 * Computes the date matrix for a given date
 * @param {str} date Date for which calendar is required
 * @returns {Array(Array)} Returns an array of array representing 7*6 calendar for the month as per `date`
 */
function getDateMatrix (date) {
  // Format: "YYYY-MM-DD"
  // Computes the date matrix for a given date
  console.info(`Computing date matrix for: ${date}`)

  // Validation on date passed by user
  utils.dateValidator(date, constants.PIVOT_DATE)

  const dateObj = constants.Date(date) // Convert into application specific Date object
  dateObj.setDay(1)
  const diffDaysFromPivotDate = utils.numDaysBetweenDates(constants.PIVOT_DATE, dateObj)
  const currDay = (constants.PIVOT_DAY + diffDaysFromPivotDate) % 7

  //   S  M  T   W   T   F   S
  const dateMatrix = []
  for (let i = 0; i < 6; i++) {
    dateMatrix.push([null, null, null, null, null, null, null])
  }

  // Fill the matrix
  // Fill the previous month
  let idx, jdx
  idx = 0
  jdx = currDay - 1
  let lastMonthDate = utils.getActualDaysInMonth(dateObj.getMonth() - 1, dateObj.getYear())
  while (jdx >= 0) {
    dateMatrix[idx][jdx] = lastMonthDate
    lastMonthDate -= 1
    jdx -= 1
  }

  // Fill the current month
  idx = 0
  jdx = currDay
  const thisMonthDate = utils.getActualDaysInMonth(dateObj.getMonth(), dateObj.getYear())
  for (let day = 1; day <= thisMonthDate; day++) {
    dateMatrix[idx][jdx] = day
    jdx += 1
    if (jdx >= dateMatrix[0].length) {
      idx += 1
      jdx = 0
    }
  }

  // Fill the next month
  let nextMonthDate = 1
  while (idx < dateMatrix.length) {
    dateMatrix[idx][jdx] = nextMonthDate
    nextMonthDate += 1
    jdx += 1
    if (jdx >= dateMatrix[0].length) {
      idx += 1
      jdx = 0
    }
  }

  console.info(`Date matrix for date: ${dateObj.getDate()} is:`)
  console.table(dateMatrix)
  return dateMatrix
}

export const model = {
  getDateMatrix
}
