
import { pgTable, text, serial, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const earlyAccessSignups = pgTable("early_access_signups", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  orgName: varchar("org_name", { length: 255 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  workEmail: varchar("work_email", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  orgType: varchar("org_type", { length: 100 }).notNull(), // Pharmacy, Clinic, etc.
  phone: varchar("phone", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const investorRequests = pgTable("investor_requests", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  firmName: varchar("firm_name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  // Arrays are stored as JSON text or we can just store comma separated strings for simplicity in this MVP
  investorTypes: text("investor_types"), // VC, Angel, etc. (JSON stringified array)
  checkSize: varchar("check_size", { length: 100 }), // <$50k, etc.
  stageFocus: varchar("stage_focus", { length: 100 }), // Pre seed, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertEarlyAccessSchema = createInsertSchema(earlyAccessSignups).omit({ id: true, createdAt: true });
export const insertDemoRequestSchema = createInsertSchema(demoRequests).omit({ id: true, createdAt: true });
export const insertInvestorRequestSchema = createInsertSchema(investorRequests).omit({ id: true, createdAt: true });

// === TYPES ===

export type InsertEarlyAccess = z.infer<typeof insertEarlyAccessSchema>;
export type EarlyAccessSignup = typeof earlyAccessSignups.$inferSelect;

export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type DemoRequest = typeof demoRequests.$inferSelect;

export type InsertInvestorRequest = z.infer<typeof insertInvestorRequestSchema>;
export type InvestorRequest = typeof investorRequests.$inferSelect;
