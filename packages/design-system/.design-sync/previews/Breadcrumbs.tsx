import { Breadcrumbs } from "executive-ui";

export const Default = () => <Breadcrumbs items={[{ label: "Portfolio", href: "#" }, { label: "Operating model", href: "#" }, { label: "Vendor consolidation" }]} />;

export const TwoLevels = () => <Breadcrumbs items={[{ label: "Reports", href: "#" }, { label: "Q3 review" }]} />;
