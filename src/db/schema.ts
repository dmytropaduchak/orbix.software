import { pgTable, serial, timestamp, boolean, jsonb, varchar } from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";


export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  passwordHash: varchar("password_hash").notNull(),
  verification: boolean("verification"),
  verificationToken: varchar("verification_token"),
  verificationExpiredAt: timestamp("verification_expired_at"),
  passwordResetToken: varchar("password_reset_token"),
  passwordResetExpiredAt: timestamp("password_reset_expired_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const widgets = pgTable("widgets", {
  id: serial("id").primaryKey(),
  uuid: varchar("uuid"),
  type: varchar("type"),
  name: varchar("name"),
  config: jsonb("config"),
  userId: serial("user_id"),
  active: boolean("active").default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  uuid: varchar("uuid"),
  userId: serial("user_id"),
  widgetId: serial("widget_id"),
  data: jsonb("data"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
  
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  subscriptionId: serial("subscription_id"),
  uuid: varchar("uuid"),
  data: jsonb("data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const googlePlaces = pgTable("google_places", {
  id: serial("id").primaryKey(),
  uuid: varchar("uuid").notNull(),
  data: jsonb("data"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// export const usersRelations = relations(users, ({ many }) => ({
//   // widgets: many(widgets),
// }));
    
    //   publicId: varchar("public_id", { length: 50 }).notNull().unique(), // for embed URL

    // // Place Information
    // placeId: varchar("place_id", { length: 255 }).notNull(), // Google Place ID
    // placeName: varchar("place_name", { length: 500 }),
    // placeAddress: text("place_address"),
    // placeMapsUrl: text("place_maps_url"),
    
    // // Widget Configuration
    // name: varchar("name", { length: 255 }).notNull(),
    // layout: varchar("layout", { length: 20 }).notNull().default("grid"), // grid, carousel, badge, list
    // theme: varchar("theme", { length: 20 }).notNull().default("light"), // light, dark, auto
    // primaryColor: varchar("primary_color", { length: 7 }).default("#1976d2"),
    // maxReviews: integer("max_reviews").notNull().default(10),
    // minRating: integer("min_rating").default(1), // 1-5
    // showDate: boolean("show_date").notNull().default(true),
    // showRating: boolean("show_rating").notNull().default(true),
    // showAttribution: boolean("show_attribution").notNull().default(true),
    // customCss: text("custom_css"),
    
    // // Cached Reviews & Place Data
    // cachedData: jsonb("cached_data").$type<{
    //   rating?: number;
    //   userRatingsTotal?: number;
    //   reviews: Array<{
    //     id: string;
    //     authorName: string;
    //     authorPhoto?: string;
    //     rating: number;
    //     text?: string;
    //     relativeTime?: string;
    //     time?: string;
    //   }>;
    // }>().default({ reviews: [] }),
    // cachedAt: timestamp("cached_at"),

    // // Subscription / Billing
    // stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    // planName: varchar("plan_name", { length: 100 }).default("starter"),
    // price: integer("price").default(500), // in cents
    // interval: varchar("interval", { length: 20 }).default("month"),
    // reviewRefreshHours: integer("review_refresh_hours").default(24),
    // subscriptionStatus: varchar("subscription_status", { length: 50 }), // active, canceled, past_due, trialing
    // currentPeriodStart: timestamp("current_period_start"),
    // currentPeriodEnd: timestamp("current_period_end"),
    // cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
    
    // // Settings
    // active: boolean("active").notNull().default(true),

// export const widgetsRelations = relations(widgets, ({ one }) => ({
//   user: one(users, {
//     fields: [widgets.userId],
//     references: [users.id],
//   }),
// }));
