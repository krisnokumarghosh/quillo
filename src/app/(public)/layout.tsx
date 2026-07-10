import Navbar from "@/components/shared/Navbar";
import React, { ReactNode } from "react";

type PublicLayoutProps = {
  children: ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div>
        <Navbar/>
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
