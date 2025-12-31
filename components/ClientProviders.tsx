"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/components/PageLoader";
import ConditionalLayout from "@/components/ConditionalLayout";

// Lazy load non-critical components
const OfflineDetector = dynamic(() => import("@/components/OfflineDetector"), {
  ssr: false,
});
const LanguageSelector = dynamic(() => import("@/components/LanguageSelector"), {
  ssr: false,
});
const DynamicMetadata = dynamic(() => import("@/components/DynamicMetadata"), {
  ssr: false,
});
const StructuredData = dynamic(() => import("@/components/StructuredData"), {
  ssr: false,
});
const PerformanceOptimizer = dynamic(() => import("@/components/PerformanceOptimizer"), {
  ssr: false,
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PerformanceOptimizer />
      <PageLoader />
      <OfflineDetector />
      <LanguageSelector />
      <DynamicMetadata />
      <StructuredData />
      <ConditionalLayout>{children}</ConditionalLayout>
    </>
  );
}
