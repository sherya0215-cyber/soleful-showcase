import { motion } from "framer-motion";
import { Target, Eye, Sparkles } from "lucide-react";

export function MissionVision() {
  return (
    <section className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
            Our Purpose
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
            Mission & Vision
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-10 md:p-14 relative group hover:bg-primary/5 transition-colors duration-500"
          >
            <div className="absolute top-8 right-8 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <span className="font-display text-8xl font-bold text-primary/10 absolute -top-4 left-6">
              01
            </span>
            <div className="relative pt-12">
              <h3 className="font-display text-3xl md:text-4xl font-bold uppercase mb-6">
                Our Mission
              </h3>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-6">
                To empower athletes and everyday movers with footwear that combines 
                cutting-edge technology, sustainable practices, and timeless design. 
                Every step matters, and we're here to make each one count.
              </p>
              <ul className="space-y-3 font-sans text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Innovate with purpose
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Sustainable by design
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Performance for all
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card p-10 md:p-14 relative group hover:bg-primary/5 transition-colors duration-500"
          >
            <div className="absolute top-8 right-8 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <span className="font-display text-8xl font-bold text-primary/10 absolute -top-4 left-6">
              02
            </span>
            <div className="relative pt-12">
              <h3 className="font-display text-3xl md:text-4xl font-bold uppercase mb-6">
                Our Vision
              </h3>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-6">
                To become the world's most trusted footwear brand—where innovation meets 
                responsibility, and every product tells a story of craftsmanship, 
                community, and the relentless pursuit of excellence.
              </p>
              <ul className="space-y-3 font-sans text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Global impact, local heart
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Zero-waste by 2030
                </li>
                <li className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Community-driven innovation
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
