import DashboardSideBar from "@/components/dashboard/DashboardSideBar";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const rawUser = await getUserSession();

  if (!rawUser) {
    redirect("/login");
  }

  const user = {
    name: rawUser.name,
    email: rawUser.email,
    image: rawUser.image ?? undefined,
    role: (rawUser.role === "admin" ? "admin" : "user") as "admin" | "user",
  };

  return (
    <div className="md:flex min-h-screen bg-[#0D1B2A]">
      <DashboardSideBar user={user} />
      <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#E0E1DD]">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
