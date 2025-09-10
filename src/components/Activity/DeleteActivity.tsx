import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { usePorts } from "~/hooks/usePorts";
import type { PortActivityEvent } from "~/types/port.types";

const DeleteActivity = (props: { activity: PortActivityEvent }) => {
  const { deleteActivity } = usePorts();

  return (
    <Popconfirm
      onConfirm={() => deleteActivity(props.activity.id)}
      title="Sure to delete?"
      okText="Ok"
      cancelText="Cancel"
    >
      <Button title="Delete the event" type="link" icon={<DeleteTwoTone />} />
    </Popconfirm>
  );
};

export default DeleteActivity;
