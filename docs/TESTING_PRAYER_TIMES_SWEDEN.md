# Prayer Time Calculations for Sweden - Testing Guide

This document describes how to test the prayer time calculation functionality for Swedish cities.

## Overview

The MyMosque-Expo app has been adapted to support prayer time calculations for Sweden and other high-latitude regions. The implementation includes:

1. **Dynamic country parameter** - Users can configure city and country in Settings
2. **High-latitude adjustments** - Automatic warnings for extreme latitudes
3. **Muslim World League method** - Default calculation method (Method 3) suitable for Sweden
4. **Input validation** - Prevents empty/invalid city and country entries

## Testing Locations in Sweden

### Recommended Test Cities

1. **Stockholm** (59.3°N)
   - Capital city, moderate latitude
   - Should show: "Prayer times calculated using Muslim World League method"

2. **Kiruna** (67.8°N)
   - Northern city, above Arctic Circle
   - Should show: "Prayer times in extreme high-latitude regions may require special adjustments"
   - Note: During polar day/night, times may need manual verification

3. **Gothenburg** (57.7°N)
   - West coast city
   - Should work normally with Muslim World League method

4. **Malmö** (55.6°N)
   - Southern city
   - Should work normally with Muslim World League method

## Manual Testing Steps

### 1. Configure Location Settings

1. Open the app and navigate to Settings
2. Scroll to "Prayer Time Location" section
3. Click "Edit"
4. Enter:
   - **City**: Stockholm
   - **Country**: Sweden
   - **Calculation Method**: Should show "Method 3 - Muslim World League"
5. Click "Save Location Settings"
6. Verify success message appears

### 2. Test Different Cities

Repeat step 1 with different Swedish cities to verify:

- Prayer times are fetched correctly
- Appropriate warnings appear for high latitudes
- Times are reasonable for the season and location

### 3. Test Input Validation

1. Try to save with empty city → Should show "City cannot be empty"
2. Try to save with empty country → Should show "Country cannot be empty"
3. Verify trimming works (spaces before/after city name)

### 4. Verify Prayer Times

For each city, check that:

- All five daily prayers have times (Fajr, Dhuhr, Asr, Maghrib, Isha)
- Times are in 24-hour format
- Times are reasonable for the current date and season
- High-latitude warnings appear when appropriate

## Expected Results

### Stockholm (January)

- Fajr: ~06:00-07:00
- Sunrise: ~08:30-09:00
- Dhuhr: ~11:30-12:00
- Asr: ~13:00-14:00
- Maghrib: ~15:00-16:00
- Isha: ~17:00-18:00

### Stockholm (June)

- Fajr: ~02:00-03:00 (very early due to high latitude)
- Sunrise: ~03:30-04:00
- Dhuhr: ~13:00-13:30
- Asr: ~17:00-18:00
- Maghrib: ~22:00-22:30
- Isha: May show very late time or use midnight rule

### Kiruna (Summer - Polar Day)

- During polar day (late May to mid-July), prayer times will use special calculations
- Warning should appear: "Prayer times in extreme high-latitude regions may require special adjustments"
- Times may use nearest city rule or angle-based calculations

## API Testing

The app uses the Aladhan API: `https://api.aladhan.com/v1/timingsByCity`

Example manual API test:

```bash
# Stockholm
curl "https://api.aladhan.com/v1/timingsByCity/6-1-2026?city=Stockholm&country=Sweden&method=3"

# Kiruna
curl "https://api.aladhan.com/v1/timingsByCity/6-1-2026?city=Kiruna&country=Sweden&method=3"
```

## Calculation Methods for High Latitudes

The following methods are suitable for Sweden:

- **Method 3: Muslim World League** (Recommended, default)
- Method 2: ISNA (North America, works for high latitudes)
- Method 12: Union Organization Islamic de France
- Method 14: Spiritual Administration of Muslims of Russia

## Known Limitations

1. **Polar Day/Night**: In extreme northern locations (Kiruna) during summer/winter, some prayer times may not be calculable using traditional methods. The app will display times using the nearest applicable calculation.

2. **Database vs API**: The current app uses a database for mosque-specific prayer times. The location settings provide an alternative/fallback mechanism using the Aladhan API.

3. **Time Zone**: Ensure your device time zone is set correctly for accurate prayer times.

## Troubleshooting

### Prayer times not updating

- Check internet connection
- Verify city and country spelling
- Try a different calculation method
- Check app logs for API errors

### Wrong times displayed

- Verify device time zone
- Check that correct city is selected
- Ensure date is current
- Try switching to a different calculation method

### High-latitude warnings

- These are informational and expected for locations above 60°N
- Times are still calculated but may need verification against local mosque times
- Consider consulting with local Islamic scholars for extreme cases

## Additional Resources

- Aladhan API Documentation: https://aladhan.com/prayer-times-api
- Calculation Methods: https://aladhan.com/calculation-methods
- High Latitude Prayer Times: Islamic scholarship recommends following nearest city where day/night are distinguishable
