"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { manropeFont } from "@/lib/fonts";
import {
  ChartColumn,
  Persons,
  FileText,
  Person,
  Plus,
  Bars,
} from "@gravity-ui/icons";
import { Drawer, Button, Chip } from "@heroui/react";
import type { ComponentType } from "react";

type UserRole = "user" | "admin";

interface SidebarUser {
  name: string;
  email: string;
  image?: string;
  role: UserRole;
}

interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ width?: number; height?: number; className?: string }>;
}

const adminNavItems: NavItem[] = [
  { label: "Analytics", href: "/dashboard/admin", icon: ChartColumn },
  { label: "All Users", href: "/dashboard/admin/all-users", icon: Persons },
  { label: "All Blogs", href: "/dashboard/admin/all-blogs", icon: FileText },
];

const userNavItems: NavItem[] = [
  { label: "Profile", href: "/dashboard/user", icon: Person },
  { label: "My Blogs", href: "/dashboard/user/my-blogs", icon: FileText },
  { label: "Add Blog", href: "/dashboard/user/add-blog", icon: Plus },
];

const navItemsMap: Record<UserRole, NavItem[]> = {
  admin: adminNavItems,
  user: userNavItems,
};

const NavLinks = ({ user }: { user: SidebarUser }) => {
  const pathname = usePathname();
  const navItems = navItemsMap[user.role];

  return (
    <nav className="flex flex-col gap-1.5">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[#415A77]/25 text-[#E0E1DD]"
                : "text-[#778DA9] hover:bg-white/5 hover:text-[#E0E1DD]"
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-[20%] bottom-[20%] w-0.75 bg-[#415A77] rounded-full" />
            )}
            <Icon width={18} height={18} className="flex-none" />
            <span className="flex-1">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const UserCard = ({ user }: { user: SidebarUser }) => {
  return (
    <div className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-white/5 transition-colors duration-200 cursor-pointer">
      {user.image ? (
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-none border border-[#778DA9]/30">
          <Image
            src={user.image}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-9 h-9 rounded-full bg-[#415A77]/25 border border-[#778DA9]/30 flex items-center justify-center flex-none">
          <span
            className={`${manropeFont.className} text-[#E0E1DD] text-sm font-bold`}
          >
            {user.name?.[0]?.toUpperCase() ?? "U"}
          </span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[13px] font-semibold text-[#E0E1DD] truncate">
            {user.name}
          </p>
          <Chip className="text-[10px] text-[#E0E1DD] bg-[#415A77]/30 capitalize flex-none">
            {user.role}
          </Chip>
        </div>
        <p className="text-[11px] text-[#778DA9] truncate">{user.email}</p>
      </div>
    </div>
  );
};

const DashboardSideBar = ({ user }: { user: SidebarUser }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-none h-screen sticky top-0 flex-col bg-[#0D1B2A] border-r border-[#778DA9]/10">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-5.5 border-b border-[#778DA9]/10"
        >
          <div className="w-8 h-8 rounded-lg bg-[#E0E1DD] flex items-center justify-center">
            <span className="text-[#0D1B2A] font-bold text-sm">Q</span>
          </div>
          <span
            className={`${manropeFont.className} text-lg font-bold text-[#E0E1DD]`}
          >
            Quillo
          </span>
        </Link>

        <div className="flex-1 overflow-y-auto p-3">
          <span className="text-xs font-semibold text-[#778DA9] tracking-wide uppercase mb-3 px-2 block">
            Menu
          </span>
          <NavLinks user={user} />
        </div>

        <div className="p-3 border-t border-[#778DA9]/10">
          <UserCard user={user} />
        </div>
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="md:hidden flex justify-between items-center h-14 border-b border-[#778DA9]/10 bg-[#0D1B2A] px-4">
        <Drawer>
          <Button className="bg-transparent">
            <Bars className="text-[#E0E1DD]" />
          </Button>

          <Drawer.Backdrop className="bg-[#0D1B2A]/60 backdrop-blur-sm">
            <Drawer.Content placement="left">
              <Drawer.Dialog className="bg-[#0D1B2A] border-none w-64 h-full flex flex-col p-0">
                <Drawer.CloseTrigger className="absolute top-4 right-4 bg-white/5 text-[#E0E1DD]" />

                <Drawer.Header className="px-5 py-5.5 border-b border-[#778DA9]/10">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#E0E1DD] flex items-center justify-center">
                      <span className="text-[#0D1B2A] font-bold text-sm">
                        Q
                      </span>
                    </div>
                    <span
                      className={`${manropeFont.className} text-lg font-bold text-[#E0E1DD]`}
                    >
                      Quillo
                    </span>
                  </Link>
                </Drawer.Header>

                <Drawer.Body className="flex-1 overflow-y-auto p-3">
                  <span className="text-xs font-semibold text-[#778DA9] tracking-wide uppercase mb-3 px-2 block">
                    Menu
                  </span>
                  <NavLinks user={user} />
                </Drawer.Body>

                <div className="p-3 border-t border-[#778DA9]/10">
                  <UserCard user={user} />
                </div>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>

        <h3 className={`${manropeFont.className} text-[#E0E1DD] font-semibold`}>
          Dashboard
        </h3>

        <div className="w-8" />
      </div>
    </>
  );
};

export default DashboardSideBar;
