import { DiagramFrame, ProcessDiagram } from "executive-ui";

export const WithProcess = () => (
  <DiagramFrame
    figureLabel="Figure 1"
    title="Intake-to-approval flow after consolidation"
    caption="One intake queue replaces three; approval moves into the platform where the audit trail lives."
    description="Three steps in order: single intake, owner review (highlighted), recorded decision."
    source="Program office, workshop 2"
  >
    <ProcessDiagram steps={[{ label: "Single intake" }, { label: "Owner review", emphasis: true }, { label: "Recorded decision" }]} />
  </DiagramFrame>
);

export const WithSvg = () => (
  <DiagramFrame title="Seat utilization by tool" caption="Approvals uses 15% of its seats, the lowest of the three tools." description="Three horizontal bars: Ticketing at 50 percent, Contracts at 31 percent, Approvals at 15 percent." source="Admin consoles, March (illustrative)" frame={false}>
    <svg viewBox="0 0 340 96" width="340" height="96" aria-hidden="true" style={{ fontFamily: "inherit", fontSize: 12 }}>
      {[["Ticketing", 50], ["Contracts", 31], ["Approvals", 15]].map(([l, v], i) => (
        <g key={String(l)} transform={`translate(0 ${i * 30})`}>
          <text x="0" y="16" fill="var(--eui-color-text-secondary)">{l}</text>
          <rect x="72" y="4" width={(Number(v) / 100) * 220} height="16" fill="var(--eui-color-data-1)" rx="2" />
          <text x={76 + (Number(v) / 100) * 220} y="16" fill="var(--eui-color-text-primary)">{v}%</text>
        </g>
      ))}
    </svg>
  </DiagramFrame>
);
