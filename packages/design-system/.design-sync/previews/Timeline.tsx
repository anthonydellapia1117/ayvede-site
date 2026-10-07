import { Timeline } from "executive-ui";

export const Vertical = () => (
  <Timeline
    style={{ maxWidth: "32rem" }}
    stages={[
      { title: "Discovery", meta: "Weeks 1-6", status: "complete", description: "Inventory integrations and confirm seat counts." },
      { title: "Pilot migration", meta: "Weeks 7-14", status: "current", description: "Move two teams and the top three connectors." },
      { title: "Full migration", meta: "Weeks 15-26", status: "upcoming", description: "Remaining teams in three waves." },
      { title: "Decommission", meta: "Q2", status: "upcoming", description: "Retire legacy tools and close contracts." },
    ]}
  />
);

export const Horizontal = () => (
  <Timeline
    orientation="horizontal"
    stages={[
      { title: "Discovery", meta: "Weeks 1-6", status: "complete", description: "Inventory integrations and confirm seat counts." },
      { title: "Pilot migration", meta: "Weeks 7-14", status: "current", description: "Move two teams and the top three connectors." },
      { title: "Full migration", meta: "Weeks 15-26", status: "upcoming", description: "Remaining teams in three waves." },
      { title: "Decommission", meta: "Q2", status: "upcoming", description: "Retire legacy tools and close contracts." },
    ]}
  />
);

export const WithoutStatusBadges = () => (
  <Timeline
    showStatus={false}
    style={{ maxWidth: "32rem" }}
    stages={[
      { title: "Discovery", meta: "Weeks 1-6", status: "complete", description: "Inventory integrations and confirm seat counts." },
      { title: "Pilot migration", meta: "Weeks 7-14", status: "current", description: "Move two teams and the top three connectors." },
      { title: "Full migration", meta: "Weeks 15-26", status: "upcoming", description: "Remaining teams in three waves." },
    ]}
  />
);
