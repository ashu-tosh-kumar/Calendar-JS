function InvalidDateFormat(message) {
    // Raised if user passes the date in invalid format
    this.name = 'InvalidDateFormat';
    this.message = message;
    this.stack = (new Error()).stack;
}
InvalidDateFormat.prototype = new Error;

export {
    InvalidDateFormat
}