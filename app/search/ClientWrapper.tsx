"use client"

import { ReactNode, Suspense } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return <Suspense fallback={<>Loading...</>}>
    {children}
  </Suspense>
}