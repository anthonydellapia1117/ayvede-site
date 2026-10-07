import { Icon, iconNames, Grid, Inline, Stack, Text } from "executive-ui";

export const AllGlyphs = () => (
  <Grid columns="auto" min="6rem" gap={5}>
    {iconNames.map((n) => (
      <Stack key={n} gap={1} align="center">
        <Icon name={n} size="lg" />
        <Text variant="meta" mono>{n}</Text>
      </Stack>
    ))}
  </Grid>
);

export const SizesAndTones = () => (
  <Stack gap={5}>
    <Inline gap={6} align="end">
      {([
        ["sm", "sm 16"],
        ["md", "md 20"],
        ["lg", "lg 24"],
      ] as const).map(([size, label]) => (
        <Stack key={size} gap={1} align="center">
          <Icon name="clock" size={size} />
          <Text variant="meta" mono>{label}</Text>
        </Stack>
      ))}
    </Inline>
    <Stack gap={2}>
      {([
        ["checkCircle", "success", "On track"],
        ["warning", "warning", "At risk"],
        ["xCircle", "danger", "Blocked"],
        ["info", "info", "For review"],
      ] as const).map(([name, tone, label]) => (
        <Inline key={name} gap={2}>
          <Icon name={name} tone={tone} />
          <Text variant="compact">{label}</Text>
        </Inline>
      ))}
    </Stack>
  </Stack>
);

export const Labeled = () => (
  <Stack gap={2}>
    <Inline gap={2} align="center">
      <Text>Vendor comparison workbook</Text>
      <Icon name="external" label="Opens in a new tab" size="md" tone="secondary" />
    </Inline>
    <Text variant="meta" tone="secondary" mono>label="Opens in a new tab"</Text>
  </Stack>
);
