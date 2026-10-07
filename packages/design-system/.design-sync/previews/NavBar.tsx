import { NavBar, Button } from "executive-ui";

export const Default = () => (
  <NavBar
    brand="Program office"
    links={[
      { label: "Overview", href: "#", current: true },
      { label: "Options", href: "#" },
      { label: "Roadmap", href: "#" },
      { label: "Sources", href: "#" },
    ]}
    actions={<Button size="sm" variant="secondary">Share brief</Button>}
  />
);

export const BrandOnly = () => <NavBar brand="Advisory practice" actions={<Button size="sm" variant="secondary">Sign in</Button>} />;
