import UserProfile from "@/components/dashboard/user/UserProfile";
import { getUserSession } from "@/lib/core/session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | User",
};

const UserProfilePage = async () => {
  const rawUser = await getUserSession();

  if (!rawUser) {
    redirect("/login");
  }

  const user = {
    name: rawUser.name,
    email: rawUser.email,
    emailVerified: rawUser.emailVerified,
    image: rawUser.image ?? undefined,
    createdAt: rawUser.createdAt,
    role: (rawUser.role === "admin" ? "admin" : "user") as "admin" | "user",
  };

  return <UserProfile user={user} />;
};

export default UserProfilePage;
