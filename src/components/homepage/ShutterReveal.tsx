// components/shared/ShutterReveal.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const ShutterReveal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative overflow-hidden">
      {children}

      <motion.div
        initial={{ y: "0%" }}
        whileInView={{ y: "100%" }}
        viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 bg-[#0D1B2A] z-10"
      />
    </div>
  );
};

export default ShutterReveal;