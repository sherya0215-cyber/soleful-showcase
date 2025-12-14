import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  X,
  HelpCircle,
  FolderOpen,
  Package,
  Users
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

interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  image_url: string | null;
  features: string[] | null;
}

interface Product {
  id: string;
  category_id: string | null;
  name: string;
  price: string;
  image_url: string | null;
  description: string | null;
  sort_order: number;
}

interface Model {
  id: string;
  name: string;
  designation: string;
  quote: string;
  image_url: string;
  sort_order: number;
}

type Tab = "dashboard" | "posts" | "messages" | "faqs" | "categories" | "products" | "models";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [showPostModal, setShowPostModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  
  // Editing states
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  
  // Forms
  const [postForm, setPostForm] = useState({
    title: "", slug: "", excerpt: "", content: "", author: "STRIDE Team", published: false, image_url: "",
  });
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", sort_order: 0 });
  const [categoryForm, setCategoryForm] = useState({
    name: "", slug: "", description: "", long_description: "", image_url: "", features: ""
  });
  const [productForm, setProductForm] = useState({
    name: "", price: "", image_url: "", description: "", category_id: "", sort_order: 0
  });
  const [modelForm, setModelForm] = useState({
    name: "", designation: "", quote: "", image_url: "", sort_order: 0
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
      .maybeSingle();
    if (!adminData) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const [postsRes, messagesRes, faqsRes, categoriesRes, productsRes, modelsRes] = await Promise.all([
      supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("faqs").select("*").order("sort_order", { ascending: true }),
      supabase.from("categories").select("*").order("name", { ascending: true }),
      supabase.from("products").select("*").order("sort_order", { ascending: true }),
      supabase.from("models").select("*").order("sort_order", { ascending: true }),
    ]);
    if (postsRes.data) setPosts(postsRes.data);
    if (messagesRes.data) setMessages(messagesRes.data);
    if (faqsRes.data) setFaqs(faqsRes.data);
    if (categoriesRes.data) setCategories(categoriesRes.data);
    if (productsRes.data) setProducts(productsRes.data);
    if (modelsRes.data) setModels(modelsRes.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // ========== POSTS ==========
  const openNewPost = () => {
    setEditingPost(null);
    setPostForm({ title: "", slug: "", excerpt: "", content: "", author: "STRIDE Team", published: false, image_url: "" });
    setShowPostModal(true);
  };

  const openEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title, slug: post.slug, excerpt: post.excerpt || "", content: post.content,
      author: post.author, published: post.published, image_url: post.image_url || "",
    });
    setShowPostModal(true);
  };

  const handleSavePost = async () => {
    if (!postForm.title || !postForm.content) {
      toast({ title: "Error", description: "Title and content are required.", variant: "destructive" });
      return;
    }
    const slug = postForm.slug || generateSlug(postForm.title);
    try {
      if (editingPost) {
        const { error } = await supabase.from("blog_posts").update({
          title: postForm.title, slug, excerpt: postForm.excerpt || null, content: postForm.content,
          author: postForm.author, published: postForm.published, image_url: postForm.image_url || null,
        }).eq("id", editingPost.id);
        if (error) throw error;
        toast({ title: "Post Updated" });
      } else {
        const { error } = await supabase.from("blog_posts").insert({
          title: postForm.title, slug, excerpt: postForm.excerpt || null, content: postForm.content,
          author: postForm.author, published: postForm.published, image_url: postForm.image_url || null,
        });
        if (error) throw error;
        toast({ title: "Post Created" });
      }
      setShowPostModal(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Post Deleted" }); fetchData(); }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Message Deleted" }); fetchData(); }
  };

  // ========== FAQS ==========
  const openNewFaq = () => {
    setEditingFaq(null);
    setFaqForm({ question: "", answer: "", sort_order: faqs.length });
    setShowFaqModal(true);
  };

  const openEditFaq = (faq: FAQ) => {
    setEditingFaq(faq);
    setFaqForm({ question: faq.question, answer: faq.answer, sort_order: faq.sort_order });
    setShowFaqModal(true);
  };

  const handleSaveFaq = async () => {
    if (!faqForm.question || !faqForm.answer) {
      toast({ title: "Error", description: "Question and answer are required.", variant: "destructive" });
      return;
    }
    try {
      if (editingFaq) {
        const { error } = await supabase.from("faqs").update({
          question: faqForm.question, answer: faqForm.answer, sort_order: faqForm.sort_order
        }).eq("id", editingFaq.id);
        if (error) throw error;
        toast({ title: "FAQ Updated" });
      } else {
        const { error } = await supabase.from("faqs").insert({
          question: faqForm.question, answer: faqForm.answer, sort_order: faqForm.sort_order
        });
        if (error) throw error;
        toast({ title: "FAQ Created" });
      }
      setShowFaqModal(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "FAQ Deleted" }); fetchData(); }
  };

  // ========== CATEGORIES ==========
  const openNewCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: "", slug: "", description: "", long_description: "", image_url: "", features: "" });
    setShowCategoryModal(true);
  };

  const openEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name, slug: cat.slug, description: cat.description || "",
      long_description: cat.long_description || "", image_url: cat.image_url || "",
      features: cat.features?.join(", ") || ""
    });
    setShowCategoryModal(true);
  };

  const handleSaveCategory = async () => {
    if (!categoryForm.name) {
      toast({ title: "Error", description: "Name is required.", variant: "destructive" });
      return;
    }
    const slug = categoryForm.slug || generateSlug(categoryForm.name);
    const features = categoryForm.features ? categoryForm.features.split(",").map(f => f.trim()).filter(f => f) : null;
    try {
      if (editingCategory) {
        const { error } = await supabase.from("categories").update({
          name: categoryForm.name, slug, description: categoryForm.description || null,
          long_description: categoryForm.long_description || null, image_url: categoryForm.image_url || null, features
        }).eq("id", editingCategory.id);
        if (error) throw error;
        toast({ title: "Category Updated" });
      } else {
        const { error } = await supabase.from("categories").insert({
          name: categoryForm.name, slug, description: categoryForm.description || null,
          long_description: categoryForm.long_description || null, image_url: categoryForm.image_url || null, features
        });
        if (error) throw error;
        toast({ title: "Category Created" });
      }
      setShowCategoryModal(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category? Products in this category will be unlinked.")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Category Deleted" }); fetchData(); }
  };

  // ========== PRODUCTS ==========
  const openNewProduct = () => {
    setEditingProduct(null);
    setProductForm({ name: "", price: "", image_url: "", description: "", category_id: "", sort_order: products.length });
    setShowProductModal(true);
  };

  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name, price: prod.price, image_url: prod.image_url || "",
      description: prod.description || "", category_id: prod.category_id || "", sort_order: prod.sort_order
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async () => {
    if (!productForm.name || !productForm.price) {
      toast({ title: "Error", description: "Name and price are required.", variant: "destructive" });
      return;
    }
    try {
      const data = {
        name: productForm.name, price: productForm.price, image_url: productForm.image_url || null,
        description: productForm.description || null, category_id: productForm.category_id || null, sort_order: productForm.sort_order
      };
      if (editingProduct) {
        const { error } = await supabase.from("products").update(data).eq("id", editingProduct.id);
        if (error) throw error;
        toast({ title: "Product Updated" });
      } else {
        const { error } = await supabase.from("products").insert(data);
        if (error) throw error;
        toast({ title: "Product Created" });
      }
      setShowProductModal(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Product Deleted" }); fetchData(); }
  };

  // ========== MODELS ==========
  const openNewModel = () => {
    setEditingModel(null);
    setModelForm({ name: "", designation: "", quote: "", image_url: "", sort_order: models.length });
    setShowModelModal(true);
  };

  const openEditModel = (model: Model) => {
    setEditingModel(model);
    setModelForm({
      name: model.name, designation: model.designation, quote: model.quote,
      image_url: model.image_url, sort_order: model.sort_order
    });
    setShowModelModal(true);
  };

  const handleSaveModel = async () => {
    if (!modelForm.name || !modelForm.quote || !modelForm.image_url) {
      toast({ title: "Error", description: "Name, quote, and image are required.", variant: "destructive" });
      return;
    }
    try {
      const data = {
        name: modelForm.name, designation: modelForm.designation, quote: modelForm.quote,
        image_url: modelForm.image_url, sort_order: modelForm.sort_order
      };
      if (editingModel) {
        const { error } = await supabase.from("models").update(data).eq("id", editingModel.id);
        if (error) throw error;
        toast({ title: "Model Updated" });
      } else {
        const { error } = await supabase.from("models").insert(data);
        if (error) throw error;
        toast({ title: "Model Created" });
      }
      setShowModelModal(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteModel = async (id: string) => {
    if (!confirm("Delete this model?")) return;
    const { error } = await supabase.from("models").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Model Deleted" }); fetchData(); }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  // ========== MODAL COMPONENT ==========
  const Modal = ({ show, onClose, title, children, onSave, saveLabel }: {
    show: boolean; onClose: () => void; title: string; children: React.ReactNode; onSave: () => void; saveLabel: string;
  }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
        <div className="bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
          <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
            <h2 className="font-serif text-xl">{title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="w-4 h-4" /></Button>
          </div>
          <div className="p-6 space-y-6">{children}</div>
          <div className="sticky bottom-0 bg-background border-t border-border p-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={onSave}>{saveLabel}</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="font-serif text-xl font-medium text-primary">ACCENDO</Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-sans text-sm text-muted-foreground">Admin</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: "dashboard" as Tab, icon: LayoutDashboard, label: "Dashboard" },
            { id: "posts" as Tab, icon: FileText, label: `Posts (${posts.length})` },
            { id: "messages" as Tab, icon: MessageSquare, label: `Messages${unreadCount > 0 ? ` (${unreadCount})` : ""}` },
            { id: "faqs" as Tab, icon: HelpCircle, label: `FAQs (${faqs.length})` },
            { id: "categories" as Tab, icon: FolderOpen, label: `Categories (${categories.length})` },
            { id: "products" as Tab, icon: Package, label: `Products (${products.length})` },
            { id: "models" as Tab, icon: Users, label: `Models (${models.length})` },
          ].map(tab => (
            <Button key={tab.id} variant={activeTab === tab.id ? "default" : "ghost"} onClick={() => setActiveTab(tab.id)}>
              <tab.icon className="w-4 h-4 mr-2" />{tab.label}
            </Button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Posts", value: posts.length },
              { label: "Published", value: posts.filter(p => p.published).length },
              { label: "Messages", value: messages.length },
              { label: "FAQs", value: faqs.length },
              { label: "Categories", value: categories.length },
              { label: "Products", value: products.length },
              { label: "Models", value: models.length },
              { label: "Unread", value: unreadCount },
            ].map(stat => (
              <div key={stat.label} className="bg-card p-6 shadow-sm">
                <h3 className="font-sans text-sm text-muted-foreground mb-2">{stat.label}</h3>
                <p className="font-serif text-4xl">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === "posts" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Blog Posts</h2>
              <Button onClick={openNewPost}><Plus className="w-4 h-4 mr-2" />New Post</Button>
            </div>
            {loading ? <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-20 bg-muted rounded" />)}</div> : posts.length > 0 ? (
              <div className="bg-card shadow-sm divide-y divide-border">
                {posts.map(post => (
                  <div key={post.id} className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans font-medium truncate">{post.title}</h3>
                      <p className="font-sans text-sm text-muted-foreground">
                        {format(new Date(post.created_at), "MMM d, yyyy")} • {post.author}
                        {!post.published && <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded">Draft</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditPost(post)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : <div className="text-center py-12 bg-card"><p className="text-muted-foreground mb-4">No posts yet</p><Button onClick={openNewPost}>Create Your First Post</Button></div>}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div>
            <h2 className="font-serif text-2xl mb-6">Contact Messages</h2>
            {loading ? <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-muted rounded" />)}</div> : messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className="bg-card p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div><h3 className="font-sans font-medium">{msg.name}</h3><p className="font-sans text-sm text-muted-foreground">{msg.email}</p></div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs text-muted-foreground">{format(new Date(msg.created_at), "MMM d, yyyy")}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(msg.id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    {msg.subject && <p className="font-sans text-sm font-medium mb-2">{msg.subject}</p>}
                    <p className="font-sans text-sm text-muted-foreground whitespace-pre-line">{msg.message}</p>
                  </div>
                ))}
              </div>
            ) : <div className="text-center py-12 bg-card"><p className="text-muted-foreground">No messages yet</p></div>}
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === "faqs" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">FAQs</h2>
              <Button onClick={openNewFaq}><Plus className="w-4 h-4 mr-2" />New FAQ</Button>
            </div>
            {faqs.length > 0 ? (
              <div className="bg-card shadow-sm divide-y divide-border">
                {faqs.map(faq => (
                  <div key={faq.id} className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans font-medium truncate">{faq.question}</h3>
                      <p className="font-sans text-sm text-muted-foreground truncate">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditFaq(faq)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteFaq(faq.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : <div className="text-center py-12 bg-card"><p className="text-muted-foreground mb-4">No FAQs yet</p><Button onClick={openNewFaq}>Create Your First FAQ</Button></div>}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Categories</h2>
              <Button onClick={openNewCategory}><Plus className="w-4 h-4 mr-2" />New Category</Button>
            </div>
            {categories.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-card shadow-sm overflow-hidden">
                    {cat.image_url && <img src={cat.image_url} alt={cat.name} className="w-full h-32 object-cover" />}
                    <div className="p-4">
                      <h3 className="font-sans font-medium">{cat.name}</h3>
                      <p className="font-sans text-sm text-muted-foreground truncate">{cat.description}</p>
                      <div className="flex items-center gap-2 mt-4">
                        <Button variant="ghost" size="sm" onClick={() => openEditCategory(cat)}><Pencil className="w-4 h-4 mr-1" />Edit</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(cat.id)}><Trash2 className="w-4 h-4 mr-1" />Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : <div className="text-center py-12 bg-card"><p className="text-muted-foreground mb-4">No categories yet</p><Button onClick={openNewCategory}>Create Your First Category</Button></div>}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Products</h2>
              <Button onClick={openNewProduct}><Plus className="w-4 h-4 mr-2" />New Product</Button>
            </div>
            {products.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map(prod => {
                  const cat = categories.find(c => c.id === prod.category_id);
                  return (
                    <div key={prod.id} className="bg-card shadow-sm overflow-hidden">
                      {prod.image_url && <img src={prod.image_url} alt={prod.name} className="w-full h-32 object-cover" />}
                      <div className="p-4">
                        <h3 className="font-sans font-medium">{prod.name}</h3>
                        <p className="font-sans text-sm text-primary font-bold">{prod.price}</p>
                        {cat && <p className="font-sans text-xs text-muted-foreground">{cat.name}</p>}
                        <div className="flex items-center gap-2 mt-4">
                          <Button variant="ghost" size="sm" onClick={() => openEditProduct(prod)}><Pencil className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(prod.id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : <div className="text-center py-12 bg-card"><p className="text-muted-foreground mb-4">No products yet</p><Button onClick={openNewProduct}>Create Your First Product</Button></div>}
          </div>
        )}

        {/* Models Tab */}
        {activeTab === "models" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">Brand Models/Ambassadors</h2>
              <Button onClick={openNewModel}><Plus className="w-4 h-4 mr-2" />New Model</Button>
            </div>
            {models.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {models.map(model => (
                  <div key={model.id} className="bg-card shadow-sm overflow-hidden">
                    <img src={model.image_url} alt={model.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-sans font-medium">{model.name}</h3>
                      <p className="font-sans text-sm text-muted-foreground">{model.designation}</p>
                      <p className="font-sans text-xs text-muted-foreground mt-2 line-clamp-2">"{model.quote}"</p>
                      <div className="flex items-center gap-2 mt-4">
                        <Button variant="ghost" size="sm" onClick={() => openEditModel(model)}><Pencil className="w-4 h-4 mr-1" />Edit</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteModel(model.id)}><Trash2 className="w-4 h-4 mr-1" />Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : <div className="text-center py-12 bg-card"><p className="text-muted-foreground mb-4">No models yet</p><Button onClick={openNewModel}>Add Your First Model</Button></div>}
          </div>
        )}
      </div>

      {/* Post Modal */}
      <Modal show={showPostModal} onClose={() => setShowPostModal(false)} title={editingPost ? "Edit Post" : "New Post"} onSave={handleSavePost} saveLabel={editingPost ? "Save Changes" : "Create Post"}>
        <div className="space-y-2"><Label>Title *</Label><Input value={postForm.title} onChange={e => setPostForm({...postForm, title: e.target.value})} placeholder="Post title" /></div>
        <div className="space-y-2"><Label>Slug</Label><Input value={postForm.slug} onChange={e => setPostForm({...postForm, slug: e.target.value})} placeholder="auto-generated" /></div>
        <div className="space-y-2"><Label>Author</Label><Input value={postForm.author} onChange={e => setPostForm({...postForm, author: e.target.value})} /></div>
        <div className="space-y-2"><Label>Image URL</Label><Input value={postForm.image_url} onChange={e => setPostForm({...postForm, image_url: e.target.value})} placeholder="https://..." /></div>
        <div className="space-y-2"><Label>Excerpt</Label><Textarea value={postForm.excerpt} onChange={e => setPostForm({...postForm, excerpt: e.target.value})} rows={2} /></div>
        <div className="space-y-2"><Label>Content *</Label><Textarea value={postForm.content} onChange={e => setPostForm({...postForm, content: e.target.value})} rows={10} /></div>
        <div className="flex items-center gap-2"><Switch checked={postForm.published} onCheckedChange={checked => setPostForm({...postForm, published: checked})} /><Label>Published</Label></div>
      </Modal>

      {/* FAQ Modal */}
      <Modal show={showFaqModal} onClose={() => setShowFaqModal(false)} title={editingFaq ? "Edit FAQ" : "New FAQ"} onSave={handleSaveFaq} saveLabel={editingFaq ? "Save Changes" : "Create FAQ"}>
        <div className="space-y-2"><Label>Question *</Label><Input value={faqForm.question} onChange={e => setFaqForm({...faqForm, question: e.target.value})} placeholder="What is...?" /></div>
        <div className="space-y-2"><Label>Answer *</Label><Textarea value={faqForm.answer} onChange={e => setFaqForm({...faqForm, answer: e.target.value})} rows={5} /></div>
        <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={faqForm.sort_order} onChange={e => setFaqForm({...faqForm, sort_order: parseInt(e.target.value) || 0})} /></div>
      </Modal>

      {/* Category Modal */}
      <Modal show={showCategoryModal} onClose={() => setShowCategoryModal(false)} title={editingCategory ? "Edit Category" : "New Category"} onSave={handleSaveCategory} saveLabel={editingCategory ? "Save Changes" : "Create Category"}>
        <div className="space-y-2"><Label>Name *</Label><Input value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} placeholder="Running Shoes" /></div>
        <div className="space-y-2"><Label>Slug</Label><Input value={categoryForm.slug} onChange={e => setCategoryForm({...categoryForm, slug: e.target.value})} placeholder="auto-generated" /></div>
        <div className="space-y-2"><Label>Short Description</Label><Textarea value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} rows={2} /></div>
        <div className="space-y-2"><Label>Long Description</Label><Textarea value={categoryForm.long_description} onChange={e => setCategoryForm({...categoryForm, long_description: e.target.value})} rows={4} /></div>
        <div className="space-y-2"><Label>Image URL</Label><Input value={categoryForm.image_url} onChange={e => setCategoryForm({...categoryForm, image_url: e.target.value})} placeholder="https://..." /></div>
        <div className="space-y-2"><Label>Features (comma-separated)</Label><Input value={categoryForm.features} onChange={e => setCategoryForm({...categoryForm, features: e.target.value})} placeholder="Lightweight, Breathable, Durable" /></div>
      </Modal>

      {/* Product Modal */}
      <Modal show={showProductModal} onClose={() => setShowProductModal(false)} title={editingProduct ? "Edit Product" : "New Product"} onSave={handleSaveProduct} saveLabel={editingProduct ? "Save Changes" : "Create Product"}>
        <div className="space-y-2"><Label>Name *</Label><Input value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} placeholder="Air Jordan 1" /></div>
        <div className="space-y-2"><Label>Price *</Label><Input value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} placeholder="$199" /></div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={productForm.category_id} onValueChange={value => setProductForm({...productForm, category_id: value})}>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2"><Label>Image URL</Label><Input value={productForm.image_url} onChange={e => setProductForm({...productForm, image_url: e.target.value})} placeholder="https://..." /></div>
        <div className="space-y-2"><Label>Description</Label><Textarea value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} rows={3} /></div>
        <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={productForm.sort_order} onChange={e => setProductForm({...productForm, sort_order: parseInt(e.target.value) || 0})} /></div>
      </Modal>

      {/* Model Modal */}
      <Modal show={showModelModal} onClose={() => setShowModelModal(false)} title={editingModel ? "Edit Model" : "New Model"} onSave={handleSaveModel} saveLabel={editingModel ? "Save Changes" : "Create Model"}>
        <div className="space-y-2"><Label>Name *</Label><Input value={modelForm.name} onChange={e => setModelForm({...modelForm, name: e.target.value})} placeholder="John Doe" /></div>
        <div className="space-y-2"><Label>Designation</Label><Input value={modelForm.designation} onChange={e => setModelForm({...modelForm, designation: e.target.value})} placeholder="Professional Athlete" /></div>
        <div className="space-y-2"><Label>Quote *</Label><Textarea value={modelForm.quote} onChange={e => setModelForm({...modelForm, quote: e.target.value})} rows={3} placeholder="What they say about the brand..." /></div>
        <div className="space-y-2"><Label>Image URL *</Label><Input value={modelForm.image_url} onChange={e => setModelForm({...modelForm, image_url: e.target.value})} placeholder="https://..." /></div>
        <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={modelForm.sort_order} onChange={e => setModelForm({...modelForm, sort_order: parseInt(e.target.value) || 0})} /></div>
      </Modal>
    </div>
  );
};

export default Admin;
