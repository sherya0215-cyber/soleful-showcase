import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author: string;
  created_at: string;
  image_url: string | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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
              <span className="italic"> Insights</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-up delay-200">
              Dive into the world of craftsmanship, style, and the stories behind
              our collections.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-muted mb-6" />
                  <div className="h-4 bg-muted w-1/3 mb-4" />
                  <div className="h-6 bg-muted w-3/4 mb-3" />
                  <div className="h-4 bg-muted w-full" />
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="group opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-[4/3] overflow-hidden bg-muted mb-6">
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                          <span className="font-serif text-4xl text-primary/20">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="font-sans text-xs text-muted-foreground uppercase tracking-wide">
                        {format(new Date(post.created_at), "MMM d, yyyy")}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="font-sans text-xs text-muted-foreground uppercase tracking-wide">
                        {post.author}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="font-sans text-muted-foreground leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary mt-4 group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-sans text-lg text-muted-foreground">
                No posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
