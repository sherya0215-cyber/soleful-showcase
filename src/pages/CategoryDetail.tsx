import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { ArrowLeft, ArrowRight, Star, Check } from "lucide-react";

// Import category images
import runningHero from "@/assets/running-shoes-hero.jpg";
import lifestyleSneakers from "@/assets/lifestyle-sneakers.jpg";
import slidersProduct from "@/assets/sliders-product.jpg";
import sportsAction from "@/assets/sports-action.jpg";

interface CategoryData {
  name: string;
  slug: string;
  image: string;
  description: string;
  longDescription: string;
  features: string[];
  products: { name: string; price: string; image: string }[];
}

const categoriesData: Record<string, CategoryData> = {
  "running-shoes": {
    name: "Running Shoes",
    slug: "running-shoes",
    image: runningHero,
    description: "Engineered for performance, designed for comfort.",
    longDescription: "Our running shoes combine cutting-edge technology with premium materials to deliver unmatched performance. Whether you're training for a marathon or enjoying a casual jog, ACCENDO running shoes provide the support, cushioning, and durability you need.",
    features: [
      "Advanced cushioning technology",
      "Breathable mesh upper",
      "Lightweight construction",
      "Superior traction outsole",
      "Ergonomic arch support"
    ],
    products: [
      { name: "Speed Runner Pro", price: "$149", image: runningHero },
      { name: "Marathon Elite", price: "$189", image: runningHero },
      { name: "Trail Blazer X", price: "$169", image: runningHero },
    ]
  },
  "sports-wear": {
    name: "Sports Wear",
    slug: "sports-wear",
    image: sportsAction,
    description: "Athletic footwear for every sport and activity.",
    longDescription: "From the court to the field, ACCENDO sports wear is designed to enhance your athletic performance. Our collection features specialized footwear for various sports, each crafted with attention to the unique demands of different activities.",
    features: [
      "Sport-specific designs",
      "Enhanced ankle support",
      "Non-marking outsoles",
      "Quick-dry materials",
      "Reinforced toe caps"
    ],
    products: [
      { name: "Court Master", price: "$139", image: sportsAction },
      { name: "Field Force", price: "$159", image: sportsAction },
      { name: "Gym Pro", price: "$129", image: sportsAction },
    ]
  },
  "sneakers": {
    name: "Sneakers",
    slug: "sneakers",
    image: lifestyleSneakers,
    description: "Contemporary style meets everyday comfort.",
    longDescription: "ACCENDO sneakers represent the perfect fusion of street style and premium comfort. Each pair is crafted with meticulous attention to detail, using only the finest materials to ensure lasting quality and timeless appeal.",
    features: [
      "Premium leather and suede options",
      "Cushioned insoles",
      "Versatile styling",
      "Durable construction",
      "Classic and modern designs"
    ],
    products: [
      { name: "Urban Classic", price: "$119", image: lifestyleSneakers },
      { name: "Street Edge", price: "$139", image: lifestyleSneakers },
      { name: "Retro Wave", price: "$129", image: lifestyleSneakers },
    ]
  },
  "sliders": {
    name: "Sliders",
    slug: "sliders",
    image: slidersProduct,
    description: "Effortless comfort for relaxed moments.",
    longDescription: "When comfort is paramount, ACCENDO sliders deliver. Perfect for poolside lounging, post-workout recovery, or casual everyday wear, our sliders combine plush cushioning with sleek, minimalist design.",
    features: [
      "Contoured footbed",
      "Quick-drying materials",
      "Soft, cushioned straps",
      "Lightweight design",
      "Easy slip-on style"
    ],
    products: [
      { name: "Cloud Slide", price: "$59", image: slidersProduct },
      { name: "Recovery Pro", price: "$69", image: slidersProduct },
      { name: "Beach Essential", price: "$49", image: slidersProduct },
    ]
  }
};

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<CategoryData | null>(null);

  useEffect(() => {
    if (slug && categoriesData[slug]) {
      setCategory(categoriesData[slug]);
    }
  }, [slug]);

  if (!category) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
          <h1 className="font-display text-3xl text-foreground mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/categories">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <Link 
              to="/categories" 
              className="inline-flex items-center text-background/80 hover:text-background mb-6 transition-colors opacity-0 animate-fade-up"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Categories
            </Link>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-background mb-6 opacity-0 animate-fade-up delay-100">
              {category.name}
            </h1>
            <p className="text-xl md:text-2xl text-background/90 max-w-2xl opacity-0 animate-fade-up delay-200">
              {category.description}
            </p>
            <Button asChild variant="secondary" size="lg" className="mt-8 opacity-0 animate-fade-up delay-300">
              <a href="#products">
                View Collection
                <ArrowRight className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-4 bg-primary text-primary-foreground overflow-hidden">
        <Marquee speed="fast">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 mx-6 font-sans text-lg font-bold tracking-widest">
              {category.name.toUpperCase()}
              <span className="text-primary-foreground/50">★</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Description Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="opacity-0 animate-fade-up">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                About Our {category.name}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {category.longDescription}
              </p>

              <h3 className="font-serif text-2xl text-foreground mb-6">Key Features</h3>
              <ul className="space-y-4">
                {category.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 opacity-0 animate-fade-up" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative opacity-0 animate-fade-up delay-200">
              <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
                <p className="font-serif text-3xl font-bold">New</p>
                <p className="text-sm">Collection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
              Our Selection
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Featured Products
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {category.products.map((product, index) => (
              <div 
                key={product.name} 
                className="group bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover-lift opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">(24)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl text-primary font-bold">{product.price}</span>
                    <Button asChild size="sm">
                      <Link to="/contact">Inquire</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 opacity-0 animate-fade-up">
            Interested in {category.name}?
          </h2>
          <p className="text-background/80 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-up delay-100">
            Contact us to learn more about our collection or to place a custom order.
            Our team is ready to help you find the perfect fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up delay-200">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background text-background hover:bg-background/10">
              <Link to="/categories">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Categories
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoryDetail;
