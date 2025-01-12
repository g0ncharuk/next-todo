import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// 2025-01-12T01:21:10.378Z

/**
 * Formats a given date string as "MM/DD/YYYY HH:mm" (24-hour format).
 *
 * @param dateString   The date string to be formatted.
 * @returns            A formatted date string.
 */
export function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);

    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(date);

    return formattedDate;
}
