import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ThemeProvider, useTheme, Field, TextInput, Select, Textarea, Checkbox, RadioGroup, Radio, Switch, Button, IconButton,
  Tabs, TabList, Tab, TabPanel, Alert, StatusIndicator, Breadcrumbs, NavBar, Metric, Table, ComparisonTable, DiagramFrame,
  StatePanel, Heading, Icon, Link, Timeline, cssVar, space,
} from "../src";

describe("ThemeProvider", () => {
  it("applies data-theme to the root and exposes the resolved theme", () => {
    function Probe() {
      const { theme } = useTheme();
      return <span data-testid="probe">{theme}</span>;
    }
    const { container } = render(
      <ThemeProvider mode="dark">
        <Probe />
      </ThemeProvider>,
    );
    expect(container.firstElementChild).toHaveAttribute("data-theme", "dark");
    expect(container.firstElementChild).toHaveClass("eui-root");
    expect(screen.getByTestId("probe")).toHaveTextContent("dark");
  });
  it("switches modes through setMode", async () => {
    function Toggle() {
      const { theme, setMode } = useTheme();
      return <button onClick={() => setMode(theme === "light" ? "dark" : "light")}>{theme}</button>;
    }
    const { container } = render(
      <ThemeProvider>
        <Toggle />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(container.firstElementChild).toHaveAttribute("data-theme", "dark");
  });
  it("useTheme throws outside the provider", () => {
    function Bad() {
      useTheme();
      return null;
    }
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Bad />)).toThrow(/ThemeProvider/);
    vi.restoreAllMocks();
  });
});

describe("Field wiring", () => {
  it("labels the control and associates description and error", () => {
    render(
      <Field label="Work email" description="We never share it." error="Enter a valid address." required>
        <TextInput type="email" />
      </Field>,
    );
    const input = screen.getByLabelText(/Work email/);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toBeRequired();
    expect(input).toHaveAccessibleDescription("We never share it. Enter a valid address.");
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid address.");
  });
  it("works for Select and Textarea and respects disabled", () => {
    render(
      <>
        <Field label="Region" disabled>
          <Select options={[{ value: "na", label: "North America" }]} />
        </Field>
        <Field label="Notes">
          <Textarea />
        </Field>
      </>,
    );
    expect(screen.getByLabelText("Region")).toBeDisabled();
    expect(screen.getByLabelText("Notes").tagName).toBe("TEXTAREA");
  });
  it("Select renders a disabled placeholder option", () => {
    render(<Select aria-label="Pick" placeholder="Choose one" options={[{ value: "a", label: "A" }]} />);
    const select = screen.getByLabelText("Pick") as HTMLSelectElement;
    expect(select.value).toBe("");
    expect(select.options[0]).toBeDisabled();
  });
});

describe("Choice controls", () => {
  it("Checkbox is labeled, described, and toggles", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" description="Required to proceed" onChange={onChange} />);
    const box = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(box).toHaveAccessibleDescription("Required to proceed");
    await userEvent.click(box);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(box).toBeChecked();
  });
  it("RadioGroup groups options under a legend and reports the chosen value", async () => {
    const onChange = vi.fn();
    render(
      <RadioGroup label="Rollout" onChange={onChange}>
        <Radio value="pilot" label="Pilot first" />
        <Radio value="all" label="All teams" />
      </RadioGroup>,
    );
    const group = screen.getByRole("group", { name: "Rollout" });
    await userEvent.click(within(group).getByLabelText("All teams"));
    expect(onChange).toHaveBeenCalledWith("all");
    expect(within(group).getByLabelText("All teams")).toBeChecked();
  });
  it("Switch exposes role=switch and aria-checked and flips on click", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={onCheckedChange} label="Email digest" description="Weekly summary" />);
    const sw = screen.getByRole("switch", { name: "Email digest" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    expect(sw).toHaveAccessibleDescription("Weekly summary");
    await userEvent.click(sw);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});

describe("Buttons", () => {
  it("defaults to type=button and blocks clicks while loading", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Save</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    rerender(
      <Button onClick={onClick} loading>
        Save
      </Button>,
    );
    const btn = screen.getByRole("button", { name: /Save/ });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });
  it("renders a link when href is given", () => {
    render(
      <Button href="/report" variant="primary">
        Open report
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Open report" });
    expect(link).toHaveAttribute("href", "/report");
    expect(link).toHaveAttribute("data-variant", "primary");
  });
  it("IconButton has an accessible name", () => {
    render(<IconButton label="Close" icon={<Icon name="x" />} />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });
  it("external Link gets rel and an announced icon", () => {
    render(
      <Link href="https://example.org" external>
        Standard
      </Link>,
    );
    const link = screen.getByRole("link", { name: /opens in a new tab/ });
    expect(link).toHaveTextContent(/^Standard/);
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("target", "_blank");
  });
});

describe("Tabs", () => {
  function Demo() {
    return (
      <Tabs defaultValue="summary">
        <TabList label="Report sections">
          <Tab value="summary">Summary</Tab>
          <Tab value="risks">Risks</Tab>
          <Tab value="plan">Plan</Tab>
        </TabList>
        <TabPanel value="summary">Summary body</TabPanel>
        <TabPanel value="risks">Risks body</TabPanel>
        <TabPanel value="plan">Plan body</TabPanel>
      </Tabs>
    );
  }
  it("wires roles, selection, and panel association", () => {
    render(<Demo />);
    const list = screen.getByRole("tablist", { name: "Report sections" });
    const tabs = within(list).getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[1]).toHaveAttribute("tabindex", "-1");
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAccessibleName("Summary");
    expect(panel).toHaveTextContent("Summary body");
  });
  it("moves with arrow keys, Home and End, and selects on move", async () => {
    render(<Demo />);
    const tabs = screen.getAllByRole("tab");
    tabs[0]!.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Risks body");
    await userEvent.keyboard("{End}");
    expect(tabs[2]).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(tabs[0]).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(tabs[0]).toHaveFocus();
  });
  it("supports controlled value", async () => {
    const onValueChange = vi.fn();
    render(
      <Tabs value="a" onValueChange={onValueChange}>
        <TabList label="x">
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">A body</TabPanel>
        <TabPanel value="b">B body</TabPanel>
      </Tabs>,
    );
    await userEvent.click(screen.getByRole("tab", { name: "B" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("A body");
  });
});

describe("Status and messaging", () => {
  it("Alert uses role=alert for warning/danger and role=status otherwise", () => {
    const { rerender } = render(<Alert tone="danger" title="Failed">Body</Alert>);
    expect(screen.getByRole("alert")).toHaveTextContent("Failed");
    rerender(<Alert tone="success" title="Saved">Body</Alert>);
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
  });
  it("Alert dismiss button calls onDismiss", async () => {
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss}>Hi</Alert>);
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalled();
  });
  it("StatusIndicator always renders visible text", () => {
    render(<StatusIndicator status="warning" label="At risk" />);
    expect(screen.getByText("At risk")).toBeVisible();
  });
  it("StatePanel error is an alert and loading is busy", () => {
    const { rerender } = render(<StatePanel kind="error" title="Could not load" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Could not load");
    rerender(<StatePanel kind="loading" title="Loading report" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
  });
});

describe("Navigation", () => {
  it("Breadcrumbs mark the last item as the current page", () => {
    render(<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reports", href: "/reports" }, { label: "Q3 review" }]} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByText("Q3 review")).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
  it("NavBar toggle opens the collapsed menu with aria-expanded", async () => {
    render(<NavBar brand="Acme" links={[{ label: "Overview", href: "/", current: true }, { label: "Plan", href: "/plan" }]} />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("link", { name: "Overview" })[0]).toHaveAttribute("aria-current", "page");
  });
});

describe("Content patterns", () => {
  it("Metric announces change direction and shows source and illustrative badge", () => {
    render(<Metric label="Cycle time" value="12.4" unit="days" change={{ value: "-2.1 days", direction: "down", label: "vs. Q2" }} source="Ops dashboard" illustrative />);
    expect(screen.getByText("decreased", { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/Source: Ops dashboard/)).toBeInTheDocument();
    expect(screen.getByText("Illustrative")).toBeInTheDocument();
  });
  it("Table renders caption, column headers, and row headers", () => {
    render(<Table caption="Vendors" columns={[{ key: "name", header: "Vendor", isRowHeader: true }, { key: "cost", header: "Annual cost", align: "end" }]} rows={[{ key: "1", name: "Vendor A", cost: "$120k" }]} />);
    const table = screen.getByRole("table", { name: "Vendors" });
    expect(within(table).getByRole("columnheader", { name: "Annual cost" })).toHaveAttribute("data-align", "end");
    expect(within(table).getByRole("rowheader", { name: "Vendor A" })).toBeInTheDocument();
  });
  it("ComparisonTable labels the recommended option", () => {
    render(<ComparisonTable caption="Options" options={[{ label: "Build" }, { label: "Buy", recommended: true }]} criteria={[{ label: "Time to value", values: ["9 months", "3 months"] }]} />);
    expect(screen.getByText("Recommended")).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Time to value" })).toBeInTheDocument();
  });
  it("DiagramFrame links title and description to the figure", () => {
    render(
      <DiagramFrame title="Intake flow" description="Three steps from request to approval.">
        <svg aria-hidden="true" />
      </DiagramFrame>,
    );
    const fig = screen.getByRole("figure", { name: "Intake flow" });
    expect(fig).toHaveAccessibleDescription("Three steps from request to approval.");
  });
  it("Timeline marks the current stage", () => {
    render(<Timeline stages={[{ title: "Discover", status: "complete" }, { title: "Pilot", status: "current" }, { title: "Scale" }]} />);
    expect(screen.getByText("Pilot").closest("li")).toHaveAttribute("aria-current", "step");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
  it("Heading decouples level from size", () => {
    render(<Heading level={1} size="3">Title</Heading>);
    const h = screen.getByRole("heading", { level: 1 });
    expect(h).toHaveAttribute("data-size", "3");
  });
});

describe("token helpers", () => {
  it("map paths to CSS variables", () => {
    expect(cssVar("color.text.secondary")).toBe("var(--eui-color-text-secondary)");
    expect(space(4)).toBe("var(--eui-space-4)");
  });
});
