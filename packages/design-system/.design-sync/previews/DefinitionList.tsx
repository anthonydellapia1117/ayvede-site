import { DefinitionList } from "executive-ui";

const items = [
  { term: "Decision needed", description: "Approve option B and the discovery budget." },
  { term: "Decision by", description: "End of this quarter." },
  { term: "Sponsor", description: "Chief operating officer" },
  { term: "Teams affected", description: "Procurement, legal operations, facilities" },
];

export const Inline = () => <DefinitionList layout="inline" items={items} style={{ maxWidth: "40rem" }} />;
export const Stacked = () => <DefinitionList layout="stacked" items={items.slice(0, 2)} />;
export const GridLayout = () => <DefinitionList layout="grid" items={items} />;
