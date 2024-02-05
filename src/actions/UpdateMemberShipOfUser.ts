"use server";

import { db, mobiusers } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface UpdateMemberShipOfUserProps {
  id?: number;
  memberShip?: string;
}

export async function UpdateMemberShipOfUser(
  options: UpdateMemberShipOfUserProps = {}
) {
  try {
    const { id, memberShip } = options;

    if (!id) {
      return {
        error: "User id is Missing",
      };
    }

    const user = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.userid, id));

    if (!user) {
      return {
        error: "User Not Found ",
      };
    }

    let updateUser;

    if (user) {
      updateUser = await db
        .update(mobiusers)
        .set({
          membership: memberShip,
        })
        .where(eq(mobiusers.userid, user[0].userid))
        .returning();
    }

    revalidatePath(`/admin/users`);
    return updateUser;
  } catch (error: any) {
    console.log("Unable to update membership of user ", error.message);
  }
}
