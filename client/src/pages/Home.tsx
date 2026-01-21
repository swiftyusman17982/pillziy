import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { api } from "@shared/routes";

function HeroSection() {
  const [isJoined, setIsJoined] = useState(false);
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
          {/* Left - Text & Form */}
          <div className="max-w-2xl">
            {/* <div className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-red-600 mr-2 animate-pulse"></span>
              Coming Soon
            </div> */}

            <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-tight text-slate-900 leading-[1.1] mb-8">
              Save time.<br />
              Healthcare online
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              One app for all your healthcare needs — no more downloading dozens of applications.
            </p>

            <div className="bg-white p-2 rounded-2xl shadow-2xl shadow-red-100/40 border border-slate-100 max-w-md">
              {isJoined ? (
                <div className="h-14 flex items-center justify-center px-6 text-green-600 font-medium text-lg">
                  <CheckCircle2 className="w-6 h-6 mr-3" /> Thank you for joining!
                </div>
              ) : (
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
                              className="border-0 shadow-none focus-visible:ring-0 pl-6 h-14 text-base rounded-xl md:rounded-full"
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
                      className="h-14 px-10 rounded-xl md:rounded-full font-bold bg-primary hover:bg-primary/90 text-white text-lg w-full md:w-auto"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Joining..." : "Get Early Access"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
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
                  src="/video/DemoVideo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
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

export default function Home() {
  return (
    <HeroSection />
  );
}