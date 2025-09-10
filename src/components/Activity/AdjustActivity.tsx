import { OrderedListOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { usePorts } from "~/hooks/usePorts";

export const AdjustActivity = () => {
  const { fixActivities } = usePorts();

  return (
    <Popconfirm
      onConfirm={() => fixActivities()}
      title="Do you want to sort the event?"
      okText="Ok"
      cancelText="Cancel"
    >
      <Button
        title="Adjust and sort the event"
        type="link"
        danger
        icon={<OrderedListOutlined />}
      />
    </Popconfirm>
  );
};
