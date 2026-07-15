"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden  px-6 py-5 md:py-0">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#415A77]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#1B263B]/20 blur-3xl" />

      <div className="relative w-full max-w-xl rounded-3xl border border-white/20 bg-white p-5 md:p-10 shadow-2xl backdrop-blur-xl">
        {/* Icon */}

        {/* Heading */}
        <div className="text-center mt-6">
          <h1 className="text-3xl md:text-7xl font-black text-[#0D1B2A]">403</h1>

          <h2 className="mt-4 text-xl md:text-3xl font-bold text-[#1B263B]">
            ACCESS DENIED
          </h2>

          <p className="mt-4 text-[#415A77] text-[14px] md:text-[16px]">
            You don&apos;t have permission to view this page. Please contact
            your administrator or return to a safe place.
          </p>
        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-col justify-center items-center gap-4 sm:flex-row">
          <Button
            onClick={() => router.refresh()}
            
            className="bg-[#0D1B2A] text-white hover:bg-[#1B263B]"
          >
            Try Again
          </Button>

          <Link href={"/login"}>
            <Button  className="border border-[#415A77] text-[#0D1B2A] bg-transparent">
              Switch Account
            </Button>
          </Link>
        </div>

        {/* Footer */}

        <div className="mt-10 border-t border-[#778DA9]/30 pt-6 text-center text-sm text-[#778DA9]">
          Error Code: 404 • Quillo
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
