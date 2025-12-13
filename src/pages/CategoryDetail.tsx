import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Import category images
import categorySneakers from "@/assets/category-sneakers.jpg";
import categoryLoafers from "@/assets/category-loafers.jpg";
import categoryBoots from "@/assets/category-boots.jpg";
import categoryOxfords from "@/assets/category-oxfords.jpg";

interface CategoryData {
  name: string;
  slug: string;
  image: string;
  description: string;
  longDescription: string;
  features: string[];
}

const categoriesData: Record<string, CategoryData> = {
  "running-shoes": {
    name: "Running Shoes",
    slug: "running-shoes",
    image: categorySneakers,
    description: "Engineered for performance, designed for comfort.",
    longDescription: "Our running shoes combine cutting-edge technology with premium materials to deliver unmatched performance. Whether you're training for a marathon or enjoying a casual jog, ACCENDO running shoes provide the support, cushioning, and durability you need.",
    features: [
      "Advanced cushioning technology",
      "Breathable mesh upper",
      "Lightweight construction",
      "Superior traction outsole",
      "Ergonomic arch support"
    ]
  },
  "sports-wear": {
    name: "Sports Wear",
    slug: "sports-wear",
    image: categoryOxfords,
    description: "Athletic footwear for every sport and activity.",
    longDescription: "From the court to the field, ACCENDO sports wear is designed to enhance your athletic performance. Our collection features specialized footwear for various sports, each crafted with attention to the unique demands of different activities.",
    features: [
      "Sport-specific designs",
      "Enhanced ankle support",
      "Non-marking outsoles",
      "Quick-dry materials",
      "Reinforced toe caps"
    ]
  },
  "sneakers": {
    name: "Sneakers",
    slug: "sneakers",
    image: categorySneakers,
    description: "Contemporary style meets everyday comfort.",
    longDescription: "ACCENDO sneakers represent the perfect fusion of street style and premium comfort. Each pair is crafted with meticulous attention to detail, using only the finest materials to ensure lasting quality and timeless appeal.",
    features: [
      "Premium leather and suede options",
      "Cushioned insoles",
      "Versatile styling",
      "Durable construction",
      "Classic and modern designs"
    ]
  },
  "sliders": {
    name: "Sliders",
    slug: "sliders",
    image: categoryLoafers,
    description: "Effortless comfort for relaxed moments.",
    longDescription: "When comfort is paramount, ACCENDO sliders deliver. Perfect for poolside lounging, post-workout recovery, or casual everyday wear, our sliders combine plush cushioning with sleek, minimalist design.",
    features: [
      "Contoured footbed",
      "Quick-drying materials",
      "Soft, cushioned straps",
      "Lightweight design",
      "Easy slip-on style"
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
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
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
              className="inline-flex items-center text-background/80 hover:text-background mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Categories
            </Link>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-background mb-6">
              {category.name}
            </h1>
            <p className="text-xl md:text-2xl text-background/90 max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8">
              About Our {category.name}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {category.longDescription}
            </p>

            <h3 className="font-display text-2xl text-foreground mb-6">Key Features</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {category.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Interested in {category.name}?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us to learn more about our collection or to place a custom order.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default CategoryDetail;
