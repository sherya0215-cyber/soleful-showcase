import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-medium mb-6 opacity-0 animate-fade-up">
              Terms & Conditions
            </h1>
            <p className="font-sans text-lg text-muted-foreground opacity-0 animate-fade-up delay-100">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 md:py-32">
        <div className="container-wide max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-12">
              <div className="opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
                <h2 className="font-serif text-2xl mb-4">1. Introduction</h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Welcome to ACCENDO. These Terms and Conditions govern your use of our website
                  and the purchase of products from our collections. By accessing our website
                  or making a purchase, you agree to be bound by these terms.
                </p>
              </div>

              <div className="opacity-0 animate-fade-up delay-100" style={{ animationFillMode: 'forwards' }}>
                <h2 className="font-serif text-2xl mb-4">2. Product Information</h2>
                <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                  We strive to ensure that all product descriptions, images, and pricing
                  information on our website are accurate. However, we do not warrant that
                  product descriptions or other content is accurate, complete, reliable,
                  current, or error-free.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  All products are subject to availability, and we reserve the right to
                  discontinue any product at any time without notice.
                </p>
              </div>

              <div className="opacity-0 animate-fade-up delay-200" style={{ animationFillMode: 'forwards' }}>
                <h2 className="font-serif text-2xl mb-4">3. Pricing</h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  All prices are displayed in the currency selected and are inclusive of
                  applicable taxes unless otherwise stated. We reserve the right to change
                  prices at any time without prior notice. Shipping costs are calculated
                  at checkout based on your delivery location.
                </p>
              </div>

              <div className="opacity-0 animate-fade-up delay-300" style={{ animationFillMode: 'forwards' }}>
                <h2 className="font-serif text-2xl mb-4">4. Returns & Exchanges</h2>
                <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                  We accept returns of unworn items in their original packaging within 30
                  days of delivery. Items must be in their original condition with all tags
                  attached. Custom orders are final sale and cannot be returned.
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  To initiate a return, please contact our customer service team with your
                  order number and reason for return. We will provide you with instructions
                  for returning your item.
                </p>
              </div>

              <div className="opacity-0 animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                <h2 className="font-serif text-2xl mb-4">5. Intellectual Property</h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  All content on this website, including but not limited to text, graphics,
                  logos, images, and software, is the property of STRIDE or its content
                  suppliers and is protected by international copyright laws. Unauthorized
                  use of any content may violate copyright, trademark, and other laws.
                </p>
              </div>

              <div className="opacity-0 animate-fade-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                <h2 className="font-serif text-2xl mb-4">6. Privacy</h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy to
                  understand how we collect, use, and protect your personal information.
                  By using our website, you consent to our collection and use of your
                  information as described in our Privacy Policy.
                </p>
              </div>

              <div className="opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                <h2 className="font-serif text-2xl mb-4">7. Contact Information</h2>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms and Conditions, please
                  contact us at:
                </p>
                <div className="mt-4 p-6 bg-secondary">
                  <p className="font-sans text-sm text-foreground">
                    <strong>ACCENDO Ltd.</strong>
                    <br />
                    Contact us through our website
                    <br />
                    or via email below
                    <br />
                    Email: legal@accendo.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;