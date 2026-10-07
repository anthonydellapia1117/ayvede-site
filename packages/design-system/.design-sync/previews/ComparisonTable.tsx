import { ComparisonTable, StatusIndicator } from "executive-ui";

export const Recommended = () => (
  <ComparisonTable
    caption="Comparison of vendor consolidation options (illustrative)"
    options={[{ label: "A. Keep all three" }, { label: "B. Consolidate on incumbent", recommended: true }, { label: "C. Replace with new platform" }]}
    criteria={[
      { label: "Three-year cost", values: ["$7.4M", "$5.5M", "$6.1M"] },
      { label: "Change load on teams", values: [<StatusIndicator key="a" status="success" label="None" />, <StatusIndicator key="b" status="warning" label="Moderate" />, <StatusIndicator key="c" status="danger" label="High" />] },
      { label: "Time to value", values: ["Immediate", "9 months", "18 months"] },
    ]}
  />
);

export const TwoOptions = () => (
  <ComparisonTable caption="Build or buy (illustrative)" criteriaHeader="Factor" options={[{ label: "Build" }, { label: "Buy", recommended: true }]} criteria={[{ label: "Time to value", values: ["9 months", "3 months"] }, { label: "Run cost", values: ["Lower", "Higher"] }]} density="compact" />
);
