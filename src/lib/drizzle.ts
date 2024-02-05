import {
  pgTable,
  varchar,
  integer,
  serial,
  numeric,
  boolean,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

export const orders = pgTable("orders", {
  id: serial("id"),
  userid: varchar("userid", { length: 255 }),
  orderid: varchar("orderid", { length: 255 }),
  orderstate: varchar("orderstate", { length: 255 }),
  merchantid: varchar("merchantid", { length: 255 }),
  externalid: varchar("externalid", { length: 255 }),
  currencycode: varchar("currencycode", { length: 255 }),
  createdtime: varchar("createdtime", { length: 255 }),
  updatedtime: varchar("updatedtime", { length: 255 }),
  productid: varchar("productid", { length: 255 }),
  productcategory: varchar("productcategory", { length: 255 }),
  cost: varchar("cost", { length: 255 }),
  title: varchar("title", { length: 255 }),
  provider: varchar("provider", { length: 255 }),
  providerid: integer("providerid"),
  providername: varchar("providername", { length: 255 }),
  providerlogo: varchar("providerlogo", { length: 255 }),
  qrcode: varchar("qrcode", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  isrefundable: boolean("isrefundable"),
  accesspointname: varchar("accesspointname", { length: 255 }),
  activationcode: varchar("activationcode", { length: 255 }),
  smdpaddress: varchar("smdpaddress", { length: 255 }),
  activationinstructions: varchar("activationinstructions", { length: 512 }),
});

export const mobiusers = pgTable("mobiusers", {
  userid: serial("userid"),
  // userid: varchar("userid"),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 255 }),
  emailverify: boolean("emailverify"),
  rewardbalance: numeric("rewardbalance"),
  referencecode: varchar("referencecode", { length: 4 }),
  firstpurchase: boolean("firstpurchase"),
  verifytoken: varchar("verifytoken", { length: 255 }),
  verifytokenexpiry: timestamp("verifytokenexpiry"),
  membership: varchar("membership", { length: 255 }),
});

export const dashboardconfig = pgTable("dashboardconfig", {
  id: numeric("id"),
  reward: numeric("reward"),
  cashbackpercent: numeric("cashbackpercent"),
  discountpercent: numeric("discountpercent"),
});

export const rewardhistory = pgTable("rewardhistory", {
  // transactionid: varchar("transactionid", { length: 255 }),
  transactionid: uuid("transactionid"),
  datetime: varchar("datetime", { length: 255 }),
  email: varchar("email", { length: 255 }),
  type: varchar("type", { length: 255 }),
  amount: numeric("amount"),
  rewardbalance: numeric("rewardbalance"),
});

export const adminKeys = pgTable("adminkeys", {
  id: serial("id"),
  merchantid: varchar("merchantid", { length: 255 }),
  apikey: varchar("apikey", { length: 255 }),
});

export const siteTitle = pgTable("sitetitle", {
  id: serial("id"),
  title: varchar("title", { length: 255 }),
});
/* CREATE TABLE rewardhistory (
        transactionid serial primary key,
        datetime VARCHAR(255),
       email VARCHAR(255),
      type VARCHAR(255),
      amount Numeric(32,2),
      rewardbalance Numeric(32,2)
      );
       */

/* CREATE TABLE dashboardconfig (
        id Numeric(8,0) primary key,
        reward  Numeric(32,2),
        cashbackpercent Numeric(32,2),
      discountpercent Numeric(32,2)
      );
       */

/* export const cartTable=pgTable('cart',{
    id: serial("id"),
    user_id: varchar("user_id",{length: 255}).notNull(),
    product_id: varchar("product_id",{length: 255}).notNull(),
    quantity: integer("quantity").notNull(),
    price: integer("price"),
    title: varchar("title",{length: 255}),
    imagename: varchar("imagename",{length: 255}),
    size: varchar("size",{length: 50}),
    color: varchar("color",{length: 50})
    
    }); */

export const db = drizzle(sql);
