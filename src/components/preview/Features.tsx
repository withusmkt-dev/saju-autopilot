"use client";

// 주제마다 다른 '맛보기' 섹션과 브랜드 이야기. 무료 풀이 전에 머물 거리를 만든다.
// 띠 궁합·체크리스트처럼 계산이 가벼운 건 화면에서 바로 하고, 사주 계산이 필요한 건 결과 화면으로 넘긴다.
import { useState } from "react";
import { PCard, PTitle, useAos, usePreview } from "./PreviewShell";
import BrandMark from "./BrandMark";
import { WeatherIcon } from "./Sections";

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
    case "luckyPouch":
      return <LuckyPouch />;
    case "daeunTimeline":
      return <DaeunTimeline />;
    case "moodWeather":
      return <MoodWeather />;
    case "weddingYear":
      return <WeddingYear />;
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
        {P.map(([h, k, m, d]) => (
          <div key={k} className="rounded-xl bg-white/[0.06] px-1 py-4 ring-1 ring-white/10">
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
      <div className="mt-5 flex gap-2">
        {LOVE.map(([e], i) => (
          <button key={e} type="button" onClick={() => setSel(i)} className={`h-12 flex-1 rounded-full text-[16px] font-bold transition ${i === sel ? "bg-[var(--p)] text-white" : "bg-white text-[var(--p)] shadow-sm"}`}>
            {e}
          </button>
        ))}
      </div>
      <div className="mt-4">
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
          <div key={n}>
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
      <div className="border-t border-[var(--p)]/40">
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
          <div key={n} className="w-36 shrink-0 snap-start">
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
      <div>
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
      <div className="mt-5 grid grid-cols-7 border-y-2 border-[var(--p)] text-center">
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
      <div>
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
      <div>
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

/* 행운: 복주머니 하나 고르기 (샘플 값. 실서비스는 모자란 오행에서 고른다) */
const POUCH = [
  { fill: "var(--a)", color: "남색", hex: "#2b3a6b", num: "3", dir: "북쪽", item: "작은 열쇠고리", line: "물 기운이 생각을 맑게 해 줘요. 미뤄 둔 결정을 내리기 좋은 날이에요." },
  { fill: "#cfe6d4", color: "초록", hex: "#3f9b5a", num: "8", dir: "동쪽", item: "작은 화분", line: "나무 기운이 첫발을 밀어 줘요. 새로 시작하는 일에 힘이 붙어요." },
  { fill: "#f7cfd8", color: "노랑", hex: "#e0a526", num: "5", dir: "가운데", item: "손수건 한 장", line: "흙 기운이 마음을 붙잡아 줘요. 흔들리는 날 곁에 두세요." },
];
function LuckyPouch() {
  const aos = useAos();
  const [pick, setPick] = useState<number | null>(null);
  const r = pick === null ? null : POUCH[pick];
  return (
    <section className="px-[5.5cqw] py-12 text-center">
      <div {...aos()}>
        <PTitle>복주머니 하나만 골라 보세요</PTitle>
        <p className={sub}>손이 먼저 가는 쪽이 오늘 내 몫이래요.</p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {POUCH.map((p, i) => (
          <button
            key={i}
            type="button"
           
            onClick={() => setPick(i)}
            aria-label={`${i + 1}번 복주머니`}
            className={`transition duration-300 ${pick === null ? "hover:-translate-y-1" : pick === i ? "-translate-y-2 scale-110" : "scale-90 opacity-40"}`}
          >
            <svg viewBox="0 0 64 72" className="mx-auto w-[78%]" aria-hidden>
              <path d="M22 20c-3-7 1-12 5-10l5 4 5-4c4-2 8 3 5 10" fill={p.fill} stroke="var(--p)" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M20 22C9 31 6 46 10 56c3 8 11 12 22 12s19-4 22-12c4-10 1-25-10-34z" fill={p.fill} stroke="var(--p)" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M19 22h26" stroke="var(--p)" strokeWidth="3.5" strokeLinecap="round" />
              <text x="32" y="52" textAnchor="middle" fontSize="17" fill="var(--p)" style={serif}>福</text>
            </svg>
          </button>
        ))}
      </div>
      {r ? (
        <div {...aos("zoom-in")} className="mt-6">
          <PCard className="text-left">
            <p className="text-[13px] text-[var(--sub)]">오늘 토끼가 골라 온 것</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5 text-[15px]">
              <div className="flex items-center gap-2">
                <dt className="text-[var(--sub)]">색</dt>
                <dd className="flex items-center gap-1.5 font-bold">
                  <span className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ background: r.hex }} />
                  {r.color}
                </dd>
              </div>
              <div className="flex gap-2"><dt className="text-[var(--sub)]">숫자</dt><dd className="font-bold">{r.num}</dd></div>
              <div className="flex gap-2"><dt className="text-[var(--sub)]">방향</dt><dd className="font-bold">{r.dir}</dd></div>
              <div className="flex gap-2"><dt className="text-[var(--sub)]">물건</dt><dd className="font-bold">{r.item}</dd></div>
            </dl>
            <p className="mt-4 border-t-2 border-dashed border-[var(--p)]/20 pt-3 text-[15px] leading-relaxed">{r.line}</p>
          </PCard>
          <button type="button" onClick={() => setPick(null)} className="mt-3 text-[13px] text-[var(--sub)] underline underline-offset-4">다시 고르기</button>
        </div>
      ) : (
        <p className="mt-5 text-[13px] text-[var(--sub)]">진짜 내 행운은 생년월일로 계산해서 아래에서 받아 가세요.</p>
      )}
    </section>
  );
}

/* 평생: 대운 열 해씩 (샘플. 실서비스는 엔진의 대운 계산 결과) */
const DAEUN = [
  { age: 4, gz: "乙酉", ko: "을유", score: 55, text: "규칙과 틀을 몸에 익힌 시기. 엄한 어른이 곁에 있었을 수 있어요." },
  { age: 14, gz: "甲申", ko: "갑신", score: 47, text: "부딪히며 단단해진 시기. 마음대로 안 되는 일이 많았지만 그만큼 버티는 힘이 생겼어요." },
  { age: 24, gz: "癸未", ko: "계미", score: 60, text: "길을 찾아 이것저것 해 본 시기. 그때 익힌 것이 지금의 밑천이 돼요." },
  { age: 34, gz: "壬午", ko: "임오", score: 74, text: "굳어 있던 생각이 풀리고 사람이 들어오는 시기. 먼저 손 내미는 사람을 놓치지 마세요." },
  { age: 44, gz: "辛巳", ko: "신사", score: 82, text: "쌓아 둔 것을 인정받는 시기. 자리를 맡게 되고 이름이 알려져요." },
  { age: 54, gz: "庚辰", ko: "경진", score: 70, text: "넓히기보다 지키는 시기. 건강과 집안을 먼저 챙기면 오래 갑니다." },
  { age: 64, gz: "己卯", ko: "기묘", score: 64, text: "가르치고 물려주는 시기. 아랫사람 복이 따라와요." },
  { age: 74, gz: "戊寅", ko: "무인", score: 58, text: "느긋하게 거두는 시기. 서두를 일이 없는 편안한 때예요." },
];
const NOW_DAEUN = 3;
function DaeunTimeline() {
  const aos = useAos();
  const [sel, setSel] = useState(NOW_DAEUN);
  const W = 300;
  const H = 90;
  const x = (i: number) => 14 + (i / (DAEUN.length - 1)) * (W - 28);
  const y = (s: number) => H - 10 - ((s - 40) / 50) * (H - 24);
  const pts = DAEUN.map((d, i) => `${x(i)},${y(d.score)}`).join(" ");
  const d = DAEUN[sel];
  return (
    <section className="px-[6.5cqw] py-12">
      <div {...aos()} className="text-center">
        <PTitle>인생을 열 해씩 나누면</PTitle>
        <p className={sub}>사주에는 열 해마다 바뀌는 큰 계절, 대운이 있어요. 아래는 샘플 사주의 평생 그래프예요.</p>
      </div>
      <div className="mt-6">
        <svg viewBox={`0 0 ${W} ${H + 16}`} className="w-full" aria-label="평생 대운 그래프">
          <polyline points={pts} fill="none" stroke="var(--a)" strokeWidth="1.6" strokeLinejoin="round" opacity="0.9" />
          {DAEUN.map((dd, i) => (
            <g key={dd.age} onClick={() => setSel(i)} className="cursor-pointer">
              <circle cx={x(i)} cy={y(dd.score)} r={i === sel ? 5.5 : 3.2} fill={i === sel ? "var(--a)" : "var(--pbg)"} stroke="var(--a)" strokeWidth="1.4" />
              <text x={x(i)} y={H + 12} textAnchor="middle" fontSize="9.5" fill="var(--sub)">{dd.age}세</text>
            </g>
          ))}
          <text x={x(NOW_DAEUN)} y={y(DAEUN[NOW_DAEUN].score) - 10} textAnchor="middle" fontSize="9.5" fill="var(--a)">지금</text>
        </svg>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-1.5">
        {DAEUN.map((dd, i) => (
          <button
            key={dd.age}
            type="button"
            onClick={() => setSel(i)}
            className={`border py-2 text-center transition ${i === sel ? "border-[var(--a)] bg-[var(--a)]/15" : "border-[var(--a)]/25"}`}
          >
            <span className="block text-[18px] leading-none text-[#f3e6c8]" style={serif}>{dd.gz}</span>
            <span className="mt-1 block text-[11.5px] text-[var(--sub)]">{dd.age}~{dd.age + 9}세</span>
          </button>
        ))}
      </div>
      <div className="mt-4 min-h-[96px] border-t border-[var(--a)]/30 pt-4 text-center">
        <p className="text-[14px] text-[var(--a)]">{d.age}세부터 열 해 · {d.ko} 대운{sel === NOW_DAEUN && " · 지금"}</p>
        <p className="mt-2 text-[15px] leading-relaxed">{d.text}</p>
      </div>
    </section>
  );
}

/* 마음: 오늘 마음 날씨 고르기 */
const MOODS = [
  { k: "sun", label: "맑음", msg: "기분 좋은 날엔 그 기운을 아끼지 말고 나눠 주세요. 금 기운의 당신은 칭찬 한마디가 오래 남는 사람이에요.", rest: "고마운 사람에게 짧게 연락하기" },
  { k: "cloud", label: "흐림", msg: "이유 없이 무거운 날이 있어요. 지금 지나는 계절이 늦가을이라 그래요. 당신 탓이 아니에요.", rest: "할 일 목록에서 하나만 지우기" },
  { k: "rain", label: "비", msg: "울고 싶은 날은 울어도 돼요. 물은 쇠를 씻어서 다시 빛나게 해요.", rest: "따뜻한 물로 오래 씻기" },
  { k: "wind", label: "바람", msg: "마음이 이리저리 흔들릴 땐 큰 결정은 내일로 미뤄요. 흔들리는 건 약해서가 아니라 섬세해서예요.", rest: "십오 분만 걷기" },
  { k: "fog", label: "안개", msg: "앞이 안 보이는 것 같아도 길은 그대로 있어요. 이번 달 하순이면 조금씩 걷혀요.", rest: "내일 할 일 하나만 정해 두고 자기" },
] as const;
function MoodWeather() {
  const aos = useAos();
  const [m, setM] = useState<number | null>(null);
  const r = m === null ? null : MOODS[m];
  return (
    <section className="px-[5.5cqw] py-12">
      <div {...aos()} className="text-center">
        <PTitle>지금 마음 날씨는 어때요?</PTitle>
        <p className={sub}>고르면 사주에 맞춰 한마디 건네 드려요.</p>
      </div>
      <div className="mt-6 grid grid-cols-5 gap-1.5">
        {MOODS.map((mo, i) => (
          <button
            key={mo.k}
            type="button"
           
            onClick={() => setM(i)}
            className={`rounded-2xl py-3 transition ${m === i ? "bg-[var(--p)] text-white shadow-md" : "bg-white/70 text-[var(--p)] ring-1 ring-white"}`}
          >
            <WeatherIcon kind={mo.k} className="mx-auto h-7 w-7" />
            <span className="mt-1 block text-[13px]">{mo.label}</span>
          </button>
        ))}
      </div>
      {r && (
        <div key={r.k} {...aos()} className="mt-5">
          <PCard className="text-center">
            <p className="text-[16px] leading-loose text-[var(--ink)]" style={hf}>{r.msg}</p>
            <p className="mt-4 inline-block rounded-full bg-[var(--a)]/50 px-3 py-1 text-[13px]">오늘의 쉼표 · {r.rest}</p>
          </PCard>
        </div>
      )}
    </section>
  );
}

/* 결혼: 해마다 결혼하기 좋은 정도와 달 (샘플) */
const WED = [
  { y: 2027, score: 68, months: [9, 10], note: "준비를 시작하기 좋은 해예요. 상견례나 집 알아보기에 무난해요." },
  { y: 2028, score: 88, months: [4, 5, 10], note: "두 사람의 대운이 함께 순해지는 해예요. 결혼하기 가장 좋아요." },
  { y: 2029, score: 74, months: [3, 11], note: "무난하지만 한 사람의 일이 바빠져요. 날은 일찍 잡아 두세요." },
];
function WeddingYear() {
  const aos = useAos();
  const [sel, setSel] = useState(1);
  const w = WED[sel];
  return (
    <section className="px-[6.5cqw] py-12 text-center">
      <div {...aos()}>
        <p className="text-[12px] tracking-[0.4em] text-[var(--sub)]">SAVE THE DATE</p>
        <div className="mt-2">
          <PTitle>결혼하기 좋은 해, 미리 짚어 봐요</PTitle>
        </div>
      </div>
      <div className="grid grid-cols-3 border-y border-[var(--a)]">
        {WED.map((wy, i) => (
          <button key={wy.y} type="button" onClick={() => setSel(i)} className={`py-3 transition ${i ? "border-l border-[var(--a)]/60" : ""} ${i === sel ? "bg-[var(--p)] text-[#fbf8f1]" : "text-[var(--ink)]"}`}>
            <span className="block text-[20px]" style={serif}>{wy.y}</span>
            <span className={`text-[12px] ${i === sel ? "opacity-85" : "text-[var(--sub)]"}`}>{wy.score}점</span>
          </button>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-6 gap-y-3 text-[14px]">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((mo) => {
          const good = w.months.includes(mo);
          return (
            <span key={mo} className={`mx-auto grid h-10 w-10 place-items-center rounded-full ${good ? "bg-[var(--p)] text-[#fbf8f1]" : "text-[var(--sub)]"}`} style={good ? serif : undefined}>
              {mo}월
            </span>
          );
        })}
      </div>
      <p className="mt-5 text-[15px] leading-relaxed">{w.note}</p>
      <p className="mt-2 text-[12px] text-[var(--sub)]">샘플 커플 기준이에요. 두 사람 생일을 넣으면 실제 날짜로 바뀌어요.</p>
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
        <p className="mt-4 text-[16px] leading-relaxed text-white/85">{a.body}</p>
        <p className="mt-6 text-right text-[14px] text-[var(--a)]">— {a.sign}</p>
      </section>
    );
  }
  if (page.skin === "night") {
    return (
      <section className="px-[6.5cqw] py-14 text-center">
        <p {...aos()} className="text-[13px] tracking-[0.2em] text-[var(--a)]">ABOUT</p>
        <p className="mt-3 text-[clamp(20px,6.2cqw,25px)] text-white" style={hf}>{a.title}</p>
        <p className="mx-auto mt-4 max-w-[320px] text-[15px] leading-loose text-[var(--sub)]">{a.body}</p>
        <p className="mt-6 text-[14px] text-[var(--a)]">{a.sign}</p>
      </section>
    );
  }
  if (page.skin === "royal") {
    return (
      <section className="px-[7cqw] py-14 text-center">
        <div {...aos()} className="mx-auto grid h-14 w-14 place-items-center border border-[var(--a)] text-[24px] text-[var(--a)] outline outline-1 outline-offset-[3px] outline-[var(--a)]/40" style={serif}>宮</div>
        <p className="mt-6 text-[clamp(20px,6.2cqw,25px)] text-[#f3e6c8]" style={hf}>{a.title}</p>
        <p className="mx-auto mt-4 max-w-[320px] text-[15px] leading-loose text-[var(--sub)]">{a.body}</p>
        <p className="mt-6 text-[13px] tracking-[0.2em] text-[var(--a)]">{a.sign}</p>
      </section>
    );
  }
  if (page.skin === "hanji" || page.skin === "letter" || page.skin === "invite") {
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
