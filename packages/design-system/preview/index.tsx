// executive-ui preview: one executive-style page composition plus component states.
// All figures are illustrative and labeled as such. No real organization is depicted.
import { useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  ThemeProvider, useTheme, Heading, Text, Container, Stack, Inline, Grid, Divider, Section, Icon,
  Button, IconButton, Link, TextInput, Textarea, Select, Checkbox, RadioGroup, Radio, Switch, Field,
  Card, Badge, StatusIndicator, Alert, Tabs, TabList, Tab, TabPanel, Breadcrumbs, NavBar, PageHeader, Table,
  SectionHeading, KeyTakeaways, ComparisonTable, DefinitionList, Timeline, Metric, DiagramFrame, ProcessDiagram, StatePanel, Spinner, Skeleton,
  semantic, type ThemeMode,
} from "../src";

const initialTheme = (new URLSearchParams(window.location.search).get("theme") as ThemeMode | null) ?? "light";

function ThemeSwitch() {
  const { theme, setMode } = useTheme();
  return <Switch size="sm" checked={theme === "dark"} onCheckedChange={(on) => setMode(on ? "dark" : "light")} label="Dark theme" />;
}

function Demo({ title, children, note }: { title: string; note?: string; children: ReactNode }) {
  return (
    <Stack gap={3}>
      <div>
        <Text variant="compact" weight="semibold">{title}</Text>
        {note && <Text variant="meta">{note}</Text>}
      </div>
      {children}
    </Stack>
  );
}

/* ----------------------------------------------------------------------------
   1. Executive page composition
   ---------------------------------------------------------------------------- */
function CompositionSection() {
  const [tab, setTab] = useState("summary");
  return (
    <Section id="composition" spacing="sm" aria-labelledby="composition-title">
      <Container>
        <PageHeader
          breadcrumbs={<Breadcrumbs items={[{ label: "Portfolio", href: "#" }, { label: "Operating model", href: "#" }, { label: "Vendor consolidation" }]} />}
          eyebrow="Decision brief"
          title="Consolidate three workflow vendors into one platform"
          description="A recommendation for the steering committee: which option to pursue, what it costs, and what changes for the teams involved."
          actions={
            <>
              <Button variant="secondary" iconStart={<Icon name="document" />}>Download brief</Button>
              <Button variant="primary" iconEnd={<Icon name="arrowRight" />}>Approve option B</Button>
            </>
          }
          meta={
            <>
              <StatusIndicator status="pending" label="Awaiting decision" />
              <Text as="span" variant="meta">Updated 3 days ago</Text>
              <Text as="span" variant="meta">Owner: Program office</Text>
              <Badge tone="warning" variant="outline" size="sm">Illustrative data</Badge>
            </>
          }
        />
        <span id="composition-title" className="eui-sr-only">Executive page composition</span>

        <Stack gap={12}>
          <KeyTakeaways
            items={[
              "Three tools cover the same intake-to-approval workflow; 61% of licensed seats are unused.",
              "Option B (consolidate onto the incumbent platform) reaches break-even in month 9 with the lowest change load on teams.",
              "The main risk is migration of 14 custom integrations; two are undocumented and need discovery before contracts are signed.",
              "A decision this quarter avoids the auto-renewal of the largest contract in January.",
            ]}
            bottomLine="Approve option B, fund a 6-week integration discovery, and give notice on the two smaller contracts."
          />

          <Grid columns={4} gap={8}>
            <Metric label="Annual run cost" value="1.84" unit="M" change={{ value: "-0.62M", direction: "down", sentiment: "negative", label: "vs. today" }} context="Three-year average under option B." source="Finance model v4" illustrative />
            <Metric label="Seat utilization" value="39" unit="%" change={{ value: "+41 pts", direction: "up", label: "after consolidation" }} context="Licensed seats with activity in the last 90 days." source="Admin consoles" illustrative />
            <Metric label="Integrations to migrate" value="14" change={{ value: "2 undocumented", direction: "flat", sentiment: "neutral" }} context="Custom connectors across the three tools." source="Architecture inventory" illustrative />
            <Metric label="Time to break-even" value="9" unit="months" context="From contract signature, including migration spend." source="Finance model v4" illustrative />
          </Grid>

          <Stack gap={6}>
            <SectionHeading eyebrow="Options" title="Three paths, one recommendation" description="Each option was scored on cost, change load, and risk. Scores below are illustrative." />
            <ComparisonTable
              caption="Comparison of vendor consolidation options (illustrative)"
              options={[{ label: "A. Keep all three" }, { label: "B. Consolidate on incumbent", recommended: true }, { label: "C. Replace with new platform" }]}
              criteria={[
                { label: "Three-year cost", values: ["7.4M", "5.5M", "6.1M"] },
                { label: "Change load on teams", values: [<StatusIndicator key="a" status="success" label="None" />, <StatusIndicator key="b" status="warning" label="Moderate" />, <StatusIndicator key="c" status="danger" label="High" />] },
                { label: "Integration risk", values: ["Low", "Medium (14 connectors)", "High (rebuild all)"] },
                { label: "Time to value", values: ["Immediate", "9 months", "18 months"] },
                { label: "Strategic fit", values: ["Poor: duplicate capability persists", "Good: one record of truth", "Good, unproven vendor"] },
              ]}
            />
          </Stack>

          <Tabs value={tab} onValueChange={setTab}>
            <TabList label="Brief sections">
              <Tab value="summary">How it works</Tab>
              <Tab value="roadmap">Roadmap</Tab>
              <Tab value="facts">Key facts</Tab>
            </TabList>
            <TabPanel value="summary">
              <DiagramFrame
                figureLabel="Figure 1"
                title="Intake-to-approval flow after consolidation"
                caption="One intake queue replaces three. Approval moves from email to the platform, which is where the audit trail lives."
                description="Four steps in order: requests arrive in a single intake queue; a triage rule routes each request to an owner; the owner reviews and approves or returns it inside the platform; the decision and its history are recorded automatically. The review step is highlighted as the step under discussion."
                source="Program office, workshop 2"
              >
                <ProcessDiagram steps={[{ label: "Single intake", description: "Web form and email both land in one queue." }, { label: "Automated triage", description: "Rules route by request type and value." }, { label: "Owner review", description: "Approve, return, or escalate in place.", emphasis: true }, { label: "Recorded decision", description: "History and attachments stored once." }]} />
              </DiagramFrame>
            </TabPanel>
            <TabPanel value="roadmap">
              <Stack gap={6}>
                <Text variant="compact" tone="secondary" measure>Four stages over two quarters. Stage 2 is in progress; dates are planning assumptions.</Text>
                <Timeline orientation="horizontal" stages={[
                  { title: "Discovery", meta: "Weeks 1-6", status: "complete", description: "Inventory integrations, confirm seat counts, draft contract terms." },
                  { title: "Pilot migration", meta: "Weeks 7-14", status: "current", description: "Move two teams and the three highest-volume connectors." },
                  { title: "Full migration", meta: "Weeks 15-26", status: "upcoming", description: "Remaining teams in three waves; decommission tool 2." },
                  { title: "Decommission", meta: "Q2", status: "upcoming", description: "Exit tool 3 at contract end; close the program." },
                ]} />
              </Stack>
            </TabPanel>
            <TabPanel value="facts">
              <DefinitionList layout="inline" items={[
                { term: "Decision needed", description: "Approve option B and the discovery budget." },
                { term: "Decision by", description: "End of this quarter, before the January auto-renewal." },
                { term: "Sponsor", description: "Chief operating officer" },
                { term: "Teams affected", description: "Procurement, legal operations, facilities (about 240 people)" },
                { term: "Dependencies", description: "Identity provider migration must complete before pilot." },
              ]} />
            </TabPanel>
          </Tabs>

          <Grid columns={3}>
            <Card title="What changes for teams" description="Day-to-day impact" footer={<Link href="#" standalone>Read the change plan</Link>}>
              <Text variant="compact">One login, one intake form, and approvals inside the platform instead of email threads. Existing templates are migrated; nothing has to be re-created by hand.</Text>
            </Card>
            <Card title="Risks and mitigations" description="Top three" action={<Badge tone="warning">3 open</Badge>}>
              <Stack gap={3} as="ul">
                <li><StatusIndicator status="danger" label="Undocumented connectors (2)" /></li>
                <li><StatusIndicator status="warning" label="Identity migration timing" /></li>
                <li><StatusIndicator status="warning" label="Vendor capacity in Q1" /></li>
              </Stack>
            </Card>
            <Card title="Sources" description="What this brief rests on" tone="subtle">
              <Stack gap={2}>
                <Text variant="compact"><Link href="#">Finance model v4</Link> (three-year, risk-adjusted)</Text>
                <Text variant="compact"><Link href="#">Architecture integration inventory</Link></Text>
                <Text variant="compact"><Link href="#">Workshop notes, sessions 1-3</Link></Text>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Container>

      <Section tone="inverse" spacing="sm" style={{ marginTop: "var(--eui-space-16)" }} aria-label="Next step">
        <Container>
          <Inline justify="between" align="center" gap={6}>
            <Stack gap={1}>
              <Heading level={2} size="3" tone="inverse">Ready to decide?</Heading>
              <Text tone="secondary" variant="compact">Approval opens the discovery work order the same day. Questions go to the program office.</Text>
            </Stack>
            <Inline gap={2}>
              <Button variant="primary">Approve option B</Button>
              <Button variant="ghost" style={{ color: "var(--eui-color-text-inverse)" }}>Ask a question</Button>
            </Inline>
          </Inline>
        </Container>
      </Section>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   2. Foundations: type, color roles, spacing
   ---------------------------------------------------------------------------- */
function Swatch({ role, varName }: { role: string; varName: string }) {
  const { theme } = useTheme();
  const path = ["color", ...role.split(".")];
  let v: unknown = semantic[theme];
  for (const p of path) v = (v as Record<string, unknown>)?.[p];
  return (
    <Stack gap={2}>
      <div style={{ height: "3rem", borderRadius: "var(--eui-radius-md)", background: `var(${varName})`, border: "1px solid var(--eui-color-border-default)" }} />
      <Text variant="meta" mono>{role}</Text>
      <Text variant="meta" mono tone="tertiary">{String(v)}</Text>
    </Stack>
  );
}

function FoundationsSection() {
  const colorRoles = [
    ["background.canvas", "--eui-color-background-canvas"], ["background.surface", "--eui-color-background-surface"], ["background.subtle", "--eui-color-background-subtle"], ["background.inverse", "--eui-color-background-inverse"],
    ["text.primary", "--eui-color-text-primary"], ["text.secondary", "--eui-color-text-secondary"], ["text.tertiary", "--eui-color-text-tertiary"], ["text.link", "--eui-color-text-link"],
    ["action.primary", "--eui-color-action-primary"], ["action.selected", "--eui-color-action-selected"], ["border.default", "--eui-color-border-default"], ["border.strong", "--eui-color-border-strong"],
    ["status.success", "--eui-color-status-success"], ["status.warning", "--eui-color-status-warning"], ["status.danger", "--eui-color-status-danger"], ["status.info", "--eui-color-status-info"],
  ];
  return (
    <Section id="foundations" tone="surface" bordered aria-labelledby="foundations-title">
      <Container>
        <SectionHeading headingId="foundations-title" eyebrow="Foundations" title="Typography, color roles, and spacing" description="One sans family for everything, a mono face for figures and identifiers, and semantic color roles that re-map per theme." />
        <Grid columns={2} gap={12}>
          <Stack gap={5}>
            <Heading level={3} size="display">Display heading</Heading>
            <Heading level={3} size="1">Heading one for page titles</Heading>
            <Heading level={3} size="2">Heading two for sections</Heading>
            <Heading level={3} size="3">Heading three for cards and panels</Heading>
            <Heading level={3} size="4">Heading four for compact groups</Heading>
            <Text variant="lead">Lead paragraph: the framing sentence a busy reader sees first. It sets context in one or two lines.</Text>
            <Text measure>Body text at 16px with a 1.6 line height and a 68-character measure. Executive readers scan, so paragraphs stay short and lead with the conclusion. Numbers in prose use lining figures: 1,284 requests, 39% utilization.</Text>
            <Text variant="compact">Compact text at 14px for dense interface copy, table cells, and card bodies.</Text>
            <Text variant="meta">Meta text at 13px for timestamps, sources, and secondary labels.</Text>
            <Text variant="eyebrow">Eyebrow label</Text>
            <Text mono numeric>REQ-2024-00187 · 1,284.50 · 00:42:17</Text>
          </Stack>
          <Stack gap={8}>
            <Grid columns={4} gap={4}>
              {colorRoles.map(([role, varName]) => <Swatch key={role} role={role!} varName={varName!} />)}
            </Grid>
            <Divider />
            <Stack gap={3}>
              <Text variant="compact" weight="semibold">Spacing scale</Text>
              <Inline gap={2} align="end">
                {[1, 2, 3, 4, 6, 8, 12, 16].map((s) => (
                  <Stack key={s} gap={1} align="center">
                    <div style={{ width: `var(--eui-space-${s})`, height: `var(--eui-space-${s})`, background: "var(--eui-color-action-primary)", borderRadius: 2 }} />
                    <Text variant="meta" mono>{s}</Text>
                  </Stack>
                ))}
              </Inline>
            </Stack>
          </Stack>
        </Grid>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   3. Controls and forms
   ---------------------------------------------------------------------------- */
function ControlsSection() {
  const [digest, setDigest] = useState(true);
  const [rollout, setRollout] = useState("pilot");
  return (
    <Section id="controls" bordered aria-labelledby="controls-title">
      <Container>
        <SectionHeading headingId="controls-title" eyebrow="Controls" title="Buttons and form fields" description="One primary action per view. Every field has a visible label; errors are announced and tied to their field." />
        <Grid columns={2} gap={12}>
          <Stack gap={8}>
            <Demo title="Button variants">
              <Inline>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="contrast">Contrast</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Delete</Button>
              </Inline>
            </Demo>
            <Demo title="Sizes and icons">
              <Inline>
                <Button size="sm" variant="primary">Small</Button>
                <Button variant="primary" iconStart={<Icon name="plus" />}>With icon</Button>
                <Button size="lg" variant="primary" iconEnd={<Icon name="arrowRight" />}>Large</Button>
                <IconButton label="Search" icon={<Icon name="search" />} variant="secondary" />
                <IconButton label="Dismiss" icon={<Icon name="x" />} />
              </Inline>
            </Demo>
            <Demo title="States" note="Hover and focus are live; tab through to see the focus ring.">
              <Inline>
                <Button variant="primary" loading>Saving</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="secondary" href="#controls">As a link</Button>
                <Link href="#controls">Inline link</Link>
                <Link href="https://example.org" external>External</Link>
                <Link href="#controls" standalone>Standalone link</Link>
              </Inline>
            </Demo>
            <Demo title="Choices">
              <Stack gap={4}>
                <Checkbox label="Include archived requests" description="Adds 1,120 closed items to the export." defaultChecked />
                <Checkbox label="Select all" indeterminate />
                <Checkbox label="Unavailable option" disabled />
                <RadioGroup label="Rollout approach" value={rollout} onChange={setRollout} description="Decides which teams move first.">
                  <Radio value="pilot" label="Pilot with two teams" description="Lowest risk, slowest." />
                  <Radio value="waves" label="Three waves" />
                  <Radio value="all" label="All at once" description="Needs vendor capacity confirmed." />
                </RadioGroup>
                <Switch checked={digest} onCheckedChange={setDigest} label="Weekly status digest" description="Sent Monday mornings to sponsors." />
              </Stack>
            </Demo>
          </Stack>
          <Card title="Request a review" description="Example form with validation states" padding="lg">
            <Stack gap={5}>
              <Field label="Full name" required>
                <TextInput placeholder="First and last name" autoComplete="name" />
              </Field>
              <Field label="Work email" required error="Enter an address at your organization's domain.">
                <TextInput type="email" defaultValue="j.doe@example" autoComplete="email" />
              </Field>
              <Field label="Budget ceiling" description="Annual, in thousands." showOptional>
                <TextInput inputMode="decimal" startAdornment="$" endAdornment="k" defaultValue="250" />
              </Field>
              <Field label="Region">
                <Select placeholder="Choose a region" options={[{ value: "na", label: "North America" }, { value: "eu", label: "Europe" }, { value: "apac", label: "Asia Pacific" }]} />
              </Field>
              <Field label="Context" description="What should the reviewer know?">
                <Textarea placeholder="Two or three sentences are enough." rows={3} />
              </Field>
              <Field label="Reference number" disabled>
                <TextInput mono defaultValue="REQ-2024-00187" />
              </Field>
              <Inline justify="end">
                <Button variant="ghost">Cancel</Button>
                <Button variant="primary" type="submit">Submit request</Button>
              </Inline>
            </Stack>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   4. Display, navigation, and data
   ---------------------------------------------------------------------------- */
function DisplaySection() {
  return (
    <Section id="display" tone="surface" bordered aria-labelledby="display-title">
      <Container>
        <SectionHeading headingId="display-title" eyebrow="Display" title="Status, messaging, and data" description="Status is never color alone: every indicator pairs a distinct glyph with text." />
        <Stack gap={10}>
          <Grid columns={2} gap={12}>
            <Stack gap={8}>
              <Demo title="Badges">
                <Inline gap={2}>
                  <Badge>Neutral</Badge><Badge tone="info">Info</Badge><Badge tone="success">Success</Badge><Badge tone="warning">Warning</Badge><Badge tone="danger">Danger</Badge>
                  <Badge variant="outline" tone="info">Outline</Badge><Badge variant="solid">Solid</Badge><Badge variant="solid" tone="info" icon={<Icon name="check" />}>Approved</Badge>
                </Inline>
              </Demo>
              <Demo title="Status indicators">
                <Inline gap={5}>
                  <StatusIndicator status="success" label="On track" /><StatusIndicator status="warning" label="At risk" /><StatusIndicator status="danger" label="Blocked" /><StatusIndicator status="info" label="In review" /><StatusIndicator status="pending" label="Not started" /><StatusIndicator status="neutral" label="Archived" />
                </Inline>
              </Demo>
              <Demo title="Breadcrumbs">
                <Breadcrumbs label="Example breadcrumb" items={[{ label: "Portfolio", href: "#" }, { label: "Programs", href: "#" }, { label: "Workflow consolidation", href: "#" }, { label: "Decision brief" }]} />
              </Demo>
            </Stack>
            <Stack gap={4}>
              <Alert tone="info" title="Model refreshed">Figures reflect the finance model as of this morning.</Alert>
              <Alert tone="success" title="Discovery complete" onDismiss={() => {}}>All 14 integrations are inventoried; two need documentation.</Alert>
              <Alert tone="warning" title="Contract renews in 84 days" actions={<><Button size="sm" variant="secondary">View contract</Button><Button size="sm" variant="ghost">Snooze</Button></>}>Give notice by 15 November to avoid a 12-month auto-renewal.</Alert>
              <Alert tone="danger" title="Export failed">The report could not be generated. Try again, or download last week's version.</Alert>
            </Stack>
          </Grid>
          <Demo title="Table" note="Numeric columns right-align with tabular figures; the table scrolls horizontally on narrow screens.">
            <Table
              caption="Licensed seats by tool (illustrative)"
              columns={[{ key: "tool", header: "Tool", isRowHeader: true }, { key: "owner", header: "Owner" }, { key: "seats", header: "Seats", align: "end" }, { key: "active", header: "Active (90d)", align: "end" }, { key: "cost", header: "Annual cost", align: "end" }, { key: "status", header: "Status" }]}
              rows={[
                { key: "1", tool: "Tool 1 (incumbent)", owner: "Procurement", seats: "820", active: "410", cost: "$640,000", status: <StatusIndicator size="sm" status="success" label="Keep" /> },
                { key: "2", tool: "Tool 2", owner: "Legal operations", seats: "310", active: "96", cost: "$290,000", status: <StatusIndicator size="sm" status="warning" label="Migrate" /> },
                { key: "3", tool: "Tool 3", owner: "Facilities", seats: "150", active: "22", cost: "$118,000", status: <StatusIndicator size="sm" status="danger" label="Exit" /> },
              ]}
              footer={{ tool: "Total", owner: "", seats: "1,280", active: "528", cost: "$1,048,000", status: "" }}
            />
          </Demo>
        </Stack>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   5. Region states
   ---------------------------------------------------------------------------- */
function StatesSection() {
  return (
    <Section id="states" bordered aria-labelledby="states-title">
      <Container>
        <SectionHeading headingId="states-title" eyebrow="States" title="Empty, loading, error, and success" description="Each state says what happened and what to do next. Loading regions are marked busy; errors are announced." />
        <Grid columns={2}>
          <StatePanel kind="empty" title="No requests yet" description="Requests submitted through the intake form will appear here." actions={<Button variant="primary" size="sm" iconStart={<Icon name="plus" />}>New request</Button>} />
          <StatePanel kind="loading" title="Loading the finance model" description="Usually takes a few seconds." />
          <StatePanel kind="error" title="Could not load integrations" description="The architecture inventory is unavailable. Your view is unchanged." actions={<><Button size="sm" variant="secondary">Retry</Button><Button size="sm" variant="ghost">Report a problem</Button></>} />
          <StatePanel kind="success" title="Decision recorded" description="Option B was approved. The discovery work order has been opened." actions={<Button size="sm" variant="secondary">View work order</Button>} />
        </Grid>
        <Divider spacing="lg" />
        <Grid columns={3}>
          <Card title="Skeleton while loading" description="Shapes mirror the content that will appear.">
            <Stack gap={3}>
              <Skeleton height="1.5rem" width="60%" />
              <Skeleton lines={3} />
              <Inline><Spinner size="sm" /><Text variant="meta">Fetching latest figures</Text></Inline>
            </Stack>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}

function App() {
  const links = [
    { label: "Composition", href: "#composition", current: true },
    { label: "Foundations", href: "#foundations" },
    { label: "Controls", href: "#controls" },
    { label: "Display", href: "#display" },
    { label: "States", href: "#states" },
  ];
  return (
    <ThemeProvider mode={initialTheme} fillViewport applyToDocument>
      <NavBar brand={<><Icon name="circle" tone="accent" size="sm" /> executive-ui</>} brandHref="#top" links={links} actions={<ThemeSwitch />} sticky label="Preview sections" />
      <main id="top">
        <CompositionSection />
        <FoundationsSection />
        <ControlsSection />
        <DisplaySection />
        <StatesSection />
      </main>
      <footer>
        <Container>
          <Divider />
          <Inline justify="between" style={{ paddingBlock: "var(--eui-space-6)" }}>
            <Text variant="meta">executive-ui preview. All names and figures are illustrative.</Text>
            <Text variant="meta">Fonts: Inter and JetBrains Mono (SIL OFL), self-hosted.</Text>
          </Inline>
        </Container>
      </footer>
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
