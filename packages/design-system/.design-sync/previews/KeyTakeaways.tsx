import { KeyTakeaways } from "executive-ui";

const items = [
  "Three tools cover the same intake-to-approval workflow; 61% of licensed seats are unused.",
  "Option B reaches break-even in month 9 with the lowest change load on teams.",
  "The main risk is migrating 14 custom integrations; two are undocumented.",
];

export const WithBottomLine = () => <KeyTakeaways items={items} bottomLine="Approve option B and fund a 6-week integration discovery." style={{ maxWidth: "44rem" }} />;

export const Inverse = () => <KeyTakeaways tone="inverse" title="Summary" items={items.slice(0, 2)} bottomLine="Decide this quarter." style={{ maxWidth: "44rem" }} />;

export const Subtle = () => <KeyTakeaways tone="subtle" items={items} style={{ maxWidth: "44rem" }} />;
