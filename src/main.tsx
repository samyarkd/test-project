import { App, ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Page from "./Page.tsx";
import PortsDataProvider from "./contexts/PortsDataProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <ConfigProvider componentSize="small">
        <PortsDataProvider>
          <Page />
        </PortsDataProvider>
      </ConfigProvider>
    </App>
  </StrictMode>,
);
