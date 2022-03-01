import { exceptions } from "../exceptions.js";

describe("Test InvalidDateFormat", () => {
    it("Should exist", () => {
        expect(exceptions.InvalidDateFormat).toBeDefined();
    });
});