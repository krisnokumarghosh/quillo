"use client";

import { User } from "@/lib/dataInterface";
import { manropeFont } from "@/lib/fonts";
import {  Calendar, Globe } from "@gravity-ui/icons";
import Image from "next/image";
import { useState } from "react";
import UserDeleteAlert from "./UserDeleteAlert";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-white border border-[#778DA9]/15 rounded-2xl p-4 hover:border-[#415A77]/30 transition-colors duration-200">
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-none border border-[#778DA9]/15 bg-[#415A77]/10 flex items-center justify-center">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              fill
              className="object-cover"
            />
          ) : (
            <span
              className={`${manropeFont.className} text-[#415A77] text-lg font-bold`}
            >
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3
              className={`${manropeFont.className} text-[15px] font-bold text-[#0D1B2A] truncate`}
            >
              {user.name}
            </h3>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full capitalize ${
                user.role === "admin"
                  ? "text-[#415A77] bg-[#415A77]/10"
                  : "text-[#778DA9] bg-[#778DA9]/10"
              }`}
            >
              {user.role}
            </span>
            {user.emailVerified && (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#1B263B]/50">
            <Globe width={12} height={12} />
            <span className="truncate">{user.email}</span>
            <span>·</span>
            <span className="flex items-center gap-1 flex-none">
              <Calendar width={12} height={12} />
              Joined {formatDate(user.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <UserDeleteAlert user={user}/>
    </div>
  );
};

const AllUsersList = ({ users }: { users: User[] }) => {
  const [userList, setUserList] = useState(
    users.filter((user) => user.role === "user"), 
  );

  return (
    <div>
      <h1
        className={`${manropeFont.className} text-3xl font-bold text-[#0D1B2A]`}
      >
        All <span className="text-[#415A77]">Users</span>
      </h1>
      <p className="text-sm text-[#1B263B]/60 mt-1 mb-6">
        Manage and monitor all registered accounts.
      </p>

      {userList.length === 0 ? (
        <div className="text-center py-16 text-[#1B263B]/50 text-sm">
          No users found.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {userList.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsersList;
