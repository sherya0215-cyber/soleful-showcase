-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT NOT NULL DEFAULT 'STRIDE Team',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create FAQ table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create security definer function for admin check
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = _user_id
  )
$$;

-- Blog posts policies (public read for published, admin full access)
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts FOR SELECT
USING (published = true);

CREATE POLICY "Admins can view all blog posts"
ON public.blog_posts FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can create blog posts"
ON public.blog_posts FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update blog posts"
ON public.blog_posts FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Contact submissions policies (anyone can submit, admins can read)
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Categories policies (public read, admin write)
CREATE POLICY "Anyone can view categories"
ON public.categories FOR SELECT
USING (true);

CREATE POLICY "Admins can manage categories"
ON public.categories FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- FAQ policies (public read, admin write)
CREATE POLICY "Anyone can view FAQs"
ON public.faqs FOR SELECT
USING (true);

CREATE POLICY "Admins can manage FAQs"
ON public.faqs FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Admin users policies
CREATE POLICY "Admins can view admin users"
ON public.admin_users FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for blog_posts
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.categories (name, slug, description) VALUES
('Sneakers', 'sneakers', 'Contemporary sneakers crafted with premium materials'),
('Loafers', 'loafers', 'Timeless elegance meets modern comfort'),
('Boots', 'boots', 'Refined boots for every occasion'),
('Oxfords', 'oxfords', 'Classic sophistication redefined');

-- Insert sample FAQs
INSERT INTO public.faqs (question, answer, sort_order) VALUES
('What materials do you use?', 'We source only the finest Italian leather and sustainable materials. Each pair is crafted with meticulous attention to detail, ensuring both luxury and longevity.', 1),
('How do I care for my shoes?', 'We recommend using a soft cloth for regular cleaning and applying leather conditioner monthly. Store in the provided dust bags away from direct sunlight.', 2),
('What is your return policy?', 'We offer a 30-day return policy for unworn items in original packaging. Custom orders are final sale.', 3),
('Do you ship internationally?', 'Yes, we ship worldwide. International orders typically arrive within 7-14 business days.', 4),
('How do I find my size?', 'Our sizing guide provides detailed measurements. We recommend measuring your feet in the evening when they are at their largest.', 5);

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, author, published) VALUES
('The Art of Italian Craftsmanship', 'art-of-italian-craftsmanship', 'Discover the centuries-old traditions that define our approach to shoemaking.', 'In the heart of Tuscany, where rolling hills meet ancient workshops, the art of shoemaking has been perfected over generations. Our master craftsmen bring this legacy to every pair, combining time-honored techniques with contemporary design sensibilities.', 'Marco Rossi', true),
('Sustainable Luxury: Our Commitment', 'sustainable-luxury', 'How we''re reimagining premium footwear with environmental responsibility.', 'Sustainability isn''t just a trend—it''s our responsibility. We''ve partnered with certified tanneries that prioritize environmental stewardship, ensuring that luxury and sustainability walk hand in hand.', 'Sofia Chen', true),
('The Perfect Fit: A Guide', 'perfect-fit-guide', 'Everything you need to know about finding your ideal shoe size.', 'A perfectly fitting shoe is the foundation of comfort and style. In this comprehensive guide, we explore the nuances of fit, from understanding your foot shape to selecting the right last for your needs.', 'James Mitchell', true);