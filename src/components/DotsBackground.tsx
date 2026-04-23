"use client";

import React from "react";

export default function DotsBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none opacity-[0.4]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%2364748b' /%3E%3C/svg%3E")`,
        maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
      }}
    />
  );
}
