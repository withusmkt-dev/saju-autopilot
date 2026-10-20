"use client";

// 결과 화면 풀이 배치. 스킨마다 다르게 (skins.ts result.reading)
//  cards 카드 / numbered 번호 목록 / column 신문 단 / letter 편지 한 장
import { useState } from "react";
import { MonthFlow } from "./SajuChart";
import { PCard, useAos, usePreview } from "./PreviewShell";
import { PAID_CHAPTERS, PAID_SAMPLE } from "@/lib/preview/brandPages";

const sf = { fontFamily: "var(--sf)" };
const display = { fontFamily: "var(--hf)" };
const HANJA = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];
const ORDINAL = ["첫째", "둘째", "셋째", "넷째", "다섯째", "여섯째", "일곱째", "여덟째", "아홉째", "열째"];

/** 스킨별 번호 모양 */
function useNum() {
  const { page } = usePreview();
  return function renderNum(i: number) {
    switch (page.skin) {
      case "hanji":
        return <span className="text-[22px] text-[var(--ink)]" style={{ fontFamily: "'Nanum Myeongjo', serif" }}>{HANJA[i]}</span>;
      case "poster":
        return <span className="text-[34px] leading-none text-[var(--a)]" style={display}>{String(i + 1).padStart(2, "0")}</span>;
      case "finance":
        return <span className="text-[20px] text-[var(--ink)]">{CIRCLED[i]}</span>;
      case "office":
        return <span className="font-mono text-[14px] text-[var(--sub)]">{String(i + 1).padStart(2, "0")}.</span>;
      default:
        return <span className="text-[15px] font-semibold text-[var(--a)]" style={{ filter: "brightness(0.8)" }}>{String(i + 1).padStart(2, "0")}</span>;
    }
  };
}

/** 무료 풀이 3단락 */
export function FreeReadings({ items, name, brand }: { items: { title: string; text: string }[]; name: string; brand: string }) {
  const { skin } = usePreview();
  const aos = useAos();
  const num = useNum();

  switch (skin.result.reading) {
    case "letter":
      return (
        <div {...aos()}>
          <PCard className="px-6 py-8">
            <p className="text-[15px] text-[var(--sub)]">{name}님께,</p>
            {items.map((s) => (
              <p key={s.title} className="mt-5 text-[16px] leading-loose">
                <b className="text-[var(--ink)]">{s.title}.</b> {s.text}
              </p>
            ))}
            <p className="mt-8 text-right text-[14px] text-[var(--sub)]">{brand} 드림</p>
          </PCard>
        </div>
      );
    case "column":
      return (
        <div className="border-t-2 border-[var(--p)]">
          {items.map((s, i) => (
            <article key={s.title} {...aos(i)} className="border-b border-[var(--p)]/25 py-5">
              <p className="text-[12px] tracking-[0.2em] text-[var(--sub)]">{i === 0 ? "오늘의 머리기사" : `${i + 1}면`}</p>
              <h3 className={`mt-1 text-[var(--ink)] ${i === 0 ? "text-[22px]" : "text-[18px]"} font-bold`} style={{ fontFamily: "'Nanum Myeongjo', serif" }}>{s.title}</h3>
              <p className={`mt-2 leading-relaxed ${i === 0 ? "text-[16px] first-letter:float-left first-letter:mr-1.5 first-letter:text-[40px] first-letter:leading-[0.9] first-letter:text-[var(--p)]" : "text-[15px]"}`}>{s.text}</p>
            </article>
          ))}
        </div>
      );
    case "numbered":
      return (
        <ol className="border-t border-[var(--line)]">
          {items.map((s, i) => (
            <li key={s.title} {...aos(i)} className="flex gap-4 border-b border-[var(--line)] py-5">
              <div className="w-10 shrink-0 pt-0.5 text-center">{num(i)}</div>
              <div>
                <h3 className="text-[17px] font-bold text-[var(--ink)]" style={sf}>{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    default:
      return (
        <div className="space-y-3">
          {items.map((s, i) => (
            <PCard key={s.title} aos={aos(i)}>
              <h3 className="text-[17px] font-bold text-[var(--ink)]" style={sf}>{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{s.text}</p>
            </PCard>
          ))}
        </div>
      );
  }
}

/** 유료 해설서 열 장 */
export function PaidChapters() {
  const { skin, brand } = usePreview();
  const aos = useAos();
  const num = useNum();
  const [open, setOpen] = useState(0);
  const v = skin.result.reading;

  const body = (i: number, c: string) =>
    i === 7 ? <MonthFlow /> : <p>{PAID_SAMPLE[i] ?? `${c}에 대한 본문이 들어가는 자리예요. 실서비스에서는 사주 계산 결과와 브랜드 말투(${brand.tone.concept})로 Claude 가 이 장을 써요.`}</p>;

  const toggle = (i: number) => setOpen(open === i ? -1 : i);

  if (v === "letter") {
    return (
      <div {...aos()}>
        <PCard className="px-6 py-6">
          {PAID_CHAPTERS.map((c, i) => (
            <div key={c} className="border-b border-dashed border-[var(--line)] last:border-0">
              <button type="button" onClick={() => toggle(i)} className="flex w-full items-baseline justify-between py-4 text-left">
                <span className="text-[16px] text-[var(--ink)]">
                  <span className="mr-2 text-[13px] text-[var(--sub)]">{ORDINAL[i]} 장</span>
                  {c}
                </span>
                <span className="text-[13px] text-[var(--sub)]">{open === i ? "접기" : "읽기"}</span>
              </button>
              {open === i && <div className="pb-5 text-[16px] leading-loose">{body(i, c)}</div>}
            </div>
          ))}
        </PCard>
      </div>
    );
  }
  if (v === "column" || v === "numbered") {
    return (
      <ol className={v === "column" ? "border-t-2 border-[var(--p)]" : "border-t border-[var(--line)]"}>
        {PAID_CHAPTERS.map((c, i) => (
          <li key={c} {...aos(Math.min(i, 4))} className={v === "column" ? "border-b border-[var(--p)]/25" : "border-b border-[var(--line)]"}>
            <button type="button" onClick={() => toggle(i)} className="flex w-full items-center gap-4 py-4 text-left">
              <span className="w-10 shrink-0 text-center">{num(i)}</span>
              <span className={`flex-1 text-[17px] text-[var(--ink)] ${v === "column" ? "" : "font-semibold"}`} style={v === "column" ? { fontFamily: "'Nanum Myeongjo', serif" } : sf}>{c}</span>
              <span className="text-[13px] text-[var(--sub)]">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div className="pb-5 pl-14 text-[15px] leading-relaxed">{body(i, c)}</div>}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className="space-y-2">
      {PAID_CHAPTERS.map((c, i) => (
        <li key={c} {...aos(Math.min(i, 4))}>
          <PCard className="!p-0 overflow-hidden">
            <button type="button" onClick={() => toggle(i)} className="flex w-full items-center justify-between px-4 py-4 text-left">
              <span className="text-[16px] font-semibold text-[var(--ink)]" style={sf}>
                <span className="mr-2 text-[var(--a)]">{String(i + 1).padStart(2, "0")}</span>
                {c}
              </span>
              <span className="text-[13px] text-[var(--sub)]">{open === i ? "접기" : "펼치기"}</span>
            </button>
            {open === i && <div className="border-t border-[var(--line)] px-4 py-4 text-[15px] leading-relaxed">{body(i, c)}</div>}
          </PCard>
        </li>
      ))}
    </ol>
  );
}
