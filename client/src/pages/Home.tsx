import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CheckCircle2, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { api } from "@shared/routes";
import { Link } from "wouter";

function HeroSection() {
  const [isJoined, setIsJoined] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const form = useForm({
    defaultValues: { email: "" },
  });

  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      await apiRequest("POST", api.earlyAccess.create.path, { email });
    },
    onSuccess: () => {
      setIsJoined(true);
      setShowEmailForm(false);
      toast({
        title: "Success!",
        description: "You've been added to our early access list.",
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

  const onSubmit = (data: { email: string }) => {
    mutation.mutate(data.email);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-red-50/50 via-white to-red-50/30">
      {/* Background decorative */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[70%] h-[140%] bg-white rounded-l-[15rem] translate-x-1/4 -translate-y-1/4 opacity-80" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text & Buttons */}
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-display font-bold tracking-tight text-slate-900 leading-[1.1] mb-8">
              Understand your prescription<br />in 10 seconds.
            </h1>

            <p className="text-xl text-slate-600 mb-12 max-w-lg leading-relaxed">
              <strong >Scan your prescription in the PILLziy app.</strong> PILLziy generates a talking 3D pill and body animation, using AI to deliver clear, personalized medication guidance across languages and literacy levels.
            </p>

            {/* Two Buttons */}
            {!isJoined && (
              <div className="flex flex-col sm:flex-row gap-4 max-w-md w-full">
                <Button
                  size="lg"
                  className="
        h-14
        w-full
        px-8
        flex items-center justify-center
        font-bold text-lg leading-none
        bg-primary hover:bg-primary/90
        text-white
        rounded-full
        shadow-md hover:shadow-lg
      "
                  onClick={() => setShowEmailForm(true)}
                >
                  Join Early Access
                </Button>

                {/* Outline Button */}
                <Link href="/contact-us" className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="
          h-14
          w-full
          px-8
          flex items-center justify-center
          font-bold text-lg leading-none
          border-2 border-primary
          text-primary hover:bg-primary/10
          rounded-full
          shadow-md hover:shadow-lg
        "
                  >
                    Request a Demo
                  </Button>
                </Link>
              </div>
            )}



            {/* Email Form - appears when "Join Early Access" is clicked */}
            {showEmailForm && !isJoined && (
              <div className="mt-8 p-4 bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row w-full gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1 space-y-0">
                          <FormControl>
                            <Input
                              type="email"
                              required
                              placeholder="Enter your email"
                              className="border-0 shadow-none focus-visible:ring-0 pl-6 h-14 text-base rounded-xl md:rounded-full bg-transparent"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="h-14 px-8 rounded-xl md:rounded-full font-bold bg-primary hover:bg-primary/90 text-white text-lg w-full md:w-auto"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Joining..." : "Join"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}

            {isJoined && (
              <div className="mt-8 p-4 bg-green-50 rounded-2xl border border-green-200 max-w-md text-center">
                <div className="flex items-center justify-center text-green-600 font-medium text-lg">
                  <CheckCircle2 className="w-6 h-6 mr-3" /> Thank you for joining!
                </div>
              </div>
            )}
          </div>

          {/* Right - Video Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[480px] mx-auto">
              <div className="aspect-[9/16] md:aspect-[3/4] rounded-3xl overflow-hidden bg-white shadow-2xl shadow-red-300/40 border-[10px] border-white">
                <video
                  ref={videoRef}
                  src="/video/New_Demo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 rounded-full bg-white/80 backdrop-blur-md border-none hover:bg-white shadow-lg"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5 text-slate-700" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-primary" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      image: "/image/scan-meds.png",
      title: "Scan and identify your meds",
    },
    {
      image: "/image/pill-mascot.png",
      title: "Take the right dose, on time",
    },
    {
      image: "/image/new_body_Animation.png",
      title: "See how it helps your body",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
            >
              {/* Text content - order changes based on index */}
              <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-center`}>
                <h2 className="text-3xl lg:text-5xl font-display font-bold tracking-tight text-slate-900 leading-[1.2] mb-6">
                  {feature.title}
                </h2>
                <div className="h-1.5 w-20 bg-primary rounded-full mb-8" />
              </div>

              {/* Image content - order changes based on index */}
              <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden ">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-contain p-8 md:p-12"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
}