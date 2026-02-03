import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Analysis", href: "#analysis" },
      { label: "Contact", href: "#contact" },
    ],
    resources: [
      { label: "Documentation", href: `${siteConfig.url}/docs` },
      { label: "API Reference", href: `${siteConfig.url}/api` },
      { label: "Research Papers", href: `${siteConfig.url}/research` },
    ],
    legal: [
      { label: "Privacy Policy", href: `${siteConfig.url}/privacy` },
      { label: "Terms of Service", href: `${siteConfig.url}/terms` },
      { label: "Data Security", href: `${siteConfig.url}/security` },
    ]
  };

  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="text-lg font-bold">DeepGuard AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced deepfake detection powered by AI to protect against misinformation and verify content authenticity.
            </p>
            <div className="flex items-center gap-3">
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={`${siteConfig.url}/linkedin`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} DeepGuard AI. All rights reserved.</p>
            <p>Built with advanced AI to combat misinformation</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
