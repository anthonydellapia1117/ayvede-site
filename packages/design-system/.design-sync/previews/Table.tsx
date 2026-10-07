import { Table, StatusIndicator } from "executive-ui";

export const WithFooter = () => (
  <Table
    caption="Licensed seats by tool (illustrative)"
    columns={[
      { key: "tool", header: "Tool", isRowHeader: true },
      { key: "owner", header: "Owner" },
      { key: "seats", header: "Seats", align: "end" },
      { key: "cost", header: "Annual cost", align: "end" },
      { key: "status", header: "Status" },
    ]}
    rows={[
      { key: "1", tool: "Incumbent suite", owner: "Procurement", seats: "820", cost: "$640,000", status: <StatusIndicator size="sm" status="success" label="Keep" /> },
      { key: "2", tool: "Contract workflow app", owner: "Legal operations", seats: "310", cost: "$290,000", status: <StatusIndicator size="sm" status="warning" label="Migrate" /> },
      { key: "3", tool: "Facilities request tool", owner: "Facilities", seats: "150", cost: "$118,000", status: <StatusIndicator size="sm" status="danger" label="Exit" /> },
    ]}
    footer={{ tool: "Total", owner: "", seats: "1,280", cost: "$1,048,000", status: "" }}
  />
);

export const Compact = () => (
  <Table
    caption="Licensed seats by tool (illustrative)"
    density="compact"
    columns={[
      { key: "tool", header: "Tool", isRowHeader: true },
      { key: "owner", header: "Owner" },
      { key: "seats", header: "Seats", align: "end" },
      { key: "cost", header: "Annual cost", align: "end" },
      { key: "status", header: "Status" },
    ]}
    rows={[
      { key: "1", tool: "Incumbent suite", owner: "Procurement", seats: "820", cost: "$640,000", status: <StatusIndicator size="sm" status="success" label="Keep" /> },
      { key: "2", tool: "Contract workflow app", owner: "Legal operations", seats: "310", cost: "$290,000", status: <StatusIndicator size="sm" status="warning" label="Migrate" /> },
      { key: "3", tool: "Facilities request tool", owner: "Facilities", seats: "150", cost: "$118,000", status: <StatusIndicator size="sm" status="danger" label="Exit" /> },
    ]}
  />
);

export const Empty = () => (
  <Table
    caption="Licensed seats by tool"
    columns={[
      { key: "tool", header: "Tool", isRowHeader: true },
      { key: "owner", header: "Owner" },
      { key: "seats", header: "Seats", align: "end" },
      { key: "cost", header: "Annual cost", align: "end" },
      { key: "status", header: "Status" },
    ]}
    rows={[]}
    emptyMessage="No tools match the current filter."
  />
);
