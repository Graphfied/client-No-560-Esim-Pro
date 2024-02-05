import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { mailOptions, transporter } from "./nodeMailer";
import { db, mobiusers } from "./drizzle";
import { eq } from "drizzle-orm";

interface sendVerifyEmailProps {
  email?: string;
  emailType?: "VERIFY";
  userId?: number;
}

export const sendVerifyEmail = async (options: sendVerifyEmailProps = {}) => {
  try {
    const { email, emailType, userId } = options;

    // Check if userId is provided
    if (userId === undefined) {
      throw new Error("userId is required");
    }

    // Convert userId to string and create hashed token
    const userIdString = userId.toString();
    const hashedToken = await bcrypt.hash(userIdString, 12);

    if (emailType === "VERIFY") {
      const expirationTime = new Date(Date.now() + 3600000);
      await db
        .update(mobiusers)
        .set({
          verifytoken: hashedToken,
          verifytokenexpiry: expirationTime,
        })
        .where(eq(mobiusers.userid, userId))
        .returning();
    }

    // Use hashedToken in your email sending logic or other purposes
    // console.log("Hashed Token:", hashedToken);

    // Prepare email content based on email type
    const emailContent = getEmailContent(emailType!, hashedToken);

    // Build final mail options
    const finalMailOptions: nodemailer.SendMailOptions = {
      ...mailOptions,
      ...{
        html: emailContent,
        to: email,
        subject: "Verify Email",
      },
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(finalMailOptions, (error: any, info: any) => {
        if (error) {
          console.error("Email error:", error);
          reject(error);
        } else {
          // console.log("Email sent:", info?.response);
          resolve(info);
        }
      });
    });
  } catch (error: any) {
    console.log(` Unable to Send Email `, error.message);
  }
};

// Separate email content based on email type into reusable templates
const getEmailContent = (emailType: string, hashedToken: string) => {
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verifyemail?token=${hashedToken}`;
  // const resetPasswordLink = `${process.env.NEXT_PUBLIC_APP_URL}/resetpassword?token=${hashedToken}`;
  const setLink = `${process.env.NEXT_PUBLIC_APP_URL}/login?token=${hashedToken}`;

  let emailContent = "";

  if (emailType === "VERIFY") {
    emailContent = `
            <p>Click <a href="${verificationLink}">here</a> to verify your email or copy and paste the link below in your browser. <br>${verificationLink}</p>
        `;
  } else if (emailType === "RESET") {
    // emailContent = `
    //         <p>Click <a href="${resetPasswordLink}">here</a> to reset your password or copy and paste the link below in your browser. <br>${resetPasswordLink}</p>
    //     `;
  } else if (emailType === "SET") {
    // emailContent = `
    //         <p class="reset-message">YOUR PASSWORD HAS BEEN RESET! <br> ${setLink}</p>
    //     `;
  } else {
    throw new Error("Invalid email type");
  }

  // HTML and CSS styles
  const htmlAndStyles = `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }

                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                a {
                    color: #007BFF;
                    text-decoration: none;
                    font-weight: bold;
                }

                p {
                    line-height: 1.6;
                    margin: 15px 0;
                }

                .reset-message {
                    color: #28a745;
                }

                .error-message {
                    color: #dc3545;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                ${emailContent}
            </div>
        </body>
        </html>
    `;

  return htmlAndStyles;
};
