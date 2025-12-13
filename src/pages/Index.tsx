import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { ArrowRight, Star, Truck, Shield, Award, Zap } from "lucide-react";
import heroImage from "@/assets/hero-shoes.jpg";
import craftImage from "@/assets/about-craftsmanship.jpg";
import runningHero from "@/assets/running-shoes-hero.jpg";
import lifestyleSneakers from "@/assets/lifestyle-sneakers.jpg";
import slidersProduct from "@/assets/sliders-product.jpg";
import sportsAction from "@/assets/sports-action.jpg";

const categories = [
  { name: "Running Shoes", slug: "running-shoes", image: runningHero },
  { name: "Sports Wear", slug: "sports-wear", image: sportsAction },
  { name: "Sneakers", slug: "sneakers", image: lifestyleSneakers },
  { name: "Sliders", slug: "sliders", image: slidersProduct },
];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
  { icon: Shield, title: "2 Year Warranty", desc: "Quality guaranteed" },
  { icon: Award, title: "Premium Quality", desc: "Handcrafted excellence" },
  { icon: Zap, title: "Fast Delivery", desc: "2-3 business days" },
];

const testimonials = [
  { name: "Alex M.", text: "Best running shoes I've ever owned. The comfort is unmatched.", rating: 5 },
  { name: "Sarah K.", text: "Stylish and comfortable. Perfect for my daily workouts.", rating: 5 },
  { name: "David R.", text: "The quality is exceptional. Worth every penny.", rating: 5 },
  { name: "Emma L.", text: "Fast delivery and amazing customer service!", rating: 5 },
  { name: "James P.", text: "These sneakers get compliments everywhere I go.", rating: 5 },
  { name: "Lisa T.", text: "Perfect fit right out of the box. Highly recommend!", rating: 5 },
];

const marqueeWords = [
  "PERFORMANCE",
  "STYLE",
  "COMFORT",
  "INNOVATION",
  "QUALITY",
  "DURABILITY",
  "EXCELLENCE",
  "PASSION",
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium leather shoes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        <div className="relative container-wide py-20">
          <div className="max-w-2xl">
            <span className="inline-block font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 opacity-0 animate-fade-up">
              Premium Footwear
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] mb-6 opacity-0 animate-fade-up delay-100">
              Walk in
              <br />
              <span className="italic text-primary">Distinction</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-up delay-200">
              Engineered for performance, designed for style. Experience footwear 
              that elevates every step you take.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up delay-300">
              <Button asChild variant="hero" size="lg" className="animate-pulse-glow">
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

        {/* Floating Stats */}
        <div className="absolute bottom-12 right-12 hidden lg:flex gap-8 opacity-0 animate-fade-up delay-500">
          <div className="text-center">
            <span className="font-serif text-4xl text-primary font-bold">10K+</span>
            <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
          </div>
          <div className="text-center">
            <span className="font-serif text-4xl text-primary font-bold">50+</span>
            <p className="text-sm text-muted-foreground mt-1">Shoe Models</p>
          </div>
          <div className="text-center">
            <span className="font-serif text-4xl text-primary font-bold">4.9</span>
            <p className="text-sm text-muted-foreground mt-1">Avg Rating</p>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-6 bg-primary text-primary-foreground overflow-hidden">
        <Marquee speed="fast" className="py-2">
          {marqueeWords.map((word, index) => (
            <span key={index} className="flex items-center gap-8 mx-8 font-sans text-xl font-bold tracking-widest">
              {word}
              <span className="text-primary-foreground/50">★</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Features Bar */}
      <section className="py-8 bg-secondary border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="flex items-center gap-3 opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <feature.icon className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-sans font-semibold text-sm">{feature.title}</p>
                  <p className="font-sans text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block opacity-0 animate-fade-up">
              Collections
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium opacity-0 animate-fade-up delay-100">
              Explore Our Range
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/categories/${category.slug}`}
                className="group relative aspect-[3/4] overflow-hidden opacity-0 animate-fade-up hover-lift"
                style={{ animationDelay: `${index * 100 + 200}ms`, animationFillMode: 'forwards' }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                    <h3 className="font-serif text-2xl text-background mb-2">
                      {category.name}
                    </h3>
                    <span className="inline-flex items-center gap-2 font-sans text-sm text-background/80 uppercase tracking-wide">
                      Shop Now
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Split Image Section */}
      <section className="py-24 md:py-32 bg-secondary overflow-hidden">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative opacity-0 animate-fade-up">
              <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
                <img
                  src={sportsAction}
                  alt="Sports performance"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 aspect-video overflow-hidden rounded-lg shadow-lg border-4 border-background">
                <img
                  src={lifestyleSneakers}
                  alt="Street style"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:pl-8 opacity-0 animate-fade-up delay-200">
              <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                Why ACCENDO
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                Built for
                <br />
                <span className="italic text-primary">Champions</span>
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-6">
                Every pair of ACCENDO shoes is engineered with cutting-edge technology 
                and premium materials to deliver unmatched performance, comfort, and style.
              </p>
              <ul className="space-y-4 mb-10">
                {["Advanced cushioning technology", "Breathable mesh construction", "Durable rubber outsole", "Ergonomic design"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="default">
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative opacity-0 animate-fade-up">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={craftImage}
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 border-2 border-primary hidden lg:block" />
            </div>

            <div className="lg:pl-8 opacity-0 animate-fade-up delay-200">
              <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                Our Heritage
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                A Legacy of
                <br />
                <span className="italic">Excellence</span>
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-6">
                Since our founding, we've been perfecting the art of shoemaking.
                Each pair is a testament to generations of expertise, combining
                time-honored techniques with contemporary sensibilities.
              </p>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-10">
                We source only the finest materials, working with suppliers
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

      {/* Testimonials Marquee */}
      <section className="py-16 bg-foreground text-background overflow-hidden">
        <div className="container-wide mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-center">
            What Our Customers Say
          </h2>
        </div>
        <Marquee pauseOnHover className="py-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="mx-4 p-6 bg-background/10 backdrop-blur rounded-lg min-w-[300px] max-w-[350px]"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-sans text-background/90 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-sans font-semibold text-primary">{testimonial.name}</p>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
              Our Promise
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium">
              What Sets Us Apart
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                title: "Performance",
                description:
                  "Engineered with advanced technology to enhance your athletic performance and everyday comfort.",
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
                className="text-center opacity-0 animate-fade-up hover-lift p-8 rounded-lg bg-background shadow-md transition-shadow hover:shadow-lg"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
              >
                <span className="font-serif text-6xl md:text-7xl text-primary/30 block mb-4">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-2xl mb-4 text-foreground">{value.title}</h3>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram-style Gallery */}
      <section className="py-16 bg-background overflow-hidden">
        <div className="container-wide mb-8 text-center">
          <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
            @ACCENDO
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium">
            Follow the Journey
          </h2>
        </div>
        <Marquee speed="slow" className="py-4">
          {[runningHero, lifestyleSneakers, slidersProduct, sportsAction, craftImage, heroImage].map((img, i) => (
            <div key={i} className="mx-2 aspect-square w-64 overflow-hidden group cursor-pointer">
              <img 
                src={img} 
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </Marquee>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 opacity-0 animate-fade-up">
            Ready to Elevate Your Game?
          </h2>
          <p className="font-sans text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto opacity-0 animate-fade-up delay-100">
            Join thousands of satisfied customers who've discovered the ACCENDO difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up delay-200">
            <Button asChild variant="secondary" size="lg">
              <Link to="/categories">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
