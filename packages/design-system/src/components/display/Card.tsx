import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Heading, type HeadingLevel } from "../foundations/Heading";
import { Text } from "../foundations/Text";

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Element to render. Default "div"; use "article" or "li" when the card is a list item. */
  as?: "div" | "article" | "section" | "li" | "a";
  /** Optional title rendered in the header. */
  title?: ReactNode;
  /** Heading level for the title. Default 3. */
  titleLevel?: HeadingLevel;
  description?: ReactNode;
  /** Right-aligned header slot (a Badge, an IconButton). */
  action?: ReactNode;
  /** Footer slot separated by a rule. */
  footer?: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  tone?: "surface" | "subtle" | "inverse";
  /** Hover affordance for cards that act as links. Pass href and as="a". */
  interactive?: boolean;
  href?: string;
}

/**
 * A bounded surface for one distinct object or choice. Do not wrap running
 * prose in cards; use Section and Container instead.
 */
export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { as = "div", title, titleLevel = 3, description, action, footer, padding = "md", tone = "surface", interactive, href, className, children, ...rest },
  ref,
) {
  const Tag = as as "div";
  const hasHeader = title || description || action;
  return (
    <Tag ref={ref as never} className={cx("eui-card", className)} data-padding={padding} data-tone={tone} data-interactive={interactive || href ? "true" : undefined} {...(href ? { href } : {})} {...rest}>
      {hasHeader && (
        <div className="eui-card-header">
          <div className="eui-card-header-text">
            {title && (
              <Heading level={titleLevel} size="4">
                {title}
              </Heading>
            )}
            {description && (
              <Text variant="compact" tone="secondary">
                {description}
              </Text>
            )}
          </div>
          {action}
        </div>
      )}
      {children !== undefined && <div className="eui-card-body">{children}</div>}
      {footer && <div className="eui-card-footer">{footer}</div>}
    </Tag>
  );
});
