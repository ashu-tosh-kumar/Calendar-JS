// Represents day of a week
const DAY = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
};

const REVERSE_DAY = Object.fromEntries(Object.entries(DAY).map(day => day.reverse()))

Object.freeze(DAY);
Object.freeze(REVERSE_DAY);

// represents a month in a year
const MONTH = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12
}

const REVERSE_MONTH = Object.fromEntries(Object.entries(MONTH).map(month => month.reverse()))

Object.freeze(MONTH);
Object.freeze(REVERSE_MONTH);

// Standardized date object used across the application
const Date = (date) => {
    const yearMonthDay = date.split("-");
    const year = parseInt(yearMonthDay[0]);
    const month = REVERSE_MONTH[parseInt(yearMonthDay[1])];
    let day = parseInt(yearMonthDay[2]);

    const getYear = () => year;
    const getMonth = () => month;
    const getDay = () => day;
    const setDay = (newDay) => { day = newDay; }
    const getDate = () => `${year}-${MONTH[month]}-${day}`;

    return {
        getYear,
        getMonth,
        getDay,
        setDay,
        getDate
    }
}

// The Britain and the British Empire including the American colonies adopted the Gregorina Calendar on 13 - Sept - 1752
// We are following the Gregorian Calendar and hence minimum supported date is 01 - Oct - 1752
const PIVOT_DATE = Date("1752-10-01");
const PIVOT_DAY = DAY.SUNDAY;

// Represents all months that have 31 days in a year
const MONTHS_WITH_31_DAYS = new Set([
    MONTH.JANUARY,
    MONTH.MARCH,
    MONTH.MAY,
    MONTH.JULY,
    MONTH.AUGUST,
    MONTH.OCTOBER,
    MONTH.DECEMBER
]);

export {
    DAY,
    REVERSE_DAY,
    MONTH,
    REVERSE_MONTH,
    Date,
    PIVOT_DATE,
    PIVOT_DAY,
    MONTHS_WITH_31_DAYS
}