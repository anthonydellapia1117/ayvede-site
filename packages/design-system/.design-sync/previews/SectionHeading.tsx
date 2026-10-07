import { SectionHeading, Link } from "executive-ui";

export const Default = () => <SectionHeading eyebrow="Options" title="Three paths, one recommendation" description="Each option was scored on cost, change load, and risk." />;

export const WithAction = () => <SectionHeading title="Open risks" description="Top three by exposure." action={<Link href="#" standalone>View all risks</Link>} />;

export const Centered = () => <SectionHeading align="center" eyebrow="Approach" title="How the review works" description="Four steps from intake to a recorded decision." />;
