import { useCallback, useMemo, useState, type PropsWithChildren } from "react";

import type {
  PortActivityEvent,
  PortsContextValue,
  PortSummary,
} from "~/types/port.types";
import {
  addNewActivityToPort,
  cloneActivityFromPort,
  deleteActivityFromPort,
  fixPortActivities,
  validatePortActivities,
} from "~/utils/activities";
import { PortsContext } from "./PortsContext";
import { portData } from "./ports.data";

const initialSelectedPortId: number | null = null;

/**
 * Provides a typed context with:
 * - ports: list of { id, name }
 * - selectedPortId, selectedPort, selectedPortActivities
 * - selectPort(id)
 */
export function PortsDataProvider({ children }: PropsWithChildren) {
  const [ports, setPorts] = useState(portData.map(fixPortActivities));

  const summaries = useMemo<PortSummary[]>(
    () => ports.map((p) => ({ key: p.id, id: p.id, name: p.name })),
    [ports],
  );

  // Selected port Id
  const [selectedPortId, setSelectedPortId] = useState<number | null>(() => {
    if (typeof initialSelectedPortId !== "undefined") {
      return initialSelectedPortId;
    }
    return ports.length > 0 ? ports[0].id : null;
  });

  // Selected Port Data
  const selectedPort = useMemo<PortSummary | null>(() => {
    if (selectedPortId == null) return null;
    const found = summaries.find((p) => p.id === selectedPortId);
    return found ?? null;
  }, [selectedPortId, summaries]);

  // Selected Port Activities
  const selectedPortActivities = useMemo<PortActivityEvent[]>(() => {
    if (selectedPortId == null) return [];
    const found = ports.find((p) => p.id === selectedPortId);
    return found?.activities ?? [];
  }, [selectedPortId, ports]);

  // Select Port
  // React guarantees setState functions are stable, so the dependency array can be empty.
  const selectPort = useCallback((id: number | null) => {
    setSelectedPortId(id);
  }, []);

  // Update Activity
  const updateActivity = useCallback(
    (activityUpdate: PortActivityEvent) => {
      if (selectedPortId) {
        const result = ports
          .map((p) => {
            if (p.id === selectedPortId) {
              return {
                ...p,
                activities: p.activities.map((activity) =>
                  activity.id === activityUpdate.id ? activityUpdate : activity,
                ),
              };
            }
            return p;
          })
          .map(validatePortActivities);

        setPorts(result);
      }
    },
    [ports, selectedPortId],
  );

  const fixActivities = useCallback(() => {
    const fixed = ports
      .map((p) => {
        if (p.id === selectedPortId) {
          return validatePortActivities(fixPortActivities(p));
        }
        return p;
      })
      .map(validatePortActivities);

    setPorts(fixed);
  }, [ports, selectedPortId]);

  // Renamed from 'deletedActivity' to 'deleteActivity' for clarity
  const deleteActivity = useCallback(
    (id: number) => {
      const deleted = ports
        .map((p) => {
          if (p.id === selectedPortId) {
            return deleteActivityFromPort(p, id);
          }
          return p;
        })
        .map(validatePortActivities);

      setPorts(deleted);
    },
    [ports, selectedPortId],
  );

  const cloneActivity = useCallback(
    (id: number) => {
      const cloned = ports
        .map((p) => {
          if (p.id === selectedPortId) {
            return cloneActivityFromPort(p, id);
          }
          return p;
        })
        .map(validatePortActivities);

      setPorts(cloned);
    },
    [ports, selectedPortId],
  );

  const addNewActivity = useCallback(() => {
    const updatedPorts = ports
      .map((p) => {
        if (p.id === selectedPortId) {
          return addNewActivityToPort(p);
        }
        return p;
      })
      .map(validatePortActivities);

    setPorts(updatedPorts);
  }, [ports, selectedPortId]);

  // Memoize the entire context value object to prevent consumers from re-rendering
  // when the provider re-renders but the value object's contents are stable.
  const value: PortsContextValue = useMemo(
    () => ({
      ports: summaries,
      selectedPortId,
      selectedPort,
      selectedPortActivities,
      selectPort,
      updateActivity,
      fixActivities,
      deleteActivity,
      cloneActivity,
      addNewActivity,
    }),
    [
      summaries,
      selectedPortId,
      selectedPort,
      selectedPortActivities,
      selectPort,
      updateActivity,
      fixActivities,
      deleteActivity,
      cloneActivity,
      addNewActivity,
    ],
  );

  return (
    <PortsContext.Provider value={value}>{children}</PortsContext.Provider>
  );
}

export default PortsDataProvider;
