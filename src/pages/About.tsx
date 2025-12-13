import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Globe, Leaf } from "lucide-react";
import craftImage from "@/assets/about-craftsmanship.jpg";
import heroImage from "@/assets/hero-shoes.jpg";
import runningHero from "@/assets/running-shoes-hero.jpg";
import sportsAction from "@/assets/sports-action.jpg";

const stats = [
  { number: "10K+", label: "Happy Customers" },
  { number: "50+", label: "Shoe Models" },
  { number: "15+", label: "Countries" },
  { number: "99%", label: "Satisfaction Rate" },
];

const team = [
  { name: "Michael Chen", role: "Founder & CEO", image: craftImage },
  { name: "Sarah Williams", role: "Head of Design", image: runningHero },
  { name: "David Kim", role: "Chief Innovation Officer", image: sportsAction },
];

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
              <span className="italic text-primary">Passion</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-up delay-200">
              ACCENDO has been synonymous with exceptional quality,
              timeless design, and the enduring art of premium shoemaking.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-4 bg-primary text-primary-foreground overflow-hidden">
        <Marquee speed="fast">
          {["INNOVATION", "QUALITY", "PASSION", "EXCELLENCE", "CRAFTSMANSHIP"].map((word, i) => (
            <span key={i} className="flex items-center gap-6 mx-6 font-sans text-lg font-bold tracking-widest">
              {word}
              <span className="text-primary-foreground/50">★</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <span className="font-serif text-4xl md:text-5xl text-primary font-bold">{stat.number}</span>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 opacity-0 animate-fade-up">
              <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                Our Beginning
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                A Family
                <br />
                <span className="italic">Tradition</span>
              </h2>
              <div className="space-y-6 font-sans text-lg text-muted-foreground leading-relaxed">
                <p>
                  It began with a vision: to create footwear that ignites
                  confidence with every step. What started as a humble craft
                  has blossomed into a globally recognized symbol of
                  excellence.
                </p>
                <p>
                  Today, our team of master craftsmen continues this legacy,
                  combining ancestral techniques with contemporary
                  innovation. Each pair of ACCENDO shoes carries within it
                  accumulated wisdom, passion, and unwavering dedication to
                  quality.
                </p>
                <p>
                  We believe that truly exceptional footwear is more than an
                  accessory—it's a companion on life's journey, gaining character
                  and beauty with every step.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative opacity-0 animate-fade-up delay-200">
              <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={craftImage}
                  alt="Master craftsman at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-1/2 h-1/2 border-2 border-primary hidden lg:block rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 md:p-12 bg-background rounded-lg shadow-lg opacity-0 animate-fade-up">
              <Award className="w-12 h-12 text-primary mb-6" />
              <h3 className="font-serif text-2xl mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower individuals through exceptional footwear that combines 
                cutting-edge performance technology with timeless design. We strive 
                to create shoes that inspire confidence and enable our customers to 
                achieve their goals.
              </p>
            </div>
            <div className="p-8 md:p-12 bg-background rounded-lg shadow-lg opacity-0 animate-fade-up delay-100">
              <Globe className="w-12 h-12 text-primary mb-6" />
              <h3 className="font-serif text-2xl mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the world's most trusted footwear brand, recognized for 
                our commitment to quality, innovation, and sustainability. We aim 
                to set new standards in the industry while making premium footwear 
                accessible to all.
              </p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Award,
                title: "Uncompromising Quality",
                description:
                  "We never cut corners. Every material is hand-selected, every stitch precisely placed. Our shoes are built to last a lifetime and beyond.",
              },
              {
                icon: Leaf,
                title: "Sustainable Practices",
                description:
                  "We partner with certified suppliers that prioritize environmental responsibility, using eco-conscious materials and production methods.",
              },
              {
                icon: Users,
                title: "Human Connection",
                description:
                  "Behind every pair is a team of dedicated artisans. We value their expertise, ensure fair working conditions, and celebrate their craft.",
              },
              {
                icon: Globe,
                title: "Global Community",
                description:
                  "We've built a worldwide community of athletes, creators, and innovators who share our passion for excellence and authenticity.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="p-8 border border-background/20 rounded-lg opacity-0 animate-fade-up hover:border-primary/50 transition-colors"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <value.icon className="w-10 h-10 text-primary mb-4" />
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
      <section className="py-24 md:py-32 bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
              The Process
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium">
              From Concept to Creation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Research",
                description: "Deep dive into athlete needs, biomechanics, and cutting-edge materials.",
              },
              {
                step: "02",
                title: "Design",
                description: "Our designers create innovative solutions that blend form and function.",
              },
              {
                step: "03",
                title: "Prototype",
                description: "Rigorous testing with athletes to perfect every detail.",
              },
              {
                step: "04",
                title: "Production",
                description: "Crafted with precision using premium materials and techniques.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center p-6 rounded-lg bg-secondary opacity-0 animate-fade-up hover-lift"
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

      {/* Team Preview */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
              Our Team
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium">
              The People Behind ACCENDO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={member.name}
                className="text-center opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-6 shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Marquee */}
      <section className="py-8 bg-background overflow-hidden">
        <Marquee speed="slow">
          {[craftImage, heroImage, runningHero, sportsAction, craftImage, heroImage].map((img, i) => (
            <div key={i} className="mx-2 aspect-video w-80 overflow-hidden rounded-lg">
              <img 
                src={img} 
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium shoes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/85" />
        </div>
        <div className="relative container-wide text-center text-background">
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 opacity-0 animate-fade-up">
            Experience the Difference
          </h2>
          <p className="font-sans text-lg text-background/70 mb-10 max-w-xl mx-auto opacity-0 animate-fade-up delay-100">
            Discover our collections and find the perfect pair to accompany you
            on your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up delay-200">
            <Button asChild variant="secondary" size="lg">
              <Link to="/categories">
                View Collections
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
