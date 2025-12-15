import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { ArrowLeft, ArrowRight, Star, Check, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Import category images
import runningHero from "@/assets/running-shoes-hero.jpg";
import lifestyleSneakers from "@/assets/lifestyle-sneakers.jpg";
import slidersProduct from "@/assets/sliders-product.jpg";
import sportsAction from "@/assets/sports-action.jpg";

// Fallback images based on category slug
const categoryImages: Record<string, string> = {
  "running-shoes": runningHero,
  "sports-wear": sportsAction,
  "sneakers": lifestyleSneakers,
  "sliders": slidersProduct,
};

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products', category?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', category!.id)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!category?.id
  });

  const isLoading = categoryLoading || productsLoading;
  const categoryImage = category?.image_url || categoryImages[slug || ''] || runningHero;

  if (categoryLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

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
            src={categoryImage}
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
                {category.long_description || category.description}
              </p>

              {category.features && category.features.length > 0 && (
                <>
                  <h3 className="font-serif text-2xl text-foreground mb-6">Key Features</h3>
                  <ul className="space-y-4">
                    {category.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-3 opacity-0 animate-fade-up" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
                        <Check className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            
            <div className="relative opacity-0 animate-fade-up delay-200">
              <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
                <img
                  src={categoryImage}
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

          {productsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="group bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover-lift opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image_url || categoryImage}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                    )}
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
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available in this category yet.</p>
            </div>
          )}
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
