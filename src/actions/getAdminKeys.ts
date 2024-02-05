"use server";

import { adminKeys, db } from "@/lib/drizzle";

export async function getAdminKeys() {
  try {
    // check if the adminKeys table is empty
    const firstRecord = await db.select().from(adminKeys).limit(1);

    if (firstRecord.length === 0) {
      // If the table is empty, insert the record

      const insertAdminKeys = await db
        .insert(adminKeys)
        .values({
          merchantid: "6d58aede-871a-4556-83f0-9b0e0c31602f".toString(),
          apikey: "104883b5fe984321a2ba68470504b267".toString(),
        })
        .returning();

      return insertAdminKeys;
    } else {
      // If the table is not empty, retrieve the existing records
      const getAdminKeys = await db.select().from(adminKeys);
      return getAdminKeys;
    }
  } catch (error: any) {
    console.log("Unable to insert or / update the Admin Keys", error.message);
  }
}
