import { StoreProvider } from "@/lib/store";
import AdminShell from "@/components/AdminShell";

// 관리자 화면 묶음. 예시 브랜드 페이지(/preview)는 이 틀 밖에 있다.
export default function AdminLayout({ children }: LayoutProps<"/">) {
  return (
    <StoreProvider>
      <AdminShell>{children}</AdminShell>
    </StoreProvider>
  );
}
