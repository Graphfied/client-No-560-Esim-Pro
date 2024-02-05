"use server";

import { db, mobiusers } from "@/lib/drizzle";
import { sendVerifyEmail } from "@/lib/verifyEmail";
import bcrypt from "bcrypt";

interface GetRegisterUserProps {
  name?: string;
  email?: string;
  password?: string;
}

function sendEmail(
  email: string,
  emailType: "VERIFY",
  userId: number
): Promise<void> {
  return sendVerifyEmail({ email, emailType, userId })
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((err: Error) => {
      console.error("Error sending email:", err);
      throw err; // Rethrow the error to be caught by the caller
    });
}

export async function GetRegisterUser(options: GetRegisterUserProps = {}) {
  try {
    const { name, email, password } = options;

    if (!name) {
      return {
        error: "Missing required field: Name",
      };
    }

    if (!email) {
      return {
        error: "Missing required field: Email",
      };
    }

    if (!password) {
      return {
        error: "Missing required field: Password",
      };
    }

    // make a hashPassword to store in database
    const hashPassword = await bcrypt.hash(password, 12);

    const createUser = await db
      .insert(mobiusers)
      .values({
        name: name,
        email: email,
        password: hashPassword,
        image: "",
        rewardbalance: "0",
        referencecode: "",
        firstpurchase: false,
        emailverify: false,
        membership: "regular",
      })
      .returning();

    await sendEmail(email, "VERIFY", createUser[0].userid);
    // console.log("User is Registered ---> ", createUser);

    return createUser;
  } catch (error: any) {
    console.log("Unable to RegisterUser ", error.message);

    let errorMessage = "An error occurred while registering the user.";

    if (error.message.includes("unique constraint")) {
      errorMessage =
        "Email address is already registered. Please use a different email.";
    } else {
      // Handle other specific error cases if needed
    }

    return {
      error: errorMessage,
    };
  }
}
