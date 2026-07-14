/* Inline replacements for lucide-react icons — geometry taken verbatim from
   lucide-static v0.462.0. Renders identically to lucide's React components:
   24x24 viewBox, fill none, stroke currentColor, stroke-width 2, round caps/joins,
   size/color/strokeWidth/style/className props supported. */
const { useState, useEffect } = React;

function __lucide(name, kids) {
  function Icon({ size = 24, color = "currentColor", strokeWidth = 2, className = "", style, ...rest }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={("lucide lucide-" + name + (className ? " " + className : ""))}
        style={style}
        {...rest}
      >
        {kids.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
      </svg>
    );
  }
  return Icon;
}

const Menu = __lucide("menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18" }],
]);
const X = __lucide("x", [
  ["path", { d: "M18 6 6 18" }],
  ["path", { d: "m6 6 12 12" }],
]);
const ArrowRight = __lucide("arrow-right", [
  ["path", { d: "M5 12h14" }],
  ["path", { d: "m12 5 7 7-7 7" }],
]);
const Mail = __lucide("mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
]);
const Phone = __lucide("phone", [
  ["path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }],
]);
const MapPin = __lucide("map-pin", [
  ["path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }],
  ["circle", { cx: "12", cy: "10", r: "3" }],
]);
const ShieldCheck = __lucide("shield-check", [
  ["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }],
  ["path", { d: "m9 12 2 2 4-4" }],
]);
const Layers = __lucide("layers", [
  ["path", { d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" }],
  ["path", { d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" }],
  ["path", { d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" }],
]);
const FlaskConical = __lucide("flask-conical", [
  ["path", { d: "M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" }],
  ["path", { d: "M8.5 2h7" }],
  ["path", { d: "M7 16h10" }],
]);
const GraduationCap = __lucide("graduation-cap", [
  ["path", { d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" }],
  ["path", { d: "M22 10v6" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5" }],
]);
const Compass = __lucide("compass", [
  ["path", { d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" }],
  ["circle", { cx: "12", cy: "12", r: "10" }],
]);
const ChevronDown = __lucide("chevron-down", [
  ["path", { d: "m6 9 6 6 6-6" }],
]);
const Plus = __lucide("plus", [
  ["path", { d: "M5 12h14" }],
  ["path", { d: "M12 5v14" }],
]);
const Minus = __lucide("minus", [
  ["path", { d: "M5 12h14" }],
]);
const TriangleAlert = __lucide("triangle-alert", [
  ["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 20h16a2 2 0 0 0 1.73-3" }],
  ["path", { d: "M12 9v4" }],
  ["path", { d: "M12 17h.01" }],
]);
