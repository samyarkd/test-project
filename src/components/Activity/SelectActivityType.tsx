import { Select } from "antd";
import { usePorts } from "~/hooks/usePorts";
import type { ActivityType, PortActivityEvent } from "~/types/port.types";

const activityTypes: ActivityType[] = [
  "Loading",
  "Unloading",
  "Waiting",
  "Berthing",
  "Unberthing",
  "Inspection",
  "Bunkering",
  "Maintenance",
];

const SelectActivityType = (props: { activity: PortActivityEvent }) => {
  const { updateActivity } = usePorts();

  return (
    <Select<ActivityType>
      value={props.activity.activityType}
      options={activityTypes.map((t) => ({ label: t, value: t }))}
      style={{ width: 160 }}
      onSelect={(value) => {
        updateActivity({
          ...props.activity,
          activityType: value,
        });
      }}
    />
  );
};

export default SelectActivityType;
