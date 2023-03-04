/**
 * Raised if user passes the date in invalid format
 */
class InvalidDateFormat extends Error {
  /**
   * Constructor for class `InvalidDateFormat`
   * @param {*} message Message to be shown in exception
   */
  constructor (message) {
    super(message)
    this.name = 'InvalidDateFormat'
  }
}

export const exceptions = {
  InvalidDateFormat
}
