import nodemailer, { TransportOptions } from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "muhammadmahdi512@gmail.com",
    pass: "jtupfmwpoevynmck",
  },
} as TransportOptions);
export const mailOptions = {
  from: "muhammadmahdi512@gmail.com",
};
