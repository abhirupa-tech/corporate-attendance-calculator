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
