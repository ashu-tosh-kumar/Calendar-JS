import { constants } from '../src/constants.js'
import { exceptions } from '../src/exceptions.js'
import { utils } from '../src/utils.js'

describe('test utils.isLeapYear', () => {
  it('Should return true for 2020', () => {
    const expectedValue = true

    const actualValue = utils.isLeapYear(2020)

    expect(actualValue).toBe(expectedValue)
  })

  it('Should return true for 2000', () => {
    const expectedValue = true

    const actualValue = utils.isLeapYear(2000)

    expect(actualValue).toBe(expectedValue)
  })

  it('Should return false for 3000', () => {
    const expectedValue = false

    const actualValue = utils.isLeapYear(3000)

    expect(actualValue).toBe(expectedValue)
  })

  it('Should return false for 2021', () => {
    const expectedValue = false

    const actualValue = utils.isLeapYear(2021)

    expect(actualValue).toBe(expectedValue)
  })
})

describe('Test countLeapYears', () => {
  it('Should return expected value', () => {
    let dummyDate = constants.Date('2022-02-28')
    let expectedValue = 490

    let actualValue = utils.countLeapYears(dummyDate)

    expect(actualValue).toBe(expectedValue)

    dummyDate = constants.Date('2020-02-29')
    expectedValue = 489

    actualValue = utils.countLeapYears(dummyDate)

    expect(actualValue).toBe(expectedValue)

    dummyDate = constants.Date('2020-03-01')
    expectedValue = 490

    actualValue = utils.countLeapYears(dummyDate)

    expect(actualValue).toBe(expectedValue)
  })
})

describe('Test getDefaultDaysInMonth', () => {
  it('Should return expected days for months', () => {
    expect(utils.getDefaultDaysInMonth(constants.MONTH.JANUARY)).toBe(31)
    expect(utils.getDefaultDaysInMonth(constants.MONTH.FEBRUARY)).toBe(28)
    expect(utils.getDefaultDaysInMonth(constants.MONTH.MARCH)).toBe(31)
    expect(utils.getDefaultDaysInMonth(constants.MONTH.APRIL)).toBe(30)
    expect(utils.getDefaultDaysInMonth(constants.MONTH.MAY)).toBe(31)
    expect(utils.getDefaultDaysInMonth(constants.MONTH.JUNE)).toBe(30)
    expect(utils.getDefaultDaysInMonth(constants.MONTH.JULY)).toBe(31)
    expect(utils.getDefaultDaysInMonth(constants.MONTH.AUGUST)).toBe(31)
    expect(utils.getDefaultDaysInMonth(constants.MONTH.SEPTEMBER)).toBe(30)
    expect(utils.getDefaultDaysInMonth(constants.MONTH.OCTOBER)).toBe(31)
    expect(utils.getDefaultDaysInMonth(constants.MONTH.NOVEMBER)).toBe(30)
    expect(utils.getDefaultDaysInMonth(constants.MONTH.DECEMBER)).toBe(31)
  })
})

describe('Test getActualDaysInMonth', () => {
  it('Should return expected days for months for leap year', () => {
    const dummyYear = 2020
    expect(utils.getActualDaysInMonth(constants.MONTH.JANUARY, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.FEBRUARY, dummyYear)).toBe(29)
    expect(utils.getActualDaysInMonth(constants.MONTH.MARCH, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.APRIL, dummyYear)).toBe(30)
    expect(utils.getActualDaysInMonth(constants.MONTH.MAY, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.JUNE, dummyYear)).toBe(30)
    expect(utils.getActualDaysInMonth(constants.MONTH.JULY, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.AUGUST, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.SEPTEMBER, dummyYear)).toBe(30)
    expect(utils.getActualDaysInMonth(constants.MONTH.OCTOBER, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.NOVEMBER, dummyYear)).toBe(30)
    expect(utils.getActualDaysInMonth(constants.MONTH.DECEMBER, dummyYear)).toBe(31)
  })

  it('Should return expected days for months for non leap year', () => {
    const dummyYear = 2021
    expect(utils.getActualDaysInMonth(constants.MONTH.JANUARY, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.FEBRUARY, dummyYear)).toBe(28)
    expect(utils.getActualDaysInMonth(constants.MONTH.MARCH, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.APRIL, dummyYear)).toBe(30)
    expect(utils.getActualDaysInMonth(constants.MONTH.MAY, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.JUNE, dummyYear)).toBe(30)
    expect(utils.getActualDaysInMonth(constants.MONTH.JULY, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.AUGUST, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.SEPTEMBER, dummyYear)).toBe(30)
    expect(utils.getActualDaysInMonth(constants.MONTH.OCTOBER, dummyYear)).toBe(31)
    expect(utils.getActualDaysInMonth(constants.MONTH.NOVEMBER, dummyYear)).toBe(30)
    expect(utils.getActualDaysInMonth(constants.MONTH.DECEMBER, dummyYear)).toBe(31)
  })
})

describe('Test numDaysBetweenDates', () => {
  it('Should return diff of days between two dates', () => {
    const dummyDaseDate = constants.Date('1752-10-01')
    const dummyActualDate = constants.Date('2385-07-01')
    const expectedValue = 231106

    const actualValue = utils.numDaysBetweenDates(dummyDaseDate, dummyActualDate)

    expect(actualValue).toBe(expectedValue)
  })

  it('Should return diff of days between two dates 2', () => {
    const dummyDaseDate = constants.Date('2474-07-09')
    const dummyActualDate = constants.Date('2700-12-08')
    const expectedValue = 82696

    const actualValue = utils.numDaysBetweenDates(dummyDaseDate, dummyActualDate)

    expect(actualValue).toBe(expectedValue)
  })
})

describe('Test dateValidator', () => {
  it('Should pass a valid date', () => {
    const dummyDate = '2022-02-28'

    utils.dateValidator(dummyDate, constants.PIVOT_DATE) // No error expected
  })

  it('Should throw error if month is not passed', () => {
    const dummyDate = '2022-02'

    expect(function () { utils.dateValidator(dummyDate, constants.PIVOT_DATE) }).toThrow(new exceptions.InvalidDateFormat(`String ${dummyDate} doesn't contain enough separators to specify year, month and day`))
  })

  it('Should throw error if month is not numerice', () => {
    const dummyDate = '2022-ab-28'

    expect(function () { utils.dateValidator(dummyDate, constants.PIVOT_DATE) }).toThrow(new exceptions.InvalidDateFormat(`String ${dummyDate} contains non-numeric values for year and/or month and/or day`))
  })

  it('Should throw error if month is not integer', () => {
    const dummyDate = '2022-2.5-28'

    expect(function () { utils.dateValidator(dummyDate, constants.PIVOT_DATE) }).toThrow(new exceptions.InvalidDateFormat('Year: 2022 or month: 2.5 or day: 28 is/are not integer(s)'))
  })

  it('Should throw error if month is not valid', () => {
    const dummyDate = '2022-13-28'

    expect(function () { utils.dateValidator(dummyDate, constants.PIVOT_DATE) }).toThrow(new exceptions.InvalidDateFormat('Given month 13 isn\'t between [1, 12]'))
  })

  it('Should throw error if day is not valid', () => {
    const dummyDate = '2022-12-32'

    expect(function () { utils.dateValidator(dummyDate, constants.PIVOT_DATE) }).toThrow(new exceptions.InvalidDateFormat('Given day: 32 isn\'t between [1, 31]'))
  })

  it('Should throw error if day if day is not valid for leap year', () => {
    const dummyDate = '2020-02-30'

    expect(function () { utils.dateValidator(dummyDate, constants.PIVOT_DATE) }).toThrow(new exceptions.InvalidDateFormat('Given day: 30 isn\'t between [1,29] for a leap year'))
  })

  it('Should throw error if day if day is not valid for non leap year', () => {
    const dummyDate = '2021-02-29'

    expect(function () { utils.dateValidator(dummyDate, constants.PIVOT_DATE) }).toThrow(new exceptions.InvalidDateFormat('Given day: 29 isn\'t between [1,28] for a non-leap year'))
  })

  it('Should throw error if day is not valid for respective month', () => {
    const dummyDate = '2021-04-31'

    expect(function () { utils.dateValidator(dummyDate, constants.PIVOT_DATE) }).toThrow(new exceptions.InvalidDateFormat('Given day: 31 isn\'t between [1, 30] for given month: 4'))
  })

  it('Should throw error if date is less than pivot date', () => {
    const dummyDate = '1752-09-30'

    expect(function () { utils.dateValidator(dummyDate, constants.PIVOT_DATE) }).toThrow(new exceptions.InvalidDateFormat(`Given date: ${dummyDate} should be greater or equal to ${constants.PIVOT_DATE}`))
  })
})
