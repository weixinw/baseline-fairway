import { siteConfig } from "@/config/site";
import { LeadCaptureForm } from "@/components/lead-capture-form";

const membershipTiers = [
  {
    name: "Social",
    summary: "Club access for social play, lounge time, and flexible after-work drop-ins.",
    benefits: ["Social mixers and member networking", "Lounge workspace access"],
    price: "$129-169/mo",
    ctaLabel: "Join Waitlist",
    ctaHref: "#join-waitlist",
    ctaEvent: "membership_social_cta_click",
  },
  {
    name: "Core",
    summary: "Balanced plan for members who train weekly across golf and tennis.",
    benefits: ["Weekly simulator and court credits", "Priority booking windows"],
    price: "$249-299/mo",
    ctaLabel: "Join Waitlist",
    ctaHref: "#join-waitlist",
    ctaEvent: "membership_core_cta_click",
  },
  {
    name: "Performance",
    summary: "Advanced tier for high-frequency training with deeper coaching support.",
    benefits: ["Expanded monthly training credits", "Performance data reviews"],
    price: "$399-499/mo",
    ctaLabel: "Join Waitlist",
    ctaHref: "#join-waitlist",
    ctaEvent: "membership_performance_cta_click",
  },
  {
    name: "Corporate",
    summary: "Team-focused package for executive wellness, hosting, and client events.",
    benefits: ["Team access blocks and hosted sessions", "Branded event support"],
    price: "Custom pricing",
    ctaLabel: "Contact Us",
    ctaHref: "#contact",
    ctaEvent: "membership_corporate_cta_click",
  },
] as const;

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

      <section
        className="shell membership-section"
        id="membership"
        aria-labelledby="membership-title"
      >
        <div className="membership-header">
          <p className="eyebrow">Membership</p>
          <h2 id="membership-title">A clear path from social access to team performance</h2>
          <p className="membership-subhead">
            Four tiers built for individual progression and corporate engagement.
          </p>
        </div>

        <div className="membership-grid" role="list" aria-label="Membership tiers">
          {membershipTiers.map((tier) => (
            <article className="membership-card" key={tier.name} role="listitem">
              <h3>{tier.name}</h3>
              <p>{tier.summary}</p>
              <ul>
                {tier.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <p className="membership-price">{tier.price}</p>
              <a
                className="cta-button membership-cta"
                href={tier.ctaHref}
                data-track-event={tier.ctaEvent}
              >
                {tier.ctaLabel}
              </a>
            </article>
          ))}
        </div>

        <div className="membership-compare-desktop" aria-label="Membership comparison table">
          <table>
            <caption>Tier comparison overview</caption>
            <thead>
              <tr>
                <th scope="col">Dimension</th>
                {membershipTiers.map((tier) => (
                  <th key={tier.name} scope="col">
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Summary</th>
                {membershipTiers.map((tier) => (
                  <td key={`${tier.name}-summary`}>{tier.summary}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Key benefits</th>
                {membershipTiers.map((tier) => (
                  <td key={`${tier.name}-benefits`}>
                    <ul>
                      {tier.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Price</th>
                {membershipTiers.map((tier) => (
                  <td key={`${tier.name}-price`}>{tier.price}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Action</th>
                {membershipTiers.map((tier) => (
                  <td key={`${tier.name}-cta`}>
                    <a href={tier.ctaHref} data-track-event={tier.ctaEvent}>
                      {tier.ctaLabel}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="membership-compare-mobile" aria-label="Membership comparison accordion">
          {membershipTiers.map((tier) => (
            <details key={`${tier.name}-mobile`}>
              <summary>
                <span>{tier.name}</span>
                <span>{tier.price}</span>
              </summary>
              <p>{tier.summary}</p>
              <ul>
                {tier.benefits.map((benefit) => (
                  <li key={`${tier.name}-${benefit}`}>{benefit}</li>
                ))}
              </ul>
              <a href={tier.ctaHref} data-track-event={tier.ctaEvent}>
                {tier.ctaLabel}
              </a>
            </details>
          ))}
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

      <LeadCaptureForm />
    </>
  );
}
