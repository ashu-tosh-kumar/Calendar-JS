class InvalidDateFormat extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidDateFormat";
    }
}

export const exceptions = {
    InvalidDateFormat
};
