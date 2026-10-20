"use client";

// 사주 원국표 · 오행 분포 · 월별 흐름. 값은 사주 엔진(calculateSaju) 결과를 받는 자리, 지금은 샘플.
// 스킨마다 표 모양이 다르다 (skins.ts result.pillar): pastel 둥근 칸 / ink 먹선 표 / dark 밤하늘 / grid 반듯한 표
import { usePreview } from "./PreviewShell";
import { ELEMENT, SAMPLE_SAJU, type Element } from "@/lib/preview/brandPages";

const serif = { fontFamily: "'Nanum Myeongjo', serif" };
const P = SAMPLE_SAJU.pillars; // 시·일·월·년 순서 (오른쪽부터 읽는 전통 배치)
const DAY = 1; // 일주 = '나'

export function PillarTable() {
  const { skin } = usePreview();
  const v = skin.result.pillar;

  if (v === "ink") {
    return (
      <table className="w-full table-fixed border-collapse text-center">
        <thead>
          <tr className="border-y border-[var(--ink)]/40 text-[13px] text-[var(--sub)]">
            {P.map((p, i) => (
              <th key={p.label} className={`py-2 font-normal ${i === DAY ? "text-[var(--ink)]" : ""}`}>{p.label}{i === DAY && " · 나"}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(["stem", "branch"] as const).map((row) => (
            <tr key={row} className="border-b border-[var(--ink)]/25">
              {P.map((p, i) => {
                const ch = row === "stem" ? p.stem : p.branch;
                const ko = row === "stem" ? p.stemKo : p.branchKo;
                const el = row === "stem" ? p.stemEl : p.branchEl;
                return (
                  <td key={p.label} className={`py-3 ${i === DAY ? "bg-[var(--ink)]/[0.06]" : ""}`}>
                    <p className="text-[clamp(24px,7.7cqw,32px)] leading-none text-[var(--ink)]" style={serif}>{ch}</p>
                    <p className="mt-1.5 text-[12px] text-[var(--sub)]">
                      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: ELEMENT[el].color }} />
                      {ko} · {el}
                    </p>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (v === "grid") {
    return (
      <div className="overflow-hidden border border-[var(--ink)]/30">
        <div className="grid grid-cols-[48px_repeat(4,1fr)] bg-[var(--ink)] text-center text-[13px] text-[var(--pbg)]">
          <span className="py-2" />
          {P.map((p, i) => (
            <span key={p.label} className="py-2 font-semibold">{i === DAY ? "일주(나)" : p.label}</span>
          ))}
        </div>
        {(["stem", "branch"] as const).map((row) => (
          <div key={row} className="grid grid-cols-[48px_repeat(4,1fr)] border-t border-[var(--ink)]/20 text-center">
            <span className="grid place-items-center bg-[var(--ink)]/[0.06] text-[12px] text-[var(--sub)]">{row === "stem" ? "천간" : "지지"}</span>
            {P.map((p, i) => {
              const ch = row === "stem" ? p.stem : p.branch;
              const ko = row === "stem" ? p.stemKo : p.branchKo;
              const el = row === "stem" ? p.stemEl : p.branchEl;
              return (
                <div key={p.label} className={`border-l border-[var(--ink)]/15 py-2.5 ${i === DAY ? "bg-[var(--a)]/25" : "bg-white"}`}>
                  <p className="text-[clamp(20px,6.2cqw,25px)] leading-none" style={{ ...serif, color: ELEMENT[el].color }}>{ch}</p>
                  <p className="mt-1 font-mono text-[11.5px] text-[#555]">{ko}/{el}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  // pastel · dark: 칸마다 오행 색
  const dark = v === "dark";
  return (
    <div className="grid grid-cols-4 gap-1.5 text-center">
      {P.map((p, i) => (
        <div key={p.label}>
          <p className={`mb-1.5 text-[12.5px] ${i === DAY ? "font-semibold text-[var(--ink)]" : "text-[var(--sub)]"}`}>{i === DAY ? `${p.label} · 나` : p.label}</p>
          {(["stem", "branch"] as const).map((row) => {
            const ch = row === "stem" ? p.stem : p.branch;
            const ko = row === "stem" ? p.stemKo : p.branchKo;
            const el = row === "stem" ? p.stemEl : p.branchEl;
            return (
              <div
                key={row}
                className={`mb-1.5 py-2.5 ${dark ? "rounded-lg bg-white/[0.06] ring-1 ring-white/10" : "rounded-2xl"} ${i === DAY && dark ? "ring-[var(--a)]/60" : ""}`}
                style={dark ? { color: ELEMENT[el].bg } : { background: ELEMENT[el].bg, color: ELEMENT[el].color }}
              >
                <p className="text-[clamp(21px,6.7cqw,27px)] leading-none" style={serif}>{ch}</p>
                <p className="mt-1.5 text-[12px] opacity-90">{ko} · {el}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function ElementBars() {
  const { skin } = usePreview();
  const v = skin.result.pillar;
  const els = Object.keys(ELEMENT) as Element[];
  const n = SAMPLE_SAJU.elements;
  const total = Object.values(n).reduce((a, b) => a + b, 0);

  if (v === "grid") {
    return (
      <div className="grid grid-cols-5 border border-[var(--ink)]/30 text-center">
        {els.map((el, i) => (
          <div key={el} className={`py-2.5 ${i ? "border-l border-[var(--ink)]/15" : ""}`}>
            <p className="text-[13px]" style={{ color: ELEMENT[el].color }}>{el}</p>
            <p className="mt-0.5 font-mono text-[clamp(19px,5.6cqw,23px)] leading-none">{n[el]}</p>
          </div>
        ))}
      </div>
    );
  }
  if (v === "ink") {
    return (
      <ul className="grid grid-cols-5 text-center">
        {els.map((el) => (
          <li key={el}>
            <p className="text-[15px] text-[var(--ink)]" style={serif}>{el}</p>
            <p className="mt-1 tracking-[0.15em]" style={{ color: ELEMENT[el].color }}>
              {"●".repeat(n[el])}
              <span className="opacity-25">{"●".repeat(Math.max(0, 3 - n[el]))}</span>
            </p>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="space-y-2">
      {els.map((el) => (
        <li key={el} className="flex items-center gap-2.5 text-[13px]">
          <span className="w-5 font-semibold" style={{ color: v === "dark" ? ELEMENT[el].bg : ELEMENT[el].color }}>{el}</span>
          <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--line)]">
            <span className="block h-full rounded-full" style={{ width: `${(n[el] / total) * 100}%`, background: ELEMENT[el].color }} />
          </span>
          <span className="w-6 text-right text-[var(--sub)]">{n[el]}</span>
        </li>
      ))}
    </ul>
  );
}

/** 월별 흐름 막대. locked 면 최고·주의 달 표시를 가린다 */
export function MonthFlow({ locked = false }: { locked?: boolean }) {
  const m = SAMPLE_SAJU.months;
  const max = Math.max(...m);
  const min = Math.min(...m);
  return (
    <div>
      <div className="flex h-28 items-end gap-1">
        {m.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t"
              style={{
                height: `${(v / 100) * 100}px`,
                background: !locked && v === max ? "var(--a)" : !locked && v === min ? "#e57373" : "var(--ink)",
                opacity: !locked && (v === max || v === min) ? 1 : 0.55,
              }}
            />
            <span className="text-[11px] text-[var(--sub)]">{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[14px]">
        <span>최고의 달: {locked ? <Lock /> : `${m.indexOf(max) + 1}월`}</span>
        <span>조심할 달: {locked ? <Lock /> : `${m.indexOf(min) + 1}월`}</span>
      </div>
    </div>
  );
}

/** 잠김 표시 (이모지 대신) */
export function Lock() {
  return (
    <svg viewBox="0 0 16 16" className="inline h-3.5 w-3.5 -translate-y-px" fill="none" stroke="currentColor" strokeWidth="1.6" aria-label="잠김">
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}
