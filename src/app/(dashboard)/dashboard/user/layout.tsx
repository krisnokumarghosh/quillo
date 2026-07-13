import { requireRole } from "@/lib/core/session";
import { ReactNode } from "react";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  await requireRole("user");
  return children;
};

export default UserLayout;
