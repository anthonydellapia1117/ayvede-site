import { DiagramFrame, ProcessDiagram } from "executive-ui";

export const WithProcess = () => (
  <DiagramFrame
    figureLabel="Figure 1"
    title="Intake-to-approval flow after consolidation"
    caption="One intake queue replaces three; approval moves into the platform where the audit trail lives."
    description="Four steps in order: single intake, automated triage, owner review (highlighted), recorded decision."
    source="Program office, workshop 2"
  >
    <ProcessDiagram steps={[{ label: "Single intake" }, { label: "Automated triage" }, { label: "Owner review", emphasis: true }, { label: "Recorded decision" }]} />
  </DiagramFrame>
);

export const WithSvg = () => (
  <DiagramFrame title="Seat utilization by tool" caption="Tool 3 has the lowest utilization." description="Three horizontal bars: Tool 1 at 50 percent, Tool 2 at 31 percent, Tool 3 at 15 percent." frame={false}>
    <svg viewBox="0 0 320 96" width="320" height="96" aria-hidden="true" style={{ fontFamily: "inherit", fontSize: 12 }}>
      {[["Tool 1", 50], ["Tool 2", 31], ["Tool 3", 15]].map(([l, v], i) => (
        <g key={String(l)} transform={`translate(0 ${i * 30})`}>
          <text x="0" y="16" fill="var(--eui-color-text-secondary)">{l}</text>
          <rect x="56" y="4" width={(Number(v) / 100) * 220} height="16" fill="var(--eui-color-data-1)" rx="2" />
          <text x={60 + (Number(v) / 100) * 220} y="16" fill="var(--eui-color-text-primary)">{v}%</text>
        </g>
      ))}
    </svg>
  </DiagramFrame>
);
