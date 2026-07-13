"use client";

import { manropeFont } from "@/lib/fonts";
import Image from "next/image";
import {
  Envelope,
  ShieldCheck,
  Pencil,
  Check,
  Persons,
} from "@gravity-ui/icons";
import type { ReactNode } from "react";

const PersonIcon = () => <Persons />;

type User = {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string | Date;
  role: string;

  username?: string;
  phone?: string;
  phoneVerified?: boolean;
  dateOfBirth?: string | Date;
  plan?: string;
  taxId?: string;
  zipCode?: string;
  addressType?: string;
  address?: string;
  city?: string;
};

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const InfoItem = ({
  icon,
  label,
  value,
  badge,
  span,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  badge?: { verified: boolean; verifiedText: string; unverifiedText: string };
  span?: boolean;
}) => (
  <div
    className={`group flex items-center gap-3 p-3.5 rounded-xl border border-[#778DA9]/20 hover:border-[#415A77]/50 hover:-translate-y-0.5 transition-all duration-200 ${
      span ? "sm:col-span-2" : ""
    }`}
  >
    <div className="w-9 h-9 rounded-lg bg-[#0D1B2A]/5 flex items-center justify-center text-[#415A77] shrink-0">
      {icon}
    </div>
    <div className="min-w-0 flex-1 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] text-[#778DA9] font-medium">{label}</p>
        <p className="text-sm text-[#0D1B2A] font-semibold truncate">{value}</p>
      </div>
      {badge && (
        <span
          className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            badge.verified
              ? "bg-[#415A77]/10 text-[#415A77]"
              : "bg-[#778DA9]/15 text-[#778DA9]"
          }`}
        >
          {badge.verified ? badge.verifiedText : badge.unverifiedText}
        </span>
      )}
    </div>
  </div>
);

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p className="text-[11px] uppercase tracking-wider text-[#778DA9] font-bold mb-3">
    {children}
  </p>
);



const UserProfile = ({ user }: { user: User }) => {
  const initial = user.name?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="min-h-screen  py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] rounded-[28px] overflow-hidden shadow-sm border border-[#778DA9]/20 bg-white">
        {/* LEFT: Identity panel */}
        <aside className="bg-[#0D1B2A] relative px-8 py-10 flex flex-col">
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #E0E1DD 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-[#1B263B] border border-[#415A77]/40 flex items-center justify-center text-[#E0E1DD] text-2xl font-bold relative overflow-hidden">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <span className={manropeFont.className}>{initial}</span>
              )}

              {user.emailVerified && (
                <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#0D1B2A] border-2 border-[#0D1B2A] flex items-center justify-center">
                  <span className="w-full h-full rounded-full bg-[#415A77] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#E0E1DD]" />
                  </span>
                </span>
              )}
            </div>

            <h1
              className={`${manropeFont.className} text-xl font-bold text-[#E0E1DD] mt-5 leading-tight`}
            >
              {user.name}
            </h1>
            <p className="text-[#778DA9] text-sm mt-0.5 truncate">
              {user.email}
            </p>

            <span className="inline-flex items-center gap-1.5 mt-4 px-2.5 py-1 rounded-full bg-[#415A77]/20 border border-[#415A77]/40 text-[#E0E1DD] text-xs font-medium capitalize">
              <ShieldCheck className="w-3 h-3" />
              {user.role}
            </span>
          </div>

          <div className="relative mt-auto pt-10">
            <div className="h-px bg-[#415A77]/30 mb-4" />
            <p className="text-[10px] uppercase tracking-wider text-[#778DA9] font-semibold">
              Member since
            </p>
            <p className="text-sm text-[#E0E1DD] font-medium mt-0.5">
              {formatDate(user.createdAt)}
            </p>
          </div>
        </aside>

        {/* RIGHT: Details */}
        <section className="px-8 py-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2
                className={`${manropeFont.className} text-lg font-bold text-[#0D1B2A]`}
              >
                Profile details
              </h2>
              <p className="text-sm text-[#778DA9] mt-0.5">
                Your account information
              </p>
            </div>
            <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#415A77] hover:text-[#0D1B2A] transition-colors">
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          </div>

          {/* Section: Account */}
          <div className="mb-7">
            <SectionLabel>Account</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoItem
                icon={<PersonIcon />}
                label="Full name"
                value={user.name}
              />

              <InfoItem
                icon={<Envelope className="w-4.5 h-4.5" />}
                label="Email"
                value={user.email}
                badge={{
                  verified: user.emailVerified,
                  verifiedText: "Verified",
                  unverifiedText: "Unverified",
                }}
                span
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
