import { PageHeader, Breadcrumbs, Button, Icon, StatusIndicator, Text, Badge } from "executive-ui";

export const Full = () => (
  <PageHeader
    breadcrumbs={<Breadcrumbs items={[{ label: "Portfolio", href: "#" }, { label: "Operating model", href: "#" }, { label: "Vendor consolidation" }]} />}
    eyebrow="Decision brief"
    title="Consolidate three workflow vendors into one platform"
    description="Which option to pursue, what it costs, and what changes for the teams involved."
    actions={<><Button variant="secondary" iconStart={<Icon name="document" />}>Download brief</Button><Button variant="primary" iconEnd={<Icon name="arrowRight" />}>Approve option B</Button></>}
    meta={<><StatusIndicator status="pending" label="Awaiting decision" /><Text as="span" variant="meta">Updated 3 days ago</Text><Badge size="sm" tone="warning" variant="outline">Illustrative</Badge></>}
  />
);

export const Minimal = () => <PageHeader title="Quarterly operating review" description="Twelve programs, three decisions." />;
