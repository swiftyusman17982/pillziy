import {
        earlyAccess, demoRequests, investorRequests,
        type EarlyAccess, type InsertEarlyAccess,
        type DemoRequest, type InsertDemoRequest,
        type InvestorRequest, type InsertInvestorRequest
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
        // Early Access
        createEarlyAccess(data: InsertEarlyAccess): Promise<EarlyAccess>;
        getEarlyAccessByEmail(email: string): Promise<EarlyAccess | undefined>;

        // Demo Requests
        createDemoRequest(data: InsertDemoRequest): Promise<DemoRequest>;

        // Investor Requests
        createInvestorRequest(data: InsertInvestorRequest): Promise<InvestorRequest>;
}

export class DatabaseStorage implements IStorage {
        async createEarlyAccess(data: InsertEarlyAccess): Promise<EarlyAccess> {
                const [result] = await db.insert(earlyAccess).values(data).returning();
                return result;
        }

        async getEarlyAccessByEmail(email: string): Promise<EarlyAccess | undefined> {
                const [result] = await db.select().from(earlyAccess).where(eq(earlyAccess.email, email));
                return result;
        }

        async createDemoRequest(data: InsertDemoRequest): Promise<DemoRequest> {
                const [result] = await db.insert(demoRequests).values(data).returning();
                return result;
        }

        async createInvestorRequest(data: InsertInvestorRequest): Promise<InvestorRequest> {
                const [result] = await db.insert(investorRequests).values(data).returning();
                return result;
        }
}

export const storage = new DatabaseStorage();
