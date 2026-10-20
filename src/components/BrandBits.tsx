"use client";

import { Badge } from "./ui";
import { isViewable } from "./AssetPicker";
import { BRANDS, FONT_LABEL } from "@/lib/dummy";
import type { BrandStatus, BrandTheme } from "@/lib/types";

/** 이미지 업로드 자리 (TODO(API): Supabase Storage 업로드) */
export function Dropzone({ label, onPick }: { label: string; onPick: (name: string) => void }) {
  return (
    <label className="block cursor-pointer rounded-lg border border-dashed border-line p-4 text-center text-xs text-muted hover:border-ink">
      {label} · 끌어다 놓거나 클릭해서 업로드
      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onPick(e.target.files[0].name)} />
    </label>
  );
}

export function BrandStatusBadge({ status }: { status: BrandStatus }) {
  if (status === "live") return <Badge color="green">운영 중</Badge>;
  if (status === "paused") return <Badge color="gray">일시정지</Badge>;
  return <Badge color="amber">준비 중</Badge>;
}

const FONT_FAMILY: Record<BrandTheme["font"], string> = {
  pretendard: "'Pretendard Variable', sans-serif",
  maruburi: "'MaruBuri', serif",
  joseon: "'JoseonPalace', serif",
  gmarket: "'GmarketSans', sans-serif",
  jua: "'Jua', sans-serif",
};

/** 마스터 템플릿 미리보기 (실제 템플릿은 명월재 저장소 /brand/[slug]) */
export function BrandPreview({ name, heroTitle, heroDesc, theme, footerNote }: { name: string; heroTitle: string; heroDesc: string; theme: BrandTheme; footerNote: string }) {
  return (
    <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[22px] border-4 border-ink/90 shadow-lg" style={{ background: theme.background, fontFamily: FONT_FAMILY[theme.font] }}>
      <div className="flex items-center justify-between px-4 py-2.5 text-xs font-bold text-white" style={{ background: theme.primary }}>
        <span>{name}</span>
        <span className="opacity-70">≡</span>
      </div>
      <div
        className="px-4 pt-8 pb-6 text-center"
        style={{
          background: isViewable(theme.bgAsset)
            ? `linear-gradient(180deg, ${theme.primary}cc, ${theme.primary}88), center / cover no-repeat url("${theme.bgAsset}")`
            : theme.bgAsset
            ? `linear-gradient(180deg, ${theme.primary}ee, ${theme.primary}aa), ${theme.primary}`
            : `linear-gradient(180deg, ${theme.primary}, ${theme.primary}cc)`,
          color: "#fff",
        }}
      >
        <p className="text-[10px] tracking-widest" style={{ color: theme.accent }}>무료 사주 풀이</p>
        <p className="mt-2 text-lg leading-snug font-bold">{heroTitle}</p>
        <p className="mt-2 text-[11px] opacity-80">{heroDesc}</p>
        {theme.bgAsset && !isViewable(theme.bgAsset) && <p className="mt-2 text-[9px] opacity-50">배경: {theme.bgAsset.split("/").pop()}</p>}
      </div>
      <div className="space-y-2 px-4 py-4">
        {["이름", "생년월일", "태어난 시간"].map((l) => (
          <div key={l} className="h-8 rounded-md border border-black/10 bg-white px-2 text-[11px] leading-8 text-gray-400">{l}</div>
        ))}
        <div className="h-9 rounded-md text-center text-xs leading-9 font-bold" style={{ background: theme.accent, color: theme.primary }}>
          무료로 내 사주 보기
        </div>
      </div>
      <div className="border-t border-black/5 px-4 py-3 text-[9px] leading-relaxed text-gray-500">
        {footerNote}
        <br />
        상호 명월재 · 사업자 정보 (명월재와 동일) · <span className="underline">결과 다시 보기</span>
      </div>
      <p className="bg-black/5 py-1 text-center text-[9px] text-gray-500">{FONT_LABEL[theme.font]}</p>
    </div>
  );
}

/** 예시 브랜드 페이지 새 탭으로 열기 (더미 브랜드만 예시 페이지가 있음) */
export function PageLink({ slug, big = false }: { slug: string; big?: boolean }) {
  const cls = big
    ? "inline-flex h-9 items-center rounded-lg border border-line bg-white px-3.5 text-sm font-medium hover:bg-paper"
    : "inline-flex h-7 items-center rounded-lg border border-line px-2.5 text-xs font-medium hover:bg-paper";
  if (!BRANDS.some((b) => b.slug === slug)) return <span className={`${cls} cursor-not-allowed opacity-40`} title="예시 페이지는 기존 브랜드에만 있어요">페이지 보기</span>;
  return (
    <a href={`/preview/${slug}`} target="_blank" rel="noreferrer" className={cls}>
      페이지 보기 ↗
    </a>
  );
}
