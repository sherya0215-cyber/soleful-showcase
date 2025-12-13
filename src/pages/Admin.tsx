import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  LogOut, 
  Plus, 
  Pencil, 
  Trash2, 
  FileText, 
  MessageSquare,
  LayoutDashboard,
  X
} from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: string;
  published: boolean;
  created_at: string;
  image_url: string | null;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

type Tab = "dashboard" | "posts" | "messages";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postForm, setPostForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "STRIDE Team",
    published: false,
    image_url: "",
  });

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const { data: adminData } = await supabase
      .from("admin_users")
      .select("id")
      .eq("user_id", session.user.id)
      .single();

    if (!adminData) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const fetchData = async () => {
    setLoading(true);

    const [postsResult, messagesResult] = await Promise.all([
      supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
    ]);

    if (postsResult.data) setPosts(postsResult.data);
    if (messagesResult.data) setMessages(messagesResult.data);

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const openNewPost = () => {
    setEditingPost(null);
    setPostForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "STRIDE Team",
      published: false,
      image_url: "",
    });
    setShowPostModal(true);
  };

  const openEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      author: post.author,
      published: post.published,
      image_url: post.image_url || "",
    });
    setShowPostModal(true);
  };

  const handleSavePost = async () => {
    if (!postForm.title || !postForm.content) {
      toast({
        title: "Error",
        description: "Title and content are required.",
        variant: "destructive",
      });
      return;
    }

    const slug = postForm.slug || generateSlug(postForm.title);

    try {
      if (editingPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title: postForm.title,
            slug,
            excerpt: postForm.excerpt || null,
            content: postForm.content,
            author: postForm.author,
            published: postForm.published,
            image_url: postForm.image_url || null,
          })
          .eq("id", editingPost.id);

        if (error) throw error;
        toast({ title: "Post Updated" });
      } else {
        const { error } = await supabase.from("blog_posts").insert({
          title: postForm.title,
          slug,
          excerpt: postForm.excerpt || null,
          content: postForm.content,
          author: postForm.author,
          published: postForm.published,
          image_url: postForm.image_url || null,
        });

        if (error) throw error;
        toast({ title: "Post Created" });
      }

      setShowPostModal(false);
      fetchData();
    } catch (error: any) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save post.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Post Deleted" });
      fetchData();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete post.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Message Deleted" });
      fetchData();
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="font-serif text-xl font-medium text-primary">
                ACCENDO
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-sans text-sm text-muted-foreground">Admin</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === "posts" ? "default" : "ghost"}
            onClick={() => setActiveTab("posts")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Posts ({posts.length})
          </Button>
          <Button
            variant={activeTab === "messages" ? "default" : "ghost"}
            onClick={() => setActiveTab("messages")}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages {unreadCount > 0 && `(${unreadCount})`}
          </Button>
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 shadow-sm">
              <h3 className="font-sans text-sm text-muted-foreground mb-2">Total Posts</h3>
              <p className="font-serif text-4xl">{posts.length}</p>
            </div>
            <div className="bg-card p-6 shadow-sm">
              <h3 className="font-sans text-sm text-muted-foreground mb-2">Published</h3>
              <p className="font-serif text-4xl">{posts.filter((p) => p.published).length}</p>
            </div>
            <div className="bg-card p-6 shadow-sm">
              <h3 className="font-sans text-sm text-muted-foreground mb-2">Messages</h3>
              <p className="font-serif text-4xl">{messages.length}</p>
            </div>
          </div>
        )}

        {/* Posts */}
        {activeTab === "posts" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Blog Posts</h2>
              <Button onClick={openNewPost}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-muted rounded" />
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="bg-card shadow-sm divide-y divide-border">
                {posts.map((post) => (
                  <div key={post.id} className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans font-medium truncate">{post.title}</h3>
                      <p className="font-sans text-sm text-muted-foreground">
                        {format(new Date(post.created_at), "MMM d, yyyy")} • {post.author}
                        {!post.published && (
                          <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded">Draft</span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditPost(post)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card">
                <p className="text-muted-foreground mb-4">No posts yet</p>
                <Button onClick={openNewPost}>Create Your First Post</Button>
              </div>
            )}
          </div>
        )}

        {/* Messages */}
        {activeTab === "messages" && (
          <div>
            <h2 className="font-serif text-2xl mb-6">Contact Messages</h2>

            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-muted rounded" />
                ))}
              </div>
            ) : messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-card p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-sans font-medium">{msg.name}</h3>
                        <p className="font-sans text-sm text-muted-foreground">{msg.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs text-muted-foreground">
                          {format(new Date(msg.created_at), "MMM d, yyyy")}
                        </span>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(msg.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {msg.subject && (
                      <p className="font-sans text-sm font-medium mb-2">{msg.subject}</p>
                    )}
                    <p className="font-sans text-sm text-muted-foreground whitespace-pre-line">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card">
                <p className="text-muted-foreground">No messages yet</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
            <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
              <h2 className="font-serif text-xl">
                {editingPost ? "Edit Post" : "New Post"}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setShowPostModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  placeholder="Post title"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={postForm.slug}
                  onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                  placeholder="post-slug (auto-generated if empty)"
                />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input
                  value={postForm.author}
                  onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={postForm.image_url}
                  onChange={(e) => setPostForm({ ...postForm, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Short description..."
                />
              </div>
              <div className="space-y-2">
                <Label>Content *</Label>
                <Textarea
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  rows={10}
                  placeholder="Write your post content..."
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={postForm.published}
                  onCheckedChange={(checked) => setPostForm({ ...postForm, published: checked })}
                />
                <Label>Published</Label>
              </div>
            </div>
            <div className="sticky bottom-0 bg-background border-t border-border p-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowPostModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePost}>
                {editingPost ? "Save Changes" : "Create Post"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;