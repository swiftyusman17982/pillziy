import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { InsertEarlyAccess, InsertDemoRequest, InsertInvestorRequest } from "@shared/schema";

export function useEarlyAccess() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertEarlyAccess) => {
      const res = await fetch(api.earlyAccess.create.path, {
        method: api.earlyAccess.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error("This email is already on the list!");
        }
        throw new Error("Failed to join early access.");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Welcome aboard!",
        description: "You've been added to our early access list.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDemoRequest() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertDemoRequest) => {
      const res = await fetch(api.demoRequest.create.path, {
        method: api.demoRequest.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit demo request.");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Received",
        description: "We'll be in touch shortly to schedule your demo.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useInvestorRequest() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertInvestorRequest) => {
      const res = await fetch(api.investorRequest.create.path, {
        method: api.investorRequest.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit investor request.");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Deck Requested",
        description: "Thank you for your interest. We will review your request.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
