import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

export interface TableColumn {
  /** Key into each row object. */
  key: string;
  header: ReactNode;
  /** "end" for numbers. Default "start". */
  align?: "start" | "center" | "end";
  /** CSS width (for example "12rem" or "30%"). */
  width?: string;
  /** Render this column as a row header (th scope="row"). Default false. */
  isRowHeader?: boolean;
  /** Visually highlight this column (a recommended option). */
  highlight?: boolean;
}

export type TableRow = Record<string, ReactNode> & { key?: string };

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  columns: TableColumn[];
  rows: TableRow[];
  /** Describes the table for assistive tech. Required; set `captionHidden` to keep it visually hidden. */
  caption: ReactNode;
  captionHidden?: boolean;
  density?: "compact" | "default" | "comfortable";
  /** Draw the bordered frame around the table. Default true. */
  frame?: boolean;
  stickyHeader?: boolean;
  /** Row hover highlight. Default true. */
  hover?: boolean;
  /** Optional footer row keyed like a data row (totals). */
  footer?: TableRow;
  /** Shown when `rows` is empty. */
  emptyMessage?: ReactNode;
}

/**
 * Data table built on native table semantics. Numbers get tabular figures;
 * mark numeric columns `align: "end"`. Scrolls horizontally on narrow screens.
 */
export function Table({ columns, rows, caption, captionHidden = false, density = "default", frame = true, stickyHeader = false, hover = true, footer, emptyMessage = "No data to show.", className, ...rest }: TableProps) {
  return (
    <div className="eui-table-wrap" data-frame={frame ? "true" : "false"} data-sticky-header={stickyHeader ? "true" : undefined}>
      <table className={cx("eui-table", className)} data-density={density} data-hover={hover ? undefined : "false"} {...rest}>
        <caption data-hidden={captionHidden ? "true" : undefined}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" data-align={c.align} data-highlight={c.highlight ? "true" : undefined} style={c.width ? { width: c.width } : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} data-empty="true">{emptyMessage}</td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={row.key ?? i}>
                {columns.map((c) =>
                  c.isRowHeader ? (
                    <th key={c.key} scope="row" data-align={c.align} data-highlight={c.highlight ? "true" : undefined}>
                      {row[c.key]}
                    </th>
                  ) : (
                    <td key={c.key} data-align={c.align} data-highlight={c.highlight ? "true" : undefined}>
                      {row[c.key]}
                    </td>
                  ),
                )}
              </tr>
            ))
          )}
        </tbody>
        {footer && (
          <tfoot>
            <tr>
              {columns.map((c, i) =>
                i === 0 ? (
                  <th key={c.key} scope="row" data-align={c.align}>
                    {footer[c.key]}
                  </th>
                ) : (
                  <td key={c.key} data-align={c.align} data-highlight={c.highlight ? "true" : undefined}>
                    {footer[c.key]}
                  </td>
                ),
              )}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
