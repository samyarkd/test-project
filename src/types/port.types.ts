import type { PropsWithChildren } from "react";

/** Available activity types */
export type ActivityType =
  | "Loading"
  | "Unloading"
  | "Waiting"
  | "Berthing"
  | "Unberthing"
  | "Inspection"
  | "Bunkering"
  | "Maintenance";

/** Percentage values */
export type ActivityPercent = 0 | 50 | 100;

/** Core event type */
export interface PortActivityEvent {
  /** Unique identifier for the event */
  id: number;

  /** Type of port activity */
  activityType: ActivityType | undefined;

  /** Event starting date & time */
  fromDateTime: Date | undefined;

  /** Event ending date & time (calculated, not user-editable) */
  toDateTime: Date | undefined;

  /** Effectiveness percentage */
  percent: ActivityPercent;

  /** Optional user remarks */
  remarks?: string;

  /** Flags for UI state */
  uiState?: {
    /** Row is highlighted red because of misaligned fromDateTime */
    needsAdjustment?: boolean;
    /** Whether this row was cloned */
    isCloned?: boolean;
    /** Whether this row is the first row */
    isFirstRow?: boolean;
  };
}

/** Full port with activities (input to the provider) */
export interface PortWithActivities {
  id: number;
  name: string;
  activities: PortActivityEvent[];
}

/** Port summary (exposed to consumers) */
export interface PortSummary {
  key: React.Key;
  id: number;
  name: string;
}

export interface PortsContextValue {
  /** Only id and name of ports */
  ports: PortSummary[];
  /** Currently selected port id */
  selectedPortId: number | null;
  /** Currently selected port summary */
  selectedPort: PortSummary | null;
  /** Activities of the selected port (empty if none selected) */
  selectedPortActivities: PortActivityEvent[];
  /** Select a port by id (pass null to clear selection) */
  selectPort: (id: number | null) => void;
  /** Update an activity in the current active port */
  updateActivity: (activity: PortActivityEvent) => void;
  /** Sort the activities in the correct order */
  fixActivities: () => void;
  /** Delete an activity */
  deleteActivity: (id: number) => void;
  /** Clone an activity */
  cloneActivity: (id: number) => void;
  /** Add new activity */
  addNewActivity: () => void;
}

export interface PortsDataProviderProps extends PropsWithChildren {
  /** Full dataset including activities */
  ports: PortWithActivities[];
  /** Optional initial selection (defaults to first port if available) */
  initialSelectedPortId?: number | null;
}
