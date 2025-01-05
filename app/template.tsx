"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <motion.div
      initial={{ y: "10vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: "100vh", opacity: 0 }}
      transition={{ type: "spring", stiffnes: 100, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
