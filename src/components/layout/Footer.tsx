import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  brand: [
    { href: "/about", label: "Our Story" },
    { href: "/categories", label: "Collections" },
    { href: "/blog", label: "Journal" },
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container-wide py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Brand - Large */}
          <div className="lg:col-span-6">
            <Link to="/" className="font-display text-5xl md:text-6xl tracking-tight inline-block mb-6 hover:text-primary transition-colors">
              ACCENDO
            </Link>
            <p className="font-sans text-background/60 text-base leading-relaxed max-w-md">
              Crafted with passion. Each pair tells a story of 
              heritage, quality, and timeless elegance.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-12">
              {/* Explore Links */}
              <div>
                <h4 className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-background/40 mb-6">
                  Explore
                </h4>
                <ul className="space-y-4">
                  {footerLinks.brand.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="group inline-flex items-center gap-2 text-background/80 hover:text-background transition-colors font-sans text-sm"
                      >
                        {link.label}
                        <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h4 className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-background/40 mb-6">
                  Support
                </h4>
                <ul className="space-y-4">
                  {footerLinks.support.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="group inline-flex items-center gap-2 text-background/80 hover:text-background transition-colors font-sans text-sm"
                      >
                        {link.label}
                        <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 pt-12 border-t border-background/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h4 className="font-display text-2xl mb-2">JOIN THE MOVEMENT</h4>
              <p className="font-sans text-sm text-background/60">Stay updated with new releases and exclusive offers.</p>
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-background/60 hover:text-background transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-background/60 hover:text-background transition-colors"
              >
                Pinterest
              </a>
              <a
                href="#"
                className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-background/60 hover:text-background transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-wide py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-background/40 tracking-wide">
            © {new Date().getFullYear()} ACCENDO. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="font-sans text-xs text-background/40 hover:text-background/70 transition-colors tracking-wide">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-xs text-background/40 hover:text-background/70 transition-colors tracking-wide">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};