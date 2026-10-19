import { Suspense } from "react";
import BrandEdit from "./BrandEdit";

// 주소의 id 는 요청 때만 알 수 있어서 Suspense 안에서 읽는다 (cacheComponents)
export default function BrandEditPage({ params }: PageProps<"/brands/[id]">) {
  return (
    <Suspense fallback={<p className="py-20 text-center text-sm text-muted">불러오는 중…</p>}>
      <BrandEdit params={params} />
    </Suspense>
  );
}
