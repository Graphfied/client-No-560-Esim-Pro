"use client";

import Image from "next/image";
import React, { useState } from "react";
import { EditUser } from "./EditUser";
import { EditMembership } from "./EditMembership";
import { MainTopupSelector } from "@/components/TopupSelect/MainTopupSelector";
// import { DeleteUser } from "./DeleteUser";

const AdminUserTable = ({
  data,
}: {
  data: {
    name: string | null;
    userid: number;
    email: string | null;
    image: string | null;
    rewardbalance: string | null;
    referencecode: string | null;
    membership: string | null;
  }[];
}) => {
  const [isMounted, setisMounted] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<string | null>(
    null
  );

  React.useEffect(() => {
    setisMounted(true);
  }, []);
  if (!isMounted) return null;

  const memberShipaValues = [
    { label: "Regular", value: "regular" },
    { label: "Silver", value: "silver" },
    { label: "Gold", value: "gold" },
  ];

  const handleSelectValue = (value: string) => {
    setSelectedMembership(value === "ALL" ? null : value);
  };

  // Filter data based on selected membership
  const filteredData = selectedMembership
    ? data.filter((item) => item.membership === selectedMembership)
    : data;

  return (
    <div className="mb-3 -mt-14">
      {/* Selector */}
      {/* User Filters */}
      <div className="max-w-[40%] sm:max-w-[30%] md:max-w-[20%] mt-3 ml-auto mb-5">
        <MainTopupSelector
          onSelect={handleSelectValue}
          data={memberShipaValues}
          className=" bg-white text-gray-500 h-10 px-2 md:w-full shadow-md"
          placeholder="Filter By Membership"
        />
      </div>
      {/* <h2 className="text-base sm:text-lg ">Transaction History</h2> */}
      <table className="bg-white border border-gray-300 w-full text-gray-700 mt-2">
        <thead>
          <tr className="text-sm">
            {/* <th className="text-left py-2 pl-2">ID</th> */}
            <th className="text-left py-2 px-2">Name</th>
            <th className="text-left py-2 pr-2">Email</th>
            <th className="text-left py-2 pr-2">Membership</th>
            {/* <th className="text-left py-2 pr-2">IMAGE</th> */}
          </tr>
        </thead>
        <tbody className=" ">
          {filteredData.map((item: any, index: any) => (
            <tr
              key={index}
              className="text-center border border-b text-sm sm:text-base"
            >
              {/* <td className="text-left text-sm sm:text-base border sm:border-none p-1 pl-2">
                {item.userid}
              </td> */}
              <td className="text-left text-sm border sm:border-none p-1 break-all flex gap-x-1 items-center mt-2">
                <Image
                  src={item.image ? item.image : "/unknownUser.jpeg"}
                  alt="user image"
                  width={25}
                  height={25}
                  className="rounded-full"
                />
                {item.name}
              </td>
              <td className="text-left text-sm border sm:border-none p-1 break-all">
                {item.email}
              </td>
              <td className="text-left text-sm border sm:border-none p-1 break-all">
                <div className="flex items-center">
                  <p className=" capitalize">{item.membership}</p>
                  <EditMembership
                    id={item.userid}
                    currentMember={item.membership}
                  />
                </div>
              </td>
              {/* <td className="text-left text-sm sm:text-base border sm:border-none p-1">
                <div className="mx-auto">
                  <Image
                    src={item.image}
                    alt="user image"
                    width={50}
                    height={50}
                  />
                </div>
              </td> */}
              <td className="p-1">
                <EditUser
                  name={item.name}
                  email={item.email}
                  balance={item.rewardbalance}
                />
                {/* <DeleteUser
                  userid={item.userid}
                  name={item.name}
                  email={item.email}
                  picture={item.image}
                /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserTable;
