import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-between gap-4 bg-white border border-[#778DA9]/15 rounded-2xl p-4 animate-pulse">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-14 h-14 rounded-xl bg-[#0D1B2A]/5 flex-none" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-2/5 bg-[#0D1B2A]/5 rounded-lg" />
          <div className="h-3 w-1/4 bg-[#0D1B2A]/5 rounded-lg" />
        </div>
      </div>
      <div className="h-9 w-24 bg-[#0D1B2A]/5 rounded-full flex-none" />
    </div>
  );
};

export default loading;
