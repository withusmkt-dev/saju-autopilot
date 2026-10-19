// 사주 원국표 · 오행 막대 · 월별 흐름. 값은 사주 엔진(calculateSaju) 결과를 받는 자리, 지금은 샘플.
import { ELEMENT, SAMPLE_SAJU, type Element } from "@/lib/preview/brandPages";

export function PillarTable() {
  return (
    <div className="grid grid-cols-4 gap-1.5 text-center">
      {SAMPLE_SAJU.pillars.map((p) => (
        <div key={p.label}>
          <p className="mb-1 text-[11px] text-[#999]">{p.label}</p>
          <Cell char={p.stem} ko={p.stemKo} el={p.stemEl} />
          <div className="h-1.5" />
          <Cell char={p.branch} ko={p.branchKo} el={p.branchEl} />
        </div>
      ))}
    </div>
  );
}

function Cell({ char, ko, el }: { char: string; ko: string; el: Element }) {
  return (
    <div className="rounded-lg py-2" style={{ background: ELEMENT[el].bg, color: ELEMENT[el].color }}>
      <p className="text-2xl leading-none font-bold" style={{ fontFamily: "'Nanum Myeongjo', serif" }}>{char}</p>
      <p className="mt-1 text-[10px]">{ko} · {el}</p>
    </div>
  );
}

export function ElementBars() {
  const total = Object.values(SAMPLE_SAJU.elements).reduce((a, b) => a + b, 0);
  return (
    <ul className="space-y-1.5">
      {(Object.keys(ELEMENT) as Element[]).map((el) => {
        const n = SAMPLE_SAJU.elements[el];
        return (
          <li key={el} className="flex items-center gap-2 text-xs">
            <span className="w-4 font-bold" style={{ color: ELEMENT[el].color }}>{el}</span>
            <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-black/5">
              <span className="block h-full rounded-full" style={{ width: `${(n / total) * 100}%`, background: ELEMENT[el].color }} />
            </span>
            <span className="w-5 text-right text-[#888]">{n}</span>
          </li>
        );
      })}
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
                background: !locked && v === max ? "var(--a)" : !locked && v === min ? "#e57373" : "var(--p)",
                opacity: !locked && (v === max || v === min) ? 1 : 0.55,
              }}
            />
            <span className="text-[9px] text-[#999]">{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs">
        <span>최고의 달: {locked ? "🔒" : `${m.indexOf(max) + 1}월`}</span>
        <span>조심할 달: {locked ? "🔒" : `${m.indexOf(min) + 1}월`}</span>
      </div>
    </div>
  );
}
