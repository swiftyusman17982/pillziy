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
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-32 lg:pb-48 bg-red-50/30">
      {/* Background Wave Aesthetic from Image */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden">
        <div className="absolute top-0 right-0 w-[80%] md:w-[60%] h-[120%] bg-white rounded-l-[10rem] md:rounded-l-[20rem] translate-x-1/4 -translate-y-1/4" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-3 py-1 text-sm font-medium text-red-600 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-red-600 mr-2 animate-pulse"></span>
              Coming Soon
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-tight text-[#1E293B] leading-[1.1] mb-8">
              Save time.<br />
              Healthcare online
            </h1>
            
            <p className="text-lg text-[#64748B] mb-12 max-w-lg leading-relaxed">
              Now you do not need to download thousands of applications when there is one
            </p>

            <div className="bg-white p-1.5 rounded-2xl md:rounded-full shadow-xl shadow-red-100/50 border border-slate-100 max-w-md flex flex-col md:flex-row items-center">
              {isJoined ? (
                <div className="h-14 flex items-center px-6 text-green-600 font-medium">
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Thanks for joining!
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row w-full gap-2 md:gap-0">
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
                              className="border-0 shadow-none focus-visible:ring-0 pl-6 h-14 bg-transparent text-base rounded-full"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="h-14 px-10 rounded-full font-bold bg-primary hover:bg-primary/90 text-white transition-all text-lg w-full md:w-auto"
                    >
                      Get Started
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
            className="relative flex justify-center mt-12 lg:mt-0"
          >
            {/* App UI Simulation from Image */}
            <div className="relative w-full max-w-[450px]">
              <div className="aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-red-200/50 border-[8px] md:border-[12px] border-white relative group">
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F8FAFC]">
                   {/* Doctor Card UI */}
                   <div className="relative w-full h-full flex flex-col">
                      <div className="flex-1 bg-slate-100 flex items-center justify-center">
                        <User2 className="w-24 h-24 text-slate-300" />
                      </div>
                      <div className="p-6 bg-white space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium text-slate-400 uppercase">Dentist</p>
                            <h4 className="text-lg font-bold">Dr. Hrubenger</h4>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-200">
                            <Phone className="w-5 h-5 text-white fill-white" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                           <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                             <User2 className="w-5 h-5 text-white" />
                           </div>
                           <div className="flex-1 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                             <Mail className="w-5 h-5 text-white" />
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Floatings cards */}
              <div className="absolute -left-12 bottom-20 bg-white p-4 rounded-3xl shadow-xl border border-slate-50 w-32">
                <p className="text-xs text-slate-400 mb-1">Online queue</p>
                <p className="text-2xl font-bold text-slate-900">48</p>
                <div className="mt-2 h-8 w-full bg-red-50 rounded-lg overflow-hidden flex items-end">
                   <div className="h-1/2 w-full bg-red-400" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section from Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 max-w-4xl">
           <div className="space-y-1">
             <h3 className="text-4xl font-bold text-[#1E293B]">4.9*</h3>
             <p className="text-sm text-[#64748B]">Average platform specialists rating.</p>
           </div>
           <div className="space-y-1">
             <h3 className="text-4xl font-bold text-[#1E293B]">HHS</h3>
             <p className="text-sm text-[#64748B]">All government licences and certificates.</p>
           </div>
           <div className="space-y-1">
             <h3 className="text-4xl font-bold text-[#1E293B]">2M+</h3>
             <p className="text-sm text-[#64748B]">Online-consultations number last year.</p>
           </div>
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
