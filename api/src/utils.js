import { constants } from './constants.js'
import { exceptions } from './exceptions.js'

/**
 *
 * @param {number} year Year that needs to be checked
 * @returns {boolean} Boolean flag as `true` if given `year` is a leap year else `false`
 */
function isLeapYear (year) {
  // Checks whetehr a year is leap year or not
  console.debug(`Checking year: ${year} for leap year`)

  let isLeapYearFlag
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true
      } else {
        isLeapYearFlag = false
      }
    } else {
      isLeapYearFlag = true
    }
  } else {
    isLeapYearFlag = false
  }

  console.debug(`Leap year check: ${year}: ${isLeapYearFlag}`)
  return isLeapYearFlag
}

/**
 * Count number of leap years passed until given `date`
 * it takes current year into consideration if `date` is beyond month of February else not
 * @param {constants.Date} date Date until which we need to calculate no. of leap years
 * @returns {number} No. of leap years passed until the `date`
 */
function countLeapYears (date) {
  // Count number of leap years passed until given `date`
  // It takes current year into consideration if `date` is beyond month of February else not
  console.debug(`Counting no. of leap years until date: ${date.getDate()}`)
  let numLeapYearsUntilDate = 0
  let year = date.getYear()

  if (date.getMonth() <= 2) {
    year -= 1
  }

  numLeapYearsUntilDate = Math.floor(year / 4)
  numLeapYearsUntilDate -= Math.floor(year / 100)
  numLeapYearsUntilDate += Math.floor(year / 400)

  console.debug(`No. of leap years until date: ${date.getDate()}: ${numLeapYearsUntilDate}`)
  return numLeapYearsUntilDate
}

/**
 * Returns no. of default days in a month without considering a leap year
 * @param {constants.MONTH} month month for which default days is required
 * @returns {number} No. of days in given month `month`
 */
function getDefaultDaysInMonth (month) {
  // Returns no. of default days in a month without considering a leap year
  if (constants.MONTHS_WITH_31_DAYS.has(month)) {
    return 31
  } else if (month === constants.MONTH.FEBRUARY) {
    return 28
  } else {
    return 30
  }
}

/**
 * Returns no. of actual days in a month with considering a leap year
 * Makes use of `getDefaultDaysInMonth`
 * @param {constants.MONTH} month month for which actual days is required
 * @param {number} year Year in which no. of days is required for `month`
 * @returns {number} No. of days in given month `month`
 */
function getActualDaysInMonth (month, year) {
  // Returns no. of default days in a month with considering a leap year
  // Makes use of`getDefaultDaysInMonth`

  if (month === constants.MONTH.FEBRUARY) {
    if (isLeapYear(year)) {
      return 29
    } else {
      return getDefaultDaysInMonth(month)
    }
  } else {
    return getDefaultDaysInMonth(month)
  }
}

/**
 * Returns difference of days between two dates
 * Makes use of `getDefaultDaysInMonth`, `countLeapYears`
 * @param {constants.Date} baseDate Base date from which difference needs to be calculated
 * @param {constants.Date} actualDate Actual date upto which difference needs to be calculated
 * @returns {number} Difference of days between `totalDaysActualDate` `totalDaysBaseDate`
 */
function numDaysBetweenDates (baseDate, actualDate) {
  // Returns difference of days between two dates
  // Makes use of`getDefaultDaysInMonth`, `countLeapYears`
  console.debug(`Counting diff of days between: ${baseDate.getDate()} and ${actualDate.getDate()}`)

  /**
     * Returns no. of absolute days since begining until `date`
     * Makes use of `getDefaultDaysInMonth`, `countLeapYears`
     * @param {constants.Date} date Date for which absolute no. of days needs to be calculated
     * @returns {number} No. of days since begining until `date`
     */
  function calculateAbsoluteDays (date) {
    // Returns no. of absolute days since begining until `date`
    // Makes use of`getDefaultDaysInMonth`, `countLeapYears`
    let totalDays = date.getYear() * 365 + date.getDay()
    for (let i = 1; i < date.getMonth(); i++) {
      totalDays += getDefaultDaysInMonth(i)
    }

    totalDays += countLeapYears(date)
    return totalDays
  }

  const totalDaysBaseDate = calculateAbsoluteDays(baseDate)
  const totalDaysActualDate = calculateAbsoluteDays(actualDate)

  console.debug(`Diff of days between: ${baseDate.getDate()} and ${actualDate.getDate()} = ${totalDaysActualDate - totalDaysBaseDate}`)
  return totalDaysActualDate - totalDaysBaseDate
}

/**
 * Validates a string date to be accepted by the application
 * @param {string} date Date that needs to be validated
 * @param {constants.Date} pivotDate Minimum possible date supported by the application
 * @throws {exceptions.InvalidDateFormat} If the passed `date` fails the validations test(s)
 */
function dateValidator (date, pivotDate) {
  // Validates a string date to be accepted by the application
  console.info(`Validaing date: ${date}`)
  let year, month, day
  try {
    const yearMonthDay = date.split('-')

    if (yearMonthDay.length < 3) {
      throw new Error()
    }

    year = yearMonthDay[0]
    month = yearMonthDay[1]
    day = yearMonthDay[2]
  } catch {
    console.info(`Failed to fetch year, month and/or day information from string: ${date}`)
    throw new exceptions.InvalidDateFormat(`String ${date} doesn't contain enough separators to specify year, month and day`)
  }

  try {
    year = parseFloat(year)
    month = parseFloat(month)
    day = parseFloat(day)

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      throw new Error()
    }
  } catch {
    console.info(`Year and/or month and/or day of date: ${date} is/are not numbers`)
    throw new exceptions.InvalidDateFormat(`String ${date} contains non-numeric values for year and/or month and/or day`)
  }

  if (parseInt(year) !== year || parseInt(month) !== month || parseInt(day) !== day) {
    console.info(`Year and/or month and/or day of date: ${date} is/are not Integers`)
    throw new exceptions.InvalidDateFormat(`Year: ${year} or month: ${month} or day: ${day} is/are not integer(s)`)
  }

  if (month <= 0 || month > 12) {
    console.info(`Month of date: ${date} is not in range [1, 12]`)
    throw new exceptions.InvalidDateFormat(`Given month ${month} isn't between [1, 12]`)
  }

  if (day < 0 || day > 31) {
    console.info(`Day of date: ${date} is not in range [1, 31]`)
    throw new exceptions.InvalidDateFormat(`Given day: ${day} isn't between [1, 31]`)
  }

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        console.info(`Month of date: ${date} is not in range [1, 29] for a leap year`)
        throw new exceptions.InvalidDateFormat(`Given day: ${day} isn't between [1,29] for a leap year`)
      }
    } else {
      if (day > 28) {
        console.info(`Month of date: ${date} is not in range [1, 28] for a non-leap year`)
        throw new exceptions.InvalidDateFormat(`Given day: ${day} isn't between [1,28] for a non-leap year`)
      }
    }
  } else if (!constants.MONTHS_WITH_31_DAYS.has(month)) {
    if (day === 31) {
      console.info(`Month of date: ${date} is not in range [1,30]`)
      throw new exceptions.InvalidDateFormat(`Given day: ${day} isn't between [1, 30] for given month: ${month}`)
    }
  }

  if (numDaysBetweenDates(pivotDate, constants.Date(date)) < 0) {
    console.info(`Give: ${date} is less than the pivot date: ${pivotDate} and hence not supported`)
    throw new exceptions.InvalidDateFormat(`Given date: ${date} should be greater or equal to ${pivotDate}`)
  }
}

export const utils = {
  isLeapYear,
  countLeapYears,
  getDefaultDaysInMonth,
  getActualDaysInMonth,
  numDaysBetweenDates,
  dateValidator
}
