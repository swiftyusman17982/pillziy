import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#mission", label: "Mission" },
    { href: "/#contact-us", label: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container pr-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center cursor-pointer">
            <img
              src="/image/Logo.PNG"
              alt="PILLziy Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">
              PILLziy
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
            <Button variant="ghost" className="text-red-500 font-bold hover:text-red-600">
              Login
            </Button>
            <Link href="/#contact-us">
              <Button
                className="font-bold rounded-full bg-primary hover:bg-primary/90 text-white px-8"
              >
                Get App
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-600">
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
                <SheetHeader className="text-left">
                  <div className="flex items-center justify-between w-full">
                    <SheetTitle className="flex items-center gap-2">
                      <img
                        src="/image/Logo.PNG"
                        alt="PILLziy Logo"
                        className="h-8 w-auto object-contain"
                      />
                      <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                        PILLziy
                      </span>
                    </SheetTitle>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-slate-600 hover:text-red-500 transition-colors">
                        <X className="h-8 w-8 stroke-[2.5px]" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-12">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium text-slate-600 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <hr className="border-slate-100" />
                  <div className="flex flex-col gap-4 pt-2">
                    <Button variant="ghost" className="text-red-500 font-bold hover:text-red-600 justify-start px-0">
                      Login
                    </Button>
                    <Link href="/#contact-us">
                      <Button className="w-full font-bold rounded-full bg-primary hover:bg-primary/90 text-white">
                        Get App
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
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

      <footer className="border-t bg-slate-50 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/image/Logo.PNG"
                alt="PILLziy Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                PILLziy
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              Revolutionizing healthcare adherence through intelligent, patient-centric technology.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-900">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/#mission" className="hover:text-primary">Mission</a></li>
              <li><a href="/#contact-us" className="hover:text-primary">Contact Us</a></li>
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
              <p>hello@pillziy.health</p>
              <p>+1 (555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} PILLziy Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
