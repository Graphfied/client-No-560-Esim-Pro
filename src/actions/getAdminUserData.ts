"use server";

import { asc } from "drizzle-orm";
import { db, mobiusers, orders } from "../lib/drizzle";

export async function getAdminUserData() {
  try {
    const data = await db.select().from(mobiusers).orderBy(asc(mobiusers.name));

    return data;
  } catch (error: any) {
    // throw new Error("Unable to fetch users data from admin Panel!");
    console.log("Unable to fetch users data from admin Panel!", error.message);
  }
}
