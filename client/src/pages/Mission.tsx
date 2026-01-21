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

                <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-100">
                        <div className="container mx-auto px-4">
                                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6">
                                                Our Mission
                                        </h1>
                                        <p className="text-xl text-slate-600 leading-relaxed">
                                                We exist to simplify the complex world of medication management. By combining human empathy with scalable technology, we ensure no patient is left confused about their health.
                                        </p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                                        {features.map((f, i) => (
                                                <Card
                                                        key={i}
                                                        className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                                                >
                                                        <CardHeader>
                                                                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                                                                        <f.icon className="w-8 h-8 text-primary" />
                                                                </div>
                                                                <CardTitle className="text-2xl">{f.title}</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <p className="text-lg text-slate-600 leading-relaxed">{f.desc}</p>
                                                        </CardContent>
                                                </Card>
                                        ))}
                                </div>
                        </div>
                </section>

        );
}