import { DatePicker } from "antd";
import dayjs from "dayjs";
import { usePorts } from "~/hooks/usePorts";
import type { PortActivityEvent } from "~/types/port.types";

const FromDateTime = (props: { activity: PortActivityEvent }) => {
  const { updateActivity } = usePorts();

  return (
    <DatePicker
      showTime
      value={dayjs(props.activity.fromDateTime)}
      style={{ width: "100%" }}
      onChange={(date) => {
        updateActivity({ ...props.activity, fromDateTime: date.toDate() });
      }}
    />
  );
};

export default FromDateTime;
