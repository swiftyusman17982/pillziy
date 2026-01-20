import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#mission", label: "Mission" },
    { href: "/#contact", label: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
            <div className="bg-red-50 p-2 rounded-lg group-hover:bg-red-100 transition-colors">
              <HeartPulse className="h-6 w-6 text-primary" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">
              TalkingPills
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link href="/investor-deck">
              <Button 
                variant={location === "/investor-deck" ? "secondary" : "default"}
                className="font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Investor Deck
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Placeholder - kept simple for this MVP */}
          <div className="md:hidden">
            <Link href="/investor-deck">
              <Button size="sm">Investors</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t bg-slate-50 py-12" id="contact">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <HeartPulse className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-lg">TalkingPills</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              Revolutionizing healthcare adherence through intelligent, patient-centric technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-900">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/#mission" className="hover:text-primary">Mission</a></li>
              <li><a href="/#team" className="hover:text-primary">Team</a></li>
              <li><a href="/investor-deck" className="hover:text-primary">Investors</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-900">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><span className="cursor-pointer hover:text-primary">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-primary">Terms of Service</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-900">Contact</h4>
            <div className="text-sm text-slate-600 space-y-2">
              <p>hello@talkingpills.health</p>
              <p>+1 (555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Talking Pills Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
