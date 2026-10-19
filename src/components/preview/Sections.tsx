"use client";

// 스킨별 소개·후기·상품 섹션
import { PCard, PTitle, usePreview } from "./PreviewShell";

const hf = { fontFamily: "var(--hf)" };
const HANJA = ["一", "二", "三"];

export function Points() {
  const { page } = usePreview();
  const pts = page.points;
  const head = <PTitle eyebrow={page.topic}>이런 걸 알려 드려요</PTitle>;

  switch (page.skin) {
    case "poster":
      return (
        <section className="px-5 py-10">
          {head}
          <ul className="border-t-2 border-black">
            {pts.map((p, i) => (
              <li key={p.title} className="flex items-center gap-4 border-b-2 border-black py-4">
                <span className="text-5xl leading-none text-[var(--a)]" style={hf}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-lg font-black">{p.title}</p>
                  <p className="text-sm text-[var(--sub)]">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      );
    case "soft":
      return (
        <section className="py-10">
          <div className="px-5">{head}</div>
          <ul className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-5 pb-2">
            {pts.map((p, i) => (
              <li key={p.title} className="w-44 shrink-0 snap-start">
                <PCard className="h-full">
                  <p className="text-3xl">{["💗", "📅", "💞"][i]}</p>
                  <p className="mt-3 font-bold text-[var(--p)]">{p.title}</p>
                  <p className="mt-1 text-sm text-[var(--sub)]">{p.desc}</p>
                </PCard>
              </li>
            ))}
          </ul>
        </section>
      );
    case "finance":
      return (
        <section className="px-5 py-8">
          {head}
          <ul className="grid grid-cols-3 gap-2">
            {pts.map((p, i) => (
              <li key={p.title}>
                <PCard className="h-full text-center">
                  <p className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[var(--a)]/30 text-lg">{["₩", "📈", "🛡️"][i]}</p>
                  <p className="mt-2 text-sm font-bold text-[var(--ink)]">{p.title}</p>
                  <p className="mt-1 text-[11px] leading-snug text-[var(--sub)]">{p.desc}</p>
                </PCard>
              </li>
            ))}
          </ul>
        </section>
      );
    case "hanji":
      return (
        <section className="px-5 py-10">
          {head}
          <table className="w-full border-collapse border border-[var(--p)]/50 text-sm">
            <tbody>
              {pts.map((p, i) => (
                <tr key={p.title} className="border-b border-[var(--p)]/30">
                  <td className="w-14 border-r border-[var(--p)]/30 py-4 text-center text-2xl text-[var(--ink)]" style={hf}>{HANJA[i]}</td>
                  <td className="px-4 py-4">
                    <p className="font-bold text-[var(--ink)]">{p.title}</p>
                    <p className="mt-1 text-[var(--sub)]">{p.desc}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );
    case "calendar":
      return (
        <section className="px-5 py-8">
          {head}
          <div className="space-y-3">
            {pts.map((p, i) => (
              <PCard key={p.title}>
                <p className="text-[10px] font-bold tracking-widest text-[var(--sub)]">PART {i + 1}</p>
                <p className="mt-1 font-bold text-[var(--ink)]">{p.title}</p>
                <p className="mt-1 text-sm text-[var(--sub)]">{p.desc}</p>
              </PCard>
            ))}
          </div>
        </section>
      );
    case "office":
      return (
        <section className="px-5 py-8">
          {head}
          <PCard>
            <p className="font-mono text-[11px] text-[var(--sub)]">진단 항목</p>
            <ul className="mt-2 space-y-3">
              {pts.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-[var(--a)] text-xs font-bold">✓</span>
                  <div>
                    <p className="font-bold">{p.title}</p>
                    <p className="text-sm text-[var(--sub)]">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </PCard>
        </section>
      );
    case "daily":
      return (
        <section className="px-5 py-8">
          {head}
          <ul className="grid grid-cols-3 divide-x divide-[var(--p)]/25 border-y border-[var(--p)]/40 py-4 text-center">
            {pts.map((p, i) => (
              <li key={p.title} className="px-2">
                <p className="text-2xl">{["☀️", "🧭", "🎨"][i]}</p>
                <p className="mt-2 text-sm font-bold text-[var(--ink)]">{p.title}</p>
                <p className="mt-1 text-[11px] leading-snug text-[var(--sub)]">{p.desc}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    case "duo":
      return (
        <section className="px-5 py-8">
          {head}
          <div className="space-y-3">
            {pts.map((p, i) => (
              <PCard key={p.title} className="flex items-center gap-3">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold ${i === 1 ? "bg-[var(--a)] text-[var(--p)]" : i === 2 ? "bg-gradient-to-r from-[var(--p)] to-[var(--a)] text-white" : "bg-[var(--p)] text-white"}`}>
                  {["나", "너", "우리"][i]}
                </span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{p.title}</p>
                  <p className="text-sm text-[var(--sub)]">{p.desc}</p>
                </div>
              </PCard>
            ))}
          </div>
        </section>
      );
    case "letter":
      return (
        <section className="px-5 py-8">
          <PCard className="px-6 py-7">
            <p className="text-sm text-[var(--sub)]">이 편지에는</p>
            {pts.map((p, i) => (
              <p key={p.title} className="mt-4 text-[15px] leading-loose">
                <b className="text-[var(--ink)]">{["첫째", "둘째", "셋째"][i]}, {p.title}</b> — {p.desc}.
              </p>
            ))}
            <p className="mt-4 text-sm text-[var(--sub)]">조심스럽게, 솔직하게 적어 드릴게요.</p>
          </PCard>
        </section>
      );
    default:
      // night — 별자리처럼 이어지는 타임라인
      return (
        <section className="px-6 py-10">
          {head}
          <ol className="relative ml-2 border-l border-[var(--a)]/40">
            {pts.map((p) => (
              <li key={p.title} className="relative pb-7 pl-6 last:pb-0">
                <span className="absolute top-0.5 -left-[9px] text-[var(--a)]">✦</span>
                <p className="font-bold text-white">{p.title}</p>
                <p className="mt-1 text-sm text-[var(--sub)]">{p.desc}</p>
              </li>
            ))}
          </ol>
        </section>
      );
  }
}

export function Reviews() {
  const { page } = usePreview();
  const rv = page.reviews;
  const head = <PTitle eyebrow="이용 후기">먼저 본 분들의 이야기</PTitle>;

  if (page.skin === "poster" || page.skin === "office" || page.skin === "duo") {
    const me = page.skin === "poster" ? "bg-black text-white rounded-none" : page.skin === "duo" ? "bg-[var(--p)] text-white rounded-2xl rounded-br-sm" : "bg-[#1f1f1f] text-[var(--a)] rounded-lg";
    const you = page.skin === "poster" ? "border-2 border-black bg-white rounded-none" : "bg-white rounded-2xl rounded-bl-sm shadow-sm";
    return (
      <section className="px-5 py-8">
        {head}
        <div className="space-y-3">
          {rv.map((r, i) => (
            <div key={r.name} className={`flex flex-col ${i % 2 ? "items-end" : "items-start"}`}>
              <p className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${i % 2 ? me : you}`}>{r.text}</p>
              <p className="mt-1 text-[11px] text-[var(--sub)]">{r.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (page.skin === "soft") {
    return (
      <section className="px-5 py-8">
        {head}
        <div className="grid grid-cols-2 gap-3">
          {rv.map((r, i) => (
            <div key={r.name} className={`rounded-md bg-white p-3 pb-5 shadow-md ${i % 2 ? "rotate-2" : "-rotate-2"}`}>
              <div className="grid h-20 place-items-center rounded bg-[var(--a)]/30 text-3xl">{i % 2 ? "🌷" : "💌"}</div>
              <p className="mt-3 text-xs leading-relaxed">{r.text}</p>
              <p className="mt-2 text-[10px] text-[var(--sub)]">{r.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (page.skin === "finance") {
    return (
      <section className="px-5 py-8">
        {head}
        <div className="border border-dashed border-black/25 bg-white px-4 py-3 font-mono text-[12px]">
          <p className="text-center text-[11px] text-[var(--sub)]">— 이용 후기 영수증 —</p>
          {rv.map((r) => (
            <div key={r.name} className="border-b border-dashed border-black/15 py-3 last:border-0">
              <div className="flex justify-between text-[var(--sub)]">
                <span>{r.name}</span>
                <span>★★★★★</span>
              </div>
              <p className="mt-1 font-sans text-sm text-[var(--text)]">{r.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  // 따옴표 카드 (밤하늘·한지·달력·신문·편지)
  return (
    <section className="px-5 py-8">
      {head}
      <div className="space-y-3">
        {rv.map((r) => (
          <PCard key={r.name}>
            <p className="text-4xl leading-none text-[var(--ink)] opacity-40" style={hf}>“</p>
            <p className="-mt-2 text-[15px] leading-relaxed">{r.text}</p>
            <p className="mt-2 text-right text-xs text-[var(--sub)]">— {r.name}</p>
          </PCard>
        ))}
      </div>
    </section>
  );
}

export function Product() {
  const { brand, page } = usePreview();
  const pr = page.product;
  return (
    <section className="px-5 pb-12">
      <PCard className={page.skin === "poster" ? "!bg-[var(--a)]" : ""}>
        <p className="text-xs text-[var(--sub)]">더 깊이 보고 싶다면</p>
        <p className="mt-1 text-lg font-bold text-[var(--ink)]" style={hf}>{brand.orderNamePrefix} {pr.name}</p>
        <p className="mt-1 text-sm text-[var(--sub)]">{pr.desc}</p>
        <p className="mt-3">
          <span className="mr-2 text-sm text-[var(--sub)] line-through">₩{pr.listPrice.toLocaleString()}</span>
          <span className="text-2xl font-bold text-[var(--ink)]">₩{pr.price.toLocaleString()}</span>
        </p>
        <p className="mt-2 text-xs text-[var(--sub)]">무료 풀이를 본 뒤 결과 화면에서 바로 이어 볼 수 있어요.</p>
      </PCard>
    </section>
  );
}
