import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const earlyAccess = pgTable("early_access", {
        id: serial("id").primaryKey(),
        email: text("email").notNull().unique(),
        createdAt: timestamp("created_at").defaultNow(),
});

export const demoRequests = pgTable("demo_requests", {
        id: serial("id").primaryKey(),
        orgName: text("org_name").notNull(),
        fullName: text("full_name").notNull(),
        workEmail: text("work_email").notNull(),
        role: text("role").notNull(),
        orgType: text("org_type").notNull(),
        phone: text("phone").notNull(),
        createdAt: timestamp("created_at").defaultNow(),
});

export const investorRequests = pgTable("investor_requests", {
        id: serial("id").primaryKey(),
        orgName: text("org_name").notNull(),
        fullName: text("full_name").notNull(),
        workEmail: text("work_email").notNull(),
        role: text("role").notNull(),
        phone: text("phone").notNull(),
        createdAt: timestamp("created_at").defaultNow(),
});

export const insertEarlyAccessSchema = createInsertSchema(earlyAccess).pick({
        email: true,
}).extend({
        email: z.string().email(),
});

export const insertDemoRequestSchema = createInsertSchema(demoRequests).pick({
        orgName: true,
        fullName: true,
        workEmail: true,
        role: true,
        orgType: true,
        phone: true,
}).extend({
        workEmail: z.string().email(),
});

export const insertInvestorRequestSchema = createInsertSchema(investorRequests).pick({
        orgName: true,
        fullName: true,
        workEmail: true,
        role: true,
        phone: true,
}).extend({
        workEmail: z.string().email(),
});

export type InsertEarlyAccess = z.infer<typeof insertEarlyAccessSchema>;
export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type InsertInvestorRequest = z.infer<typeof insertInvestorRequestSchema>;
export type EarlyAccess = typeof earlyAccess.$inferSelect;
export type DemoRequest = typeof demoRequests.$inferSelect;
export type InvestorRequest = typeof investorRequests.$inferSelect;
