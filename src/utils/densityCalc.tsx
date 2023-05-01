export function calculatePplPerSqKilometer(
  rawPpl: number,
  areaInSqMeters: number
): number {
  const metersPerKilometer = 1000
  const areaInSqKilometers = areaInSqMeters / Math.pow(metersPerKilometer, 2)
  const pplPerSqKilometer = rawPpl / areaInSqKilometers
  return parseFloat(pplPerSqKilometer.toFixed(2))
}
