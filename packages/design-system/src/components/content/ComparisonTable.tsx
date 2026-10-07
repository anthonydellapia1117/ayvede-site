import type { ReactNode } from "react";
import { Table, type TableColumn, type TableRow } from "../display/Table";
import { Badge } from "../display/Badge";

export interface ComparisonOption {
  /** Column header. */
  label: ReactNode;
  /** Marks the recommended option: the column is highlighted and labeled. */
  recommended?: boolean;
}

export interface ComparisonCriterion {
  /** Row label. */
  label: ReactNode;
  /** One cell per option, in order. */
  values: ReactNode[];
}

export interface ComparisonTableProps {
  caption: ReactNode;
  captionHidden?: boolean;
  /** Header for the criteria column. Default "Criteria". */
  criteriaHeader?: ReactNode;
  options: ComparisonOption[];
  criteria: ComparisonCriterion[];
  /** Text of the badge on the recommended column. Default "Recommended". */
  recommendedLabel?: string;
  density?: "compact" | "default" | "comfortable";
}

/**
 * Options across the top, criteria down the side. Mark one option
 * `recommended` to make the decision visible without reading every cell.
 */
export function ComparisonTable({ caption, captionHidden, criteriaHeader = "Criteria", options, criteria, recommendedLabel = "Recommended", density = "default" }: ComparisonTableProps) {
  const columns: TableColumn[] = [
    { key: "criterion", header: criteriaHeader, isRowHeader: true, width: "28%" },
    ...options.map((o, i) => ({
      key: `option-${i}`,
      header: o.recommended ? (
        <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          {o.label}
          <Badge tone="info" size="sm">
            {recommendedLabel}
          </Badge>
        </span>
      ) : (
        o.label
      ),
      highlight: o.recommended,
      width: `${(72 / options.length).toFixed(2)}%`,
    })),
  ];
  const rows: TableRow[] = criteria.map((c, i) => {
    const row: TableRow = { key: String(i), criterion: c.label };
    c.values.forEach((v, j) => {
      row[`option-${j}`] = v;
    });
    return row;
  });
  return <Table caption={caption} captionHidden={captionHidden} columns={columns} rows={rows} density={density} hover={false} />;
}
