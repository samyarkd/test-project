import { Flex, Spin } from "antd";
import React, { Suspense } from "react";

const ActivitiesTable = React.lazy(
  () => import("./components/ActivitiesTable"),
);
const PortsTable = React.lazy(() => import("./components/PortsTable"));

function Page() {
  return (
    <Flex vertical gap="middle">
      <Suspense
        fallback={
          <Flex align="center" vertical gap="middle">
            <Spin tip="Loading" size="small" />
          </Flex>
        }
      >
        {/* Ports */}
        <PortsTable />
        {/* Events */}
        <ActivitiesTable />
      </Suspense>
    </Flex>
  );
}

export default Page;
