"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function ToggleButtons() {
  const searchParams = useSearchParams();
  const rout = useRouter();

  const params = searchParams.get("type");
  const subTypeParams = searchParams.get("subType");
  const handleRoute = () => {
    params == "history"
      ? rout.push("?type=esim")
      : rout.push("?type=history&subType=all");
  };

  const handleHistoryButtons = (value: string) => {
    if (params == "history") {
      rout.push(`?type=history&subType=${value}`);
    }
  };
  return (
    <>
      <div className="h-[3rem] w-[18rem] sm:w-[26rem] bg-darkblue grid grid-cols-2 rounded-full align-center overflow-hidden text-white">
        <p
          className={`flex justify-center items-center cursor-pointer ${
            params != "history" ? "bg-btnblue rounded-full" : ""
          }`}
          onClick={() => handleRoute()}
        >
          My eSIMs
        </p>
        <p
          className={`flex justify-center items-center cursor-pointer ${
            params == "history" ? "bg-btnblue rounded-full" : ""
          }`}
          onClick={() => handleRoute()}
        >
          Order History
        </p>
      </div>

      {params === "history" && (
        <div className="flex gap-x-3 items-center justify-start px-2 w-full">
          {/* All orders */}
          <button
            onClick={() => handleHistoryButtons("all")}
            className={` border border-darkblue text-xs px-2 py-1 rounded-full font-normal hover:bg-sky-900 hover:text-white
            ${
              subTypeParams === "all"
                ? "bg-darkblue text-white"
                : "bg-white text-darkblue"
            }
            `}
          >
            All Orders
          </button>

          {/* My Esim */}
          <button
            onClick={() => handleHistoryButtons("esims")}
            className={`bg-darkblue border border-darkblue text-xs px-2 py-1 rounded-full font-normal
            hover:bg-sky-900 hover:text-white
                 ${
                   subTypeParams === "esims"
                     ? "bg-darkblue text-white"
                     : "bg-white text-darkblue"
                 }
            `}
          >
            eSIMs
          </button>

          {/* Topups */}
          <button
            onClick={() => handleHistoryButtons("topups")}
            className={`bg-darkblue border border-darkblue text-xs px-2 py-1 rounded-full font-normal 
            hover:bg-sky-900 hover:text-white
                 ${
                   subTypeParams === "topups"
                     ? "bg-darkblue text-white"
                     : "bg-white text-darkblue"
                 }
            `}
          >
            Topups
          </button>
        </div>
      )}
    </>
  );
}
