import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import craftImage from "@/assets/about-craftsmanship.jpg";
import heroImage from "@/assets/hero-shoes.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block opacity-0 animate-fade-up">
              Our Story
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium mb-6 opacity-0 animate-fade-up delay-100">
              Crafted with
              <br />
              <span className="italic">Passion</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-up delay-200">
              Since 1952, STRIDE has been synonymous with exceptional quality,
              timeless design, and the enduring art of Italian shoemaking.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                A Family
                <br />
                <span className="italic">Tradition</span>
              </h2>
              <div className="space-y-6 font-sans text-lg text-muted-foreground leading-relaxed">
                <p>
                  It began in a small workshop in Florence, where master cobbler
                  Giovanni Rossi first put leather to last. What started as a
                  humble craft passed down through generations has blossomed into a
                  globally recognized symbol of Italian excellence.
                </p>
                <p>
                  Today, the fourth generation of the Rossi family continues this
                  legacy, combining ancestral techniques with contemporary
                  innovation. Each pair of STRIDE shoes carries within it over
                  seven decades of accumulated wisdom, passion, and unwavering
                  dedication to quality.
                </p>
                <p>
                  We believe that truly exceptional footwear is more than an
                  accessory—it's a companion on life's journey, gaining character
                  and beauty with every step.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={craftImage}
                  alt="Master craftsman at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-1/2 h-1/2 border border-primary hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
              Our Principles
            </h2>
            <p className="font-sans text-lg text-background/70 leading-relaxed">
              These values guide every decision we make, from sourcing materials
              to the final stitch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Uncompromising Quality",
                description:
                  "We never cut corners. Every hide is hand-selected, every stitch precisely placed. Our shoes are built to last a lifetime and beyond.",
              },
              {
                title: "Sustainable Practices",
                description:
                  "We partner with certified tanneries that prioritize environmental responsibility, using vegetable-tanned leather and eco-conscious dyes.",
              },
              {
                title: "Timeless Design",
                description:
                  "Fashion fades, but style endures. Our designs transcend seasonal trends, offering pieces that remain relevant for decades.",
              },
              {
                title: "Human Connection",
                description:
                  "Behind every pair is a team of dedicated artisans. We value their expertise, ensure fair working conditions, and celebrate their craft.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="p-8 border border-background/20 opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <h3 className="font-serif text-2xl mb-4">{value.title}</h3>
                <p className="font-sans text-background/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
              The Process
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium">
              From Hide to Heritage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Selection",
                description: "Hand-picking the finest Italian leather from trusted tanneries.",
              },
              {
                step: "02",
                title: "Cutting",
                description: "Precision cutting by master craftsmen with decades of experience.",
              },
              {
                step: "03",
                title: "Assembly",
                description: "Over 200 meticulous steps to construct each pair by hand.",
              },
              {
                step: "04",
                title: "Finishing",
                description: "Final polish and quality inspection before leaving our workshop.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <span className="font-serif text-5xl text-primary/30 block mb-4">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium shoes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/80" />
        </div>
        <div className="relative container-wide text-center text-background">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            Experience the Difference
          </h2>
          <p className="font-sans text-lg text-background/70 mb-10 max-w-xl mx-auto">
            Discover our collections and find the perfect pair to accompany you
            on your journey.
          </p>
          <Button asChild variant="hero-outline" size="lg" className="border-background/30 text-background hover:bg-background/10">
            <Link to="/categories">
              View Collections
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
