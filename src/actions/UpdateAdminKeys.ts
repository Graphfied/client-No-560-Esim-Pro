"use server";

import { adminKeys, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface UpdateAdminKeysProps {
  merchantId?: string;
  apiKey?: string;
}
export async function UpdateAdminKeys(options: UpdateAdminKeysProps = {}) {
  try {
    const { merchantId, apiKey } = options;

    if (!merchantId || !apiKey) {
      console.log("merchantId and apiKey are required");
    }

    const updateKeys = await db
      .update(adminKeys)
      .set({
        merchantid: merchantId,
        apikey: apiKey,
      })
      .where(eq(adminKeys.id, Number(1)))
      .returning();

    revalidatePath(`/admin/api`);
    return updateKeys;
  } catch (error: any) {
    console.log("Unable to update the Admin Keys ", error.message);
  }
}
