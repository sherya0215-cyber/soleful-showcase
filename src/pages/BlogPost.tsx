import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: string;
  created_at: string;
  image_url: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <section className="py-24 md:py-32">
          <div className="container-wide max-w-3xl">
            <div className="animate-pulse">
              <div className="h-8 bg-muted w-3/4 mb-8" />
              <div className="h-4 bg-muted w-1/3 mb-12" />
              <div className="aspect-video bg-muted mb-12" />
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
        <div className="container-wide max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Journal
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 opacity-0 animate-fade-up">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 opacity-0 animate-fade-up delay-100">
            <span className="font-sans text-sm text-muted-foreground">
              By {post.author}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="font-sans text-sm text-muted-foreground">
              {format(new Date(post.created_at), "MMMM d, yyyy")}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container-wide max-w-3xl">
          {post.image_url && (
            <div className="aspect-video overflow-hidden mb-12 opacity-0 animate-fade-up">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <article className="prose prose-lg max-w-none opacity-0 animate-fade-up delay-200">
            <div className="font-sans text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </article>
        </div>
      </section>

      {/* Back to Journal */}
      <section className="pb-24 md:pb-32">
        <div className="container-wide max-w-3xl">
          <hr className="border-border mb-12" />
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link to="/blog">
                <ArrowLeft className="mr-2" />
                Back to Journal
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
