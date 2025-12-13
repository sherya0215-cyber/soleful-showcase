import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import sneakersImg from "@/assets/category-sneakers.jpg";
import loafersImg from "@/assets/category-loafers.jpg";
import bootsImg from "@/assets/category-boots.jpg";
import oxfordsImg from "@/assets/category-oxfords.jpg";

const categories = [
  {
    name: "Sneakers",
    slug: "sneakers",
    image: sneakersImg,
    description:
      "Contemporary sneakers crafted with the same meticulous attention to detail as our formal collection. Premium leather uppers, cushioned insoles, and clean silhouettes that elevate everyday style.",
  },
  {
    name: "Loafers",
    slug: "loafers",
    image: loafersImg,
    description:
      "The epitome of effortless elegance. Our loafers blend comfort with sophistication, featuring hand-sewn moccasin construction and buttery-soft leather that molds to your foot.",
  },
  {
    name: "Boots",
    slug: "boots",
    image: bootsImg,
    description:
      "From refined Chelsea boots to rugged yet refined lace-ups, our boot collection offers versatility without compromising on quality. Built to weather any occasion with grace.",
  },
  {
    name: "Oxfords",
    slug: "oxfords",
    image: oxfordsImg,
    description:
      "The cornerstone of classic menswear. Our Oxfords feature Goodyear-welted construction, full-grain calfskin, and timeless cap-toe designs that define sartorial excellence.",
  },
];

const Categories = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block opacity-0 animate-fade-up">
              Collections
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium mb-6 opacity-0 animate-fade-up delay-100">
              Our
              <span className="italic"> Categories</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-up delay-200">
              Each collection represents a chapter in our story—explore and find
              the style that speaks to you.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="space-y-24">
            {categories.map((category, index) => (
              <div
                key={category.slug}
                id={category.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center opacity-0 animate-fade-up`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] overflow-hidden group">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1 lg:pr-12" : "lg:pl-12"}>
                  <span className="font-serif text-6xl text-primary/20 block mb-2">
                    0{index + 1}
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                    {category.name}
                  </h2>
                  <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
                    {category.description}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide uppercase text-foreground hover:text-primary transition-colors group"
                  >
                    Inquire About This Collection
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-cream-dark">
        <div className="container-wide text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            Can't Decide?
          </h2>
          <p className="font-sans text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Our team is here to help you find the perfect pair. Reach out for
            personalized recommendations.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide uppercase text-primary hover:text-terracotta-dark transition-colors"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
