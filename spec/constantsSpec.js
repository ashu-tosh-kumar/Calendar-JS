import { constants } from "../constants.js";

describe("Testing DAY", () => {
    it("Should have 7 days in DAY", () => {
        expect(Object.keys(constants.DAY).length).toBe(7);
    });
});

describe("Testing MONTH", () => {
    it("Should have 12 months in MONTH", () => {
        expect(Object.keys(constants.MONTH).length).toBe(12);
    });
});

describe("Testing Date", () => {
    it("Should be able to parse a valid date", () => {
        const dummyDate = "2022-02-28";
        constants.Date(dummyDate);  // No error expected here
    });

    it("Should have getYear returning year", () => {
        const dummyDate = "2022-02-28";

        const dateObject = constants.Date(dummyDate);

        expect(dateObject.getYear()).toBe(2022);
    });

    it("Should have getMonth returning month", () => {
        const dummyDate = "2022-02-28";

        const dateObject = constants.Date(dummyDate);

        expect(dateObject.getMonth()).toBe(2);
    });

    it("Should have getDay returning day", () => {
        const dummyDate = "2022-02-28";

        const dateObject = constants.Date(dummyDate);

        expect(dateObject.getDay()).toBe(28);
    });

    it("Should have allow setting of day", () => {
        const dummyDate = "2022-02-28";

        const dateObject = constants.Date(dummyDate);
        dateObject.setDay(1);

        expect(dateObject.getDay()).toBe(1);
    });

    it("Should be able to return date in string format", () => {
        const dummyDate = "2022-02-28";

        const dateObject = constants.Date(dummyDate);
        dateObject.setDay(1);

        expect(dateObject.getDate()).toBe("2022-2-1");
    });
});

describe("Testing PIVOT_DATE", () => {
    it("Should have PIVOT_DATE defined", () => {
        const expectedDate = constants.Date("1752-10-01");

        expect(constants.PIVOT_DATE.getYear()).toBe(expectedDate.getYear());
        expect(constants.PIVOT_DATE.getMonth()).toBe(expectedDate.getMonth());
        expect(constants.PIVOT_DATE.getDay()).toBe(expectedDate.getDay());
    });
});

describe("Testing PIVOT_DAY", () => {
    it("Should have PIVOT_DAY defined", () => {
        const expectedDay = constants.DAY.SUNDAY;

        expect(constants.PIVOT_DAY).toBe(expectedDay);
    });
});

describe("Testing MONTHS_WITH_31_DAYS", () => {
    it("Should have 7 months", () => {
        expect(constants.MONTHS_WITH_31_DAYS.size).toBe(7);
    });

    it("Should have expected months", () => {
        expect(constants.MONTHS_WITH_31_DAYS).toContain(1);
        expect(constants.MONTHS_WITH_31_DAYS).toContain(3);
        expect(constants.MONTHS_WITH_31_DAYS).toContain(5);
        expect(constants.MONTHS_WITH_31_DAYS).toContain(7);
        expect(constants.MONTHS_WITH_31_DAYS).toContain(8);
        expect(constants.MONTHS_WITH_31_DAYS).toContain(10);
        expect(constants.MONTHS_WITH_31_DAYS).toContain(12);
    });
});