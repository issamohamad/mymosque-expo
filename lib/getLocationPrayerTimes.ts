/**
 * gets prayer times for a given city and date
 * @param city - the city to get prayer times for
 * @param date - the date to get prayer times for (defaults to today)
 * @param country - the country to get prayer times for (defaults to Sweden)
 * @param method - calculation method for high latitude adjustments (defaults to 3 - Muslim World League)
 * @returns the prayer times for the given city and date
 */
export default async function getLocationPrayerTimes(
  city: string,
  date?: Date,
  country: string = "Sweden",
  method: number = 3,
) {
  const targetDate = date || new Date();
  const url = `https://api.aladhan.com/v1/timingsByCity/${targetDate.getDate()}-${targetDate.getMonth() + 1}-${targetDate.getFullYear()}?city=${city}&country=${country}&method=${method}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to fetch prayer times", {
      cause: response.statusText,
    });
  }

  const data = await response.json();
  return data.data.timings;
}
