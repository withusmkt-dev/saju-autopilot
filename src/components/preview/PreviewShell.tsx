"use client";

// 예시 브랜드 페이지 공통 틀: 브랜드 색·글꼴 변수, 스킨, 머리, 바닥.
// 실서비스(명월재 /brand/[slug])에서도 같은 구조로 옮긴다.
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { notFound, useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { bgImg, getBrandPage, PAGE_BG_VEIL, type BrandPage } from "@/lib/preview/brandPages";
import { SKINS, type Skin } from "@/lib/preview/skins";
import BrandMark from "./BrandMark";
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
  skin: Skin;
  base: string; // /preview/{slug}
  notes: boolean; // 개발 메모 보이기
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
  const skin = SKINS[page.skin];
  const base = `/preview/${slug}`;
  const t = brand.theme;
  const [notes, setNotes] = useState(false);

  return (
    <PreviewCtx.Provider value={{ slug, brand, page, skin, base, notes }}>
      <div
        className="min-h-screen bg-[#e9e7e2]"
        style={
          {
            "--p": t.primary,
            "--a": t.accent,
            "--hf": HEAD_FONT[t.font],
            // 섹션·카드 제목 글꼴. 표제용 굵은 글꼴(G마켓 대체 Black Han Sans)은 첫 화면 큰 제목에만
            "--sf": t.font === "gmarket" ? "'Pretendard Variable', sans-serif" : HEAD_FONT[t.font],
            ...skin.vars(t),
          } as React.CSSProperties
        }
      >
        <div className="sticky top-0 z-50 bg-black/80 px-3 py-1.5 text-center text-[11px] text-white">
          예시 페이지 ({skin.label} 스킨) · 분석·결제·문자는 목업 ·{" "}
          <button type="button" onClick={() => setNotes((v) => !v)} className="underline">개발 메모 {notes ? "숨기기" : "보기"}</button> ·{" "}
          <Link href="/brands" className="underline">관리자로</Link>
        </div>
        <div
          className="pv mx-auto min-h-screen max-w-[430px] bg-[var(--pbg)] text-[var(--text)] shadow-xl"
          style={{
            fontFamily: skin.bodyFont,
            // 바탕 질감 이미지: 바탕색을 덮어 글씨가 잘 읽히게
            ...(page.images?.pageBg && {
              background: `linear-gradient(color-mix(in srgb, var(--pbg) ${PAGE_BG_VEIL[page.images.pageBg] ?? 60}%, transparent), color-mix(in srgb, var(--pbg) ${PAGE_BG_VEIL[page.images.pageBg] ?? 60}%, transparent)), ${bgImg(page.images.pageBg)} top / 100% auto repeat-y`,
            }),
          }}
        >
          <Header />
          <main>{children}</main>
          <footer className="border-t border-[var(--line)] px-5 py-6 text-[11px] leading-relaxed text-[var(--sub)]" style={{ fontFamily: "'Pretendard Variable', sans-serif" }}>
            <p className="font-medium">{brand.footerNote}</p>
            {/* 실서비스: 명월재 lib/companyInfo.ts 값을 그대로 씀 */}
            <p className="mt-2 opacity-80">
              상호 명월재 · 대표 ○○○ · 사업자등록번호 ○○○-○○-○○○○○
              <br />
              통신판매업 제2026-부천원미-1216호 · 결제 표기 상점명: 명월재
            </p>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 opacity-80">
              <a href="#">이용약관</a>
              <a href="#">개인정보처리방침</a>
              <a href="#">환불정책</a>
              <Link href={`${base}/lookup`} className="font-medium">결제 내역 / 결과 다시 보기</Link>
            </p>
          </footer>
        </div>
      </div>
    </PreviewCtx.Provider>
  );
}

function Header() {
  const { brand, skin, base, page } = usePreview();
  // 로고 마크: 메인 색 바탕 + 흰 선 + 포인트 색
  const logo = (
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--p)] text-white ring-1 ring-white/25">
      <BrandMark slug={brand.slug} accent={brand.theme.accent} className="h-[18px] w-[18px]" />
    </span>
  );
  if (skin.header === "center") {
    return (
      <header className="sticky top-[26px] z-40 border-b border-[var(--line)] bg-[var(--pbg)] px-4 pt-3 pb-2 text-center">
        <Link href={base} className="inline-flex items-center gap-2 text-xl font-bold text-[var(--ink)]" style={{ fontFamily: "var(--hf)" }}>
          {logo}
          {brand.name}
        </Link>
        <div className="mt-1 flex justify-between text-[11px] text-[var(--sub)]">
          <span>{page.skin === "daily" ? "2026년 10월 20일 화요일" : page.badge}</span>
          <Link href={`${base}/lookup`}>결과 다시 보기</Link>
        </div>
      </header>
    );
  }
  if (skin.header === "plain") {
    return (
      <header className={`sticky top-[26px] z-40 flex items-center justify-between bg-[var(--pbg)] px-4 py-3 ${page.skin === "poster" ? "border-b-4 border-black" : "border-b border-[var(--line)]"}`}>
        <Link href={base} className="flex items-center gap-2 text-[var(--ink)]">
          {logo}
          <span className="font-bold" style={{ fontFamily: "var(--hf)" }}>{brand.name}</span>
        </Link>
        <Link href={`${base}/lookup`} className="text-xs text-[var(--sub)]">결과 다시 보기</Link>
      </header>
    );
  }
  return (
    <header className="sticky top-[26px] z-40 flex items-center justify-between bg-[var(--p)] px-4 py-3 text-white">
      <Link href={base} className="flex items-center gap-2">
        {logo}
        <span className="font-bold" style={{ fontFamily: "var(--hf)" }}>{brand.name}</span>
      </Link>
      <Link href={`${base}/lookup`} className="text-xs opacity-80 hover:opacity-100">결과 다시 보기</Link>
    </header>
  );
}

/* ---------- 예시 페이지 공통 부품 (스킨을 따름) ---------- */

export function PButton({ className = "", ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { skin } = usePreview();
  return (
    <button
      type="button"
      className={`h-12 w-full text-[15px] font-bold transition active:scale-[0.98] disabled:opacity-50 ${skin.btn} ${className}`}
      style={{ fontFamily: "'Pretendard Variable', sans-serif" }}
      {...rest}
    />
  );
}

export function PCard({ className = "", children, aos }: { className?: string; children: React.ReactNode; aos?: Record<string, string | number> }) {
  const { skin } = usePreview();
  return <div {...aos} className={`p-4 ${skin.card} ${className}`}>{children}</div>;
}

/**
 * AOS 켜기. 각 화면(page)에서 부른다 — 화면이 다 붙은(hydrate) 뒤에 켜야 서버 HTML 과 어긋나지 않는다.
 * 스킨마다 다른 등장 효과(skins.ts motion)
 */
export function useAosInit() {
  const { skin } = usePreview();
  useEffect(() => {
    AOS.init({ once: false, startEvent: "DOMContentLoaded", duration: skin.motion.duration, easing: skin.motion.easing as AOS.easingOptions, offset: 40 });
    AOS.refreshHard();
  }, [skin]);
}

/** AOS 속성: aos(순번) → data-aos·delay (스킨 효과를 따름) */
export function useAos() {
  const { skin } = usePreview();
  return (i = 0, type = skin.motion.type) => ({ "data-aos": type, "data-aos-delay": Math.min(i * skin.motion.stagger, 900) });
}

/** 입력칸 클래스 */
export function useField() {
  const { skin } = usePreview();
  return `h-11 w-full px-3 text-[15px] outline-none focus:border-[var(--ink)] ${skin.input}`;
}

export function PTitle({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      {eyebrow && <p className="text-xs font-semibold tracking-wider text-[var(--sub)]">{eyebrow}</p>}
      <h2 className="mt-1 text-[clamp(19px,5.6cqw,23px)] font-bold text-[var(--ink)]" style={{ fontFamily: "var(--sf)" }}>{children}</h2>
    </div>
  );
}

export function MockNote({ children }: { children: React.ReactNode }) {
  const { notes } = usePreview();
  if (!notes) return null;
  return (
    <p className="mt-2 rounded-lg border border-dashed border-amber-400 bg-amber-50 px-3 py-2 text-[11px] text-amber-800" style={{ fontFamily: "'Pretendard Variable', sans-serif" }}>
      개발 메모 · {children}
    </p>
  );
}
