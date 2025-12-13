import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Marquee } from "@/components/ui/marquee";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import runningHero from "@/assets/running-shoes-hero.jpg";
import lifestyleSneakers from "@/assets/lifestyle-sneakers.jpg";
import sportsAction from "@/assets/sports-action.jpg";
import slidersProduct from "@/assets/sliders-product.jpg";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author: string;
  created_at: string;
  image_url: string | null;
}

// Featured posts when database is empty
const featuredPosts = [
  {
    id: "1",
    title: "The Ultimate Guide to Choosing Running Shoes",
    slug: "ultimate-guide-running-shoes",
    excerpt: "Discover how to find the perfect running shoes for your feet, gait, and training style. From cushioning to stability, we cover everything you need to know.",
    author: "ACCENDO Team",
    created_at: new Date().toISOString(),
    image_url: runningHero,
    category: "Guides",
    readTime: "8 min read"
  },
  {
    id: "2",
    title: "Street Style: How to Rock Sneakers in 2024",
    slug: "street-style-sneakers-2024",
    excerpt: "Explore the latest streetwear trends and learn how to style your ACCENDO sneakers for maximum impact. Fashion tips from industry experts.",
    author: "Style Editor",
    created_at: new Date().toISOString(),
    image_url: lifestyleSneakers,
    category: "Style",
    readTime: "5 min read"
  },
  {
    id: "3",
    title: "Behind the Design: Our New Sports Collection",
    slug: "behind-design-sports-collection",
    excerpt: "Take an exclusive look behind the scenes of our design process. Learn how we create high-performance athletic footwear that doesn't compromise on style.",
    author: "Design Team",
    created_at: new Date().toISOString(),
    image_url: sportsAction,
    category: "Behind the Scenes",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Summer Essentials: The Rise of Premium Sliders",
    slug: "summer-essentials-premium-sliders",
    excerpt: "Why premium sliders have become a must-have in every wardrobe. Comfort meets luxury in our latest slider collection.",
    author: "ACCENDO Team",
    created_at: new Date().toISOString(),
    image_url: slidersProduct,
    category: "Trends",
    readTime: "4 min read"
  },
];

const categories = ["All", "Guides", "Style", "Behind the Scenes", "Trends", "News"];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, author, created_at, image_url")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const displayPosts = posts.length > 0 ? posts : featuredPosts;

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block opacity-0 animate-fade-up">
              The Journal
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium mb-6 opacity-0 animate-fade-up delay-100">
              Stories &
              <span className="italic text-primary"> Insights</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-up delay-200">
              Dive into the world of footwear innovation, style guides, and the stories behind
              our collections.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-4 bg-primary text-primary-foreground overflow-hidden">
        <Marquee speed="fast">
          {["STYLE", "INNOVATION", "PERFORMANCE", "CRAFTSMANSHIP", "TRENDS"].map((word, i) => (
            <span key={i} className="flex items-center gap-6 mx-6 font-sans text-lg font-bold tracking-widest">
              {word}
              <span className="text-primary-foreground/50">★</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container-wide">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-sans text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {displayPosts.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg opacity-0 animate-fade-up">
                <img
                  src={displayPosts[0].image_url || runningHero}
                  alt={displayPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="opacity-0 animate-fade-up delay-100">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                  Featured
                </span>
                <h2 className="font-serif text-3xl md:text-4xl mb-4">
                  {displayPosts[0].title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {displayPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <User size={14} />
                    {displayPosts[0].author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {format(new Date(displayPosts[0].created_at), "MMM d, yyyy")}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    5 min read
                  </span>
                </div>
                <Link
                  to={`/blog/${displayPosts[0].slug}`}
                  className="inline-flex items-center gap-2 font-sans font-medium text-primary hover:gap-3 transition-all"
                >
                  Read Article
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-3xl">Latest Articles</h2>
            <span className="text-muted-foreground">{displayPosts.length} articles</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-background rounded-lg overflow-hidden">
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-6">
                    <div className="h-4 bg-muted w-1/3 mb-4" />
                    <div className="h-6 bg-muted w-3/4 mb-3" />
                    <div className="h-4 bg-muted w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.slice(1).map((post, index) => (
                <article
                  key={post.id}
                  className="group bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover-lift opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                          <span className="font-serif text-4xl text-primary/20">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="font-sans text-xs text-primary font-medium uppercase tracking-wide">
                          {(post as typeof featuredPosts[0]).category || "Article"}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {(post as typeof featuredPosts[0]).readTime || "5 min read"}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="font-sans text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(post.created_at), "MMM d, yyyy")}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                          Read
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container-wide text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
            Stay in the Loop
          </h2>
          <p className="text-background/80 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for the latest articles, style tips, and exclusive updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:border-primary"
            />
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
