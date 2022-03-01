class InvalidDateFormat extends Error {
    // Raised if user passes the date in invalid format
    constructor(message) {
        super(message);
        this.name = "InvalidDateFormat";
    }
}

export const exceptions = {
    InvalidDateFormat
};
