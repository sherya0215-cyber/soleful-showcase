import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Marquee } from "@/components/ui/marquee";
import { ArrowRight } from "lucide-react";
import runningHero from "@/assets/running-shoes-hero.jpg";
import lifestyleSneakers from "@/assets/lifestyle-sneakers.jpg";
import slidersProduct from "@/assets/sliders-product.jpg";
import sportsAction from "@/assets/sports-action.jpg";

const categories = [
  {
    name: "Running Shoes",
    slug: "running-shoes",
    image: runningHero,
    description:
      "Engineered for performance, designed for comfort. Our running shoes combine cutting-edge technology with premium materials to deliver unmatched performance.",
  },
  {
    name: "Sports Wear",
    slug: "sports-wear",
    image: sportsAction,
    description:
      "Athletic footwear for every sport and activity. From the court to the field, designed to enhance your athletic performance.",
  },
  {
    name: "Sneakers",
    slug: "sneakers",
    image: lifestyleSneakers,
    description:
      "Contemporary style meets everyday comfort. Each pair is crafted with meticulous attention to detail, using only the finest materials.",
  },
  {
    name: "Sliders",
    slug: "sliders",
    image: slidersProduct,
    description:
      "Effortless comfort for relaxed moments. Perfect for poolside lounging, post-workout recovery, or casual everyday wear.",
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
              <span className="italic text-primary"> Categories</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-up delay-200">
              Each collection represents a chapter in our story—explore and find
              the style that speaks to you.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-4 bg-primary text-primary-foreground overflow-hidden">
        <Marquee speed="fast">
          {["PERFORMANCE", "STYLE", "COMFORT", "INNOVATION", "QUALITY"].map((word, i) => (
            <span key={i} className="flex items-center gap-6 mx-6 font-sans text-lg font-bold tracking-widest">
              {word}
              <span className="text-primary-foreground/50">★</span>
            </span>
          ))}
        </Marquee>
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
                  <Link to={`/categories/${category.slug}`} className="block aspect-[4/3] overflow-hidden group rounded-lg shadow-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1 lg:pr-12" : "lg:pl-12"}>
                  <span className="font-serif text-6xl text-primary/30 block mb-2">
                    0{index + 1}
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                    {category.name}
                  </h2>
                  <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
                    {category.description}
                  </p>
                  <Link
                    to={`/categories/${category.slug}`}
                    className="inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide uppercase text-foreground hover:text-primary transition-colors group"
                  >
                    Explore Collection
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Marquee */}
      <section className="py-12 bg-secondary overflow-hidden">
        <Marquee speed="slow" reverse>
          {[runningHero, sportsAction, lifestyleSneakers, slidersProduct, runningHero, sportsAction].map((img, i) => (
            <div key={i} className="mx-2 aspect-square w-48 overflow-hidden rounded-lg group">
              <img 
                src={img} 
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="container-wide text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 opacity-0 animate-fade-up">
            Can't Decide?
          </h2>
          <p className="font-sans text-lg text-background/80 mb-10 max-w-xl mx-auto opacity-0 animate-fade-up delay-100">
            Our team is here to help you find the perfect pair. Reach out for
            personalized recommendations.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium tracking-wide uppercase text-primary hover:text-primary/80 transition-colors opacity-0 animate-fade-up delay-200"
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
