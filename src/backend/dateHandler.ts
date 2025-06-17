import { monthMap, RawDate } from "./types";

/**
 * Retrieves the current date as an object containing day, month, and year.
 *
 * @returns {RawDate} An object representing the current date with the following properties:
 * - `day`: The day of the month (1-31).
 * - `month`: The month of the year (1-12, where January is 1).
 * - `year`: The full year (e.g., 2023).
 */
export const getCurrentDate = () : RawDate => {
    const date = new Date();
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    }
}

/**
 * Checks if the given year is a leap year.
 *
 * @param {number} year - The year to check.
 * @returns {boolean} `true` if the year is a leap year, otherwise `false`.
 */
export const getMonthDetails = (monthNumber: number) : string => {
    const monthDetails = monthMap.get(monthNumber);
    return monthDetails ? monthDetails.name : "Invalid Month";
};

/**
 * Calculates the number of days in a given month of a specific year.
 *
 * @param month - The month number (1 for January, 2 for February, ..., 12 for December).
 * @param year - The year to consider, used to determine if February has an extra day in a leap year.
 * @returns The number of days in the specified month and year.
 * @throws {Error} If the provided month number is invalid.
 */
export const getDaysInMonth = (month: number, year: number) : number => {
    const monthDetails = monthMap.get(month);
    if (!monthDetails) {
        throw new Error("Invalid month number");
    }
    if (month === 2 && isLeapYear(year)) {
        return monthDetails.days + 1;
    }
    return monthDetails.days;
}

const isLeapYear = (year: number) : boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export const getDayOfWeek = (date: RawDate) : number => {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}