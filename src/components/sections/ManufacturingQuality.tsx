import { motion } from "framer-motion";
import { Shield, Award, Leaf, Zap } from "lucide-react";

const qualities = [
  {
    icon: Shield,
    title: "Premium Materials",
    description: "We source only the finest leathers, fabrics, and sustainable materials from certified suppliers worldwide.",
    stat: "100%",
    statLabel: "Quality Tested"
  },
  {
    icon: Award,
    title: "Master Craftsmanship",
    description: "Every pair passes through 200+ quality checkpoints, handcrafted by artisans with decades of experience.",
    stat: "200+",
    statLabel: "Quality Checks"
  },
  {
    icon: Leaf,
    title: "Sustainable Process",
    description: "Our eco-friendly manufacturing reduces waste by 60% while maintaining the highest quality standards.",
    stat: "60%",
    statLabel: "Less Waste"
  },
  {
    icon: Zap,
    title: "Advanced Technology",
    description: "Proprietary cushioning systems and ergonomic designs backed by sports science research.",
    stat: "15+",
    statLabel: "Patents Filed"
  }
];

export function ManufacturingQuality() {
  return (
    <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-background/20 to-transparent w-full"
            style={{ top: `${20 + i * 20}%` }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
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
            Excellence in Every Stitch
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
            Manufacturing Quality
          </h2>
          <p className="font-sans text-lg text-background/70 mt-6 max-w-2xl mx-auto">
            From raw materials to the finished product, every step is meticulously 
            designed to deliver footwear that performs as good as it looks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualities.map((quality, index) => {
            const Icon = quality.icon;
            return (
              <motion.div
                key={quality.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-background/5 backdrop-blur-sm border border-background/10 p-8 group hover:bg-background/10 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <h3 className="font-display text-xl font-bold uppercase mb-3">
                  {quality.title}
                </h3>
                
                <p className="font-sans text-sm text-background/60 leading-relaxed mb-6">
                  {quality.description}
                </p>
                
                <div className="pt-4 border-t border-background/10">
                  <span className="font-display text-4xl font-bold text-primary">
                    {quality.stat}
                  </span>
                  <p className="font-sans text-xs text-background/50 uppercase tracking-wider mt-1">
                    {quality.statLabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
