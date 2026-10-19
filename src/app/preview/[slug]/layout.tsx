import { Suspense } from "react";
import PreviewShell from "@/components/preview/PreviewShell";

export const metadata = { robots: { index: false, follow: false } };

// 주소의 slug 는 요청 때만 알 수 있어서 Suspense 안에서 읽는다 (cacheComponents)
export default function PreviewLayout({ children }: LayoutProps<"/preview/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#e9e7e2]" />}>
      <PreviewShell>{children}</PreviewShell>
    </Suspense>
  );
}
