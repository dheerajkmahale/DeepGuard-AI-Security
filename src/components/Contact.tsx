import { useState } from "react";
import { Send, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", organization: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Contact <span className="text-primary">Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Get in touch with our team for inquiries, support, or to discuss enterprise solutions
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors">
              {siteConfig.contact.email}
            </a>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
            <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-input border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="organization" className="text-sm font-medium">
                  Organization
                </label>
                <Input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Your organization name"
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  required
                  className="bg-input border-border resize-none"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Send className="w-5 h-5" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
