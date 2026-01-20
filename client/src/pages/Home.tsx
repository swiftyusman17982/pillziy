import { useState } from "react";
import { useForm } from "react-hook-form";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Play, Building2, User2, Mail, Phone, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

// --- Components for sections ---

function HeroSection() {
  const [isJoined, setIsJoined] = useState(false);
  const form = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = (data: { email: string }) => {
    console.log("Early Access Email:", data.email);
    setIsJoined(true);
    form.reset();
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-32 lg:pb-32">
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-red-50 rounded-full blur-3xl opacity-50 translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-50 -translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-3 py-1 text-sm font-medium text-red-600 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-red-600 mr-2 animate-pulse"></span>
              Join the revolution
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Save time.<br />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-red-600">
                Healthcare online.
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              We're building the future of patient adherence and communication. 
              Talking Pills helps organizations scale care with intelligent, personalized video interactions.
            </p>

            <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100 max-w-md">
              {isJoined ? (
                <div className="h-12 flex items-center px-4 text-green-600 font-medium">
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Thanks for joining!
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1 mb-0 space-y-0">
                          <FormControl>
                            <Input 
                              type="email"
                              required
                              placeholder="Enter your email" 
                              className="border-0 shadow-none focus-visible:ring-0 pl-4 h-12 bg-transparent text-base"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="h-12 px-8 rounded-xl font-semibold shadow-md shadow-red-200 hover:shadow-lg transition-all"
                    >
                      Join Early Access
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-video rounded-3xl overflow-hidden bg-slate-900 shadow-2xl shadow-slate-200 border-8 border-white relative group cursor-pointer">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-white">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
                <h3 className="font-display font-semibold text-xl">Talking Pills Demo</h3>
                <p className="text-slate-400 mt-2">Watch how it works</p>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-full h-full opacity-30 bg-[radial-gradient(#EF4444_1px,transparent_1px)] [background-size:20px_20px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  const features = [
    { title: "Smart Adherence", desc: "AI-driven reminders that patients actually listen to.", icon: CheckCircle2 },
    { title: "Clinical Workflow", desc: "Seamless integration with your existing health systems.", icon: Stethoscope },
    { title: "Patient Engagement", desc: "Personalized video content for every medication.", icon: User2 },
  ];

  return (
    <section id="mission" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-slate-600">
            We exist to simplify the complex world of medication management. By combining human empathy with scalable technology, we ensure no patient is left confused about their health.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <Card key={i} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm({
    defaultValues: {
      orgName: "",
      fullName: "",
      workEmail: "",
      role: "",
      orgType: "",
      phone: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Demo Request Data:", data);
    setIsSubmitted(true);
    form.reset();
  };

  const orgTypes = [
    "Pharmacy", "Clinic", "Health system", "Senior care", "Home health", "Insurance", "Employer", "Other"
  ];

  return (
    <section id="contact-us" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">
              Experience the platform
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              See how Talking Pills can transform your organization's patient outreach. 
              Schedule a personalized demo with our product team.
            </p>
            
            <div className="space-y-6">
              {[
                "Full walkthrough of the provider dashboard",
                "Custom implementation strategy session",
                "Pricing and ROI analysis for your scale"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 lg:p-10">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                <p className="text-slate-600">We'll reach out to your team shortly to schedule your demo.</p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-8">
                  Send another request
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-6">Request a Demo</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="orgName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                              <Input required className="pl-9" placeholder="Acme Health" {...field} />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input required className="pl-9" placeholder="John Doe" {...field} />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role / Title</FormLabel>
                            <FormControl>
                              <Input required placeholder="Clinical Director" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="workEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Work Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input type="email" required className="pl-9" placeholder="john@company.com" {...field} />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input required className="pl-9" placeholder="+1 (555) 000-0000" {...field} />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="orgType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} required>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {orgTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base font-semibold mt-4 bg-primary hover:bg-primary/90"
                    >
                      Schedule Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <MissionSection />
      <DemoSection />
    </Layout>
  );
}
