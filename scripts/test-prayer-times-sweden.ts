/**
 * Manual test script for prayer time calculations in Sweden
 *
 * This script tests the getLocationPrayerTimes function with Swedish cities
 * to ensure correct prayer times and high-latitude adjustments.
 *
 * To run: npx tsx scripts/test-prayer-times-sweden.ts
 */

import getLocationPrayerTimes from "../lib/getLocationPrayerTimes";

async function testSwedishCities() {
  console.log("=== Testing Prayer Times for Swedish Cities ===\n");

  const testCases = [
    {
      city: "Stockholm",
      country: "Sweden",
      expectedLatitude: 59.3,
      description: "Capital, moderate latitude",
    },
    {
      city: "Kiruna",
      country: "Sweden",
      expectedLatitude: 67.8,
      description: "Northern city, above Arctic Circle",
    },
    {
      city: "Gothenburg",
      country: "Sweden",
      expectedLatitude: 57.7,
      description: "West coast, moderate latitude",
    },
    {
      city: "Malmö",
      country: "Sweden",
      expectedLatitude: 55.6,
      description: "Southern city, lower latitude",
    },
  ];

  for (const testCase of testCases) {
    console.log(`\nTesting: ${testCase.city} (${testCase.description})`);
    console.log("Expected latitude:", testCase.expectedLatitude);

    try {
      const result = await getLocationPrayerTimes(
        testCase.city,
        new Date(),
        testCase.country,
        3, // Muslim World League method
      );

      console.log("✅ Success!");
      console.log("Latitude:", result.latitude?.toFixed(2) || "N/A");
      console.log("Method:", result.method);

      if (result.warning) {
        console.log("⚠️  Warning:", result.warning);
      }

      console.log("Prayer Times:");
      console.log("  Fajr:", result.timings.Fajr);
      console.log("  Sunrise:", result.timings.Sunrise);
      console.log("  Dhuhr:", result.timings.Dhuhr);
      console.log("  Asr:", result.timings.Asr);
      console.log("  Maghrib:", result.timings.Maghrib);
      console.log("  Isha:", result.timings.Isha);

      // Validate that we got prayer times
      if (!result.timings.Fajr || !result.timings.Isha) {
        console.log("❌ ERROR: Missing prayer times!");
      }

      // Check latitude matches expected (within reasonable range)
      if (result.latitude) {
        const latDiff = Math.abs(result.latitude - testCase.expectedLatitude);
        if (latDiff > 2) {
          console.log(
            `❌ WARNING: Latitude mismatch! Expected ${testCase.expectedLatitude}, got ${result.latitude}`,
          );
        }
      }
    } catch (error) {
      console.log(
        "❌ Error:",
        error instanceof Error ? error.message : "Unknown error",
      );
    }

    console.log("-".repeat(60));
  }

  // Test validation errors
  console.log("\n=== Testing Input Validation ===\n");

  console.log("Test: Empty city");
  try {
    await getLocationPrayerTimes("", new Date(), "Sweden");
    console.log("❌ Should have thrown error");
  } catch (error) {
    console.log(
      "✅ Correctly threw error:",
      error instanceof Error ? error.message : "Unknown",
    );
  }

  console.log("\nTest: Empty country");
  try {
    await getLocationPrayerTimes("Stockholm", new Date(), "");
    console.log("❌ Should have thrown error");
  } catch (error) {
    console.log(
      "✅ Correctly threw error:",
      error instanceof Error ? error.message : "Unknown",
    );
  }

  console.log("\n=== All tests completed ===");
}

// Run tests
testSwedishCities().catch(console.error);
