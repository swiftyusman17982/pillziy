import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Stethoscope, User2 } from "lucide-react";

export default function Mission() {
        const features = [
                {
                        title: "Smart Adherence",
                        desc: "AI-driven reminders that patients actually listen to.",
                        icon: CheckCircle2,
                },
                {
                        title: "Clinical Workflow",
                        desc: "Seamless integration with your existing health systems.",
                        icon: Stethoscope,
                },
                {
                        title: "Patient Engagement",
                        desc: "Personalized video content for every medication.",
                        icon: User2,
                },
        ];

        return (

                <section className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50">
                        <div className="container mx-auto px-4">
                                {/* Mission Statement + Image Section */}
                                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
                                        {/* Left: Text */}
                                        <div className="space-y-8">
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight">
                                                        Our Mission
                                                </h1>

                                                <div className="space-y-6 text-lg md:text-xl text-slate-700 leading-relaxed">
                                                        <p>
                                                                PILLziy’s mission is to eliminate medication confusion at global scale by transforming every prescription into an AI powered, spoken, visual experience that patients can actually understand. We exist so no one has to guess what a pill is for, how to take it, what to avoid, or what happens if a dose is missed. By making medication guidance clear across any language and any literacy level, PILLziy helps patients take medicines safely and correctly, supports caregivers who manage complex routines, and reduces preventable harm caused by misunderstanding.
                                                        </p>

                                                        <p>
                                                                Our long term mission is to become the universal medication understanding layer trusted by pharmacies, clinicians, and patients, improving adherence, outcomes, and dignity for millions of people.
                                                        </p>
                                                </div>
                                        </div>

                                        {/* Right: Image */}
                                        <div className="relative rounded-2xl overflow-hidden ">

                                                <img
                                                        src="/image/Our_Mission.png"
                                                        alt="PILLziy Mission - Empowering Medication Understanding"
                                                        className="w-full h-auto object-contain lg:aspect-[3/3] lg:aspect-square"
                                                />

                                        </div>
                                </div>
                        </div>
                </section>

        );
}