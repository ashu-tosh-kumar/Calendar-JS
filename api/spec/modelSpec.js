import { model } from '../src/model.js'
import { utils } from '../src/utils.js'
import { exceptions } from '../src/exceptions.js'
import { fakeRaiseInvalidDateFormat } from './mocks.js'

describe('Test getDateMatrix', () => {
  it('Should raise exception for invalid date', () => {
    const dummyDate = '2022-13-15' // Invalid month 13
    spyOn(utils, 'dateValidator').and.callFake(fakeRaiseInvalidDateFormat)

    expect(function () { model.getDateMatrix(dummyDate) }).toThrow(new exceptions.InvalidDateFormat('unittest-invalid-date-format-exception'))
  })

  it('Should return expected date matrix', () => {
    const dummyDate = '2022-02-28'
    spyOn(utils, 'dateValidator').and.returnValue(true)
    // The code in model.js makes date as 1, so this value wouldn't be the actual different between dummyDate and PIVOT_DATE
    spyOn(utils, 'numDaysBetweenDates').and.returnValue(98373)
    spyOn(utils, 'getActualDaysInMonth').and.returnValues(31, 28)
    const expectedValue = [
      [30, 31, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24, 25, 26],
      [27, 28, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11, 12]
    ]

    const actualValue = model.getDateMatrix(dummyDate)

    expect(actualValue).toEqual(expectedValue)
  })

  it('Should return expected date matrix for leap month', () => {
    const dummyDate = '2020-02-28'
    spyOn(utils, 'dateValidator').and.returnValue(true)
    // The code in model.py makes date as 1, so this value wouldn't be the actual different between dummyDate and PIVOT_DATE
    spyOn(utils, 'numDaysBetweenDates').and.returnValue(97642)
    spyOn(utils, 'getActualDaysInMonth').and.returnValues(31, 29)
    const expectedValue = [
      [26, 27, 28, 29, 30, 31, 1],
      [2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22],
      [23, 24, 25, 26, 27, 28, 29],
      [1, 2, 3, 4, 5, 6, 7]
    ]

    const actualValue = model.getDateMatrix(dummyDate)

    expect(actualValue).toEqual(expectedValue)
  })

  it('Should return expected date matrix for non leap month', () => {
    const dummyDate = '2020-03-28'
    spyOn(utils, 'dateValidator').and.returnValue(true)
    // The code in model.py makes date as 1, so this value wouldn't be the actual different between dummyDate and PIVOT_DATE
    spyOn(utils, 'numDaysBetweenDates').and.returnValue(97671)
    spyOn(utils, 'getActualDaysInMonth').and.returnValues(29, 31)
    const expectedValue = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11]
    ]

    const actualValue = model.getDateMatrix(dummyDate)

    expect(actualValue).toEqual(expectedValue)
  })

  it('Should return expected date matrix for a random date', () => {
    const dummyDate = '2385-07-07'
    spyOn(utils, 'dateValidator').and.returnValue(true)
    // The code in model.py makes date as 1, so this value wouldn't be the actual different between dummyDate and PIVOT_DATE
    spyOn(utils, 'numDaysBetweenDates').and.returnValue(231106)
    spyOn(utils, 'getActualDaysInMonth').and.returnValues(30, 31)
    const expectedValue = [
      [30, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, 31, 1, 2, 3],
      [4, 5, 6, 7, 8, 9, 10]
    ]

    const actualValue = model.getDateMatrix(dummyDate)

    expect(actualValue).toEqual(expectedValue)
  })
})
