import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-shoes.jpg";
import craftImage from "@/assets/about-craftsmanship.jpg";
import sneakersImg from "@/assets/category-sneakers.jpg";
import loafersImg from "@/assets/category-loafers.jpg";
import bootsImg from "@/assets/category-boots.jpg";
import oxfordsImg from "@/assets/category-oxfords.jpg";

const categories = [
  { name: "Sneakers", slug: "sneakers", image: sneakersImg },
  { name: "Loafers", slug: "loafers", image: loafersImg },
  { name: "Boots", slug: "boots", image: bootsImg },
  { name: "Oxfords", slug: "oxfords", image: oxfordsImg },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium leather shoes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>

        <div className="relative container-wide py-20">
          <div className="max-w-2xl">
            <span className="inline-block font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 opacity-0 animate-fade-up">
              Italian Craftsmanship
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] mb-6 opacity-0 animate-fade-up delay-100">
              Walk in
              <br />
              <span className="italic text-primary">Distinction</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-up delay-200">
              Handcrafted footwear that combines timeless elegance with
              contemporary design. Made for those who appreciate the finer
              things.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up delay-300">
              <Button asChild variant="hero" size="lg">
                <Link to="/categories">
                  Explore Collection
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
              Collections
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium">
              Explore Our Range
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/categories#${category.slug}`}
                className="group relative aspect-[3/4] overflow-hidden opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-70 transition-opacity" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className="font-serif text-2xl text-background mb-2">
                      {category.name}
                    </h3>
                    <span className="inline-flex items-center gap-2 font-sans text-sm text-background/80 uppercase tracking-wide">
                      View Collection
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={craftImage}
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 border border-primary hidden lg:block" />
            </div>

            <div className="lg:pl-8">
              <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                Our Heritage
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                A Legacy of
                <br />
                <span className="italic">Excellence</span>
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-6">
                Since 1952, we've been perfecting the art of shoemaking in the
                rolling hills of Tuscany. Each pair is a testament to
                generations of expertise, combining time-honored techniques with
                contemporary sensibilities.
              </p>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-10">
                We source only the finest Italian leather, working with tanneries
                that share our commitment to quality and sustainability.
              </p>
              <Button asChild variant="outline">
                <Link to="/about">
                  Discover More
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                title: "Handcrafted",
                description:
                  "Each pair is meticulously crafted by master artisans with decades of experience.",
              },
              {
                title: "Sustainable",
                description:
                  "We use responsibly sourced materials and eco-conscious production methods.",
              },
              {
                title: "Timeless",
                description:
                  "Designed to transcend trends and become a cherished part of your wardrobe.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="text-center md:text-left opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
              >
                <span className="font-serif text-6xl md:text-7xl text-background/20 block mb-4">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-2xl mb-4">{value.title}</h3>
                <p className="font-sans text-background/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-cream-dark">
        <div className="container-wide text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="font-sans text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join our community and be the first to know about new collections,
            exclusive events, and the stories behind our craft.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/blog">Read Our Journal</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
