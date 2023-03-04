import { exceptions } from '../src/exceptions.js'

function fakeRaiseInvalidDateFormat (...args) {
  throw new exceptions.InvalidDateFormat('unittest-invalid-date-format-exception')
}

export {
  fakeRaiseInvalidDateFormat
}
