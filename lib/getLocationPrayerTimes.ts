/**
 * Result type for prayer times with metadata
 */
export type PrayerTimesResult = {
  timings: any;
  warning?: string;
  latitude?: number;
  method?: number;
};

/**
 * gets prayer times for a given city and date
 * @param city - the city to get prayer times for
 * @param date - the date to get prayer times for (defaults to today)
 * @param country - the country to get prayer times for (defaults to Sweden)
 * @param method - calculation method for prayer times (defaults to 3 - Muslim World League, suitable for high latitudes)
 * @returns the prayer times for the given city and date with metadata
 */
export default async function getLocationPrayerTimes(
  city: string,
  date?: Date,
  country: string = "Sweden",
  method: number = 3,
): Promise<PrayerTimesResult> {
  // Validate inputs
  if (!city || city.trim() === "") {
    throw new Error("City parameter is required and cannot be empty");
  }

  if (!country || country.trim() === "") {
    throw new Error("Country parameter is required and cannot be empty");
  }

  const targetDate = date || new Date();
  // URL encode city and country to handle special characters
  const encodedCity = encodeURIComponent(city.trim());
  const encodedCountry = encodeURIComponent(country.trim());

  const url = `https://api.aladhan.com/v1/timingsByCity/${targetDate.getDate()}-${targetDate.getMonth() + 1}-${targetDate.getFullYear()}?city=${encodedCity}&country=${encodedCountry}&method=${method}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to fetch prayer times", {
      cause: response.statusText,
    });
  }

  const data = await response.json();

  // Check for high-latitude warnings
  let warning: string | undefined;
  const latitude = data.data?.meta?.latitude;

  // High latitude regions (above 60° or below -60°) may have prayer time calculation challenges
  if (latitude !== undefined) {
    const absLatitude = Math.abs(latitude);

    if (absLatitude > 66.5) {
      // Arctic/Antarctic Circle - extreme high latitude
      warning =
        "Prayer times in extreme high-latitude regions may require special adjustments. Using Muslim World League method with midnight/1/7th rule for Fajr and Isha.";
    } else if (absLatitude > 60) {
      // High latitude (like much of Sweden)
      warning =
        "Prayer times calculated using Muslim World League method, suitable for high-latitude regions.";
    }
  }

  return {
    timings: data.data.timings,
    warning,
    latitude,
    method,
  };
}
