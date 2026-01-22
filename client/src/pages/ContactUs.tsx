import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
} from "@/components/ui/select";
import {
        Form,
        FormControl,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Building2, User2, Mail, Phone } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { api } from "@shared/routes";
import { PhoneInput } from "@/components/ui/phone-input";
import { insertDemoRequestSchema, type InsertDemoRequest } from "@shared/schema";

export default function ContactUs() {
        const [isSubmitted, setIsSubmitted] = useState(false);

        const form = useForm<InsertDemoRequest>({
                resolver: zodResolver(insertDemoRequestSchema),
                defaultValues: {
                        orgName: "",
                        fullName: "",
                        workEmail: "",
                        role: "",
                        orgType: "",
                        phone: "",
                },
        });

        const { toast } = useToast();
        const mutation = useMutation({
                mutationFn: async (data: any) => {
                        await apiRequest("POST", api.demoRequest.create.path, data);
                },
                onSuccess: () => {
                        setIsSubmitted(true);
                        toast({
                                title: "Success!",
                                description: "Your message has been sent. 🎉",
                                duration: 5000,
                        });
                        form.reset();
                },
                onError: (error: Error) => {
                        toast({
                                variant: "destructive",
                                title: "Error",
                                description: error.message || "Something went wrong",
                        });
                },
        });

        const onSubmit = (data: any) => {
                mutation.mutate(data);
        };

        const orgTypes = [
                "Pharmacy",
                "Clinic",
                "Health system",
                "Senior care",
                "Home health",
                "Insurance",
                "Employer",
                "Other",
        ];

        return (
                <section className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50">
                        <div className="container mx-auto px-4">
                                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                                        {/* Left - Text */}
                                        <div className="lg:sticky lg:top-24">
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-8">
                                                        Experience PILLziy
                                                </h1>
                                                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                                                        See how AI powered Talking Pills can upgrade your patient education and reduce follow up confusion. Schedule a personalized demo with the PILLziy team.
                                                </p>

                                                <div className="space-y-6">
                                                        {[
                                                                "Full walkthrough of the pharmacy and provider dashboard",
                                                                "Custom rollout and implementation plan for your workflow",
                                                                "Pricing, ROI, and outcomes review for your scale",
                                                        ].map((item, i) => (
                                                                <div key={i} className="flex items-center gap-4">
                                                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                                                        </div>
                                                                        <span className="text-lg text-slate-700 font-medium">{item}</span>
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>

                                        {/* Right - Form */}
                                        <Card className="border-none shadow-2xl shadow-slate-200/50 p-8 lg:p-12 bg-white">
                                                {isSubmitted ? (
                                                        <div className="text-center py-16">
                                                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                                                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                                                                </div>
                                                                <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
                                                                <p className="text-xl text-slate-600 mb-8">
                                                                        We'll reach out to your team shortly.
                                                                </p>
                                                                <Button
                                                                        onClick={() => setIsSubmitted(false)}
                                                                        variant="outline"
                                                                        size="lg"
                                                                >
                                                                        Send another message
                                                                </Button>
                                                        </div>
                                                ) : (
                                                        <>
                                                                <h2 className="text-3xl font-bold mb-10 text-slate-900">Contact Us</h2>
                                                                <Form {...form}>
                                                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                                                <FormField
                                                                                        control={form.control}
                                                                                        name="orgName"
                                                                                        render={({ field }) => (
                                                                                                <FormItem>
                                                                                                        <FormLabel>Organization Name</FormLabel>
                                                                                                        <FormControl>
                                                                                                                <div className="relative">
                                                                                                                        <Building2 className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                                                                                                                        <Input required className="pl-12 h-14" placeholder="Acme Health" {...field} />
                                                                                                                </div>
                                                                                                        </FormControl>
                                                                                                        <FormMessage />
                                                                                                </FormItem>
                                                                                        )}
                                                                                />

                                                                                <div className="grid md:grid-cols-2 gap-6">
                                                                                        <FormField
                                                                                                control={form.control}
                                                                                                name="fullName"
                                                                                                render={({ field }) => (
                                                                                                        <FormItem>
                                                                                                                <FormLabel>Full Name</FormLabel>
                                                                                                                <FormControl>
                                                                                                                        <div className="relative">
                                                                                                                                <User2 className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                                                                                                                                <Input required className="pl-12 h-14" placeholder="John Doe" {...field} />
                                                                                                                        </div>
                                                                                                                </FormControl>
                                                                                                                <FormMessage />
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
                                                                                                                        <Input required className="h-14" placeholder="Clinical Director" {...field} />
                                                                                                                </FormControl>
                                                                                                                <FormMessage />
                                                                                                        </FormItem>
                                                                                                )}
                                                                                        />
                                                                                </div>

                                                                                <div className="grid md:grid-cols-2 gap-6">
                                                                                        <FormField
                                                                                                control={form.control}
                                                                                                name="workEmail"
                                                                                                render={({ field }) => (
                                                                                                        <FormItem>
                                                                                                                <FormLabel>Work Email</FormLabel>
                                                                                                                <FormControl>
                                                                                                                        <div className="relative">
                                                                                                                                <Mail className="absolute left-4 top-5 h-5 w-5 text-slate-400" />
                                                                                                                                <Input type="email" required className="pl-12 h-14" placeholder="john@company.com" {...field} />
                                                                                                                        </div>
                                                                                                                </FormControl>
                                                                                                                <FormMessage />
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
                                                                                                                        <PhoneInput
                                                                                                                                {...field}
                                                                                                                                defaultCountry="us"
                                                                                                                                placeholder="Enter phone number"
                                                                                                                                className="h-14"
                                                                                                                        />
                                                                                                                </FormControl>
                                                                                                                <FormMessage />
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
                                                                                                        <Select
                                                                                                                onValueChange={field.onChange}
                                                                                                                defaultValue={field.value}
                                                                                                                required
                                                                                                        >
                                                                                                                <FormControl>
                                                                                                                        <SelectTrigger className="h-14 bg-white border-slate-300 text-slate-900 focus:ring-primary">
                                                                                                                                <SelectValue placeholder="Select organization type" />
                                                                                                                        </SelectTrigger>
                                                                                                                </FormControl>
                                                                                                                <SelectContent className="bg-white border border-slate-200 shadow-xl max-h-[300px] overflow-y-auto">
                                                                                                                        {orgTypes.map((type) => (
                                                                                                                                <SelectItem
                                                                                                                                        key={type}
                                                                                                                                        value={type}
                                                                                                                                        className="text-slate-900 hover:bg-slate-100 focus:bg-slate-100 cursor-pointer py-3"
                                                                                                                                >
                                                                                                                                        {type}
                                                                                                                                </SelectItem>
                                                                                                                        ))}
                                                                                                                </SelectContent>
                                                                                                        </Select>
                                                                                                        <FormMessage />
                                                                                                </FormItem>
                                                                                        )}
                                                                                />

                                                                                <Button
                                                                                        type="submit"
                                                                                        className="w-full h-14 text-lg font-semibold mt-6 bg-primary hover:bg-primary/90 transition-colors"
                                                                                        disabled={mutation.isPending}
                                                                                >
                                                                                        {mutation.isPending ? "Sending..." : "Submit"}
                                                                                        <ArrowRight className="ml-3 h-5 w-5" />
                                                                                </Button>
                                                                        </form>
                                                                </Form>
                                                        </>
                                                )}
                                        </Card>
                                </div>
                        </div>
                </section>
        );
}