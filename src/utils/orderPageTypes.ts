export interface LineItems {
  iccid?: string;
  smdpAddress?: string;
  localProfileAssistant?: string;
  accessPointName?: string;
  activationCode?: string;
  qrCode?: string;
  phoneNumber?: string;
  activationInstructions?: string;
  iAccount?: string;
  confCode?: string;
  walletAuthTransactionId?: string;
  rechargable?: string;
  inventoryId?: string;
  imsi?: string;
  // Add more properties as needed
}

export const extractLineItemDetails = (lineItem: {
  lineItemDetails: { name: string; value: string }[];
}): LineItems => {
  const lineItems: LineItems = {};

  lineItem?.lineItemDetails?.forEach((detail) => {
    switch (detail.name) {
      case "ICCID":
        lineItems.iccid = detail.value;
        break;
      case "SMDP_ADDRESS":
        lineItems.smdpAddress = detail.value;
        break;
      case "LOCAL_PROFILE_ASSISTANT":
        lineItems.localProfileAssistant = detail.value;
        break;
      case "ACCESS_POINT_NAME":
        lineItems.accessPointName = detail.value;
        break;
      case "ACTIVATION_CODE":
        lineItems.activationCode = detail.value;
        break;
      case "QR_CODE":
        lineItems.qrCode = detail.value;
        break;
      case "PHONE_NUMBER":
        lineItems.phoneNumber = detail.value;
        break;
      case "ACTIVATION_INSTRUCTIONS":
        lineItems.activationInstructions = detail.value;
        break;
      case "I_ACCOUNT":
        lineItems.iAccount = detail.value;
        break;
      case "CONF_CODE":
        lineItems.confCode = detail.value;
        break;
      case "WALLET_AUTH_TRANSACTION_ID":
        lineItems.walletAuthTransactionId = detail.value;
        break;
      case "RECHARGABLE":
        lineItems.rechargable = detail.value;
        break;
      case "INVENTORY_ID":
        lineItems.inventoryId = detail.value;
        break;
      case "IMSI":
        lineItems.imsi = detail.value;
        break;
      // Add more cases as needed for other details
    }
  });

  return lineItems;
};
