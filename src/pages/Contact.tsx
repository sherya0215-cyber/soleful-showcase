import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Marquee } from "@/components/ui/marquee";
import Map from "@/components/Map";
import { z } from "zod";
import { MapPin, Mail, Phone, Clock, MessageSquare, Users, Headphones } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().max(200, "Subject must be less than 200 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const contactReasons = [
  { icon: MessageSquare, title: "General Inquiry", desc: "Questions about our products or services" },
  { icon: Users, title: "Wholesale", desc: "Partnership and bulk order inquiries" },
  { icon: Headphones, title: "Customer Support", desc: "Help with orders and returns" },
];

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject || null,
        message: result.data.message,
      });

      if (error) throw error;

      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary mb-4 block opacity-0 animate-fade-up">
              Get in Touch
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium mb-6 opacity-0 animate-fade-up delay-100">
              Contact
              <span className="italic text-primary"> Us</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-up delay-200">
              Have a question or want to learn more? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-4 bg-primary text-primary-foreground overflow-hidden">
        <Marquee speed="fast">
          {["QUESTIONS", "SUPPORT", "PARTNERSHIPS", "FEEDBACK", "ORDERS"].map((word, i) => (
            <span key={i} className="flex items-center gap-6 mx-6 font-sans text-lg font-bold tracking-widest">
              {word}
              <span className="text-primary-foreground/50">★</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Contact Reasons */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactReasons.map((reason, index) => (
              <div 
                key={reason.title}
                className="text-center p-8 bg-secondary rounded-lg opacity-0 animate-fade-up hover-lift"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <reason.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl mb-2">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Map */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info & Map */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 opacity-0 animate-fade-up">
                Let's Start a
                <br />
                <span className="italic text-primary">Conversation</span>
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-8 opacity-0 animate-fade-up delay-100">
                Whether you have questions about our collections, need styling advice,
                or simply want to share your ACCENDO experience, our team is here to help.
              </p>

              <div className="space-y-6 mb-12 opacity-0 animate-fade-up delay-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-1">Flagship Store</h3>
                    <p className="font-sans text-muted-foreground text-sm">
                      123 Fifth Avenue
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-1">Email Us</h3>
                    <p className="font-sans text-muted-foreground text-sm">
                      hello@accendo.com
                      <br />
                      support@accendo.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-1">Call Us</h3>
                    <p className="font-sans text-muted-foreground text-sm">
                      +1 (555) 123-4567
                      <br />
                      Mon-Fri 9am-6pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-1">Store Hours</h3>
                    <p className="font-sans text-muted-foreground text-sm">
                      Mon-Sat: 10am - 8pm
                      <br />
                      Sunday: 11am - 6pm
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="opacity-0 animate-fade-up delay-300">
                <h3 className="font-serif text-xl mb-4">Find Us</h3>
                <Map className="h-[300px]" />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 md:p-12 shadow-lg rounded-lg opacity-0 animate-fade-up delay-200">
              <h3 className="font-serif text-2xl mb-2">Send a Message</h3>
              <p className="text-muted-foreground text-sm mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-sans text-sm">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-sans text-sm">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-sans text-sm">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && (
                    <p className="text-destructive text-sm">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-sans text-sm">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-secondary">
        <div className="container-wide text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
            Have More Questions?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Check out our frequently asked questions for quick answers to common inquiries.
          </p>
          <Button asChild variant="outline" size="lg">
            <a href="/faq">View FAQ</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
