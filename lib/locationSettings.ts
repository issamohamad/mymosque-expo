import { storage } from "./mmkv";

export type LocationSettings = {
  country: string;
  city: string;
  calculationMethod: number;
};

const DEFAULT_LOCATION_SETTINGS: LocationSettings = {
  country: "Sweden",
  city: "Stockholm",
  calculationMethod: 3, // Muslim World League - handles high latitude adjustments well
};

const LOCATION_SETTINGS_KEY = "locationSettings";

/**
 * Load location settings from storage
 * @returns the location settings
 */
export const loadLocationSettings = (): LocationSettings => {
  const settingsString = storage.getString(LOCATION_SETTINGS_KEY);
  if (settingsString) {
    try {
      return JSON.parse(settingsString);
    } catch (error) {
      console.error("Error parsing location settings:", error);
      return DEFAULT_LOCATION_SETTINGS;
    }
  }
  return DEFAULT_LOCATION_SETTINGS;
};

/**
 * Save location settings to storage
 * @param settings - the location settings to save
 */
export const saveLocationSettings = (settings: LocationSettings): void => {
  try {
    storage.set(LOCATION_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving location settings:", error);
  }
};

/**
 * Get the calculation method name
 * @param method - the calculation method number
 * @returns the name of the calculation method
 */
export const getCalculationMethodName = (method: number): string => {
  const methods: Record<number, string> = {
    1: "University of Islamic Sciences, Karachi",
    2: "Islamic Society of North America",
    3: "Muslim World League",
    4: "Umm Al-Qura University, Makkah",
    5: "Egyptian General Authority of Survey",
    7: "Institute of Geophysics, University of Tehran",
    8: "Gulf Region",
    9: "Kuwait",
    10: "Qatar",
    11: "Majlis Ugama Islam Singapura, Singapore",
    12: "Union Organization islamic de France",
    13: "Diyanet İşleri Başkanlığı, Turkey",
    14: "Spiritual Administration of Muslims of Russia",
  };
  return methods[method] || "Muslim World League";
};

/**
 * Get available calculation methods
 * @returns array of calculation method options
 */
export const getAvailableCalculationMethods = (): Array<{
  value: number;
  label: string;
}> => {
  return [
    { value: 1, label: "University of Islamic Sciences, Karachi" },
    { value: 2, label: "Islamic Society of North America" },
    { value: 3, label: "Muslim World League" },
    { value: 4, label: "Umm Al-Qura University, Makkah" },
    { value: 5, label: "Egyptian General Authority of Survey" },
    { value: 7, label: "Institute of Geophysics, University of Tehran" },
    { value: 8, label: "Gulf Region" },
    { value: 9, label: "Kuwait" },
    { value: 10, label: "Qatar" },
    { value: 11, label: "Majlis Ugama Islam Singapura, Singapore" },
    { value: 12, label: "Union Organization islamic de France" },
    { value: 13, label: "Diyanet İşleri Başkanlığı, Turkey" },
    { value: 14, label: "Spiritual Administration of Muslims of Russia" },
  ];
};

/**
 * Get popular countries for quick selection
 * @returns array of popular country options
 */
export const getPopularCountries = (): string[] => {
  return [
    "Sweden",
    "United States",
    "United Kingdom",
    "Canada",
    "Germany",
    "France",
    "Norway",
    "Denmark",
    "Finland",
    "Saudi Arabia",
    "United Arab Emirates",
    "Turkey",
    "Egypt",
    "Pakistan",
    "India",
    "Malaysia",
    "Indonesia",
  ];
};
