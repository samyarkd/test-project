import { DatePicker } from "antd";
import dayjs from "dayjs";
import { usePorts } from "~/hooks/usePorts";
import type { PortActivityEvent } from "~/types/port.types";

const FromDateTime = (props: { activity: PortActivityEvent }) => {
  const { updateActivity } = usePorts();

  return (
    <DatePicker
      showTime
      value={
        props.activity.fromDateTime
          ? dayjs(props.activity.fromDateTime)
          : undefined
      }
      style={{ width: "100%" }}
      onChange={(date) => {
        updateActivity({
          ...props.activity,
          fromDateTime: date.toDate(),
          toDateTime: !props.activity.toDateTime
            ? date.toDate()
            : props.activity.toDateTime,
        });
      }}
    />
  );
};

export default FromDateTime;
