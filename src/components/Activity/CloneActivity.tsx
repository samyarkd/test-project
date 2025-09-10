import { CopyTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import { usePorts } from "~/hooks/usePorts";
import type { PortActivityEvent } from "~/types/port.types";

const CloneActivity = (props: { activity: PortActivityEvent }) => {
  const { cloneActivity } = usePorts();

  return (
    <Button
      onClick={() => {
        cloneActivity(props.activity.id);
      }}
      title="Clone the event"
      type="link"
      icon={<CopyTwoTone />}
    />
  );
};

export default CloneActivity;
