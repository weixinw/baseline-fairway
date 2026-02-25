import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <div className="brand-lockup">
          <p className="brand-name">{siteConfig.name}</p>
          <p className="brand-location">{siteConfig.location}</p>
        </div>

        <nav aria-label="Global">
          <ul className="nav-list">
            {siteConfig.navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="cta-button" href={siteConfig.primaryCta.href}>
          {siteConfig.primaryCta.label}
        </Link>
      </div>
    </header>
  );
}
