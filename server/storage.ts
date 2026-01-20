
import { db } from "./db";
import {
  earlyAccessSignups,
  demoRequests,
  investorRequests,
  type InsertEarlyAccess,
  type EarlyAccessSignup,
  type InsertDemoRequest,
  type DemoRequest,
  type InsertInvestorRequest,
  type InvestorRequest,
} from "@shared/schema";

export interface IStorage {
  // Early Access
  createEarlyAccessSignup(signup: InsertEarlyAccess): Promise<EarlyAccessSignup>;
  
  // Demo Request
  createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest>;

  // Investor Request
  createInvestorRequest(request: InsertInvestorRequest): Promise<InvestorRequest>;
}

export class DatabaseStorage implements IStorage {
  // Early Access
  async createEarlyAccessSignup(signup: InsertEarlyAccess): Promise<EarlyAccessSignup> {
    const [newSignup] = await db
      .insert(earlyAccessSignups)
      .values(signup)
      .returning();
    return newSignup;
  }

  // Demo Request
  async createDemoRequest(request: InsertDemoRequest): Promise<DemoRequest> {
    const [newRequest] = await db
      .insert(demoRequests)
      .values(request)
      .returning();
    return newRequest;
  }

  // Investor Request
  async createInvestorRequest(request: InsertInvestorRequest): Promise<InvestorRequest> {
    const [newRequest] = await db
      .insert(investorRequests)
      .values(request)
      .returning();
    return newRequest;
  }
}

export const storage = new DatabaseStorage();
