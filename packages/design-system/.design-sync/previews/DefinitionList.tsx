import { DefinitionList } from "executive-ui";

export const Inline = () => (
  <DefinitionList
    layout="inline"
    style={{ maxWidth: "40rem" }}
    items={[
      { term: "Decision needed", description: "Approve option B and a 6-week discovery budget" },
      { term: "Decision by", description: "30 September steering committee" },
      { term: "Sponsor", description: "Chief operating officer" },
      { term: "Teams affected", description: "Procurement, legal operations, facilities" },
    ]}
  />
);

export const Stacked = () => (
  <DefinitionList
    layout="stacked"
    items={[
      { term: "Decision needed", description: "Approve option B and a 6-week discovery budget" },
      { term: "Decision by", description: "30 September steering committee" },
    ]}
  />
);

export const GridLayout = () => (
  <DefinitionList
    layout="grid"
    items={[
      { term: "Decision needed", description: "Approve option B" },
      { term: "Decision by", description: "30 September" },
      { term: "Sponsor", description: "Chief operating officer" },
      { term: "Teams affected", description: "Procurement, legal" },
    ]}
  />
);
