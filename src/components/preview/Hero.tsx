"use client";

// 스킨별 첫 화면. 같은 문구(heroTitle·heroDesc·badge·cta)를 스킨마다 다른 구도로 보여 준다.
import Motif from "./Motif";
import { PButton, usePreview } from "./PreviewShell";
import { SAMPLE_SAJU } from "@/lib/preview/brandPages";

const hf = { fontFamily: "var(--hf)" };

export default function Hero({ onStart }: { onStart: () => void }) {
  const { brand, page } = usePreview();
  const title = page.heroTitle;
  const lines = title.split("\n");
  const cta = <PButton onClick={onStart}>{page.cta}</PButton>;
  const t = brand.theme;

  switch (page.skin) {
    case "poster":
      return (
        <section className="relative overflow-hidden bg-black px-5 pt-12 text-white">
          <div className="absolute top-5 -right-12 rotate-12 bg-[var(--a)] px-12 py-1 text-xs font-black text-black">⚠ {page.badge}</div>
          <h1 className="text-[58px] leading-[0.98]" style={hf}>
            {lines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </h1>
          <p className="mt-5 max-w-[300px] text-sm leading-relaxed text-white/70">{page.heroDesc}</p>
          <div className="mt-7 pb-9">{cta}</div>
          <div className="-mx-5 overflow-hidden bg-[var(--a)] py-2 text-sm font-black whitespace-nowrap text-black">
            <div className="marquee inline-block">{"팩폭 주의 ✕ 돌려 말 안 함 ✕ ".repeat(8)}</div>
          </div>
        </section>
      );

    case "soft":
      return (
        <section className="relative overflow-hidden px-6 pt-12 pb-12">
          <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-[var(--a)]/45" />
          <div className="absolute -bottom-10 -left-12 h-40 w-40 rounded-full bg-[var(--a)]/30" />
          <Motif kind="flower" accent={t.accent} bg="#fff0f4" />
          <div className="relative">
            <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--p)] shadow-sm">💗 {page.badge}</span>
            <h1 className="mt-5 text-[34px] leading-tight whitespace-pre-line text-[var(--p)]" style={hf}>{title}</h1>
            <p className="mt-3 max-w-[290px] text-sm leading-relaxed text-[var(--sub)]">{page.heroDesc}</p>
            <div className="mt-8 max-w-[260px]">{cta}</div>
          </div>
        </section>
      );

    case "finance": {
      const m = SAMPLE_SAJU.months;
      const pts = m.map((v, i) => `${(i / (m.length - 1)) * 300},${90 - ((v - 40) / 45) * 80}`).join(" ");
      return (
        <section className="px-5 pt-6 pb-10">
          <div className="rounded-2xl bg-[var(--p)] p-5 text-white">
            <div className="flex items-center justify-between text-xs opacity-70">
              <span>{brand.name} 재물 지수</span>
              <span>2027 · 샘플</span>
            </div>
            <p className="mt-1 text-3xl font-bold text-[var(--a)]">▲ 38.2</p>
            <svg viewBox="0 0 300 95" className="mt-3 h-24 w-full" aria-hidden>
              <polygon points={`0,95 ${pts} 300,95`} fill={t.accent} opacity="0.18" />
              <polyline points={pts} fill="none" stroke={t.accent} strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
            <div className="mt-1 flex justify-between text-[10px] opacity-50">
              <span>1월</span>
              <span>6월</span>
              <span>12월</span>
            </div>
          </div>
          <p className="mt-7 text-xs font-bold tracking-wider text-[var(--sub)]">{page.badge}</p>
          <h1 className="mt-2 text-[30px] leading-tight whitespace-pre-line text-[var(--ink)]" style={hf}>{title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--sub)]">{page.heroDesc}</p>
          <div className="mt-6">{cta}</div>
        </section>
      );
    }

    case "hanji":
      return (
        <section className="relative overflow-hidden px-6 pt-8 pb-24">
          <svg viewBox="0 0 400 300" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden>
            <circle cx="90" cy="70" r="34" fill="none" stroke={t.primary} strokeOpacity="0.25" strokeWidth="1.5" />
            <path d="M0 300 L60 230 L110 265 L180 190 L250 255 L320 205 L400 260 L400 300Z" fill={t.primary} opacity="0.07" />
          </svg>
          <div className="relative flex gap-4">
            <div className="flex-1 pt-14">
              <p className="text-xs tracking-[0.3em] text-[var(--sub)]">{page.badge}</p>
              <p className="mt-6 text-[15px] leading-loose">{page.heroDesc}</p>
              <div className="mt-8">{cta}</div>
            </div>
            <h1 className="h-[310px] text-[34px] leading-snug text-[var(--ink)] [writing-mode:vertical-rl]" style={hf}>
              {lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </h1>
          </div>
          <div className="absolute right-6 bottom-5 grid h-14 w-14 rotate-6 place-items-center border-2 border-[#b3261e] text-center text-sm leading-tight font-bold text-[#b3261e]" style={hf}>
            {brand.name}
          </div>
        </section>
      );

    case "calendar": {
      const m = SAMPLE_SAJU.months;
      return (
        <section className="px-5 pt-8 pb-10">
          <p className="text-xs font-bold tracking-widest text-[var(--sub)]">{page.badge}</p>
          <p className="mt-1 text-[96px] leading-none font-black text-[var(--p)]" style={hf}>2027</p>
          <h1 className="mt-3 text-2xl leading-snug whitespace-pre-line text-[var(--ink)]" style={hf}>{title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--sub)]">{page.heroDesc}</p>
          <div className="mt-5 grid grid-cols-6 gap-1.5">
            {m.map((v, i) => (
              <div key={i} className="flex h-14 flex-col justify-between rounded-md bg-white p-1.5 shadow-sm">
                <span className="text-[10px] font-bold text-[var(--p)]">{i + 1}월</span>
                <span className="h-1.5 rounded-full bg-[var(--a)]" style={{ width: `${v}%`, opacity: 0.4 + (v - 40) / 80 }} />
              </div>
            ))}
          </div>
          <div className="mt-6">{cta}</div>
        </section>
      );
    }

    case "office":
      return (
        <section className="px-5 pt-8 pb-10">
          <div className="relative rounded-md border border-black/15 bg-white p-5 font-mono text-[11px] text-[#777] shadow-sm">
            <div className="flex justify-between">
              <span>📄 career_check.pdf</span>
              <span>p.1 / 10</span>
            </div>
            <span className="absolute top-12 right-4 rotate-[-8deg] border-2 border-red-500 px-2 py-0.5 font-sans text-xs font-black text-red-500">{page.badge}</span>
            <h1 className="mt-6 font-sans text-[34px] leading-tight text-[#1f1f1f]" style={hf}>
              {lines.map((l) => (
                <span key={l} className="block">
                  <span className="bg-[var(--a)] px-1">{l}</span>
                </span>
              ))}
            </h1>
            <ul className="mt-5 space-y-1.5 text-[13px] text-[#333]">
              {["월요일 아침이 유난히 무겁다", "연봉보다 상사가 더 문제다", "이력서만 세 번 고쳐 놓았다"].map((c) => (
                <li key={c}>☐ {c}</li>
              ))}
            </ul>
            <p className="mt-4 font-sans text-sm leading-relaxed text-[#555]">{page.heroDesc}</p>
          </div>
          <div className="mt-5">{cta}</div>
        </section>
      );

    case "daily":
      return (
        <section className="px-5 pt-5 pb-10">
          <div className="border-y-4 border-double border-[var(--p)] py-4 text-center">
            <p className="text-[11px] tracking-[0.4em] text-[var(--sub)]">오늘의 일진</p>
            <p className="mt-1 text-[60px] leading-none text-[var(--p)]" style={{ fontFamily: "'Nanum Myeongjo', serif" }}>甲辰日</p>
            <p className="mt-2 text-xs text-[var(--sub)]">갑진일 · 나무와 흙의 날 · 샘플</p>
          </div>
          <h1 className="mt-6 text-[28px] leading-snug whitespace-pre-line text-[var(--ink)]" style={hf}>{title}</h1>
          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] gap-3 text-[13px] leading-relaxed">
            <p>{page.heroDesc}</p>
            <span className="w-px bg-[var(--p)]/30" />
            <ul className="space-y-1 text-[var(--sub)]">
              <li>행운의 색 · 남색</li>
              <li>행운의 방향 · 북쪽</li>
              <li>행운의 숫자 · 3</li>
            </ul>
          </div>
          <div className="mt-6">{cta}</div>
        </section>
      );

    case "duo":
      return (
        <section className="px-6 pt-10 pb-10 text-center">
          <div className="relative mx-auto h-36 w-60">
            <div className="absolute top-0 left-0 grid h-36 w-36 place-items-center rounded-full bg-[var(--p)] text-lg font-bold text-white">
              <span className="-ml-10">나</span>
            </div>
            <div className="absolute top-0 right-0 grid h-36 w-36 place-items-center rounded-full bg-[var(--a)]/90 text-lg font-bold text-[var(--p)] mix-blend-multiply">
              <span className="ml-10">너</span>
            </div>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">♥</span>
          </div>
          <span className="mt-6 inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--p)] shadow-sm">{page.badge}</span>
          <h1 className="mt-4 text-[32px] leading-tight whitespace-pre-line text-[var(--ink)]" style={hf}>{title}</h1>
          <p className="mx-auto mt-3 max-w-[300px] text-sm leading-relaxed text-[var(--sub)]">{page.heroDesc}</p>
          <div className="mx-auto mt-7 max-w-[280px]">{cta}</div>
        </section>
      );

    case "letter":
      return (
        <section className="relative overflow-hidden px-5 pt-8 pb-10">
          <svg viewBox="0 0 400 120" className="pointer-events-none absolute top-2 left-0 h-28 w-full" aria-hidden>
            <path d="M-10 70 C 60 10, 120 120, 200 60 S 330 20, 410 80" fill="none" stroke={t.primary} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          </svg>
          <div className="relative mt-10 rotate-[-1.5deg] rounded-sm border border-[#e3cfc0] bg-[#fffaf5] px-6 py-8 shadow-[0_8px_20px_rgba(109,26,26,0.12)]">
            <p className="text-xs text-[var(--sub)]">To. 아직 마음이 남은 당신에게</p>
            <h1 className="mt-4 text-[28px] leading-snug whitespace-pre-line text-[var(--ink)]" style={hf}>{title}</h1>
            <p className="mt-4 text-[15px] leading-loose">{page.heroDesc}</p>
            <p className="mt-6 text-right text-xs text-[var(--sub)]">From. {brand.name}</p>
          </div>
          <div className="mt-8">{cta}</div>
        </section>
      );

    default:
      // night — 밤하늘
      return (
        <section className="relative overflow-hidden px-6 pt-16 pb-14 text-center">
          <Motif kind={page.motif} accent={t.accent} bg={t.primary} />
          <div className="relative">
            <span className="inline-block rounded-full border border-[var(--a)]/60 px-3 py-1 text-xs text-[var(--a)]">{page.badge}</span>
            <h1 className="mt-5 text-[34px] leading-tight whitespace-pre-line text-white" style={hf}>{title}</h1>
            <p className="mx-auto mt-4 max-w-[290px] text-sm leading-relaxed text-[var(--sub)]">{page.heroDesc}</p>
            <div className="mx-auto mt-8 max-w-[260px]">{cta}</div>
            <p className="mt-3 text-[11px] text-[var(--sub)]">무료 풀이 · 1분이면 끝나요</p>
          </div>
        </section>
      );
  }
}
