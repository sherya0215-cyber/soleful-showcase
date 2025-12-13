import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userId, setUserId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = signupSchema.safeParse(formData);
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });

      if (error) throw error;

      if (data.user) {
        setUserId(data.user.id);
        toast({
          title: "Account Created!",
          description: "Copy your User ID below and share it with me so I can make you an admin.",
        });
      }
    } catch (error: any) {
      let message = "Something went wrong. Please try again.";
      if (error.message?.includes("already registered")) {
        message = "This email is already registered. Try signing in at /admin/login";
      }
      
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-medium mb-2">Admin Setup</h1>
          <p className="font-sans text-muted-foreground">
            Create your admin account (one-time setup)
          </p>
        </div>

        <div className="bg-card p-8 shadow-md">
          {!userId ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Create Admin Account"}
              </Button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Your User ID:</p>
                <code className="text-xs break-all font-mono bg-background p-2 rounded block">
                  {userId}
                </code>
              </div>
              <p className="text-sm text-muted-foreground">
                Share this User ID with me in the chat, and I'll add you as an admin!
              </p>
              <Button onClick={() => navigate("/admin/login")} variant="outline" className="w-full">
                Go to Admin Login
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
