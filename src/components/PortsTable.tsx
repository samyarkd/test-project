import { Card, Table, type TableColumnsType } from "antd";
import { usePorts } from "~/hooks/usePorts";
import type { PortSummary } from "~/types/port.types";
import Note from "./ui/Note";

const columns: TableColumnsType<PortSummary> = [
  {
    title: "Name",
    dataIndex: "name",
  },
];

const PortsTable = () => {
  const { ports, selectPort, selectedPortId } = usePorts();

  return (
    <Card title={<Note>Ports</Note>}>
      <Table
        pagination={false}
        rowSelection={{
          selectedRowKeys: selectedPortId ? [selectedPortId] : [],
          hideSelectAll: true,
          type: "radio",
        }}
        columns={columns}
        dataSource={ports}
        onRow={(record) => {
          return {
            onClick: () => {
              selectPort(record.id);
            },
            style: {
              cursor: "pointer",
            },
          };
        }}
      />
    </Card>
  );
};

export default PortsTable;
