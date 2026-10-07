import { KeyTakeaways } from "executive-ui";

export const WithBottomLine = () => (
  <KeyTakeaways
    style={{ maxWidth: "44rem" }}
    items={[
      "Three tools cover the same intake-to-approval workflow; 61% of licensed seats are unused.",
      "Option B reaches break-even in month 9 with the lowest change load on teams.",
      "The main risk is migrating 14 custom integrations; two are undocumented.",
    ]}
    bottomLine="Approve option B and fund a 6-week integration discovery."
  />
);

export const Inverse = () => (
  <KeyTakeaways
    tone="inverse"
    title="Summary"
    style={{ maxWidth: "44rem" }}
    items={[
      "Three tools cover the same intake-to-approval workflow; 61% of licensed seats are unused.",
      "Option B reaches break-even in month 9 with the lowest change load on teams.",
    ]}
    bottomLine="Decide this quarter."
  />
);

export const Subtle = () => (
  <KeyTakeaways
    tone="subtle"
    style={{ maxWidth: "44rem" }}
    items={[
      "Three tools cover the same intake-to-approval workflow; 61% of licensed seats are unused.",
      "Option B reaches break-even in month 9 with the lowest change load on teams.",
      "The main risk is migrating 14 custom integrations; two are undocumented.",
    ]}
  />
);
