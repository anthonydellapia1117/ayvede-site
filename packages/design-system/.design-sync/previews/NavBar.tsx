import { NavBar, Button, Icon } from "executive-ui";

const links = [
  { label: "Overview", href: "#", current: true },
  { label: "Options", href: "#" },
  { label: "Roadmap", href: "#" },
  { label: "Sources", href: "#" },
];

export const Default = () => <NavBar brand={<><Icon name="circle" tone="accent" size="sm" /> Program office</>} links={links} actions={<Button size="sm" variant="primary">Approve</Button>} />;

export const BrandOnly = () => <NavBar brand="Advisory practice" actions={<Button size="sm" variant="secondary">Sign in</Button>} />;
