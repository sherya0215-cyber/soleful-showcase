-- Add products table for category products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add additional columns to categories
ALTER TABLE public.categories 
ADD COLUMN IF NOT EXISTS long_description TEXT,
ADD COLUMN IF NOT EXISTS features TEXT[];

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS policies for products
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (is_admin(auth.uid()));

-- Add models table for team/ambassadors showcase
CREATE TABLE public.models (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  quote TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on models
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

-- RLS policies for models
CREATE POLICY "Anyone can view models" 
ON public.models 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage models" 
ON public.models 
FOR ALL 
USING (is_admin(auth.uid()));