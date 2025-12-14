import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { ArrowRight, ArrowUpRight, Star, Truck, Shield, Award, Zap } from "lucide-react";
import heroImage from "@/assets/hero-shoes.jpg";
import runningHero from "@/assets/running-shoes-hero.jpg";
import lifestyleSneakers from "@/assets/lifestyle-sneakers.jpg";
import slidersProduct from "@/assets/sliders-product.jpg";
import sportsAction from "@/assets/sports-action.jpg";
import craftImage from "@/assets/about-craftsmanship.jpg";

const categories = [
  { name: "Running", slug: "running-shoes", image: runningHero, count: "24" },
  { name: "Sports", slug: "sports-wear", image: sportsAction, count: "18" },
  { name: "Sneakers", slug: "sneakers", image: lifestyleSneakers, count: "32" },
  { name: "Sliders", slug: "sliders", image: slidersProduct, count: "12" },
];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "Orders over $100" },
  { icon: Shield, title: "2 Year Warranty", desc: "Quality guaranteed" },
  { icon: Award, title: "Premium Quality", desc: "Handcrafted" },
  { icon: Zap, title: "Fast Delivery", desc: "2-3 days" },
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
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium footwear"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-wide text-center py-32">
          {/* Brand Tag */}
          <div className="inline-flex items-center gap-3 mb-8 opacity-0 animate-fade-up">
            <div className="w-12 h-px bg-foreground" />
            <span className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-foreground">
              Premium Footwear
            </span>
            <div className="w-12 h-px bg-foreground" />
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-[clamp(4rem,15vw,12rem)] leading-[0.85] tracking-tight mb-8 opacity-0 animate-fade-up delay-100">
            NEW CITY
            <br />
            <span className="text-primary">SNEAKERS</span>
          </h1>

          {/* Subheading */}
          <p className="font-sans text-lg md:text-xl text-foreground/70 max-w-md mx-auto mb-12 opacity-0 animate-fade-up delay-200">
            The Best Walking Shoes — Engineered for performance, designed for style.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up delay-300">
            <Button asChild variant="default" size="xl">
              <Link to="/categories">
                Explore Now
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-fade-up delay-500">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/50">Scroll</span>
          <div className="w-px h-12 bg-foreground/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-foreground animate-marquee" style={{ animationDuration: "1.5s" }} />
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 right-12 hidden xl:flex gap-12 opacity-0 animate-fade-up delay-600">
          <div className="text-right">
            <span className="font-display text-5xl text-foreground">10K+</span>
            <p className="font-sans text-xs tracking-widest uppercase text-foreground/50 mt-1">Happy Customers</p>
          </div>
          <div className="text-right">
            <span className="font-display text-5xl text-foreground">50+</span>
            <p className="font-sans text-xs tracking-widest uppercase text-foreground/50 mt-1">Shoe Models</p>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-5 bg-foreground text-background overflow-hidden border-y border-border">
        <Marquee speed="fast" className="py-1">
          {marqueeWords.map((word, index) => (
            <span key={index} className="flex items-center gap-12 mx-12 font-display text-2xl tracking-wide">
              {word}
              <span className="text-primary text-3xl">•</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Features Bar */}
      <section className="py-10 bg-background border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="flex items-center gap-4 opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <feature.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                <div>
                  <p className="font-sans font-semibold text-sm tracking-wide">{feature.title}</p>
                  <p className="font-sans text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Bold Grid */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-wide">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4 block opacity-0 animate-fade-up">
                Browse
              </span>
              <h2 className="font-display text-5xl md:text-7xl opacity-0 animate-fade-up delay-100">
                THE NEWEST<br />PRODUCTS
              </h2>
            </div>
            <p className="font-sans text-muted-foreground max-w-sm opacity-0 animate-fade-up delay-200">
              Find the ideal pieces for you. Curated collections for every style and occasion.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/categories/${category.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-secondary opacity-0 animate-fade-up hover-lift"
                style={{ animationDelay: `${index * 100 + 300}ms`, animationFillMode: 'forwards' }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-sans text-xs tracking-widest uppercase text-background/70 block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {category.count} Items
                      </span>
                      <h3 className="font-display text-3xl text-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {category.name}
                      </h3>
                    </div>
                    <div className="w-12 h-12 bg-background text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner - Full Width */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={sportsAction}
            alt="Sports performance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>

        <div className="relative z-10 container-wide text-center">
          <span className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-background/70 mb-6 block opacity-0 animate-fade-up">
            Why Choose Us
          </span>
          <h2 className="font-display text-5xl md:text-8xl text-background mb-8 opacity-0 animate-fade-up delay-100">
            BUILT FOR<br />CHAMPIONS
          </h2>
          <p className="font-sans text-lg text-background/70 max-w-xl mx-auto mb-12 opacity-0 animate-fade-up delay-200">
            Every pair is engineered with cutting-edge technology and premium materials
            to deliver unmatched performance.
          </p>
          <Button asChild variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground opacity-0 animate-fade-up delay-300">
            <Link to="/about">
              Learn More
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <MissionVision />

      {/* Manufacturing Quality Section */}
      <ManufacturingQuality />

      {/* Models/Ambassadors Showcase */}
      <ModelsShowcase />

      {/* Split Content Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative aspect-square lg:aspect-auto overflow-hidden opacity-0 animate-slide-in-left">
              <img
                src={craftImage}
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="bg-secondary p-12 lg:p-20 flex flex-col justify-center opacity-0 animate-slide-in-right delay-200">
              <span className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6 block">
                Our Heritage
              </span>
              <h2 className="font-display text-4xl md:text-6xl mb-8">
                A LEGACY OF<br />EXCELLENCE
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-8">
                Since our founding, we've been perfecting the art of shoemaking.
                Each pair is a testament to generations of expertise, combining
                time-honored techniques with contemporary sensibilities.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                {["Advanced Technology", "Premium Materials", "Expert Craftsmanship", "Sustainable Practices"].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
                    <span className="font-sans text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Button asChild variant="default" size="lg" className="self-start">
                <Link to="/about">
                  Discover More
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-foreground text-background overflow-hidden">
        <div className="container-wide mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl">
              WHAT OUR<br />CUSTOMERS SAY
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-sans text-sm text-background/70">4.9 Average Rating</span>
            </div>
          </div>
        </div>
        <Marquee pauseOnHover className="py-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="mx-3 p-8 bg-background/5 backdrop-blur border border-background/10 min-w-[320px] max-w-[380px]"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-sans text-background/80 mb-6 leading-relaxed">"{testimonial.text}"</p>
              <p className="font-sans font-semibold text-background tracking-wide">{testimonial.name}</p>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Our Promise
            </span>
            <h2 className="font-display text-5xl md:text-6xl">
              WHAT SETS US APART
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
            {[
              {
                num: "01",
                title: "Performance",
                description: "Engineered with advanced technology to enhance your athletic performance and everyday comfort.",
              },
              {
                num: "02",
                title: "Sustainable",
                description: "We use responsibly sourced materials and eco-conscious production methods.",
              },
              {
                num: "03",
                title: "Timeless",
                description: "Designed to transcend trends and become a cherished part of your wardrobe.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="p-12 border-r last:border-r-0 border-border opacity-0 animate-fade-up group hover:bg-secondary transition-colors duration-500"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
              >
                <span className="font-display text-7xl text-border group-hover:text-primary/20 transition-colors duration-500 block mb-6">
                  {value.num}
                </span>
                <h3 className="font-display text-2xl mb-4">{value.title}</h3>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-16 bg-secondary overflow-hidden">
        <div className="container-wide mb-10 text-center">
          <span className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
            @ACCENDO
          </span>
          <h2 className="font-display text-4xl md:text-5xl">
            FOLLOW THE JOURNEY
          </h2>
        </div>
        <Marquee speed="slow" className="py-4">
          {[runningHero, lifestyleSneakers, slidersProduct, sportsAction, craftImage, heroImage].map((img, i) => (
            <div key={i} className="mx-2 aspect-square w-72 overflow-hidden group cursor-pointer">
              <img 
                src={img} 
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </Marquee>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-40 bg-background">
        <div className="container-wide text-center">
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl mb-8 opacity-0 animate-fade-up">
            READY TO<br />
            <span className="text-primary">ELEVATE</span><br />
            YOUR GAME?
          </h2>
          <p className="font-sans text-lg text-muted-foreground mb-12 max-w-xl mx-auto opacity-0 animate-fade-up delay-100">
            Join thousands of satisfied customers who've discovered the ACCENDO difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up delay-200">
            <Button asChild variant="default" size="xl">
              <Link to="/categories">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;