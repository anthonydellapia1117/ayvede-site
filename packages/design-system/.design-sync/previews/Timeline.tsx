import { Timeline } from "executive-ui";

const stages = [
  { title: "Discovery", meta: "Weeks 1-6", status: "complete" as const, description: "Inventory integrations and confirm seat counts." },
  { title: "Pilot migration", meta: "Weeks 7-14", status: "current" as const, description: "Move two teams and the three highest-volume connectors." },
  { title: "Full migration", meta: "Weeks 15-26", status: "upcoming" as const, description: "Remaining teams in three waves." },
  { title: "Decommission", meta: "Q2", status: "upcoming" as const },
];

export const Vertical = () => <Timeline stages={stages} style={{ maxWidth: "32rem" }} />;
export const Horizontal = () => <Timeline orientation="horizontal" stages={stages} />;
export const WithoutStatusBadges = () => <Timeline stages={stages.slice(0, 3)} showStatus={false} style={{ maxWidth: "32rem" }} />;
