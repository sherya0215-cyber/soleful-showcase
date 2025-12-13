import { Link } from "react-router-dom";

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
    <footer className="bg-foreground text-background py-16 md:py-20">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="font-serif text-3xl font-semibold tracking-tight">
              STRIDE
            </Link>
            <p className="mt-4 text-background/70 font-sans text-sm leading-relaxed max-w-md">
              Crafted with passion in the heart of Italy. Each pair tells a story of 
              heritage, quality, and timeless elegance.
            </p>
          </div>

          {/* Brand Links */}
          <div>
            <h4 className="font-serif text-lg mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.brand.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors font-sans text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-serif text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors font-sans text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 font-sans text-sm">
            © {new Date().getFullYear()} STRIDE. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-background/50 hover:text-background transition-colors font-sans text-sm"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-background/50 hover:text-background transition-colors font-sans text-sm"
            >
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
