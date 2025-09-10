import { Select } from "antd";
import { usePorts } from "~/hooks/usePorts";
import type { ActivityPercent, PortActivityEvent } from "~/types/port.types";

const percents: ActivityPercent[] = [0, 50, 100];

const CompletePercent = (props: { activity: PortActivityEvent }) => {
  const { updateActivity } = usePorts();
  return (
    <Select<ActivityPercent>
      value={props.activity.percent}
      options={percents.map((p) => ({ label: `${p}%`, value: p }))}
      style={{ width: 100 }}
      onSelect={(value) => {
        updateActivity({
          ...props.activity,
          percent: value,
        });
      }}
    />
  );
};

export default CompletePercent;
