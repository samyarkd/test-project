import TextArea from "antd/es/input/TextArea";
import { usePorts } from "~/hooks/usePorts";
import type { PortActivityEvent } from "~/types/port.types";

const Remarks = (props: { activity: PortActivityEvent }) => {
  const { updateActivity } = usePorts();
  return (
    <TextArea
      defaultValue={props.activity.remarks}
      placeholder="A description"
      onChange={(e) => {
        e.preventDefault();
        updateActivity({ ...props.activity, remarks: e.target.value });
      }}
    />
  );
};

export default Remarks;
