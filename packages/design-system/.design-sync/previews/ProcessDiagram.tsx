import { ProcessDiagram } from "executive-ui";

const steps = [
  { label: "Single intake", description: "Web form and email both land in one queue." },
  { label: "Automated triage", description: "Rules route by request type and value." },
  { label: "Owner review", description: "Approve, return, or escalate in place.", emphasis: true },
  { label: "Recorded decision", description: "History and attachments stored once." },
];

export const Horizontal = () => <ProcessDiagram steps={steps} />;
export const Vertical = () => <ProcessDiagram direction="vertical" steps={steps.slice(0, 3)} style={{ maxWidth: "24rem" }} />;
