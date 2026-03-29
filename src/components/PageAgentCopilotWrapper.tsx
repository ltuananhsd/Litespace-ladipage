"use client";

// Wrapper Client Component để load PageAgentCopilot chỉ phía client
// Next.js 16 không cho dùng ssr:false trong Server Component (layout.tsx)
// Giải pháp: dùng dynamic import bên trong Client Component này

import dynamic from "next/dynamic";

const PageAgentCopilot = dynamic(
  () => import("@/components/PageAgentCopilot"),
  {
    ssr: false,
    // Không hiển thị gì khi đang load để tránh layout shift
    loading: () => null,
  }
);

export default function PageAgentCopilotWrapper() {
  return <PageAgentCopilot />;
}
