import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const orderTable = pgTable("order", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  customerId: varchar({ length: 255 }).notNull(),
  productId: varchar({ length: 255 }).notNull().unique(),
  amount: integer().notNull(),
  status: varchar({ length: 50 }).notNull(),
});
