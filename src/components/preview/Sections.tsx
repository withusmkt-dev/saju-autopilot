"use client";

// 스킨별 소개·후기·상품 섹션
import { PCard, PTitle, useAos, usePreview } from "./PreviewShell";
import { bgImg } from "@/lib/preview/brandPages";

const hf = { fontFamily: "var(--sf)" };
const display = { fontFamily: "var(--hf)" }; // 표제용 (큰 숫자·한 줄 문구)
const HANJA = ["一", "二", "三"];
const serif = { fontFamily: "'Nanum Myeongjo', serif" };
const desc = "text-[14px] leading-relaxed text-[var(--sub)]";

/** 스티커 스킨 아이콘: 비어 있는 한 칸 / 네잎클로버 / 별 달린 달력 */
function StickerIcon({ i }: { i: number }) {
  const c = { viewBox: "0 0 32 32", className: "h-[46%] w-[46%] text-[var(--p)]", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (i === 0)
    return (
      <svg {...c}>
        <circle cx="16" cy="16" r="11" />
        <path d="M16 5a11 11 0 0 1 0 22z" fill="currentColor" />
      </svg>
    );
  if (i === 1)
    return (
      <svg {...c}>
        <path d="M18 18c2 3 4 6 8 9" />
        <g fill="currentColor" stroke="none">
          <circle cx="12" cy="11" r="4.6" />
          <circle cx="20" cy="11" r="4.6" />
          <circle cx="12" cy="19" r="4.6" />
          <circle cx="20" cy="19" r="4.6" />
        </g>
      </svg>
    );
  return (
    <svg {...c}>
      <rect x="5" y="7" width="22" height="20" rx="3" />
      <path d="M5 13h22M11 4v5M21 4v5" />
      <path d="m16 16 1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" fill="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** 하늘 스킨 날씨 아이콘 (Features 에서도 씀) */
export function WeatherIcon({ kind, className }: { kind: "sun" | "cloud" | "rain" | "wind" | "fog"; className: string }) {
  const c = { viewBox: "0 0 32 32", className, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const cloud = "M10 23a5 5 0 0 1-.6-10 7 7 0 0 1 13.5-1.4A5.6 5.6 0 0 1 22.5 23z";
  switch (kind) {
    case "sun":
      return (
        <svg {...c}>
          <circle cx="16" cy="16" r="5.5" fill="#ffd6a5" />
          <path d="M16 3.5v3M16 25.5v3M3.5 16h3M25.5 16h3M7.2 7.2l2.1 2.1M22.7 22.7l2.1 2.1M7.2 24.8l2.1-2.1M22.7 9.3l2.1-2.1" />
        </svg>
      );
    case "rain":
      return (
        <svg {...c}>
          <path d="M10 19a5 5 0 0 1-.6-10 7 7 0 0 1 13.5-1.4A5.6 5.6 0 0 1 22.5 19z" />
          <path d="M11 23l-1 3M16 23l-1 3M21 23l-1 3" />
        </svg>
      );
    case "wind":
      return (
        <svg {...c}>
          <path d="M4 12h15a3.5 3.5 0 1 0-3.5-3.5M4 17h20a3.5 3.5 0 1 1-3.5 3.5M4 22h9" />
        </svg>
      );
    case "fog":
      return (
        <svg {...c}>
          <path d="M5 11h22M8 16h18M5 21h16M10 26h12" />
        </svg>
      );
    default:
      return (
        <svg {...c}>
          <circle cx="21" cy="10" r="4" fill="#ffd6a5" stroke="none" />
          <path d={cloud} fill="white" />
        </svg>
      );
  }
}

export function Points() {
  const { page } = usePreview();
  const aos = useAos();
  const pts = page.points;
  const head = <div {...aos()}><PTitle>{page.titles.points}</PTitle></div>;

  switch (page.skin) {
    case "poster":
      return (
        <section className="px-[5.5cqw] py-12">
          {head}
          <ul className="border-t-2 border-black">
            {pts.map((p, i) => (
              <li key={p.title} {...aos(i + 1)} className="flex items-center gap-4 border-b-2 border-black py-5">
                <span className="w-16 shrink-0 text-5xl leading-none whitespace-nowrap text-[var(--a)]" style={display}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[19px] font-black">{p.title}</p>
                  <p className={desc}>{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      );
    case "soft":
      return (
        <section className="py-12">
          <div className="px-[5.5cqw]">{head}</div>
          <ul className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-[5.5cqw] pb-3">
            {pts.map((p, i) => (
              <li key={p.title} {...aos(i + 1)} className="w-48 shrink-0 snap-start">
                <PCard className="h-full">
                  <p className="text-[13px] font-bold text-[var(--p)] opacity-60">No.{i + 1}</p>
                  <p className="mt-2 text-[17px] font-bold text-[var(--p)]">{p.title}</p>
                  <p className={`mt-1 ${desc}`}>{p.desc}</p>
                </PCard>
              </li>
            ))}
          </ul>
          <p className="mt-1 px-[5.5cqw] text-[12px] text-[var(--sub)]">옆으로 넘겨 보세요 →</p>
        </section>
      );
    case "finance":
      return (
        <section className="px-[5.5cqw] py-10">
          {head}
          <ul className="grid grid-cols-3 gap-2">
            {pts.map((p, i) => (
              <li key={p.title} {...aos(i + 1)}>
                <PCard className="h-full !px-3">
                  <p className="text-[clamp(19px,5.6cqw,23px)] font-bold text-[var(--ink)]" style={hf}>{["₩", "↗", "◎"][i]}</p>
                  <p className="mt-2 text-[15px] font-bold text-[var(--ink)]">{p.title}</p>
                  <p className="mt-1 text-[12.5px] leading-snug text-[var(--sub)]">{p.desc}</p>
                </PCard>
              </li>
            ))}
          </ul>
        </section>
      );
    case "hanji":
      return (
        <section className="px-[5.5cqw] py-12">
          {head}
          <table {...aos(1)} className="w-full border-collapse border border-[var(--p)]/50 text-[15px]">
            <tbody>
              {pts.map((p, i) => (
                <tr key={p.title} className="border-b border-[var(--p)]/30">
                  <td className="w-14 border-r border-[var(--p)]/30 py-4 text-center text-2xl text-[var(--ink)]" style={hf}>{HANJA[i]}</td>
                  <td className="px-4 py-4">
                    <p className="font-bold text-[var(--ink)]">{p.title}</p>
                    <p className={`mt-1 ${desc}`}>{p.desc}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );
    case "calendar":
      return (
        <section className="px-[5.5cqw] py-10">
          {head}
          <div className="space-y-3">
            {pts.map((p, i) => (
              <div key={p.title} {...aos(i + 1)}>
                <PCard className="flex gap-4">
                  <span className="w-12 shrink-0 text-[13px] font-bold text-[var(--sub)]">PART<br /><b className="text-2xl text-[var(--ink)]">{i + 1}</b></span>
                  <div>
                    <p className="text-[17px] font-bold text-[var(--ink)]">{p.title}</p>
                    <p className={`mt-1 ${desc}`}>{p.desc}</p>
                  </div>
                </PCard>
              </div>
            ))}
          </div>
        </section>
      );
    case "office":
      return (
        <section className="px-[5.5cqw] py-10">
          {head}
          <div {...aos(1)}>
            <PCard>
              <ul className="space-y-4">
                {pts.map((p, i) => (
                  <li key={p.title} className="flex gap-3">
                    <span className="mt-0.5 font-mono text-[13px] text-[var(--sub)]">{String(i + 1).padStart(2, "0")}.</span>
                    <div>
                      <p className="text-[16px] font-bold">
                        <span className="bg-[var(--a)]/60 px-0.5">{p.title}</span>
                      </p>
                      <p className={`mt-0.5 ${desc}`}>{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </PCard>
          </div>
        </section>
      );
    case "daily":
      return (
        <section className="px-[5.5cqw] py-10">
          {head}
          <ul className="grid grid-cols-3 divide-x divide-[var(--p)]/25 border-y border-[var(--p)]/40 py-5 text-center">
            {pts.map((p, i) => (
              <li key={p.title} {...aos(i + 1)} className="px-2">
                <p className="text-[clamp(23px,7.2cqw,30px)] text-[var(--ink)]" style={{ fontFamily: "'Nanum Myeongjo', serif" }}>{["日", "合", "色"][i]}</p>
                <p className="mt-1 text-[15px] font-bold text-[var(--ink)]">{p.title}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-[var(--sub)]">{p.desc}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    case "duo":
      return (
        <section className="px-[5.5cqw] py-10">
          {head}
          <div className="space-y-3">
            {pts.map((p, i) => (
              <div key={p.title} {...aos(i + 1)}>
                <PCard className="flex items-center gap-3">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold ${i === 1 ? "bg-[var(--a)] text-[var(--p)]" : i === 2 ? "bg-[#4a5f8f] text-white" : "bg-[var(--p)] text-white"}`}>
                    {["나", "너", "우리"][i]}
                  </span>
                  <div>
                    <p className="text-[16px] font-bold text-[var(--ink)]">{p.title}</p>
                    <p className={desc}>{p.desc}</p>
                  </div>
                </PCard>
              </div>
            ))}
          </div>
        </section>
      );
    case "letter":
      return (
        <section className="px-[5.5cqw] py-10">
          <div {...aos()}>
            <PCard className="px-[6.5cqw] py-7">
              <p className="text-[14px] text-[var(--sub)]">{page.titles.points}</p>
              {pts.map((p, i) => (
                <p key={p.title} className="mt-4 text-[16px] leading-loose">
                  <b className="text-[var(--ink)]">{["첫째", "둘째", "셋째"][i]}, {p.title}.</b> {p.desc}.
                </p>
              ))}
              <p className="mt-5 text-[14px] text-[var(--sub)]">조심스럽게, 그래도 솔직하게 적어 드릴게요.</p>
            </PCard>
          </div>
        </section>
      );
    case "sticker":
      // 동그란 스티커 세 장
      return (
        <section className="px-[5.5cqw] py-12 text-center">
          {head}
          <ul className="grid grid-cols-3 gap-3">
            {pts.map((p, i) => (
              <li key={p.title} {...aos(i + 1)}>
                <div className={`mx-auto grid aspect-square w-full max-w-[104px] place-items-center rounded-full border-2 border-[var(--p)] shadow-[0_4px_0_var(--p)] ${["-rotate-6 bg-[var(--a)]", "rotate-3 bg-[#cfe6d4]", "-rotate-2 bg-[#f7cfd8]"][i]}`}>
                  <StickerIcon i={i} />
                </div>
                <p className="mt-3 text-[16px] text-[var(--p)]" style={hf}>{p.title}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-[var(--sub)]">{p.desc}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    case "royal":
      return (
        <section className="px-[7cqw] py-12">
          <div className="text-center">{head}</div>
          <ul className="border-t border-[var(--a)]/35">
            {pts.map((p, i) => (
              <li key={p.title} {...aos(i + 1)} className="flex items-center gap-4 border-b border-[var(--a)]/35 py-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--a)]/70 text-[20px] text-[var(--a)]" style={serif}>{["器", "運", "時"][i]}</span>
                <div>
                  <p className="text-[17px] text-[#f3e6c8]" style={hf}>{p.title}</p>
                  <p className={`mt-1 ${desc}`}>{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      );
    case "sky":
      // 날씨 앱처럼 세 칸
      return (
        <section className="px-[5.5cqw] py-10">
          {head}
          <div {...aos(1)}>
            <PCard className="grid grid-cols-3 divide-x divide-[var(--p)]/15 !px-1 text-center">
              {pts.map((p, i) => (
                <div key={p.title} className="px-2 py-1">
                  <WeatherIcon kind={(["cloud", "rain", "sun"] as const)[i]} className="mx-auto h-9 w-9 text-[var(--p)]" />
                  <p className="mt-2 text-[15px] font-bold text-[var(--ink)]" style={hf}>{p.title}</p>
                  <p className="mt-1 text-[12.5px] leading-snug text-[var(--sub)]">{p.desc}</p>
                </div>
              ))}
            </PCard>
          </div>
        </section>
      );
    case "invite":
      // 예식 순서처럼
      return (
        <section className="px-[7cqw] py-12 text-center">
          <p className="text-[12px] tracking-[0.4em] text-[var(--sub)]">PROGRAM</p>
          <div className="mt-2">{head}</div>
          <ol className="space-y-6">
            {pts.map((p, i) => (
              <li key={p.title} {...aos(i + 1)}>
                <p className="text-[15px] text-[var(--a)]" style={{ ...serif, filter: "brightness(0.8)" }}>{["Ⅰ", "Ⅱ", "Ⅲ"][i]}</p>
                <p className="mt-1 text-[18px] text-[var(--ink)]" style={hf}>{p.title}</p>
                <p className={`mt-1 ${desc}`}>{p.desc}</p>
              </li>
            ))}
          </ol>
        </section>
      );
    default:
      // night: 별자리처럼 이어지는 타임라인
      return (
        <section className="px-[6.5cqw] py-12">
          {head}
          <ol className="relative ml-2 border-l border-[var(--a)]/40">
            {pts.map((p, i) => (
              <li key={p.title} {...aos(i + 1)} className="relative pb-8 pl-6 last:pb-0">
                <span className="absolute top-1 -left-[5px] h-[9px] w-[9px] rounded-full bg-[var(--a)]" />
                <p className="text-[17px] font-bold text-white">{p.title}</p>
                <p className={`mt-1 ${desc}`}>{p.desc}</p>
              </li>
            ))}
          </ol>
        </section>
      );
  }
}

export function Reviews() {
  const { page } = usePreview();
  const aos = useAos();
  const rv = page.reviews;
  const head = <div {...aos()}><PTitle>{page.titles.reviews}</PTitle></div>;

  if (page.skin === "poster" || page.skin === "office" || page.skin === "duo" || page.skin === "sticker") {
    const me = page.skin === "poster" ? "bg-black text-white rounded-none" : page.skin === "duo" || page.skin === "sticker" ? "bg-[var(--p)] text-white rounded-2xl rounded-br-sm" : "bg-[#1f1f1f] text-white rounded-lg";
    const you =
      page.skin === "poster" ? "border-2 border-black bg-white rounded-none" : page.skin === "sticker" ? "border-2 border-[var(--p)] bg-white rounded-2xl rounded-bl-sm" : "bg-white rounded-2xl rounded-bl-sm shadow-sm";
    return (
      <section className="px-[5.5cqw] py-10">
        {head}
        <div className="space-y-4">
          {rv.map((r, i) => (
            <div key={r.name} {...aos(i + 1, i % 2 ? "fade-left" : "fade-right")} className={`flex flex-col ${i % 2 ? "items-end" : "items-start"}`}>
              <p className={`max-w-[85%] px-4 py-3 text-[15px] leading-relaxed ${i % 2 ? me : you}`}>{r.text}</p>
              <p className="mt-1 text-[12px] text-[var(--sub)]">{r.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (page.skin === "soft") {
    return (
      <section className="px-[5.5cqw] py-10">
        {head}
        <div className="grid grid-cols-2 gap-3">
          {rv.map((r, i) => (
            <div key={r.name} {...aos(i + 1)}>
              <div className={`rounded-md bg-white p-3 pb-5 shadow-md ${i % 2 ? "rotate-2" : "-rotate-2"}`}>
                <div className="grid h-20 place-items-center rounded bg-[var(--a)]/35 text-[40px] leading-none text-[var(--p)]" style={hf}>&ldquo;</div>
                <p className="mt-3 text-[14px] leading-relaxed">{r.text}</p>
                <p className="mt-2 text-[12px] text-[var(--sub)]">{r.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (page.skin === "finance") {
    return (
      <section className="px-[5.5cqw] py-10">
        {head}
        <div {...aos(1)} className="border border-dashed border-black/30 bg-white px-4 py-3">
          <p className="text-center font-mono text-[12px] text-[var(--sub)]">REVIEW RECEIPT</p>
          {rv.map((r) => (
            <div key={r.name} className="border-b border-dashed border-black/20 py-3 last:border-0">
              <div className="flex justify-between font-mono text-[12px] text-[var(--sub)]">
                <span>{r.name}</span>
                <span>★★★★★</span>
              </div>
              <p className="mt-1 text-[15px] leading-relaxed text-[var(--text)]">{r.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  // 따옴표 카드 (밤하늘·한지·달력·신문·편지)
  return (
    <section className="px-[5.5cqw] py-10">
      {head}
      <div className="space-y-3">
        {rv.map((r, i) => (
          <div key={r.name} {...aos(i + 1)}>
            <PCard>
              <p className="text-4xl leading-none text-[var(--ink)] opacity-50" style={hf}>&ldquo;</p>
              <p className="-mt-1 text-[15px] leading-relaxed">{r.text}</p>
              <p className="mt-2 text-right text-[13px] text-[var(--sub)]">{r.name}</p>
            </PCard>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Product() {
  const { brand, page } = usePreview();
  const aos = useAos();
  const pr = page.product;
  const img = page.images?.product;
  if (img) {
    // 어두운 그림 위: 가운데를 더 어둡게 덮고 밝은 글씨
    return (
      <section className="px-[5.5cqw] pb-14">
        <div {...aos()} className="overflow-hidden text-center text-[#f3e6c8]" style={{ background: `linear-gradient(rgba(14,28,52,0.55), rgba(14,28,52,0.82)), ${bgImg(img)} center 45% / cover` }}>
          <div className="px-[6.5cqw] py-12">
            <p className="text-[13px] tracking-[0.2em] opacity-80">더 깊이 보고 싶다면</p>
            <p className="mt-3 text-[clamp(19px,5.6cqw,23px)] font-bold" style={hf}>{brand.orderNamePrefix} {pr.name}</p>
            <p className="mt-2 text-[14px] leading-relaxed opacity-85">{pr.desc}</p>
            <p className="mt-5">
              <span className="mr-2 text-[14px] line-through opacity-60">₩{pr.listPrice.toLocaleString()}</span>
              <span className="text-[clamp(21px,6.7cqw,27px)] font-bold text-[#e9c77b]">₩{pr.price.toLocaleString()}</span>
            </p>
            <p className="mt-3 text-[13px] opacity-75">무료 풀이를 본 뒤 결과 화면에서 바로 이어 볼 수 있어요.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="px-[5.5cqw] pb-14">
      <div {...aos()}>
        <PCard className={page.skin === "poster" ? "!bg-[var(--a)]" : ""}>
          <p className="text-[13px] text-[var(--sub)]">더 깊이 보고 싶다면</p>
          <p className="mt-1 text-[19px] font-bold text-[var(--ink)]" style={hf}>{brand.orderNamePrefix} {pr.name}</p>
          <p className={`mt-1 ${desc}`}>{pr.desc}</p>
          <p className="mt-3">
            <span className="mr-2 text-[14px] text-[var(--sub)] line-through">₩{pr.listPrice.toLocaleString()}</span>
            <span className="text-2xl font-bold text-[var(--ink)]">₩{pr.price.toLocaleString()}</span>
          </p>
          <p className="mt-2 text-[13px] text-[var(--sub)]">무료 풀이를 본 뒤 결과 화면에서 바로 이어 볼 수 있어요.</p>
        </PCard>
      </div>
    </section>
  );
}
