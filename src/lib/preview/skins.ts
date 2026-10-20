// 브랜드 페이지 '스킨'. 같은 마스터 템플릿이라도 스킨마다 바탕·카드·입력칸·버튼·첫 화면·섹션 배치가 달라진다.
// 브랜드 자동 생성 때 Claude 가 컨셉에 맞는 스킨을 하나 고르게 한다 (site_config.skin).
import type { BrandTheme } from "@/lib/types";

export type SkinKey = "night" | "poster" | "soft" | "finance" | "hanji" | "calendar" | "office" | "daily" | "duo" | "letter";
export type Section = "points" | "form" | "reviews" | "product" | "feature" | "about";

export interface Skin {
  label: string;
  header: "solid" | "plain" | "center";
  card: string;
  input: string;
  btn: string;
  order: Section[];
  bodyFont?: string; // 본문까지 바꾸는 스킨 (한지·편지)
  /** AOS 등장 효과 */
  motion: { type: string; duration: number; easing: string; stagger: number };
  /** 바탕·글자색 */
  vars: (t: BrandTheme) => Record<string, string>;
}

const light = (pbg: string, text: string, sub: string, t: BrandTheme, ink = t.primary) => ({
  "--pbg": pbg,
  "--text": text,
  "--sub": sub,
  "--ink": ink,
  "--line": "rgba(0,0,0,0.1)",
});

export const SKINS: Record<SkinKey, Skin> = {
  night: {
    motion: { type: "fade-up", duration: 1000, easing: "ease-out-cubic", stagger: 150 },
    label: "밤하늘",
    header: "solid",
    card: "rounded-2xl bg-white/[0.06] ring-1 ring-white/10",
    input: "rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/40 [color-scheme:dark]",
    btn: "rounded-full bg-[var(--a)] text-[var(--p)]",
    order: ["points", "feature", "form", "about", "reviews", "product"],
    vars: (t) => ({ "--pbg": t.primary, "--text": "#ece6f8", "--sub": "rgba(236,230,248,0.8)", "--ink": t.accent, "--line": "rgba(255,255,255,0.12)" }),
  },
  poster: {
    motion: { type: "zoom-in", duration: 450, easing: "ease-out-back", stagger: 80 },
    label: "포스터",
    header: "plain",
    card: "border-2 border-black bg-white shadow-[5px_5px_0_var(--a)]",
    input: "rounded-none border-2 border-black bg-white",
    btn: "rounded-none border-2 border-black bg-[var(--a)] text-black shadow-[4px_4px_0_#000]",
    order: ["feature", "points", "reviews", "form", "product", "about"],
    vars: (t) => light("#f4f1ea", "#111", "#3d3d3d", t, "#111"),
  },
  soft: {
    motion: { type: "fade-up", duration: 700, easing: "ease-out-back", stagger: 120 },
    label: "말랑",
    header: "plain",
    card: "rounded-[28px] bg-white shadow-[0_10px_30px_rgba(122,31,75,0.08)]",
    input: "rounded-full border border-[var(--a)] bg-white px-5",
    btn: "rounded-full bg-[var(--p)] text-white",
    order: ["points", "feature", "reviews", "form", "about", "product"],
    vars: (t) => light("#fff0f4", "#3a2430", "#6e5260", t),
  },
  finance: {
    motion: { type: "fade-left", duration: 600, easing: "ease-out-quad", stagger: 100 },
    label: "리포트",
    header: "solid",
    card: "rounded-xl border border-black/10 bg-white",
    input: "rounded-lg border border-black/15 bg-white",
    btn: "rounded-lg bg-[var(--p)] text-[var(--a)]",
    order: ["feature", "points", "product", "form", "reviews", "about"],
    vars: (t) => light("#faf7ef", "#2a2216", "#5f533f", t),
  },
  hanji: {
    motion: { type: "fade", duration: 1300, easing: "ease-in-out-sine", stagger: 250 },
    label: "한지",
    header: "center",
    card: "border border-[var(--p)]/40 bg-[#fffdf6] outline outline-1 -outline-offset-[5px] outline-[var(--p)]/20",
    input: "rounded-none border-0 border-b-2 border-[var(--p)]/40 bg-transparent !px-1",
    btn: "rounded-none border-2 border-[var(--p)] bg-[var(--p)] text-[#f3ecdc] tracking-[0.12em]",
    order: ["about", "points", "feature", "form", "reviews", "product"],
    bodyFont: "'Nanum Myeongjo', serif",
    vars: (t) => light("#f3ecdc", "#2b2a26", "#575144", t),
  },
  calendar: {
    motion: { type: "flip-left", duration: 700, easing: "ease-out-cubic", stagger: 90 },
    label: "달력",
    header: "solid",
    card: "rounded-lg border-t-4 border-[var(--a)] bg-white shadow-sm",
    input: "rounded-md border border-[var(--p)]/25 bg-white",
    btn: "rounded-md bg-[var(--p)] text-[var(--a)]",
    order: ["feature", "points", "form", "product", "reviews", "about"],
    vars: (t) => light("#eef5f4", "#10292a", "#435859", t),
  },
  office: {
    motion: { type: "fade-right", duration: 500, easing: "ease-out-quad", stagger: 80 },
    label: "서류",
    header: "plain",
    card: "rounded-md border border-black/15 bg-white",
    input: "rounded-md border border-black/20 bg-[#fafafa] font-mono",
    btn: "rounded-md bg-[#1f1f1f] text-[var(--a)]",
    order: ["points", "feature", "reviews", "form", "product", "about"],
    vars: (t) => light("#f2f2f0", "#1f1f1f", "#4d4d4d", t, "#1f1f1f"),
  },
  daily: {
    motion: { type: "fade-down", duration: 800, easing: "ease-out-sine", stagger: 120 },
    label: "신문",
    header: "center",
    card: "border-y-2 border-[var(--p)] bg-[#fffcf5]",
    input: "rounded-none border border-[var(--p)]/30 bg-[#fffcf5]",
    btn: "rounded-none bg-[var(--p)] text-[#f7f1e6]",
    order: ["feature", "points", "form", "about", "product", "reviews"],
    vars: (t) => light("#f7f1e6", "#2e241a", "#5f4f3c", t),
  },
  duo: {
    motion: { type: "zoom-in-up", duration: 700, easing: "ease-out-cubic", stagger: 120 },
    label: "둘",
    header: "plain",
    card: "rounded-3xl bg-white shadow-[0_6px_20px_rgba(36,48,77,0.10)]",
    input: "rounded-2xl border border-[var(--a)]/70 bg-white",
    btn: "rounded-2xl bg-gradient-to-r from-[var(--p)] to-[#4a5f8f] text-white",
    order: ["feature", "points", "form", "reviews", "about", "product"],
    vars: (t) => light("#eef3fc", "#1d2740", "#4b556e", t),
  },
  letter: {
    motion: { type: "fade-up", duration: 1100, easing: "ease-in-out-sine", stagger: 200 },
    label: "편지",
    header: "center",
    card: "rounded-sm border border-[#e3cfc0] bg-[#fffaf5] shadow-[0_2px_6px_rgba(109,26,26,0.08)]",
    input: "rounded-none border-0 border-b border-[var(--p)]/40 bg-transparent !px-1",
    btn: "rounded-sm bg-[var(--p)] text-[#fff1e6]",
    order: ["points", "about", "feature", "form", "reviews", "product"],
    bodyFont: "'Gowun Batang', serif",
    vars: (t) => light("#f7ece6", "#3b1f1f", "#6b4d47", t),
  },
};
