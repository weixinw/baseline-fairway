import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <>
      <section className="shell home-hero" aria-labelledby="home-hero-title">
        <p className="eyebrow">Irvine&apos;s Indoor Country-Club Concept</p>
        <h1 id="home-hero-title">
          Golf and tennis performance, elevated by a warm urban club atmosphere.
        </h1>
        <p className="hero-subhead">
          Baseline Fairway blends simulator-driven golf, indoor tennis training,
          and a premium social workspace designed for high-performing
          professionals.
        </p>
        <a
          className="cta-button hero-cta"
          href="#"
          data-track-event="home_hero_primary_cta_click"
        >
          {siteConfig.primaryCta.label}
        </a>
      </section>

      <section className="shell positioning-section" aria-labelledby="positioning-title">
        <div className="positioning-header">
          <p className="eyebrow">Positioning</p>
          <h2 id="positioning-title">Three pillars of club lifestyle</h2>
        </div>

        <div className="positioning-grid">
          <article className="positioning-card">
            <h3>Golf Performance</h3>
            <p>
              Precision simulator bays and data-informed coaching sessions for
              after-work practice and weekend progression.
            </p>
          </article>

          <article className="positioning-card">
            <h3>Tennis Performance</h3>
            <p>
              Year-round indoor tennis training focused on technique,
              consistency, and measurable development.
            </p>
          </article>

          <article className="positioning-card">
            <h3>Club Lifestyle</h3>
            <p>
              A hospitality-led environment with lounge and work-ready spaces
              that make sport, social connection, and productivity coexist.
            </p>
          </article>
        </div>
      </section>

      <section className="shell social-proof-section" aria-labelledby="social-proof-title">
        <p className="eyebrow">Credibility</p>
        <h2 id="social-proof-title">Built for confidence from day one</h2>
        <div className="social-proof-placeholder">
          <p>
            Social proof placeholder: future logos, partner badges, member
            testimonials, and press mentions will be featured here.
          </p>
        </div>
      </section>
    </>
  );
}
