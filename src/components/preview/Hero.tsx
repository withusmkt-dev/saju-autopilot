"use client";

// 스킨별 첫 화면. 같은 문구(heroTitle·heroDesc·badge·cta)를 스킨마다 다른 구도로 보여 준다.
// 브랜드에 이미지(page.images.hero)가 있으면 그 이미지를 쓰고, 없으면 SVG 그림이나 색으로만 그린다.
import Motif from "./Motif";
import { PButton, useAos, usePreview } from "./PreviewShell";
import { bgImg, SAMPLE_SAJU } from "@/lib/preview/brandPages";

const hf = { fontFamily: "var(--hf)" };

export default function Hero({ onStart }: { onStart: () => void }) {
  const { brand, page } = usePreview();
  const aos = useAos();
  const title = page.heroTitle;
  const lines = title.split("\n");
  const cta = <PButton onClick={onStart}>{page.cta}</PButton>;
  const t = brand.theme;
  const hero = page.images?.hero ? bgImg(page.images.hero) : null;

  switch (page.skin) {
    case "poster":
      return (
        <section className="relative overflow-hidden bg-black px-[5.5cqw] pt-12 text-white">
          <div className="absolute top-5 -right-12 rotate-12 bg-[var(--a)] px-12 py-1 text-xs font-black text-black">⚠ {page.badge}</div>
          <h1 {...aos(0)} className="text-[clamp(44px,14.8cqw,60px)] leading-[0.98]" style={hf}>
            {lines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
          </h1>
          <p {...aos(1)} className="mt-5 max-w-[300px] text-[15px] leading-relaxed text-white/75">{page.heroDesc}</p>
          <div {...aos(2)} className="mt-7 pb-9">{cta}</div>
          <div className="-mx-[5.5cqw] overflow-hidden bg-[var(--a)] py-2 text-sm font-black whitespace-nowrap text-black">
            <div className="marquee inline-block">{"팩폭 주의 ✕ 돌려 말 안 함 ✕ ".repeat(8)}</div>
          </div>
        </section>
      );

    case "soft":
      return (
        <section className="relative overflow-hidden px-[6.5cqw] pt-14 pb-14" style={hero ? { background: `${hero} center / cover` } : undefined}>
          {!hero && <Motif kind="flower" accent={t.accent} bg="#fff0f4" />}
          <div className="relative">
            <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-[13px] font-bold text-[var(--p)] shadow-sm">{page.badge}</span>
            <h1 {...aos(0)} className="mt-5 text-[clamp(28px,9.2cqw,38px)] leading-tight whitespace-pre-line text-[var(--p)]" style={hf}>{title}</h1>
            <p {...aos(1)} className="mt-3 max-w-[290px] text-[15px] leading-relaxed text-[#5b3f4c]">{page.heroDesc}</p>
            <div {...aos(2)} className="mt-8 max-w-[260px]">{cta}</div>
          </div>
        </section>
      );

    case "finance": {
      const m = SAMPLE_SAJU.months;
      const pts = m.map((v, i) => `${(i / (m.length - 1)) * 300},${90 - ((v - 40) / 45) * 80}`).join(" ");
      return (
        <section className="px-[5.5cqw] pt-6 pb-10">
          <div {...aos(0, "fade-up")} className="rounded-2xl bg-[var(--p)] p-5 text-white shadow-lg">
            <div className="flex items-center justify-between text-[13px] opacity-75">
              <span>{brand.name} 재물 지수</span>
              <span>2027 · 샘플</span>
            </div>
            <p className="mt-1 text-3xl font-bold text-[var(--a)]">▲ 38.2</p>
            <svg viewBox="0 0 300 95" className="mt-3 h-24 w-full" aria-hidden>
              <polygon points={`0,95 ${pts} 300,95`} fill={t.accent} opacity="0.18" />
              <polyline points={pts} fill="none" stroke={t.accent} strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
            <div className="mt-1 flex justify-between text-[12px] opacity-60">
              <span>1월</span>
              <span>6월</span>
              <span>12월</span>
            </div>
          </div>
          <p className="mt-7 text-[13px] font-bold tracking-wider text-[var(--sub)]">{page.badge}</p>
          <h1 {...aos(1)} className="mt-2 text-[clamp(24px,7.7cqw,32px)] leading-tight whitespace-pre-line text-[var(--ink)]" style={hf}>{title}</h1>
          <p {...aos(2)} className="mt-3 text-[15px] leading-relaxed text-[var(--sub)]">{page.heroDesc}</p>
          <div {...aos(3)} className="mt-6">{cta}</div>
        </section>
      );
    }

    case "hanji":
      return (
        <section className="relative">
          <div className="relative flex gap-4 px-[6.5cqw] pt-8 pb-6">
            <div className="flex-1 pt-14">
              <p className="text-[13px] tracking-[0.2em] text-[var(--sub)]">{page.badge}</p>
              <p {...aos(1)} className="mt-6 text-[15px] leading-loose">{page.heroDesc}</p>
              <div {...aos(2)} className="mt-8">{cta}</div>
            </div>
            <h1 {...aos(0)} className="h-[310px] text-[clamp(27px,8.7cqw,36px)] leading-snug text-[var(--ink)] [writing-mode:vertical-rl]" style={hf}>
              {lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </h1>
          </div>
          {hero ? (
            <div {...aos(3, "fade")} className="relative h-[220px]" style={{ background: `linear-gradient(180deg, var(--pbg) 0%, transparent 35%), ${hero} center 72% / cover` }}>
              <div className="absolute right-6 bottom-5 grid h-14 w-14 rotate-6 place-items-center border-2 border-[#b3261e] bg-[#f3ecdc]/80 text-center text-sm leading-tight font-bold text-[#b3261e]" style={hf}>
                {brand.name}
              </div>
            </div>
          ) : (
            <div className="mx-6 mb-6 grid h-14 w-14 rotate-6 place-items-center border-2 border-[#b3261e] text-center text-sm leading-tight font-bold text-[#b3261e]" style={hf}>
              {brand.name}
            </div>
          )}
        </section>
      );

    case "calendar": {
      const m = SAMPLE_SAJU.months;
      return (
        <section className="relative px-[5.5cqw] pt-8 pb-10">
          {hero && <div className="absolute inset-x-0 top-0 h-72" style={{ background: `linear-gradient(180deg, rgba(238,245,244,0.35) 0%, rgba(238,245,244,0.15) 40%, var(--pbg) 100%), ${hero} center / cover` }} />}
          <div className="relative">
            <p className="text-[13px] font-bold tracking-widest text-[var(--p)]">{page.badge}</p>
            <p {...aos(0, "zoom-in")} className="mt-1 text-[clamp(76px,24.6cqw,100px)] leading-none font-black text-[var(--p)]" style={hf}>2027</p>
            <h1 {...aos(1)} className="mt-6 text-2xl leading-snug whitespace-pre-line text-[var(--ink)]" style={hf}>{title}</h1>
            <p {...aos(2)} className="mt-3 text-[15px] leading-relaxed text-[var(--sub)]">{page.heroDesc}</p>
            <div className="mt-5 grid grid-cols-6 gap-1.5">
              {m.map((v, i) => (
                <div key={i} {...aos(i + 2)} className="flex h-14 flex-col justify-between rounded-md bg-white p-1.5 shadow-sm">
                  <span className="text-[12px] font-bold text-[var(--p)]">{i + 1}월</span>
                  <span className="h-1.5 rounded-full bg-[var(--a)]" style={{ width: `${v}%`, opacity: 0.4 + (v - 40) / 80 }} />
                </div>
              ))}
            </div>
            <div {...aos(3)} className="mt-6">{cta}</div>
          </div>
        </section>
      );
    }

    case "office":
      // 클립보드 사진 위에 진단서를 끼워 둔 구도
      return (
        <section className="px-4 pt-6 pb-10">
          <div
            {...aos(0, "fade-up")}
            className="relative px-[15%] pt-[22%] pb-[12%] font-mono text-[12px] text-[#666]"
            style={hero ? { background: `${hero} center / 100% 100% no-repeat` } : { background: "#fff" }}
          >
            <div className="flex justify-between">
              <span>career_check.pdf</span>
              <span>p.1 / 10</span>
            </div>
            <span className="absolute top-[28%] right-[13%] rotate-[-8deg] border-2 border-red-500 bg-white/60 px-2 py-0.5 font-sans text-[13px] font-black text-red-500">{page.badge}</span>
            <h1 {...aos(1)} className="mt-6 font-sans text-[clamp(24px,7.7cqw,32px)] leading-tight text-[#1f1f1f]" style={hf}>
              {lines.map((l) => (
                <span key={l} className="block">
                  <span className="bg-[var(--a)] px-1">{l}</span>
                </span>
              ))}
            </h1>
            <ul className="mt-5 space-y-2 text-[14px] text-[#333]">
              {["월요일 아침이 유난히 무겁다", "연봉보다 상사가 더 문제다", "이력서만 세 번 고쳐 놓았다"].map((c, i) => (
                <li key={c} {...aos(i + 2, "fade-right")}>☐ {c}</li>
              ))}
            </ul>
            <p className="mt-4 font-sans text-[14px] leading-relaxed text-[#444]">{page.heroDesc}</p>
          </div>
          <div {...aos(3)} className="mt-5">{cta}</div>
        </section>
      );

    case "daily":
      return (
        <section className="px-[5.5cqw] pt-5 pb-10">
          <div className="border-y-4 border-double border-[var(--p)] py-4 text-center">
            <p className="text-[12px] tracking-[0.3em] text-[var(--sub)]">오늘의 일진</p>
            <p {...aos(0)} className="mt-1 text-[clamp(46px,15.4cqw,62px)] leading-none text-[var(--p)]" style={{ fontFamily: "'Nanum Myeongjo', serif" }}>甲辰日</p>
            <p className="mt-2 text-[13px] text-[var(--sub)]">갑진일 · 나무와 흙의 날 · 샘플</p>
          </div>
          {hero && (
            <figure {...aos(1)} className="mt-5">
              <div className="aspect-[16/10] w-full" style={{ background: `${hero} center 35% / cover` }} />
              <figcaption className="mt-1.5 text-[12px] text-[var(--sub)]">창가에 바람이 드는 날. 오늘은 미뤄 둔 일을 하나 정리하기 좋아요.</figcaption>
            </figure>
          )}
          <h1 {...aos(1)} className="mt-6 text-[clamp(23px,7.2cqw,30px)] leading-snug whitespace-pre-line text-[var(--ink)]" style={hf}>{title}</h1>
          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] gap-3 text-[14px] leading-relaxed">
            <p>{page.heroDesc}</p>
            <span className="w-px bg-[var(--p)]/30" />
            <ul className="space-y-1 text-[var(--sub)]">
              <li>행운의 색 · 남색</li>
              <li>행운의 방향 · 북쪽</li>
              <li>행운의 숫자 · 3</li>
            </ul>
          </div>
          <div {...aos(2)} className="mt-6">{cta}</div>
        </section>
      );

    case "duo":
      return (
        <section className="pb-10 text-center">
          {hero ? (
            <div className="relative h-[340px]" style={{ background: `linear-gradient(180deg, transparent 60%, var(--pbg)), ${hero} center 70% / cover` }}>
              <span className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-[13px] font-bold text-[var(--p)] shadow-sm">{page.badge}</span>
            </div>
          ) : (
            <div className="relative mx-auto mt-10 h-36 w-60">
              <div className="absolute top-0 left-0 h-36 w-36 rounded-full bg-[var(--p)]" />
              <div className="absolute top-0 right-0 h-36 w-36 rounded-full bg-[var(--a)]/90 mix-blend-multiply" />
            </div>
          )}
          <div className="px-[6.5cqw]">
            <h1 {...aos(0)} className="mt-2 text-[clamp(26px,8.2cqw,34px)] leading-tight whitespace-pre-line text-[var(--ink)]" style={hf}>{title}</h1>
            <p {...aos(1)} className="mx-auto mt-3 max-w-[300px] text-[15px] leading-relaxed text-[var(--sub)]">{page.heroDesc}</p>
            <div {...aos(2)} className="mx-auto mt-7 max-w-[280px]">{cta}</div>
          </div>
        </section>
      );

    case "letter": {
      const card = page.images?.card ? bgImg(page.images.card) : null;
      return (
        <section className="relative pb-10">
          {hero && <div className="h-[300px]" style={{ background: `linear-gradient(180deg, transparent 50%, var(--pbg)), ${hero} center / cover` }} />}
          <div className="px-[5.5cqw]">
            <div
              {...aos(0)}
              className={`relative rotate-[-1.5deg] rounded-sm border border-[#e3cfc0] px-[6.5cqw] py-8 shadow-[0_8px_20px_rgba(109,26,26,0.15)] ${hero ? "-mt-24" : "mt-10"}`}
              style={{ background: card ? `${card} left top / 100% auto, #fffaf5` : "#fffaf5" }}
            >
              <p className="text-[13px] text-[var(--sub)]">To. 아직 마음이 남은 당신에게</p>
              <h1 className="mt-4 text-[clamp(23px,7.2cqw,30px)] leading-snug whitespace-pre-line text-[var(--ink)]" style={hf}>{title}</h1>
              <p className="mt-4 text-[15px] leading-loose">{page.heroDesc}</p>
              <p className="mt-6 text-right text-[13px] text-[var(--sub)]">From. {brand.name}</p>
            </div>
            <div {...aos(2)} className="mt-8">{cta}</div>
          </div>
        </section>
      );
    }

    default:
      // night: 밤하늘
      return (
        <section
          className="relative overflow-hidden px-[6.5cqw] pt-20 pb-14 text-center"
          style={hero ? { background: `linear-gradient(180deg, rgba(0,0,0,0) 40%, ${t.primary} 100%), ${hero} center top / cover` } : undefined}
        >
          {!hero && <Motif kind={page.motif} accent={t.accent} bg={t.primary} />}
          <div className={`relative ${hero ? "pt-28" : ""}`}>
            <span className="inline-block rounded-full border border-[var(--a)]/70 bg-black/20 px-3 py-1 text-[13px] text-[var(--a)]">{page.badge}</span>
            <h1 {...aos(0)} className="mt-5 text-[clamp(27px,8.7cqw,36px)] leading-tight whitespace-pre-line text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]" style={hf}>{title}</h1>
            <p {...aos(1)} className="mx-auto mt-4 max-w-[290px] text-[15px] leading-relaxed text-[var(--sub)]">{page.heroDesc}</p>
            <div {...aos(2)} className="mx-auto mt-8 max-w-[260px]">{cta}</div>
            <p className="mt-3 text-[12px] text-[var(--sub)]">무료 풀이 · 1분이면 끝나요</p>
          </div>
        </section>
      );
  }
}

/** 중간 사진 띠 (page.images.band) */
export function PhotoBand() {
  const { page } = usePreview();
  const aos = useAos();
  const band = page.images?.band;
  if (!band) return null;
  return (
    <figure {...aos(0, "fade")} className="my-2">
      <div className="h-[220px] w-full" style={{ background: `${bgImg(band)} center / cover` }} />
      {page.images?.bandCaption && (
        <figcaption className="px-[5.5cqw] pt-3 text-[15px] text-[var(--ink)]" style={hf}>
          {page.images.bandCaption}
        </figcaption>
      )}
    </figure>
  );
}
