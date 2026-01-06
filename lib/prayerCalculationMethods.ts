/**
 * Prayer Time Calculation Methods for Aladhan API
 *
 * This file documents the calculation methods available in the Aladhan API.
 * For high-latitude regions like Sweden, certain methods are more suitable.
 *
 * Reference: https://aladhan.com/calculation-methods
 */

export type CalculationMethod = {
  id: number;
  name: string;
  description: string;
  suitableFor: string[];
  highLatitudeSupport: boolean;
};

/**
 * Available calculation methods for prayer times
 */
export const CALCULATION_METHODS: CalculationMethod[] = [
  {
    id: 0,
    name: "Shia Ithna-Ansari",
    description: "Shia Ithna Ashari, Leva Institute, Qum",
    suitableFor: ["Global"],
    highLatitudeSupport: false,
  },
  {
    id: 1,
    name: "University of Islamic Sciences, Karachi",
    description:
      "Used in Pakistan, Bangladesh, India, Afghanistan, and parts of Europe",
    suitableFor: ["South Asia"],
    highLatitudeSupport: false,
  },
  {
    id: 2,
    name: "Islamic Society of North America (ISNA)",
    description: "Used in North America",
    suitableFor: ["North America"],
    highLatitudeSupport: true,
  },
  {
    id: 3,
    name: "Muslim World League",
    description:
      "Recommended for Europe and high-latitude regions. Uses angle-based calculations suitable for areas with extreme day/night variations.",
    suitableFor: ["Europe", "Sweden", "High Latitudes"],
    highLatitudeSupport: true,
  },
  {
    id: 4,
    name: "Umm Al-Qura University, Makkah",
    description: "Used in Saudi Arabia",
    suitableFor: ["Middle East", "Saudi Arabia"],
    highLatitudeSupport: false,
  },
  {
    id: 5,
    name: "Egyptian General Authority of Survey",
    description: "Used in Egypt and the Middle East",
    suitableFor: ["Middle East", "Africa"],
    highLatitudeSupport: false,
  },
  {
    id: 7,
    name: "Institute of Geophysics, University of Tehran",
    description: "Used in Iran",
    suitableFor: ["Iran"],
    highLatitudeSupport: false,
  },
  {
    id: 8,
    name: "Gulf Region",
    description: "Used in Gulf countries",
    suitableFor: ["Gulf Countries"],
    highLatitudeSupport: false,
  },
  {
    id: 9,
    name: "Kuwait",
    description: "Used in Kuwait",
    suitableFor: ["Kuwait"],
    highLatitudeSupport: false,
  },
  {
    id: 10,
    name: "Qatar",
    description: "Used in Qatar",
    suitableFor: ["Qatar"],
    highLatitudeSupport: false,
  },
  {
    id: 11,
    name: "Majlis Ugama Islam Singapura, Singapore",
    description: "Used in Singapore",
    suitableFor: ["Singapore", "Southeast Asia"],
    highLatitudeSupport: false,
  },
  {
    id: 12,
    name: "Union Organization islamic de France",
    description: "Used in France",
    suitableFor: ["France"],
    highLatitudeSupport: true,
  },
  {
    id: 13,
    name: "Diyanet İşleri Başkanlığı, Turkey",
    description: "Used in Turkey",
    suitableFor: ["Turkey"],
    highLatitudeSupport: false,
  },
  {
    id: 14,
    name: "Spiritual Administration of Muslims of Russia",
    description: "Used in Russia and high-latitude regions",
    suitableFor: ["Russia", "High Latitudes"],
    highLatitudeSupport: true,
  },
];

/**
 * Get recommended calculation methods for high-latitude regions
 */
export function getHighLatitudeMethods(): CalculationMethod[] {
  return CALCULATION_METHODS.filter((method) => method.highLatitudeSupport);
}

/**
 * Get calculation method by ID
 */
export function getMethodById(id: number): CalculationMethod | undefined {
  return CALCULATION_METHODS.find((method) => method.id === id);
}

/**
 * Get the default method for Sweden
 * Returns Muslim World League (Method 3) which is recommended for high-latitude regions
 */
export function getSwedishDefaultMethod(): CalculationMethod {
  return CALCULATION_METHODS.find((method) => method.id === 3)!;
}

/**
 * High-Latitude Adjustment Information
 *
 * For locations above 60° latitude (most of Sweden, including Stockholm at 59.3°N),
 * prayer time calculations require special consideration, especially during summer
 * when twilight may last all night.
 *
 * The Aladhan API handles this using different methods:
 * 1. Middle of the Night Method (for Isha)
 * 2. One-Seventh of the Night Method (for Isha)
 * 3. Angle-based Method (recommended - used by Muslim World League)
 *
 * For extreme locations like Kiruna (67.8°N), during polar day/night periods,
 * scholars recommend following the times of the nearest location where day and
 * night can be distinguished (e.g., Stockholm or Mecca).
 *
 * The Muslim World League method (Method 3) is recommended for Sweden as it:
 * - Uses appropriate angles for Fajr (18°) and Isha (17°)
 * - Has built-in high-latitude adjustments
 * - Is widely accepted in European Muslim communities
 */
export const HIGH_LATITUDE_INFO = {
  swedenLatitudeRange: { min: 55.3, max: 69.1 },
  arcticCircle: 66.5,
  stockholmLatitude: 59.3,
  kirunaLatitude: 67.8,
  recommendedMethod: 3, // Muslim World League
  alternativeMethods: [2, 12, 14], // ISNA, France, Russia
};
