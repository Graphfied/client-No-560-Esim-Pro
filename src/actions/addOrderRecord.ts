"use server";
import { db, orders } from "../lib/drizzle";
import getCurrentUser from "./getCurrentUser";

export interface addOrderRecordProps {
  userid?: string;
  orderid?: string;
  orderstate?: "Created" | "Completed" | "Expired" | "Cancelled" | "Processing";
  merchantid?: string;
  externalid?: string;
  currencycode?: string;
  createdtime?: string;
  updatedtime?: string;
  productid?: string;
  productcategory?: string;
  cost?: string;
  title?: string;
  provider?: string;
  providerid?: number;
  providername?: string;
  providerlogo?: string;
  qrcode?: string;
  phone?: string;
  isrefundable?: boolean;
  accesspointname?: string;
  activationcode?: string;
  smdpaddress?: string;
  activationinstructions?: string;
}

export const addOrderRecord = async (options: addOrderRecordProps = {}) => {
  const {
    userid,
    orderid,
    orderstate,
    merchantid,
    externalid,
    currencycode,
    createdtime,
    updatedtime,
    productid,
    productcategory,
    cost,
    title,
    provider,
    providerid,
    providername,
    providerlogo,
    qrcode,
    phone,
    isrefundable,
    accesspointname,
    activationcode,
    smdpaddress,
    activationinstructions,
  } = options;

  try {
    const currentUser: any = await getCurrentUser();
    // if there is not a current user, return an error

    if (!currentUser) {
      throw new Error("User not found , Order not created");
    }

    const res = await db
      .insert(orders)
      .values({
        userid: currentUser.userid,
        orderid: orderid,
        orderstate: orderstate,
        merchantid: merchantid,
        externalid: externalid,
        currencycode: currencycode,
        createdtime: createdtime,
        updatedtime: updatedtime,
        productid: productid,
        productcategory: productcategory,
        cost: cost,
        title: title,
        provider: provider,
        providerid: providerid,
        providername: providername,
        providerlogo: providerlogo,
        qrcode: qrcode,
        phone: phone,
        isrefundable: isrefundable,
        accesspointname: accesspointname,
        activationcode: activationcode,
        smdpaddress: smdpaddress,
        activationinstructions: activationinstructions,
      })
      .returning();

    return res;
  } catch (error: any) {
    console.log("Error in getting data ", error.message);
    // throw new Error("Error in getting data");
  }
};
