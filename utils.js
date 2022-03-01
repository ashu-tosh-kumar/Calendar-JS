import { Date, MONTH, MONTHS_WITH_31_DAYS } from "./constants.js";
import { InvalidDateFormat } from "./exceptions.js";


function isLeapYear(year) {
    // Checks whetehr a year is leap year or not
    console.debug(`Checking year: ${year} for leap year`);

    let isLeapYearFlag;
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 == 0) {
                return True;
            }
            else {
                isLeapYearFlag = false;
            }
        }
        else {
            isLeapYearFlag = true;
        }
    }
    else {
        isLeapYearFlag = false;
    }

    console.debug(`Leap year check: ${year}: ${isLeapYearFlag}`);
    return isLeapYearFlag;
}


function countLeapYears(date) {
    // Count number of leap years passed until given `date`
    // It takes current year into consideration if `date` is beyond month of February else not
    console.debug(`Counting no. of leap years until date: ${date.getDate()}`);
    let numLeapYearsUntilDate = 0;
    let year = date.getYear();

    if (date.getMonth() <= 2) {
        year -= 1;
    }

    numLeapYearsUntilDate = Math.floor(year / 4);
    numLeapYearsUntilDate -= Math.floor(year / 100);
    numLeapYearsUntilDate += Math.floor(year / 400);

    console.debug(`No. of leap years until date: ${date.getDate()}: ${numLeapYearsUntilDate}`)
    return numLeapYearsUntilDate;
}


function getDefaultDaysInMonth(month) {
    // Returns no. of default days in a month without considering a leap year
    if (MONTHS_WITH_31_DAYS.has(month)) {
        return 31;
    }
    else if (month === MONTH.FEBRUARY) {
        return 28;
    }
    else {
        return 30;
    }
}


function getActualDaysInMonth(month, year) {
    // Returns no. of default days in a month with considering a leap year
    // Makes use of`getDefaultDaysInMonth`

    if (month === MONTH.FEBRUARY) {
        if (isLeapYear(year)) {
            return 29;
        }
        else {
            return getDefaultDaysInMonth(month);
        }
    }
    else {
        return getDefaultDaysInMonth(month);
    }
}


function numDaysBetweenDates(baseDate, actualDate) {
    // Returns difference of days between two dates
    // Makes use of`getDefaultDaysInMonth`, `countLeapYears`
    console.debug(`Counting diff of days between: ${baseDate.getDate()} and ${actualDate.getDate()}`);

    function calculateAbsoluteDays(date) {
        // Returns no. of absolute days since begining until `date`
        // Makes use of`getDefaultDaysInMonth`, `countLeapYears`
        let totalDays = date.getYear() * 365 + date.getDay();
        for (let i = 1; i < date.getMonth(); i++) {
            totalDays += getDefaultDaysInMonth(i);
        }

        totalDays += countLeapYears(date);
        return totalDays;
    }

    const totalDaysBaseDate = calculateAbsoluteDays(baseDate);
    const totalDaysActualDate = calculateAbsoluteDays(actualDate);

    console.debug(`Diff of days between: ${baseDate.getDate()} and ${actualDate.getDate()} = ${totalDaysActualDate - totalDaysBaseDate}`);
    return totalDaysActualDate - totalDaysBaseDate;
}


function dateValidator(date, pivotDate) {
    // Validates a string date to be accepted by the application
    console.info(`Validaing date: ${date}`);
    let year, month, day;
    try {
        const yearMonthDay = date.split("-");
        year = yearMonthDay[0];
        month = yearMonthDay[1];
        day = yearMonthDay[2];
    }
    catch {
        console.info(`Failed to fetch year, month and/or day information from string: ${date}`);
        throw new InvalidDateFormat(`String ${date} doesn't contain enough separators to specify year, month and day`);
    }

    try {
        year = parseFloat(year);
        month = parseFloat(month);
        day = parseFloat(day);
    }
    catch {
        console.info(`Year and/or month and/or day of date: ${date} is/are not numbers`);
        throw new InvalidDateFormat(`String ${date} contains non-numeric values for year and/or month and/or day`);
    }

    if (parseInt(year) !== year || parseInt(month) !== month || parseInt(day) !== day) {
        console.info(`Year and/or month and/or day of date: ${date} is/are not Integers`);
        throw new InvalidDateFormat(`Year: ${year} or month: ${month} or day: ${day} is/are not integer(s)`);
    }

    if (month <= 0 || month > 12) {
        console.info(`Month of date: ${date} is not in range [1, 12]`);
        throw new InvalidDateFormat(`Given month ${month} isn't between [1, 12]`);
    }

    if (day < 0 || day > 31) {
        console.info(`Day of date: ${date} is not in range [1, 31]`);
        throw new InvalidDateFormat(`Given day: ${day} isn't between [1, 31]`);
    }

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                console.info(`Month of date: ${date} is not in range [1, 29] for a leap year`);
                throw new InvalidDateFormat(`Given day: ${day} isn't between [1,29] for a leap year`);
            }
        }
        else {
            if (day > 28) {
                console.info(`Month of date: ${date} is not in range [1, 28] for a non-leap year`);
                throw new InvalidDateFormat(`Given day: ${day} isn't between [1,28] for a non-leap year`);
            }
        }
    }
    else if (!MONTHS_WITH_31_DAYS.has(month)) {
        if (day === 31) {
            console.info(`Month of date: ${date} is not in range [1,30]`);
            throw new InvalidDateFormat(`Given day: ${day} isn't between [1, 30] for given month: ${month}`);
        }
    }

    if (numDaysBetweenDates(pivotDate, Date(date)) < 0) {
        console.info(`Give: ${date} is less than the pivot date: ${pivotDate} and hence not supported`);
        throw new InvalidDateFormat(`Given date: ${date} should be greater or equal to ${pivotDate}`);
    }
}

export {
    isLeapYear,
    countLeapYears,
    getDefaultDaysInMonth,
    getActualDaysInMonth,
    numDaysBetweenDates,
    dateValidator
};

