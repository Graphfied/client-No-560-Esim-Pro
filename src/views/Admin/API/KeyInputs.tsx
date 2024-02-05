"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpdateAdminKeys } from "@/actions/UpdateAdminKeys";
import { toast } from "sonner";
interface KeyInputsProps {
  adminKeys: {
    id: number;
    merchantid: string;
    apikey: string;
  };
}

export const KeyInputs = ({ adminKeys }: KeyInputsProps) => {
  const [openM, setOpenM] = useState(false);
  const [openP, setOpenP] = useState(false);
  const [isLoadingMerchant, setisLoadingMerchant] = useState(false);
  const [isLoadingApi, setisLoadingApi] = useState(false);
  const [merchantState, setMerchantState] = useState({
    value: adminKeys?.merchantid,
    isVisible: false,
    isFocused: false,
  });

  const [apiState, setApiState] = useState({
    value: adminKeys?.apikey,
    isVisible: false,
    isFocused: false,
  });

  const handleInputChange = (e: any, inputType: string) => {
    if (inputType === "merchant") {
      setMerchantState((prevState) => ({
        ...prevState,
        value: e.target.value,
        isFocused: true,
      }));
    } else if (inputType === "api") {
      setApiState((prevState) => ({
        ...prevState,
        value: e.target.value,
        isFocused: true,
      }));
    }
  };

  const handleSubmitMerchantId = async (id: string) => {
    setisLoadingMerchant(true);
    try {
      const response = await UpdateAdminKeys({
        merchantId: id as string,
      });
      toast.success(`Merchant Id Updated ${id}`);
      return response;
    } catch (error: any) {
      console.log("Error Updating the Merchant Id ", error.message);
      toast.error(error.message);
    } finally {
      setisLoadingMerchant(false);
    }
  };

  const handleSubmitApi = async (id: string) => {
    setisLoadingApi(true);
    try {
      const response = await UpdateAdminKeys({
        apiKey: id as string,
      });
      toast.success(`Api Key Updated ${id}`);
      return response;
    } catch (error: any) {
      console.log("Error Updating the Api Id ", error.message);
      toast.error(error.message);
    } finally {
      setisLoadingApi(false);
    }
  };

  return (
    <div className="lg:max-w-[90%] xl:max-w-[75%] mt-10">
      {/* Labels */}
      <div className="flex items-center px-5">
        <p className="text-txtgrey font-medium text-sm min-w-[8.5rem]">
          Key name
        </p>
        <p className="text-txtgrey font-medium text-sm">Value</p>
      </div>

      <div className="space-y-8 bg-white rounded-md p-5 mt-5">
        {/* MERCHANT ID */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <p className="font-medium text-sm mb-3 md:mb-0 min-w-28">
            Merchant ID
          </p>
          <div className="flex flex-col sm:flex-row w-full md:pl-5">
            <div className="flex items-center gap-x-3 mb-3 md:mb-0 w-full">
              {/* Input field */}
              <input
                type={merchantState.isVisible ? "text" : "password"}
                placeholder="Enter your merchant ID"
                value={merchantState.value}
                onFocus={(e) => handleInputChange(e, "merchant")}
                onBlur={() =>
                  setMerchantState((prevState) => ({
                    ...prevState,
                    isFocused: false,
                  }))
                }
                onChange={(e) => handleInputChange(e, "merchant")}
                className={`p-3 text-sm w-full sm:min-w-full bg-gray-200 rounded-sm`}
              />
              {/* Hide / Show Button */}
              <Button
                variant={"outline"}
                onClick={() =>
                  setMerchantState((prevState) => ({
                    ...prevState,
                    isVisible: !prevState.isVisible,
                  }))
                }
                className="h-11"
              >
                <FiEye />
              </Button>
            </div>

            {/* Submit Button */}
            <div className="sm:ml-[4.5rem]">
              <Dialog open={openM} onOpenChange={setOpenM}>
                <DialogTrigger asChild>
                  <Button
                    disabled={isLoadingMerchant}
                    className="bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF] w-full"
                  >
                    Update
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Update Merchant ID</DialogTitle>
                  </DialogHeader>
                  <p>Are you sure you want to change the merchant ID?</p>
                  <DialogFooter>
                    <Button
                      disabled={isLoadingMerchant}
                      onClick={() => {
                        handleSubmitMerchantId(merchantState?.value);
                        setOpenM(false);
                      }}
                      className="w-full bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]"
                    >
                      Yes
                    </Button>
                    <Button
                      variant={"outline"}
                      className="w-full hover:bg-[#38BDEF] hover:text-white text-[#38BDEF] bg-white border border-[#38BDEF]"
                      onClick={() => setOpenM(false)}
                    >
                      No
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* PRIMARY API KEY*/}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <p className="font-medium text-sm mb-3 md:mb-0 min-w-28">
            Primary API Key
          </p>
          <div className="flex flex-col sm:flex-row w-full md:pl-5">
            <div className="flex items-center gap-x-3 mb-3 md:mb-0 w-full">
              {/* Input Field */}
              <input
                type={apiState.isVisible ? "text" : "password"}
                placeholder="Enter your primary API key"
                value={apiState.value}
                onFocus={(e) => handleInputChange(e, "api")}
                onBlur={() =>
                  setApiState((prevState) => ({
                    ...prevState,
                    isFocused: false,
                  }))
                }
                onChange={(e) => handleInputChange(e, "api")}
                className={`p-3 text-sm w-full sm:min-w-full bg-gray-200 rounded-sm`}
              />

              {/* Hide / Show Button */}
              <Button
                variant={"outline"}
                onClick={() =>
                  setApiState((prevState) => ({
                    ...prevState,
                    isVisible: !prevState.isVisible,
                  }))
                }
                className="h-11"
              >
                <FiEye />
              </Button>
            </div>

            {/* Submit Button */}
            <div className="sm:ml-[4.5rem]">
              <Dialog open={openP} onOpenChange={setOpenP}>
                <DialogTrigger asChild>
                  <Button
                    disabled={isLoadingApi}
                    className="bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF] w-full"
                  >
                    Update
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Update primary API key</DialogTitle>
                  </DialogHeader>
                  <p>Are you sure you want to change the primary API key?</p>
                  <DialogFooter>
                    <Button
                      disabled={isLoadingApi}
                      onClick={() => {
                        handleSubmitApi(apiState?.value);
                        setOpenP(false);
                      }}
                      className="w-full bg-[#38BDEF] hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]"
                    >
                      Yes
                    </Button>
                    <Button
                      variant={"outline"}
                      className="w-full hover:bg-[#38BDEF] hover:text-white text-[#38BDEF] bg-white border border-[#38BDEF]"
                      onClick={() => setOpenP(false)}
                    >
                      No
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
