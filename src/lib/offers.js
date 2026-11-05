// Early Black Friday (5 to 30 Nov 2026). Shared by the /black-friday page and
// the homepage notice, so both stop on the same second.
// Monday 30 November 2026, 23:59:59 UK time (GMT in November).
export const BLACK_FRIDAY_ENDS = Date.UTC(2026, 10, 30, 23, 59, 59)
export const blackFridayOn = () => Date.now() <= BLACK_FRIDAY_ENDS
