import { Table, StatusIndicator } from "executive-ui";

const columns = [
  { key: "tool", header: "Tool", isRowHeader: true },
  { key: "owner", header: "Owner" },
  { key: "seats", header: "Seats", align: "end" as const },
  { key: "cost", header: "Annual cost", align: "end" as const },
  { key: "status", header: "Status" },
];
const rows = [
  { key: "1", tool: "Tool 1 (incumbent)", owner: "Procurement", seats: "820", cost: "$640,000", status: <StatusIndicator size="sm" status="success" label="Keep" /> },
  { key: "2", tool: "Tool 2", owner: "Legal operations", seats: "310", cost: "$290,000", status: <StatusIndicator size="sm" status="warning" label="Migrate" /> },
  { key: "3", tool: "Tool 3", owner: "Facilities", seats: "150", cost: "$118,000", status: <StatusIndicator size="sm" status="danger" label="Exit" /> },
];

export const WithFooter = () => <Table caption="Licensed seats by tool (illustrative)" columns={columns} rows={rows} footer={{ tool: "Total", owner: "", seats: "1,280", cost: "$1,048,000", status: "" }} />;

export const Compact = () => <Table caption="Compact density" captionHidden columns={columns} rows={rows} density="compact" />;

export const Empty = () => <Table caption="No rows" columns={columns} rows={[]} emptyMessage="No tools match the current filter." />;
