import { Button, Card, Table, type TableColumnsType } from "antd";
import dayjs from "dayjs";
import { usePorts } from "~/hooks/usePorts";
import type { PortActivityEvent } from "~/types/port.types";
import { formatDuration, formatDurationMs } from "~/utils/time";
import { AdjustActivity } from "./Activity/AdjustActivity";
import CloneActivity from "./Activity/CloneActivity";
import CompletePercent from "./Activity/CompletePercent";
import DeleteActivity from "./Activity/DeleteActivity";
import FromDateTime from "./Activity/FromDateTime";
import Remarks from "./Activity/Remarks";
import SelectActivityType from "./Activity/SelectActivityType";
import Note from "./ui/Note";

const columns: TableColumnsType<PortActivityEvent> = [
  {
    title: "Day",
    dataIndex: "day",
    key: "day",
    render: (_, record) =>
      new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
        record.fromDateTime,
      ),
  },
  {
    title: "Activity Type",
    dataIndex: "activityType",
    key: "activityType",
    render: (_, record) => (
      <SelectActivityType key={record.id} activity={record} />
    ),
  },
  {
    title: "From Date & Time",
    dataIndex: "fromDateTime",
    key: "fromDateTime",
    render: (_, record) => <FromDateTime key={record.id} activity={record} />,
  },
  {
    title: "Duration (hrs)",
    dataIndex: "duration",
    key: "duration",
    render: (_, record) =>
      record.fromDateTime && record.toDateTime
        ? formatDuration(record.fromDateTime, record.toDateTime)
        : "-",
  },
  {
    title: "%",
    dataIndex: "percent",
    key: "percent",
    render: (_, record) => (
      <CompletePercent key={record.id} activity={record} />
    ),
  },
  {
    title: "To Date & Time",
    dataIndex: "toDateTime",
    key: "toDateTime",
    render: (value) => dayjs(value).format("YYYY-MM-DD HH:mm"),
  },
  {
    title: "Remarks",
    dataIndex: "remarks",
    key: "remarks",
    render: (_, record) => <Remarks key={record.id} activity={record} />,
  },
  {
    title: "Deductions (hrs)",
    dataIndex: "deduction",
    key: "deduction",
    render: (_, record) =>
      record.fromDateTime && record.toDateTime
        ? formatDurationMs(
            ((record.toDateTime.getTime() - record.fromDateTime.getTime()) *
              record.percent) /
              100,
          )
        : "-",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (_, record) => (
      <>
        {record.uiState?.needsAdjustment && <AdjustActivity />}
        <CloneActivity activity={record} />
        <DeleteActivity activity={record} />
      </>
    ),
  },
];

const ActivitiesTable = () => {
  const { selectedPortActivities, selectedPortId, addNewActivity } = usePorts();

  return (
    <Card
      title={<Note>Port Activities</Note>}
      extra={
        <Button onClick={addNewActivity} disabled={!selectedPortId}>
          Add new
        </Button>
      }
    >
      <Table
        pagination={false}
        columns={columns}
        dataSource={selectedPortActivities}
        onRow={(record) => {
          return {
            style: {
              backgroundColor: record.uiState?.needsAdjustment
                ? "#ffc6c6"
                : undefined,
            },
          };
        }}
      />
    </Card>
  );
};

export default ActivitiesTable;
