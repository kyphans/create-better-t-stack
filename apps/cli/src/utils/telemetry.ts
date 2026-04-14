/**
 * Returns true if telemetry/analytics should be enabled, false otherwise.
 *
 * - If KPS_TELEMETRY_DISABLED is present and "1", disables analytics.
 * - Otherwise, KPS_TELEMETRY: "0" disables, "1" enables (default: enabled).
 */
export function isTelemetryEnabled() {
  const KPS_TELEMETRY_DISABLED = process.env.KPS_TELEMETRY_DISABLED;
  const KPS_TELEMETRY = process.env.KPS_TELEMETRY;

  if (KPS_TELEMETRY_DISABLED !== undefined) {
    return KPS_TELEMETRY_DISABLED !== "1";
  }
  if (KPS_TELEMETRY !== undefined) {
    return KPS_TELEMETRY === "1";
  }
  // Default: enabled
  return true;
}
