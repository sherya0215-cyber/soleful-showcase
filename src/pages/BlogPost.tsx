import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Share2, Bookmark, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import runningHero from "@/assets/running-shoes-hero.jpg";
import lifestyleSneakers from "@/assets/lifestyle-sneakers.jpg";
import sportsAction from "@/assets/sports-action.jpg";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: string;
  created_at: string;
  image_url: string | null;
}

// Sample content for demo posts
const samplePosts: Record<string, BlogPostData> = {
  "ultimate-guide-running-shoes": {
    id: "1",
    title: "The Ultimate Guide to Choosing Running Shoes",
    slug: "ultimate-guide-running-shoes",
    excerpt: "Discover how to find the perfect running shoes for your feet, gait, and training style.",
    content: `Finding the perfect running shoe can be a game-changer for your performance and comfort. Whether you're a seasoned marathoner or just starting your fitness journey, the right pair of shoes can make all the difference.

## Understanding Your Foot Type

Before diving into the world of running shoes, it's essential to understand your foot type. There are three main categories:

**Neutral:** Your foot has a normal arch and pronates naturally when you run.

**Overpronation:** Your foot rolls inward excessively, which can lead to injuries if not properly supported.

**Underpronation (Supination):** Your foot doesn't roll inward enough, causing impact stress on the outer edge of your foot.

## Key Features to Consider

### Cushioning
The amount of cushioning you need depends on your running style, weight, and the surfaces you typically run on. More cushioning provides better shock absorption but may sacrifice responsiveness.

### Stack Height
This refers to the amount of material between your foot and the ground. Higher stack heights offer more cushioning, while lower ones provide better ground feel.

### Heel-to-Toe Drop
The drop measures the difference in height between the heel and forefoot. Traditional running shoes have an 8-12mm drop, while minimalist shoes may have 0-4mm.

### Breathability
Look for shoes with mesh uppers that allow air circulation to keep your feet cool and dry during long runs.

## ACCENDO Running Shoe Technology

At ACCENDO, we've developed proprietary technologies to enhance your running experience:

- **CloudFoam™ Midsole:** Provides responsive cushioning that adapts to your stride
- **DuraGrip™ Outsole:** Engineered for maximum traction on various surfaces
- **BreatheTech™ Upper:** Advanced mesh technology for superior ventilation

## Choosing the Right Shoe for Your Goals

**Daily Training:** Look for durable shoes with moderate cushioning that can handle high mileage.

**Speed Work:** Opt for lighter, more responsive shoes that help you pick up the pace.

**Long Runs:** Choose shoes with extra cushioning to protect your feet during extended sessions.

**Trail Running:** Select shoes with aggressive treads and protective features for off-road adventures.

## Final Thoughts

The perfect running shoe is one that fits your unique needs and feels comfortable from the first step. Visit our store to get professionally fitted and find your ideal pair.`,
    author: "ACCENDO Team",
    created_at: new Date().toISOString(),
    image_url: runningHero,
  },
  "street-style-sneakers-2024": {
    id: "2",
    title: "Street Style: How to Rock Sneakers in 2024",
    slug: "street-style-sneakers-2024",
    excerpt: "Explore the latest streetwear trends and learn how to style your sneakers for maximum impact.",
    content: `The sneaker culture continues to evolve, and 2024 brings exciting new trends that blend comfort with high fashion. Here's your complete guide to mastering street style with sneakers.

## The Evolution of Sneaker Fashion

Sneakers have transcended their athletic origins to become a cornerstone of modern fashion. From runway shows to everyday street style, the versatile sneaker has proven its staying power.

## Top Trends for 2024

### 1. Bold Color Blocking
This year, we're seeing a return to vibrant color combinations. Don't be afraid to make a statement with contrasting colors that pop.

### 2. Chunky Soles
Platform and chunky sneakers continue to dominate, offering both height and visual impact. These substantial silhouettes work perfectly with both relaxed and tailored looks.

### 3. Sustainable Materials
Eco-conscious fashion is more important than ever. Look for sneakers made with recycled materials and sustainable manufacturing processes.

### 4. Retro Revival
Classic silhouettes from the '80s and '90s are making a strong comeback, updated with modern comfort technologies.

## Styling Tips

**With Tailored Pieces:** Pair clean, minimalist sneakers with dress pants or blazers for a sophisticated casual look.

**Monochromatic Outfits:** Match your sneakers to your outfit's color palette for a cohesive, put-together appearance.

**Statement Sneakers:** Let bold sneakers be the focal point of your outfit by keeping the rest of your look simple.

**Proportions:** Balance chunky sneakers with slim-fit pants, or pair sleeker profiles with wider-leg trousers.

## Care and Maintenance

Keep your sneakers looking fresh with proper care. Regular cleaning, protective sprays, and proper storage will extend the life of your favorite pairs.`,
    author: "Style Editor",
    created_at: new Date().toISOString(),
    image_url: lifestyleSneakers,
  },
  "behind-design-sports-collection": {
    id: "3",
    title: "Behind the Design: Our New Sports Collection",
    slug: "behind-design-sports-collection",
    excerpt: "Take an exclusive look behind the scenes of our design process.",
    content: `Every ACCENDO shoe tells a story of innovation, passion, and meticulous craftsmanship. Today, we're pulling back the curtain on our latest sports collection to show you how these performance masterpieces come to life.

## The Design Philosophy

Our design team begins each project with a single question: "How can we make athletes perform better?" This athlete-first approach drives every decision, from material selection to construction methods.

## Research and Development

Before a single sketch is drawn, our team spends months researching:

- Biomechanics of different sports movements
- Common pain points and injury patterns
- Material science innovations
- Environmental impact considerations

## The Design Process

### Concept Phase
Our designers create hundreds of sketches, exploring different silhouettes, colorways, and functional features. Only the strongest concepts move forward.

### Prototyping
3D printing and rapid prototyping allow us to test ideas quickly. We create multiple iterations, refining each element until it meets our exacting standards.

### Athlete Testing
Professional athletes and everyday fitness enthusiasts test our prototypes in real-world conditions. Their feedback is invaluable in perfecting the final product.

## Innovation Spotlight

This collection introduces several groundbreaking technologies:

**AdaptFit™ System:** A dynamic lacing mechanism that adjusts to your foot's natural movement.

**PowerReturn™ Midsole:** Energy-returning foam that gives back more with every stride.

**360° Support Frame:** An integrated support system that stabilizes without restricting movement.

## Sustainability Commitment

We're proud to announce that 40% of materials in this collection come from recycled sources, and our packaging is 100% recyclable.`,
    author: "Design Team",
    created_at: new Date().toISOString(),
    image_url: sportsAction,
  },
};

const relatedPosts = [
  { title: "5 Tips for Breaking In New Running Shoes", slug: "breaking-in-running-shoes", image: runningHero },
  { title: "The Science Behind Shoe Cushioning", slug: "science-shoe-cushioning", image: sportsAction },
  { title: "How to Clean and Maintain Your Sneakers", slug: "clean-maintain-sneakers", image: lifestyleSneakers },
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      // First try to fetch from database
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) {
        console.error("Error fetching post:", error);
      }

      // If found in database, use it; otherwise check sample posts
      if (data) {
        setPost(data);
      } else if (samplePosts[slug]) {
        setPost(samplePosts[slug]);
      }
      
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <section className="py-24 md:py-32">
          <div className="container-wide max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-muted w-3/4 mb-8" />
              <div className="h-4 bg-muted w-1/3 mb-12" />
              <div className="aspect-video bg-muted mb-12 rounded-lg" />
              <div className="space-y-4">
                <div className="h-4 bg-muted w-full" />
                <div className="h-4 bg-muted w-full" />
                <div className="h-4 bg-muted w-2/3" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <section className="py-24 md:py-32">
          <div className="container-wide text-center">
            <h1 className="font-serif text-4xl mb-6">Post Not Found</h1>
            <p className="font-sans text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild variant="outline">
              <Link to="/blog">
                <ArrowLeft className="mr-2" />
                Back to Journal
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Article Header */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 opacity-0 animate-fade-up"
          >
            <ArrowLeft size={16} />
            Back to Journal
          </Link>
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4 opacity-0 animate-fade-up delay-100">
            Article
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 opacity-0 animate-fade-up delay-100">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 opacity-0 animate-fade-up delay-200">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <User size={16} />
              {post.author}
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              {format(new Date(post.created_at), "MMMM d, yyyy")}
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} />
              8 min read
            </span>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-3 bg-primary text-primary-foreground overflow-hidden">
        <Marquee speed="fast">
          {["READ", "LEARN", "DISCOVER", "EXPLORE", "INSPIRE"].map((word, i) => (
            <span key={i} className="flex items-center gap-6 mx-6 font-sans text-sm font-bold tracking-widest">
              {word}
              <span className="text-primary-foreground/50">★</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container-wide max-w-4xl">
          {post.image_url && (
            <div className="aspect-video overflow-hidden mb-12 rounded-lg shadow-lg opacity-0 animate-fade-up">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Share Bar */}
          <div className="flex items-center justify-between mb-12 pb-8 border-b border-border opacity-0 animate-fade-up delay-100">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Share:</span>
              <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Share2 size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Bookmark size={18} />
              </button>
              <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Heart size={18} />
              </button>
            </div>
          </div>

          <article className="prose prose-lg max-w-none opacity-0 animate-fade-up delay-200">
            <div className="font-sans text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {post.content.split('\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={idx} className="font-serif text-2xl font-medium text-foreground mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={idx} className="font-serif text-xl font-medium text-foreground mt-8 mb-3">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <p key={idx} className="font-semibold text-foreground mt-4">{paragraph.replace(/\*\*/g, '')}</p>;
                }
                if (paragraph.startsWith('- ')) {
                  return <li key={idx} className="ml-6 list-disc">{paragraph.replace('- ', '')}</li>;
                }
                if (paragraph.trim() === '') {
                  return <br key={idx} />;
                }
                return <p key={idx} className="mb-4">{paragraph}</p>;
              })}
            </div>
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
            <span className="text-sm text-muted-foreground mr-2">Tags:</span>
            {["Running", "Shoes", "Guide", "Fitness", "Performance"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary text-sm rounded-full text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-secondary">
        <div className="container-wide">
          <h2 className="font-serif text-3xl mb-12 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related, index) => (
              <Link
                key={related.slug}
                to={`/blog/${related.slug}`}
                className="group bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover-lift opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Journal */}
      <section className="py-16 bg-background">
        <div className="container-wide text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">
              <ArrowLeft className="mr-2" />
              Back to Journal
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
