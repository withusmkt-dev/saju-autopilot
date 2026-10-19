"use client";

// 예시 브랜드 페이지 공통 틀: 브랜드 색·글꼴 변수, 머리, 바닥.
// 실서비스(명월재 /brand/[slug])에서도 같은 구조로 옮긴다.
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { createContext, useContext } from "react";
import { getBrandPage, type BrandPage } from "@/lib/preview/brandPages";
import type { Brand, FontKey } from "@/lib/types";

const HEAD_FONT: Record<FontKey, string> = {
  pretendard: "'Pretendard Variable', sans-serif",
  maruburi: "'Gowun Batang', serif",
  joseon: "'Nanum Myeongjo', serif",
  gmarket: "'Black Han Sans', sans-serif",
};

interface Ctx {
  slug: string;
  brand: Brand;
  page: BrandPage;
  base: string; // /preview/{slug}
}
const PreviewCtx = createContext<Ctx | null>(null);

export function usePreview() {
  const c = useContext(PreviewCtx);
  if (!c) throw new Error("PreviewShell 밖에서 usePreview 사용");
  return c;
}

export default function PreviewShell({ children }: { children: React.ReactNode }) {
  const { slug } = useParams<{ slug: string }>();
  const found = getBrandPage(slug);
  if (!found) notFound();
  const { brand, page } = found;
  const base = `/preview/${slug}`;
  const t = brand.theme;

  return (
    <PreviewCtx.Provider value={{ slug, brand, page, base }}>
      <div
        className="min-h-screen bg-[#e9e7e2]"
        style={
          {
            "--p": t.primary,
            "--a": t.accent,
            "--bg": t.background,
            "--hf": HEAD_FONT[t.font],
          } as React.CSSProperties
        }
      >
        <div className="sticky top-0 z-50 bg-black/80 px-3 py-1.5 text-center text-[11px] text-white">
          예시 페이지 · 분석·결제·알림톡은 목업이에요 ·{" "}
          <Link href="/brands" className="underline">관리자로</Link>
        </div>
        <div className="mx-auto min-h-screen max-w-[430px] bg-[var(--bg)] text-[#222] shadow-xl">
          <header className="sticky top-[26px] z-40 flex items-center justify-between bg-[var(--p)] px-4 py-3 text-white">
            <Link href={base} className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--a)] text-sm font-bold text-[var(--p)]" style={{ fontFamily: "var(--hf)" }}>
                {brand.name[0]}
              </span>
              <span className="font-bold" style={{ fontFamily: "var(--hf)" }}>{brand.name}</span>
            </Link>
            <Link href={`${base}/lookup`} className="text-xs opacity-80 hover:opacity-100">결과 다시 보기</Link>
          </header>
          <main>{children}</main>
          <footer className="border-t border-black/5 px-5 py-6 text-[11px] leading-relaxed text-[#888]">
            <p className="font-medium text-[#666]">{brand.footerNote}</p>
            {/* 실서비스: 명월재 lib/companyInfo.ts 값을 그대로 씀 */}
            <p className="mt-2">
              상호 명월재 · 대표 ○○○ · 사업자등록번호 ○○○-○○-○○○○○
              <br />
              통신판매업 제2026-부천원미-1216호 · 결제 표기 상점명: 명월재
            </p>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              <a href="#">이용약관</a>
              <a href="#">개인정보처리방침</a>
              <a href="#">환불정책</a>
              <Link href={`${base}/lookup`} className="font-medium text-[#555]">결제 내역 / 결과 다시 보기</Link>
            </p>
          </footer>
        </div>
      </div>
    </PreviewCtx.Provider>
  );
}

/* ---------- 예시 페이지 공통 부품 ---------- */

export function PButton({ className = "", ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`h-12 w-full rounded-xl bg-[var(--a)] text-[15px] font-bold text-[var(--p)] shadow-sm transition active:scale-[0.98] disabled:opacity-50 ${className}`}
      {...rest}
    />
  );
}

export function PTitle({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      {eyebrow && <p className="text-xs font-semibold tracking-wider text-[var(--p)] opacity-60">{eyebrow}</p>}
      <h2 className="mt-1 text-xl font-bold text-[var(--p)]" style={{ fontFamily: "var(--hf)" }}>{children}</h2>
    </div>
  );
}

export function MockNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 rounded-lg border border-dashed border-amber-400 bg-amber-50 px-3 py-2 text-[11px] text-amber-800">🧪 {children}</p>;
}
