import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/98 backdrop-blur-md py-4 border-b border-border"
          : "bg-transparent py-6"
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between">
          {/* Hamburger Menu - Left */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation - Left */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "link-underline font-sans text-sm font-medium tracking-widest uppercase transition-colors",
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo - Center */}
          <Link
            to="/"
            className="font-display text-3xl md:text-4xl font-normal tracking-wide text-foreground hover:text-primary transition-colors"
          >
            ACCENDO
          </Link>

          {/* Desktop Navigation - Right */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "link-underline font-sans text-sm font-medium tracking-widest uppercase transition-colors",
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/admin/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <Shield size={16} />
              </Button>
            </Link>
          </nav>

          {/* Mobile - Right placeholder for balance */}
          <div className="lg:hidden w-10" />
        </div>
      </div>

      {/* Mobile Navigation - Fullscreen */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-background z-40 transition-all duration-500 flex flex-col justify-center items-center",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 left-4 p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "font-display text-4xl tracking-wide transition-all duration-300",
                location.pathname === link.href
                  ? "text-primary"
                  : "text-foreground hover:text-primary",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin/login"
            onClick={() => setIsOpen(false)}
            className="mt-8 font-sans text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};