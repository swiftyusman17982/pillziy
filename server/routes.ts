
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Early Access Signup
  app.post(api.earlyAccess.create.path, async (req, res) => {
    try {
      const input = api.earlyAccess.create.input.parse(req.body);
      const result = await storage.createEarlyAccessSignup(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      // Handle unique constraint violation for email
      if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
         return res.status(409).json({ message: "Email already registered" });
      }
      throw err;
    }
  });

  // Demo Request
  app.post(api.demoRequest.create.path, async (req, res) => {
    try {
      const input = api.demoRequest.create.input.parse(req.body);
      const result = await storage.createDemoRequest(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Investor Request
  app.post(api.investorRequest.create.path, async (req, res) => {
    try {
      const input = api.investorRequest.create.input.parse(req.body);
      const result = await storage.createInvestorRequest(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
