"use server";

import { db, siteTitle } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

interface UpdateSiteTitleProps {
  title?: string;
}

export async function UpdateSiteTitle(options: UpdateSiteTitleProps = {}) {
  try {
    const { title } = options;

    const updateSiteTitle = await db
      .update(siteTitle)
      .set({
        title: title?.toString(),
      })
      .where(eq(siteTitle.id, Number(1)))
      .returning();

    return updateSiteTitle;
  } catch (error: any) {
    console.log("Unable to Update Site Title ", error.message);
  }
}
