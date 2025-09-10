// Utility functions for working with time and durations

/**
 * Formats a duration (in milliseconds) as hh:mm:ss.
 * - Hours are unpadded (e.g., 2:05:09), minutes and seconds are zero-padded to 2 digits.
 * - Negative durations are clamped to 0.
 */
export function formatDurationMs(diffMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${hours}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Formats a duration between two Date objects as hh:mm:ss.
 */
export function formatDuration(from: Date, to: Date): string {
  return formatDurationMs(to.getTime() - from.getTime());
}
