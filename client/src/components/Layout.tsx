import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  // Navigation items: only Home and Mission as regular links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/mission", label: "Mission" },
  ];

  // Contact Us as a separate button
  const contactLink = { href: "/contact-us", label: "Contact Us" };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
            <img
              src="/image/newLogo.png"
              alt="PILLziy Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="font-display font-bold text-xl pl-2 tracking-tight text-slate-900">
              ILLziy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${location === link.href
                  ? "text-primary font-semibold"
                  : "text-slate-600 hover:text-primary"
                  }`}
              >
                {link.label}
              </a>
            ))}

            {/* Contact Us Button */}
            <a href={contactLink.href}>
              <Button
                className="font-bold rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-3"
              >
                {contactLink.label}
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
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
                        src="/image/newLogo.png"
                        alt="PILLziy Logo"
                        className="h-8 w-auto object-contain"
                      />
                      <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                        ILLziy
                      </span>
                    </SheetTitle>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-600 hover:text-red-500 transition-colors"
                      >
                        <X className="h-8 w-8 stroke-[2.5px]" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-6 mt-12">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`text-lg font-medium transition-colors ${location === link.href
                        ? "text-primary font-semibold"
                        : "text-slate-600 hover:text-primary"
                        }`}
                    >
                      {link.label}
                    </a>
                  ))}

                  {/* Divider (optional - uncomment if you want it) */}
                  {/* <hr className="border-slate-100 my-6" /> */}

                  {/* Contact Us Button in Mobile */}
                  <a href={contactLink.href}>
                    <Button className="w-full font-bold rounded-full bg-primary hover:bg-primary/90 text-white py-3 text-lg mt-4">
                      {contactLink.label}
                    </Button>
                  </a>
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
    </div>
  );
}