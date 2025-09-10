import type { PortActivityEvent, PortWithActivities } from "~/types/port.types";

/**
 * Validate activities without changing order.
 * Flags rows whose `toDateTime` does not match the required rule.
 */
export function validateActivities(
  activities: PortActivityEvent[],
): PortActivityEvent[] {
  return activities.map((activity, index, arr) => {
    const prev = arr[index - 1];
    const expectedToDate = prev ? prev.fromDateTime : activity.fromDateTime;

    const needsAdjustment =
      expectedToDate && activity.toDateTime
        ? activity.toDateTime.getTime() !== expectedToDate.getTime()
        : true;

    return {
      ...activity,
      uiState: {
        ...activity.uiState,
        needsAdjustment,
      },
    };
  });
}

/**
 * Fix activities by sorting and recalculating toDateTime.
 * Returns a new array with correct ordering and toDateTime values.
 */
export function fixActivities(
  activities: PortActivityEvent[],
): PortActivityEvent[] {
  const sorted = [...activities].sort(
    (a, b) =>
      (b.fromDateTime?.getTime() || 0) - (a.fromDateTime?.getTime() || 0),
  );

  return sorted.map((activity, index, arr) => {
    const prev = arr[index - 1];
    const toDateTime = prev ? prev.fromDateTime : activity.fromDateTime;

    return {
      ...activity,
      toDateTime,
      uiState: {
        ...activity.uiState,
        needsAdjustment: false, // fixed
      },
    };
  });
}

/**
 * Validate a port's activities and flag misaligned rows.
 * Returns the same port object shape, with activities updated.
 */
export function validatePortActivities(
  port: PortWithActivities,
): PortWithActivities {
  const validatedActivities = validateActivities(port.activities);
  return {
    ...port,
    activities: validatedActivities,
  };
}

/**
 * Fix a port's activities by sorting and recalculating toDateTime.
 * Returns the same port object shape, with activities updated.
 */
export function fixPortActivities(
  port: PortWithActivities,
): PortWithActivities {
  const fixedActivities = fixActivities(port.activities);
  return {
    ...port,
    activities: fixedActivities,
  };
}

/**
 * Delete a row in a port based on the activity id
 * Returns the same port object shape, with activities updated.
 */
export function deleteActivityFromPort(
  port: PortWithActivities,
  id: number,
): PortWithActivities {
  const updatedActivities = port.activities.filter(
    (activity) => activity.id !== id,
  );
  return {
    ...port,
    activities: updatedActivities,
  };
}

/**
 * Clone an activity inside a given activities array.
 * - Finds the activity by numeric id (coerces string ids if present)
 * - Inserts the cloned item immediately AFTER the found activity
 * - Generates a unique next numeric id (maxId + 1)
 * - Marks the clone with uiState.isCloned = true and ensures it has Delete+Clone actions
 * - Does NOT mutate the original array
 */
export function cloneActivityInList(
  activities: PortActivityEvent[],
  idToClone: number,
): PortActivityEvent[] {
  const toNum = (v: unknown): number | null => {
    if (v == null) return null;
    if (typeof v === "number") return Number.isFinite(v) ? v : null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  // compute next id without mutating original
  const maxId = activities.reduce((mx, a) => {
    const n = toNum(a.id);
    return n === null ? mx : Math.max(mx, n);
  }, -Infinity);

  const nextId = Number.isFinite(maxId) ? maxId + 1 : 0;

  const idx = activities.findIndex((a) => toNum(a.id) === idToClone);
  if (idx === -1) return [...activities]; // not found -> return shallow copy (immutable)

  const target = activities[idx];
  const cloned: PortActivityEvent = {
    ...target,
    // keep id type flexible — cast to any to satisfy differing id types in projects
    id: nextId,
    uiState: {
      ...target.uiState,
      isCloned: true,
      isFirstRow: false,
    },
  };

  return [
    ...activities.slice(0, idx + 1),
    cloned,
    ...activities.slice(idx + 1),
  ];
}

/** Wrapper that works with PortWithActivities */
export function cloneActivityFromPort(
  port: PortWithActivities,
  id: number,
): PortWithActivities {
  return {
    ...port,
    activities: cloneActivityInList(port.activities, id),
  };
}

/**
 * Add a new activity by cloning the first one in the list.
 * - Creates a fresh id (maxId + 1)
 * - Clears `fromDateTime`, `toDateTime`, `remarks`, `duration`, `deduction`
 * - Leaves only fields that the user can set later
 */
export function addNewActivityToPort(
  port: PortWithActivities,
): PortWithActivities {
  if (port.activities.length === 0) {
    throw new Error("No activities to clone from");
  }

  const first = port.activities[0];

  const maxId = port.activities.reduce((mx, a) => {
    const n = Number(a.id);
    return Number.isFinite(n) ? Math.max(mx, n) : mx;
  }, -Infinity);

  const nextId = Number.isFinite(maxId) ? maxId + 1 : 0;

  const newActivity: PortActivityEvent = {
    ...first,
    id: nextId,
    activityType: undefined,
    fromDateTime: undefined, // or undefined if you want blank
    toDateTime: undefined, // will be recalculated once user sets fromDateTime
    percent: 100, // default as per your spec
    remarks: undefined,
    uiState: {
      isFirstRow: false,
      isCloned: false,
    },
  };

  return {
    ...port,
    activities: [newActivity, ...port.activities],
  };
}
