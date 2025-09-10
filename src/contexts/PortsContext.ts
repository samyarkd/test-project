import { createContext } from "react";
import type { PortsContextValue } from "~/types/port.types";

export const PortsContext = createContext<PortsContextValue | undefined>(
  undefined,
);
