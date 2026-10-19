"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { useStore } from "@/lib/store";

const TABS = [
  { href: "/", label: "대시보드" },
  { href: "/brands", label: "브랜드 관리" },
  { href: "/content", label: "AI 콘텐츠 팩토리" },
  { href: "/ads", label: "광고 & 성과" },
  { href: "/crm", label: "고객 관리" },
];

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

// usePathname 은 요청 때만 알 수 있어서 Suspense 안에서 읽는다 (cacheComponents)
function CurrentNavTabs() {
  return <NavTabs path={usePathname()} />;
}

function NavTabs({ path }: { path: string }) {
  return TABS.map((t, i) => (
    <Link
      key={t.href}
      href={t.href}
      className={`flex h-full shrink-0 items-center border-b-2 px-3 text-sm whitespace-nowrap ${isActive(path, t.href) ? "border-ink font-semibold text-ink" : "border-transparent text-muted hover:text-ink"}`}
    >
      <span className="mr-1 text-xs text-muted/70">{i + 1}</span>
      {t.label}
    </Link>
  ));
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { toast } = useStore();
  const [menu, setMenu] = useState(false);

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-sm font-bold text-gold">月</span>
            <span className="hidden text-sm font-bold text-ink sm:block">사주 오토파일럿</span>
          </Link>
          <nav className="no-scrollbar -mb-px flex h-full flex-1 overflow-x-auto">
            <Suspense fallback={<NavTabs path="" />}>
              <CurrentNavTabs />
            </Suspense>
          </nav>
          {/* TODO(API): 마지막 장애 알림 시각으로 상태 판단 */}
          <span className="hidden shrink-0 items-center gap-1.5 text-xs text-muted md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> 시스템 정상
          </span>
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-paper"
              aria-expanded={menu}
            >
              <span className="relative">
                🔔
                <span className="absolute -top-1 -right-1.5 h-2 w-2 rounded-full bg-rose-500" />
              </span>
              <span className="hidden text-ink sm:inline">총관리자</span>
              <span className="text-xs text-muted">▾</span>
            </button>
            {menu && (
              <div className="absolute right-0 mt-1 w-56 rounded-xl border border-line bg-white py-1 shadow-lg" onClick={() => setMenu(false)}>
                <p className="px-3 py-2 text-xs text-muted">로그인: Cloudflare Access</p>
                <Link href="/settings#alerts" className="block px-3 py-2 text-sm hover:bg-paper">🔔 알림 설정</Link>
                <Link href="/settings#accounts" className="block px-3 py-2 text-sm hover:bg-paper">👥 계정·권한</Link>
                <Link href="/settings#keys" className="block px-3 py-2 text-sm hover:bg-paper">🔑 API 키 연결</Link>
                <Link href="/settings#links" className="block px-3 py-2 text-sm hover:bg-paper">🔗 숏링크</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-ink px-4 py-2.5 text-sm text-white shadow-lg" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
