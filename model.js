import { Date, PIVOT_DATE, PIVOT_DAY } from "./constants.js";
import { dateValidator, getActualDaysInMonth, numDaysBetweenDates } from "./utils.js";


function getDateMatrix(date) {
    // Format: "YYYY-MM-DD"
    // Computes the date matrix for a given date
    console.info(`Computing date matrix for: ${date}`);

    // Validation on date passed by user
    dateValidator(date, PIVOT_DATE);

    const dateObj = Date(date)  // Convert into application specific Date object
    dateObj.setDay(1);
    const diffDaysFromPivotDate = numDaysBetweenDates(PIVOT_DATE, dateObj);
    const currDay = (PIVOT_DAY + diffDaysFromPivotDate) % 7;

    //   S  M  T   W   T   F   S
    const dateMatrix = [];
    for (let i = 0; i < 6; i++) {
        dateMatrix.push([null, null, null, null, null, null, null]);
    }

    // Fill the matrix
    // Fill the previous month
    let idx, jdx;
    idx = 0;
    jdx = currDay - 1;
    let lastMonthDate = getActualDaysInMonth(dateObj.getMonth() - 1, dateObj.getYear());
    while (jdx >= 0) {
        dateMatrix[idx][jdx] = lastMonthDate;
        lastMonthDate -= 1;
        jdx -= 1;
    }

    // Fill the current month
    idx = 0;
    jdx = currDay;
    for (let day = 1; day <= getActualDaysInMonth(dateObj.getMonth(), dateObj.getYear()); day++) {
        dateMatrix[idx][jdx] = day;
        jdx += 1;
        if (jdx >= dateMatrix[0].length) {
            idx += 1;
            jdx = 0;
        }
    }

    // Fill the next month
    let nextMonthDate = 1;
    while (idx < dateMatrix.length) {
        dateMatrix[idx][jdx] = nextMonthDate;
        nextMonthDate += 1;
        jdx += 1;
        if (jdx >= dateMatrix[0].length) {
            idx += 1;
            jdx = 0;
        }
    }

    console.info(`Date matrix for date: ${dateObj.getDate()} is:`);
    console.table(dateMatrix);
    return dateMatrix;
}

export {
    getDateMatrix
};

