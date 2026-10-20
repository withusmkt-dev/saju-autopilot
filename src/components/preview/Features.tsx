"use client";

// 주제마다 다른 '맛보기' 섹션과 브랜드 이야기. 무료 풀이 전에 머물 거리를 만든다.
// 띠 궁합·체크리스트처럼 계산이 가벼운 건 화면에서 바로 하고, 사주 계산이 필요한 건 결과 화면으로 넘긴다.
import { useState } from "react";
import { PCard, PTitle, useAos, usePreview } from "./PreviewShell";
import BrandMark from "./BrandMark";

const hf = { fontFamily: "var(--sf)" };
const display = { fontFamily: "var(--hf)" }; // 표제용 (큰 숫자·한 줄 문구)
const serif = { fontFamily: "'Nanum Myeongjo', serif" };
const sub = "text-[14px] leading-relaxed text-[var(--sub)]";

export function Feature() {
  const { page } = usePreview();
  switch (page.feature) {
    case "pillars":
      return <Pillars />;
    case "factShuffle":
      return <FactShuffle />;
    case "loveTypes":
      return <LoveTypes />;
    case "wealthBowls":
      return <WealthBowls />;
    case "glossary":
      return <Glossary />;
    case "zodiac2027":
      return <Zodiac2027 />;
    case "jobMatch":
      return <JobMatch />;
    case "weekIljin":
      return <WeekIljin />;
    case "zodiacMatch":
      return <ZodiacMatch />;
    case "reunionCheck":
      return <ReunionCheck />;
  }
}

/* 종합: 사주 여덟 글자란 */
function Pillars() {
  const aos = useAos();
  const P = [
    ["年", "년주", "뿌리", "태어난 집안과 어린 시절"],
    ["月", "월주", "줄기", "부모, 사회에서의 자리"],
    ["日", "일주", "꽃", "나 자신과 곁의 사람"],
    ["時", "시주", "열매", "앞으로의 일과 말년"],
  ];
  return (
    <section className="px-[6.5cqw] py-12">
      <div {...aos()}>
        <PTitle>사주 여덟 글자, 이렇게 읽어요</PTitle>
        <p className={sub}>태어난 해·달·날·시를 네 기둥으로 세우고, 기둥마다 위아래 두 글자씩 여덟 글자가 돼요.</p>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-2 text-center">
        {P.map(([h, k, m, d], i) => (
          <div key={k} {...aos(i + 1)} className="rounded-xl bg-white/[0.06] px-1 py-4 ring-1 ring-white/10">
            <p className="text-[clamp(24px,7.7cqw,32px)] leading-none text-[var(--a)]" style={serif}>{h}</p>
            <p className="mt-2 text-[13px] font-bold text-white">{k}</p>
            <p className="text-[12px] text-[var(--a)]">{m}</p>
            <p className="mt-2 text-[11.5px] leading-snug text-[var(--sub)]">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* 팩폭: 누를 때마다 바뀌는 한 줄 */
const FACTS = [
  "당신이 미루는 그 일, 사주 탓 아님.",
  "연락 안 오는 사람 기다리는 것도 재능이면 재능.",
  "통장은 스치는 곳이 아니라 머무는 곳이에요.",
  "다 잘하려다 하나도 못 끝내는 타입, 맞죠?",
  "남 눈치 보느라 내 운까지 남 주는 중.",
  "올해 승부처는 생각보다 늦게 와요. 버티세요.",
  "그 사람은 당신이 걱정하는 만큼 당신 생각 안 해요.",
  "지금 필요한 건 운세가 아니라 잠일 수도.",
];
function FactShuffle() {
  const aos = useAos();
  const [i, setI] = useState(0);
  return (
    <section className="bg-[var(--a)] px-[5.5cqw] py-12">
      <p className="text-[13px] font-black tracking-wider">오늘의 팩폭 한 줄 #{String(i + 1).padStart(2, "0")}</p>
      <p {...aos()} key={i} className="mt-4 min-h-[120px] text-[clamp(24px,7.7cqw,32px)] leading-[1.25] text-black" style={display}>{FACTS[i]}</p>
      <button type="button" onClick={() => setI((v) => (v + 1) % FACTS.length)} className="mt-4 border-2 border-black bg-white px-[5.5cqw] py-2.5 text-[15px] font-black shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
        한 대 더 맞기 →
      </button>
      <p className="mt-4 text-[13px] text-black/70">진짜 팩폭은 내 사주로. 무료 풀이에서 이어집니다.</p>
    </section>
  );
}

/* 연애: 오행별 연애 유형 */
const LOVE: [string, string, string][] = [
  ["목", "직진 고백형", "좋아하면 숨기지 못해요. 밀당보다 솔직함이 무기라, 타이밍만 맞으면 빨리 가까워져요."],
  ["화", "불꽃 연애형", "시작이 뜨겁고 표현이 커요. 대신 식는 것도 빨라 보일 수 있으니 속도 조절이 관건이에요."],
  ["토", "든든 지킴형", "천천히 마음을 열지만 한번 정하면 오래 가요. 연인보다 가족 같은 편안함을 줘요."],
  ["금", "까다로운 원칙형", "기준이 분명해서 아무나 만나지 않아요. 내 사람으로 정하면 누구보다 확실해요."],
  ["수", "스며드는 다정형", "말보다 행동으로 챙겨요. 상대가 눈치채기 전에 이미 깊게 마음을 주는 타입이에요."],
];
function LoveTypes() {
  const aos = useAos();
  const [sel, setSel] = useState(3);
  const [el, name, desc] = LOVE[sel];
  return (
    <section className="px-[5.5cqw] py-12">
      <div {...aos()}>
        <PTitle>내 일간으로 보는 연애 유형</PTitle>
        <p className={sub}>사주의 주인공 글자(일간)가 어느 오행인지에 따라 연애하는 모습이 달라요. 하나씩 눌러 보세요.</p>
      </div>
      <div {...aos(1)} className="mt-5 flex gap-2">
        {LOVE.map(([e], i) => (
          <button key={e} type="button" onClick={() => setSel(i)} className={`h-12 flex-1 rounded-full text-[16px] font-bold transition ${i === sel ? "bg-[var(--p)] text-white" : "bg-white text-[var(--p)] shadow-sm"}`}>
            {e}
          </button>
        ))}
      </div>
      <div {...aos(2)} className="mt-4">
        <PCard>
          <p className="text-[13px] text-[var(--sub)]">{el} 일간</p>
          <p className="mt-1 text-[20px] font-bold text-[var(--p)]" style={hf}>{name}</p>
          <p className="mt-2 text-[15px] leading-relaxed">{desc}</p>
        </PCard>
      </div>
    </section>
  );
}

/* 재물: 재물 그릇 4유형 */
function WealthBowls() {
  const aos = useAos();
  const B = [
    ["쌓는 그릇", "적금형", "작게 꾸준히 모을수록 커져요. 한 방보다 습관이 재산이 되는 사주."],
    ["굴리는 그릇", "사업형", "돈이 돈을 부르는 구조. 사람과 기회를 연결할 때 재물이 들어와요."],
    ["흐르는 그릇", "지출형", "들어오는 만큼 나가요. 버는 힘보다 묶어 두는 장치가 먼저예요."],
    ["늦게 차는 그릇", "늦복형", "젊을 땐 빠듯해도 중년 이후 재물운이 커지는 흐름이에요."],
  ];
  return (
    <section className="px-[5.5cqw] py-10">
      <div {...aos()}>
        <PTitle>당신의 재물 그릇은 어떤 모양일까요</PTitle>
        <p className={sub}>사주 속 재성(돈의 기운)이 놓인 자리로 크게 네 가지로 나눠 봐요. 내 유형은 무료 풀이에서 알려 드려요.</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {B.map(([n, t, d], i) => (
          <div key={n} {...aos(i + 1)}>
            <PCard className="h-full">
              <p className="text-[12px] font-bold text-[var(--sub)]">TYPE {String.fromCharCode(65 + i)} · {t}</p>
              <p className="mt-1 text-[17px] font-bold text-[var(--ink)]" style={hf}>{n}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--sub)]">{d}</p>
            </PCard>
          </div>
        ))}
      </div>
    </section>
  );
}

/* 정통: 명리 용어 풀이 */
function Glossary() {
  const aos = useAos();
  const [open, setOpen] = useState(0);
  const G = [
    ["격국", "格局", "사주 전체의 짜임새입니다. 어떤 기운이 중심을 잡고 있는지 보고, 타고난 그릇의 모양을 정합니다."],
    ["용신", "用神", "사주의 균형을 맞추는 데 가장 필요한 기운입니다. 부족한 것을 채우고 넘치는 것을 덜어 내는 열쇠입니다."],
    ["대운", "大運", "10년 단위로 바뀌는 큰 흐름입니다. 같은 사주라도 어떤 대운을 지나느냐에 따라 삶의 결이 달라집니다."],
    ["세운", "歲運", "해마다 들어오는 기운입니다. 대운이 계절이라면 세운은 그해의 날씨에 가깝습니다."],
  ];
  return (
    <section className="px-[5.5cqw] py-12">
      <div {...aos()}>
        <PTitle>해설서에 나오는 말들</PTitle>
      </div>
      <div {...aos(1)} className="border-t border-[var(--p)]/40">
        {G.map(([k, h, d], i) => (
          <div key={k} className="border-b border-[var(--p)]/30">
            <button type="button" onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between py-4 text-left">
              <span className="text-[17px] font-bold text-[var(--ink)]">
                {k} <span className="ml-1 text-[15px] font-normal text-[var(--sub)]" style={serif}>{h}</span>
              </span>
              <span className="text-[var(--sub)]">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p className="pb-4 text-[15px] leading-loose">{d}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* 신년: 띠별 2027 한 줄 */
const ZODIAC = [
  ["子", "쥐띠"], ["丑", "소띠"], ["寅", "범띠"], ["卯", "토끼띠"], ["辰", "용띠"], ["巳", "뱀띠"],
  ["午", "말띠"], ["未", "양띠"], ["申", "원숭이띠"], ["酉", "닭띠"], ["戌", "개띠"], ["亥", "돼지띠"],
] as const;
const Z2027 = [
  "작게 시작한 일이 하반기에 커져요.", "꾸준함이 드디어 인정받는 해.", "새 자리 제안이 들어와요. 서두르지 말 것.",
  "인간관계 정리가 운을 열어요.", "큰 결정은 봄보다 가을에.", "건강한 루틴 하나가 재물을 불러요.",
  "같은 기운이 겹쳐 바쁜 해. 쉬는 날을 먼저 정하세요.", "본인의 해. 주목받는 만큼 말조심.", "멀리서 기회가 와요. 이동운이 좋아요.",
  "배운 걸 써먹는 해. 자격증·공부운 상승.", "흩어진 돈을 모으기 좋은 해.", "귀인이 가까이에. 먼저 연락해 보세요.",
];
function Zodiac2027() {
  const aos = useAos();
  return (
    <section className="py-10">
      <div {...aos()} className="px-[5.5cqw]">
        <PTitle>띠별로 미리 보는 2027</PTitle>
        <p className={sub}>띠는 사주의 한 글자일 뿐이라 참고만 해 주세요. 진짜 내 운세는 여덟 글자로 봐요.</p>
      </div>
      <div className="no-scrollbar mt-5 flex snap-x gap-2 overflow-x-auto px-[5.5cqw] pb-2">
        {ZODIAC.map(([h, n], i) => (
          <div key={n} {...aos(Math.min(i, 5))} className="w-36 shrink-0 snap-start">
            <PCard className="h-full">
              <p className="text-[clamp(21px,6.7cqw,27px)] leading-none text-[var(--p)]" style={serif}>{h}</p>
              <p className="mt-2 text-[15px] font-bold text-[var(--ink)]">{n}</p>
              <p className="mt-1 text-[13px] leading-snug text-[var(--sub)]">{Z2027[i]}</p>
            </PCard>
          </div>
        ))}
      </div>
      <p className="mt-1 px-[5.5cqw] text-[12px] text-[var(--sub)]">옆으로 넘겨 보세요 →</p>
    </section>
  );
}

/* 이직: 오행 × 맞는 일 */
function JobMatch() {
  const aos = useAos();
  const J = [
    ["목", "기획·교육·콘텐츠", "반복만 하는 일"],
    ["화", "영업·홍보·방송", "혼자 숨는 일"],
    ["토", "관리·부동산·공무", "자주 바뀌는 일"],
    ["금", "재무·법무·엔지니어", "기준 없는 일"],
    ["수", "연구·IT·상담", "윽박지르는 조직"],
  ];
  return (
    <section className="px-[5.5cqw] py-10">
      <div {...aos()}>
        <PTitle>일간별 직무 궁합표</PTitle>
      </div>
      <div {...aos(1)}>
        <PCard className="!p-0 overflow-hidden">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-[#1f1f1f] text-[13px] text-[var(--a)]">
              <tr>
                <th className="px-3 py-2.5 font-medium">일간</th>
                <th className="px-3 py-2.5 font-medium">잘 맞는 일</th>
                <th className="px-3 py-2.5 font-medium">버티기 힘든 일</th>
              </tr>
            </thead>
            <tbody>
              {J.map(([e, good, bad]) => (
                <tr key={e} className="border-t border-black/10">
                  <td className="px-3 py-3 font-mono font-bold">{e}</td>
                  <td className="px-3 py-3">{good}</td>
                  <td className="px-3 py-3 text-[var(--sub)]">{bad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PCard>
      </div>
      <p className="mt-3 text-[13px] text-[var(--sub)]">※ 일간만 본 대략적인 표예요. 내 진단서에는 월지·대운까지 반영돼요.</p>
    </section>
  );
}

/* 오늘의 운세: 이번 주 일진 */
function WeekIljin() {
  const aos = useAos();
  const W = [
    ["20", "화", "甲辰", "정리"], ["21", "수", "乙巳", "만남"], ["22", "목", "丙午", "추진"], ["23", "금", "丁未", "휴식"],
    ["24", "토", "戊申", "이동"], ["25", "일", "己酉", "정돈"], ["26", "월", "庚戌", "결단"],
  ];
  return (
    <section className="px-[5.5cqw] py-10">
      <div {...aos()}>
        <PTitle>이번 주 일진</PTitle>
        <p className={sub}>날마다 바뀌는 간지와 그날의 한 단어. 내 사주와 맞는 날은 무료 풀이에서 표시해 드려요.</p>
      </div>
      <div {...aos(1)} className="mt-5 grid grid-cols-7 border-y-2 border-[var(--p)] text-center">
        {W.map(([d, w, g, k], i) => (
          <div key={d} className={`py-3 ${i ? "border-l border-[var(--p)]/25" : "bg-[var(--p)] text-[#f7f1e6]"}`}>
            <p className="text-[12px] opacity-80">{w}</p>
            <p className="text-[16px] font-bold">{d}</p>
            <p className="mt-1 text-[13px] leading-tight" style={serif}>{g[0]}<br />{g[1]}</p>
            <p className="mt-1 text-[11.5px] opacity-80">{k}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* 궁합: 띠 궁합 맛보기 (삼합·육합·충) */
const SAMHAP = [[8, 0, 4], [2, 6, 10], [5, 9, 1], [11, 3, 7]];
const YUKHAP = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
function zodiacResult(a: number, b: number): [string, string] {
  if (a === b) return ["같은 띠", "서로를 너무 잘 알아서 편하지만, 같은 데서 고집을 부려요. 역할을 나누면 좋아요."];
  if (SAMHAP.some((g) => g.includes(a) && g.includes(b))) return ["삼합", "함께 있으면 일이 커지는 사이예요. 같이 목표를 세우면 둘 다 잘 풀려요."];
  if (YUKHAP.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) return ["육합", "말하지 않아도 통하는 사이예요. 작은 다툼은 금방 풀려요."];
  if (Math.abs(a - b) === 6) return ["충", "끌리는 만큼 부딪혀요. 서로 다른 점을 신기해하면 오래가요."];
  return ["무난", "노력한 만큼 가까워지는 사이예요. 대화 시간을 일부러 만들어 보세요."];
}
function ZodiacMatch() {
  const aos = useAos();
  const [a, setA] = useState(4);
  const [b, setB] = useState(8);
  const [kind, text] = zodiacResult(a, b);
  const sel = "h-11 w-full rounded-2xl border border-[var(--a)]/70 bg-white px-3 text-[15px]";
  return (
    <section className="px-[5.5cqw] py-10">
      <div {...aos()}>
        <PTitle>띠로 먼저 맛보는 궁합</PTitle>
      </div>
      <div {...aos(1)}>
        <PCard>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <select className={sel} value={a} onChange={(e) => setA(Number(e.target.value))} aria-label="내 띠">
              {ZODIAC.map(([, n], i) => <option key={n} value={i}>{n}</option>)}
            </select>
            <span className="text-[var(--a)]">♥</span>
            <select className={sel} value={b} onChange={(e) => setB(Number(e.target.value))} aria-label="상대 띠">
              {ZODIAC.map(([, n], i) => <option key={n} value={i}>{n}</option>)}
            </select>
          </div>
          <p className="mt-5 text-center text-[13px] text-[var(--sub)]">{ZODIAC[a][1]} × {ZODIAC[b][1]}</p>
          <p className="mt-1 text-center text-[clamp(20px,6.2cqw,25px)] font-bold text-[var(--ink)]" style={hf}>{kind}</p>
          <p className="mt-2 text-center text-[15px] leading-relaxed">{text}</p>
        </PCard>
      </div>
      <p className="mt-3 text-[13px] text-[var(--sub)]">띠는 여덟 글자 중 하나예요. 두 사람 사주를 다 넣으면 훨씬 정확해져요.</p>
    </section>
  );
}

/* 재회: 재회 신호 체크 */
function ReunionCheck() {
  const aos = useAos();
  const C = [
    "헤어진 뒤에도 가끔 연락이 온다",
    "SNS를 차단하지 않고 그대로 두었다",
    "헤어진 이유가 상황 때문이었다",
    "공통 지인을 통해 소식이 들린다",
    "아직 내 물건을 돌려주지 않았다",
    "꿈에 자주 나온다",
  ];
  const [on, setOn] = useState<number[]>([]);
  const n = on.length;
  const msg = n <= 1 ? "아직은 마음을 추스르는 시간이 먼저예요." : n <= 3 ? "끈이 완전히 끊어지진 않았어요. 서두르지 않는 게 중요해요." : "다시 이어질 여지가 보여요. 언제 다가가면 좋을지 사주로 확인해 보세요.";
  return (
    <section className="px-[5.5cqw] py-10">
      <div {...aos()}>
        <PTitle>혹시, 이런 신호가 있었나요</PTitle>
      </div>
      <div {...aos(1)}>
        <PCard className="px-[5.5cqw]">
          <ul className="space-y-1">
            {C.map((c, i) => {
              const checked = on.includes(i);
              return (
                <li key={c}>
                  <label className="flex cursor-pointer items-center gap-3 border-b border-dashed border-[#e3cfc0] py-3 text-[15px] last:border-0">
                    <input type="checkbox" checked={checked} onChange={() => setOn((v) => (checked ? v.filter((x) => x !== i) : [...v, i]))} className="h-4 w-4 accent-[var(--p)]" />
                    {c}
                  </label>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-[13px] text-[var(--sub)]">{n}개 체크</p>
          <p className="mt-1 text-[16px] leading-relaxed text-[var(--ink)]" style={hf}>{msg}</p>
        </PCard>
      </div>
    </section>
  );
}

/* ---------- 브랜드 이야기 ---------- */

export function About() {
  const { page, brand } = usePreview();
  const aos = useAos();
  const a = page.about;
  if (page.skin === "poster") {
    return (
      <section className="bg-black px-[5.5cqw] py-12 text-white">
        <p {...aos()} className="text-[clamp(23px,7.2cqw,30px)] leading-tight" style={display}>{a.title}</p>
        <p {...aos(1)} className="mt-4 text-[16px] leading-relaxed text-white/85">{a.body}</p>
        <p className="mt-6 text-right text-[14px] text-[var(--a)]">— {a.sign}</p>
      </section>
    );
  }
  if (page.skin === "night") {
    return (
      <section className="px-[6.5cqw] py-14 text-center">
        <p {...aos()} className="text-[13px] tracking-[0.2em] text-[var(--a)]">ABOUT</p>
        <p {...aos(1)} className="mt-3 text-[clamp(20px,6.2cqw,25px)] text-white" style={hf}>{a.title}</p>
        <p {...aos(2)} className="mx-auto mt-4 max-w-[320px] text-[15px] leading-loose text-[var(--sub)]">{a.body}</p>
        <p className="mt-6 text-[14px] text-[var(--a)]">{a.sign}</p>
      </section>
    );
  }
  if (page.skin === "hanji" || page.skin === "letter") {
    return (
      <section className="px-[5.5cqw] py-12">
        <div {...aos()}>
          <PCard className="px-[6.5cqw] py-8">
            <p className="text-[20px] font-bold text-[var(--ink)]" style={hf}>{a.title}</p>
            <p className="mt-4 text-[16px] leading-loose">{a.body}</p>
            <p className="mt-6 text-right text-[14px] text-[var(--sub)]">{a.sign}</p>
          </PCard>
        </div>
      </section>
    );
  }
  // 그 밖: 브랜드 첫 글자를 크게 둔 소개
  return (
    <section className="px-[5.5cqw] py-12">
      <div {...aos()} className="flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[var(--p)] text-white">
          <BrandMark slug={brand.slug} accent={brand.theme.accent} className="h-8 w-8" />
        </span>
        <div>
          <p className="text-[20px] font-bold text-[var(--ink)]" style={hf}>{a.title}</p>
          <p className="mt-3 text-[15px] leading-relaxed">{a.body}</p>
          <p className="mt-4 text-[14px] text-[var(--sub)]">{a.sign}</p>
        </div>
      </div>
    </section>
  );
}
