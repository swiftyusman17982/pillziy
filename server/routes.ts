import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { insertEarlyAccessSchema, insertDemoRequestSchema, insertInvestorRequestSchema } from "@shared/schema";
import { sendDemoRequestEmail } from "./mail";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.post(api.earlyAccess.create.path, async (req, res) => {
    const parsed = insertEarlyAccessSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    console.log("Early Access Request:", parsed.data);
    res.json({ success: true, message: "Welcome aboard!" });
  });

  app.post(api.demoRequest.create.path, async (req, res) => {
    const parsed = insertDemoRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid request data" });
    }
    console.log("Demo Request:", parsed.data);
    try {
      await sendDemoRequestEmail(parsed.data);
      res.json({ success: true, message: "Request received" });
    } catch (error) {
      console.error("Failed to send demo request email:", error);
      res.status(500).json({ message: "Request received but email notification failed" });
    }
  });

  app.post(api.investorRequest.create.path, async (req, res) => {
    const parsed = insertInvestorRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid request data" });
    }
    console.log("Investor Request:", parsed.data);
    res.json({ success: true, message: "Deck requested" });
  });

  return httpServer;
}
