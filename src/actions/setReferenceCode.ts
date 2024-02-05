"use server";
import { db, mobiusers } from "../lib/drizzle";
import { eq } from "drizzle-orm";
import voucher_codes from "voucher-code-generator";

const referencecodes = voucher_codes.generate({
  length: 4,
  count: 1,
  charset: "0123456789",
});

interface setRefereceCodeProps {
  userid?: number;
}

export default async function setReferenceCode(
  props: setRefereceCodeProps = {}
) {
  try {
    if (!props.userid) {
      return null;
    }

    const data = await db
      .update(mobiusers)
      .set({ referencecode: referencecodes[0] })
      .where(eq(mobiusers.userid, props.userid))
      .returning();

    return data;
  } catch (error: any) {
    // return null;
    console.log("Error in setting reference Code", error.message);
  }
}
