import { useContext } from "react";
import { PortsContext } from "~/contexts/PortsContext";

export function usePorts() {
  const ctx = useContext(PortsContext);
  if (!ctx) {
    throw new Error("usePorts must be used within a PortsDataProvider");
  }
  return ctx;
}
