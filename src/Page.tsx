import { Flex } from "antd";

import ActivitiesTable from "./components/ActivitiesTable";
import PortsTable from "./components/PortsTable";

function Page() {
  return (
    <Flex vertical gap="middle">
      {/* Ports */}
      <PortsTable />
      {/* Events */}
      <ActivitiesTable />
    </Flex>
  );
}

export default Page;
