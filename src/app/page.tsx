import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <section className="shell intro-section">
      <p className="eyebrow">Project Scaffold</p>
      <h1>{siteConfig.tagline}</h1>
      <p>
        This baseline shell establishes the global navigation, page layout, and
        footer for upcoming Sprint S1 features.
      </p>
    </section>
  );
}
