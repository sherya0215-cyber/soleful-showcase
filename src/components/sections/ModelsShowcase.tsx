import { useEffect, useState } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface Model {
  id: string;
  name: string;
  designation: string;
  quote: string;
  image_url: string;
}

export function ModelsShowcase() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      const { data, error } = await supabase
        .from("models")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setModels(data);
      }
      setLoading(false);
    };

    fetchModels();
  }, []);

  // Convert models to testimonial format
  const testimonials = models.map((model) => ({
    quote: model.quote,
    name: model.name,
    designation: model.designation,
    src: model.image_url,
  }));

  if (loading) {
    return (
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide">
          <div className="animate-pulse h-96 bg-muted rounded-lg" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
            The Faces of ACCENDO
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
            Our Brand Ambassadors
          </h2>
        </motion.div>

        <AnimatedTestimonials testimonials={testimonials} autoplay />
      </div>
    </section>
  );
}
