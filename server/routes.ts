import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { insertEarlyAccessSchema, insertDemoRequestSchema, insertInvestorRequestSchema } from "@shared/schema";
import { sendDemoRequestEmail, sendEarlyAccessEmail } from "./mail";
import { storage } from "./storage";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.post(api.earlyAccess.create.path, async (req, res) => {
    console.log("[API] Early Access Request Received:", req.body);
    const parsed = insertEarlyAccessSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log("[API] Validation failed:", parsed.error.format());
      return res.status(400).json({ message: "Invalid email address" });
    }

    try {
      console.log("[API] Checking for existing email:", parsed.data.email);
      const existing = await storage.getEarlyAccessByEmail(parsed.data.email);
      if (existing) {
        console.log("[API] Email already exists in DB");
        return res.json({ success: true, message: "You're already on the list!" });
      }

      console.log("[API] Saving to database...");
      const result = await storage.createEarlyAccess(parsed.data);
      console.log("[API] Saved successfully:", result);

      console.log("[API] Sending email...");
      await sendEarlyAccessEmail(parsed.data.email);

      res.json({ success: true, message: "Welcome aboard!" });
    } catch (error) {
      console.error("[API] Error processing request:", error);
      res.status(500).json({ message: "Internal server error. Please try again later." });
    }
  });

  app.post(api.demoRequest.create.path, async (req, res) => {
    console.log("[API] Demo Request Received:", req.body);
    const parsed = insertDemoRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log("[API] Validation failed:", parsed.error.format());
      const phoneError = parsed.error.errors.find((e: any) => e.path.includes('phone'));
      const message = phoneError ? phoneError.message : "Invalid request data";
      return res.status(400).json({ message });
    }

    try {
      console.log("[API] Saving demo request to DB...");
      const result = await storage.createDemoRequest(parsed.data);
      console.log("[API] Saved demo request successfully:", result);

      console.log("[API] Sending demo request email...");
      await sendDemoRequestEmail(parsed.data);

      res.json({ success: true, message: "Request received" });
    } catch (error) {
      console.error("[API] Error processing demo request:", error);
      res.status(500).json({ message: "Internal server error. Please try again later." });
    }
  });

  app.post(api.investorRequest.create.path, async (req, res) => {
    console.log("[API] Investor Request Received:", req.body);
    const parsed = insertInvestorRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log("[API] Validation failed:", parsed.error.format());
      return res.status(400).json({ message: "Invalid request data" });
    }

    try {
      console.log("[API] Saving investor request to DB...");
      const result = await storage.createInvestorRequest(parsed.data);
      console.log("[API] Saved investor request successfully:", result);

      res.json({ success: true, message: "Deck requested" });
    } catch (error) {
      console.error("[API] Error processing investor request:", error);
      res.status(500).json({ message: "Internal server error. Please try again later." });
    }
  });

  return httpServer;
}

