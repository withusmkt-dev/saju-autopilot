// 예시 브랜드 페이지(마스터 템플릿)에 들어가는 문구·구성.
// 실서비스에서는 site_config(브랜드 생성 때 Claude 가 만든 값)에서 읽는다.
import { BRANDS } from "@/lib/dummy";
import type { Brand } from "@/lib/types";
import type { SkinKey } from "./skins";

export type Motif = "moon" | "none" | "flower" | "coin" | "cloud";

export interface PageProduct {
  name: string; // orderName 뒤에 붙는 상품명
  price: number;
  listPrice: number;
  desc: string;
}

export interface BrandPage {
  skin: SkinKey;
  topic: string; // 이 브랜드가 파는 주제
  formType: "single" | "couple"; // couple = 상대방 정보도 받음
  motif: Motif;
  badge: string;
  heroTitle: string; // 줄바꿈은 \n
  heroDesc: string;
  cta: string;
  points: { title: string; desc: string }[];
  reviews: { name: string; text: string }[];
  product: PageProduct;
  /** 무료 결과 3단락 — 브랜드 말투로 */
  free: { title: string; text: string }[];
  /** 유료 결과 앞머리 한 줄 */
  paidIntro: string;
}

/** 예시 브랜드 10개 (주제별 하나씩) */
export const SHOWCASE = ["dalbit", "destiny-call", "love-lab", "geumbit", "cheongwol", "saju-secret", "fact-saju", "today-myeongri", "soul-saju", "hongyeon"] as const;

const PAGES: Record<string, BrandPage> = {
  dalbit: {
    skin: "night",
    topic: "종합 사주",
    formType: "single",
    motif: "moon",
    badge: "달빛 아래 읽는 내 사주",
    heroTitle: "오늘 밤,\n내 사주를 펼쳐 볼까요",
    heroDesc: "생년월일시만 넣으면 타고난 기질과 올해의 흐름을 차분히 읽어 드려요.",
    cta: "무료로 내 사주 보기",
    points: [
      { title: "타고난 기질", desc: "일간과 오행으로 보는 나의 바탕" },
      { title: "올해의 흐름", desc: "2027년 달마다 오는 기운" },
      { title: "지금의 한 걸음", desc: "흐름에 맞는 작은 조언" },
    ],
    reviews: [
      { name: "30대 · 김*연", text: "말투가 따뜻해서 위로받는 느낌이었어요. 올해 흐름 정리가 특히 좋았어요." },
      { name: "20대 · 박*호", text: "무료인데 생각보다 길고 구체적이라 놀랐어요." },
    ],
    product: { name: "심층사주 해설서", price: 9900, listPrice: 19800, desc: "10장 분량 · 대운과 2027년 월별 흐름까지" },
    free: [
      { title: "타고난 기질", text: "경금(庚金) 일간으로 태어나, 한번 정한 일은 끝까지 다듬어 내는 단단함이 있어요. 겉으로는 담담해 보여도 속으로는 기준이 분명한 사람이에요." },
      { title: "올해의 흐름", text: "올해는 불의 기운이 들어와 나를 단련하는 해예요. 서두르기보다 준비해 둔 것을 하나씩 꺼내 보이면 좋은 평가가 따라와요." },
      { title: "지금의 한 걸음", text: "가을에 접어들면 사람을 통해 기회가 들어와요. 먼저 연락해 오는 사람의 이야기를 흘려듣지 마세요." },
    ],
    paidIntro: "달빛 아래에서 천천히 읽어 내려가듯, 당신의 사주를 열 장에 나누어 담았어요.",
  },
  "destiny-call": {
    skin: "poster",
    topic: "팩폭 사주",
    formType: "single",
    motif: "none",
    badge: "돌려 말 안 함",
    heroTitle: "뼈 때리는\n진짜 내 사주",
    heroDesc: "듣기 좋은 말은 빼고, 지금 알아야 할 것만 짧고 세게 알려 드려요.",
    cta: "각오하고 무료로 보기",
    points: [
      { title: "내 성격 팩폭", desc: "남들이 말 못 한 내 진짜 모습" },
      { title: "반복되는 실수", desc: "연애·돈에서 매번 걸리는 패턴" },
      { title: "올해 승부처", desc: "밀어붙일 달 vs 버틸 달" },
    ],
    reviews: [
      { name: "20대 · 이*진", text: "너무 맞아서 기분 나쁠 정도ㅋㅋ 친구들한테 다 돌렸어요." },
      { name: "30대 · 정*우", text: "돈 새는 패턴 얘기에서 뜨끔했습니다." },
    ],
    product: { name: "팩폭 심층 해설서", price: 9900, listPrice: 19800, desc: "10장 · 연애·돈·일 실수 패턴과 해결법" },
    free: [
      { title: "내 성격 팩폭", text: "경금 일간. 한마디로 '고집 센 완벽주의자'. 남이 대충 하는 꼴을 못 봐서 결국 내가 다 떠안는 타입이에요." },
      { title: "반복되는 실수", text: "돈이 들어오면 '이번엔 다르겠지' 하고 크게 질러요. 재성이 들어올 때보다 나갈 때가 더 빠른 사주라, 들어온 달에 묶어 두는 게 답이에요." },
      { title: "올해 승부처", text: "상반기는 버티는 구간, 9월부터가 진짜예요. 그 전에 판 벌리면 손해 봐요. 진심." },
    ],
    paidIntro: "좋은 말만 듣고 싶으면 여기서 닫으세요. 지금부터는 진짜 이야기예요.",
  },
  "love-lab": {
    skin: "soft",
    topic: "연애운",
    formType: "single",
    motif: "flower",
    badge: "연애운만 깊게",
    heroTitle: "내 사주에\n도화가 피는 달",
    heroDesc: "연애 흐름과 인연이 들어오는 시기를 달마다 짚어 드려요.",
    cta: "내 연애운 무료로 보기",
    points: [
      { title: "연애 스타일", desc: "나는 어떤 사랑을 하는 사람일까" },
      { title: "인연의 시기", desc: "인연이 들어오는 달" },
      { title: "잘 맞는 사람", desc: "오행으로 보는 궁합 힌트" },
    ],
    reviews: [
      { name: "20대 · 한*율", text: "제가 왜 늘 같은 사람한테 끌리는지 알 것 같아요." },
      { name: "30대 · 오*은", text: "말투가 다정해서 좋았어요. 인연 시기 체크해 뒀어요!" },
    ],
    product: { name: "연애 심층 해설서", price: 9900, listPrice: 19800, desc: "10장 · 연애 성향, 인연 시기, 궁합 힌트" },
    free: [
      { title: "연애 스타일", text: "경금 일간은 마음을 쉽게 열지 않지만, 한번 열면 오래 지키는 사람이에요. 표현이 서툴러서 오해를 받을 때가 있어요." },
      { title: "인연의 시기", text: "올해는 오화(午火)의 기운이 강해 사람을 만나는 자리가 늘어요. 특히 늦봄과 초가을에 새로운 인연이 들어올 가능성이 커요." },
      { title: "잘 맞는 사람", text: "물의 기운이 있는 사람과 만나면 서로 부드러워져요. 대화가 편한 사람을 놓치지 마세요." },
    ],
    paidIntro: "연애는 타이밍이에요. 당신의 사주에 적힌 사랑의 시간표를 펼쳐 볼게요.",
  },
  geumbit: {
    skin: "finance",
    topic: "재물운",
    formType: "single",
    motif: "coin",
    badge: "재물 타이밍",
    heroTitle: "돈이 들어오는 달,\n사주에 적혀 있어요",
    heroDesc: "재물운의 흐름과 모으기 좋은 시기, 조심할 시기를 알려 드려요.",
    cta: "내 재물운 무료로 보기",
    points: [
      { title: "타고난 재물 그릇", desc: "돈을 버는 방식과 쓰는 습관" },
      { title: "들어오는 달", desc: "2027년 재물 흐름 그래프" },
      { title: "지키는 법", desc: "새는 돈 막는 한 가지" },
    ],
    reviews: [
      { name: "40대 · 서*진", text: "모으기 좋은 달을 알려 줘서 적금 시작했어요." },
      { name: "30대 · 강*훈", text: "투자 조언은 없는데 오히려 그게 믿음이 갔어요." },
    ],
    product: { name: "재물 타이밍 해설서", price: 9900, listPrice: 19800, desc: "10장 · 재물 그릇, 월별 흐름, 지키는 법" },
    free: [
      { title: "타고난 재물 그릇", text: "경금 일간에 재성이 지지에 숨어 있어, 한 번에 크게보다는 꾸준히 쌓을 때 커지는 그릇이에요." },
      { title: "들어오는 달", text: "올해는 하반기로 갈수록 재물의 흐름이 좋아져요. 특히 10월 전후로 들어오는 돈이 생길 수 있어요." },
      { title: "지키는 법", text: "기분이 좋을 때 쓰는 돈이 가장 크게 새요. 큰 지출은 하루 미뤄 두는 습관이 도움이 돼요." },
    ],
    paidIntro: "재물은 그릇과 때가 맞아야 쌓여요. 당신의 그릇과 때를 열 장에 정리했어요.",
  },
  cheongwol: {
    skin: "hanji",
    topic: "정통 명리",
    formType: "single",
    motif: "cloud",
    badge: "명리 정통 해석",
    heroTitle: "청월당의\n고품격 운명 보고서",
    heroDesc: "명리학 전통 해석으로 격국과 용신, 대운의 흐름을 정중하게 풀어 드립니다.",
    cta: "무료 풀이 받아 보기",
    points: [
      { title: "원국과 격국", desc: "타고난 사주의 짜임" },
      { title: "용신과 기신", desc: "나를 돕는 기운, 막는 기운" },
      { title: "대운의 흐름", desc: "10년 단위로 보는 큰 물줄기" },
    ],
    reviews: [
      { name: "50대 · 윤*호", text: "용어 설명이 친절하고 해석이 차분해서 신뢰가 갑니다." },
      { name: "40대 · 임*희", text: "대운 흐름을 이렇게 정리해 준 곳은 처음입니다." },
    ],
    product: { name: "정통 사주 해설서", price: 9900, listPrice: 19800, desc: "10장 · 원국·격국·용신·대운·세운" },
    free: [
      { title: "원국과 격국", text: "경금 일간이 술월에 나서 토의 생조를 받으니, 기본 바탕이 두텁고 책임감이 강한 명조입니다." },
      { title: "용신과 기신", text: "금이 단단하니 이를 다듬는 화(火)와 흐르게 하는 수(水)가 귀하게 쓰입니다. 지나친 토는 오히려 답답함을 더합니다." },
      { title: "대운의 흐름", text: "지금의 대운은 기운을 안으로 모으는 시기입니다. 다음 대운에서 그동안 쌓은 것이 바깥으로 드러납니다." },
    ],
    paidIntro: "삼가 귀하의 명조를 살펴, 열 장의 해설로 정리하였습니다.",
  },
  "saju-secret": {
    skin: "calendar",
    topic: "2027 신년운세",
    formType: "single",
    motif: "cloud",
    badge: "2027 정미년",
    heroTitle: "2027년,\n나에게 오는 열두 달",
    heroDesc: "새해 총운부터 달마다 오는 기운, 삼재와 귀인까지 한 번에 정리해 드려요.",
    cta: "2027 운세 무료로 보기",
    points: [
      { title: "2027 총운", desc: "한 해를 관통하는 키워드" },
      { title: "월별 흐름", desc: "1월부터 12월까지 기운의 높낮이" },
      { title: "삼재·귀인", desc: "조심할 때와 도와줄 사람" },
    ],
    reviews: [
      { name: "30대 · 신*아", text: "월별로 나와 있어서 다이어리에 옮겨 적었어요." },
      { name: "40대 · 백*수", text: "삼재 설명이 겁주지 않고 차분해서 좋았습니다." },
    ],
    product: { name: "2027 신년운세", price: 9900, listPrice: 19800, desc: "10장 · 총운, 월별 흐름, 영역별 운, 삼재, 귀인, 처방전" },
    free: [
      { title: "2027 총운", text: "정미년은 불과 흙의 해예요. 경금 일간에게는 단련의 해라, 바쁘지만 실력이 드러나는 한 해가 돼요." },
      { title: "상반기", text: "봄까지는 기반을 다지는 시기예요. 새로운 일을 벌이기보다 하던 일을 마무리하면 하반기가 가벼워져요." },
      { title: "하반기", text: "가을로 갈수록 기운이 올라와요. 9월과 10월에 들어오는 제안은 꼼꼼히 살펴보세요." },
    ],
    paidIntro: "정미년 한 해를 열두 달로 나누어, 당신에게 오는 기운을 차례로 짚었어요.",
  },
  "fact-saju": {
    skin: "office",
    topic: "이직·취업운",
    formType: "single",
    motif: "none",
    badge: "커리어 팩폭",
    heroTitle: "이직각인지\n버틸각인지",
    heroDesc: "사주로 보는 내 일 체질, 움직일 타이밍, 지금 회사에 남을지 말지.",
    cta: "내 이직운 무료로 보기",
    points: [
      { title: "일 체질", desc: "조직형인지 독립형인지" },
      { title: "움직일 타이밍", desc: "이직·취업이 잘 풀리는 달" },
      { title: "지금 막히는 이유", desc: "반복되는 일의 패턴" },
    ],
    reviews: [
      { name: "20대 · 조*현", text: "취준 중인데 시기 얘기가 현실적이라 도움 됐어요." },
      { name: "30대 · 남*희", text: "버틸 각이라고 해서 일단 버팁니다ㅋㅋ" },
    ],
    product: { name: "커리어 해설서", price: 9900, listPrice: 19800, desc: "10장 · 일 체질, 이직 타이밍, 맞는 직무" },
    free: [
      { title: "일 체질", text: "경금 일간은 기준이 분명한 조직형. 단, 윗사람이 대충이면 못 버텨요. 회사보다 상사가 이직 사유가 되는 타입." },
      { title: "움직일 타이밍", text: "상반기에 던지는 지원서는 반응이 약해요. 하반기, 특히 9월 이후가 움직일 때예요." },
      { title: "지금 막히는 이유", text: "혼자 다 하려는 게 문제예요. 실력은 충분한데 보여 주는 걸 안 해서 평가가 늦게 와요." },
    ],
    paidIntro: "듣기 좋은 커리어 조언은 많아요. 여기선 당신 사주에 맞는 진짜 타이밍만 말할게요.",
  },
  "today-myeongri": {
    skin: "daily",
    topic: "오늘의 운세",
    formType: "single",
    motif: "moon",
    badge: "매일 아침 일진",
    heroTitle: "오늘 하루,\n어떤 기운이 올까요",
    heroDesc: "내 사주와 오늘의 일진을 맞춰 보고, 오늘 챙길 것 하나를 알려 드려요.",
    cta: "오늘의 운세 무료로 보기",
    points: [
      { title: "오늘의 일진", desc: "오늘 날의 간지와 기운" },
      { title: "나와의 궁합", desc: "오늘이 나에게 맞는 날일까" },
      { title: "오늘의 한 가지", desc: "행운의 색·방향·행동" },
    ],
    reviews: [
      { name: "20대 · 유*빈", text: "출근길에 보는 게 습관이 됐어요." },
      { name: "30대 · 차*민", text: "짧은데 은근히 맞아서 신기해요." },
    ],
    product: { name: "한 달 운세 해설서", price: 9900, listPrice: 19800, desc: "10장 · 다음 30일의 일진 흐름과 좋은 날" },
    free: [
      { title: "오늘의 일진", text: "오늘은 갑진일, 나무와 흙의 기운이 강한 날이에요. 경금 일간에게는 할 일이 많지만 성과가 보이는 날이에요." },
      { title: "나와의 궁합", text: "오전보다 오후에 기운이 좋아져요. 중요한 연락은 점심 이후로 미뤄 보세요." },
      { title: "오늘의 한 가지", text: "행운의 색은 남색, 방향은 북쪽이에요. 물 한 잔 더 마시는 것부터 시작해 보세요." },
    ],
    paidIntro: "앞으로 30일, 하루하루의 기운을 미리 펼쳐 볼게요.",
  },
  "soul-saju": {
    skin: "duo",
    topic: "궁합",
    formType: "couple",
    motif: "flower",
    badge: "두 사람의 사주",
    heroTitle: "우리 둘,\n사주로 보면 어떨까",
    heroDesc: "두 사람의 생년월일시로 서로 채워 주는 기운과 부딪히는 지점을 알려 드려요.",
    cta: "우리 궁합 무료로 보기",
    points: [
      { title: "궁합 점수", desc: "오행으로 보는 두 사람의 균형" },
      { title: "잘 맞는 점", desc: "서로를 채워 주는 기운" },
      { title: "부딪히는 점", desc: "다툼이 생기는 패턴과 푸는 법" },
    ],
    reviews: [
      { name: "20대 커플 · 한*진", text: "둘이 같이 보면서 엄청 웃었어요. 싸우는 이유가 그대로 나와요." },
      { name: "30대 · 권*영", text: "결혼 전에 재미로 봤는데 대화 거리가 생겼어요." },
    ],
    product: { name: "궁합 심층 해설서", price: 9900, listPrice: 19800, desc: "10장 · 두 사람의 성향, 갈등 패턴, 함께할 시기" },
    free: [
      { title: "잘 맞는 점", text: "한 사람의 단단한 금 기운을 다른 사람의 물 기운이 부드럽게 풀어 줘요. 같이 있으면 편안해지는 사이예요." },
      { title: "부딪히는 점", text: "둘 다 고집이 있어 작은 일에서 물러서지 않을 때가 있어요. 결정은 하루 미루고 다시 이야기하면 쉽게 풀려요." },
      { title: "함께할 시기", text: "올해 하반기는 두 사람에게 함께 무언가를 시작하기 좋은 흐름이에요." },
    ],
    paidIntro: "두 사람의 사주를 나란히 놓고, 서로에게 어떤 사람인지 열 장에 담았어요.",
  },
  hongyeon: {
    skin: "letter",
    topic: "재회운",
    formType: "single",
    motif: "flower",
    badge: "다시 이어질까",
    heroTitle: "그 사람과\n다시 만날 수 있을까",
    heroDesc: "헤어진 인연이 다시 이어질 흐름이 있는지, 언제쯤인지 조심스럽게 짚어 드려요.",
    cta: "재회운 무료로 보기",
    points: [
      { title: "인연의 끈", desc: "아직 이어져 있는 기운" },
      { title: "다시 만날 시기", desc: "연락이 닿기 쉬운 달" },
      { title: "내가 할 일", desc: "기다림과 정리 사이" },
    ],
    reviews: [
      { name: "20대 · 임*서", text: "위로받고 싶어서 봤는데 마음이 정리됐어요." },
      { name: "30대 · 노*연", text: "희망고문 없이 솔직하게 말해 줘서 좋았어요." },
    ],
    product: { name: "재회 해설서", price: 9900, listPrice: 19800, desc: "10장 · 인연의 흐름, 시기, 다가가는 법과 정리하는 법" },
    free: [
      { title: "인연의 끈", text: "당신의 사주에는 지나간 인연을 쉽게 놓지 못하는 기운이 있어요. 그만큼 진심이었다는 뜻이에요." },
      { title: "다시 만날 시기", text: "올해 늦가을에 옛 인연의 소식이 들려올 수 있는 흐름이 있어요. 먼저 서두르기보다 그때를 기다려 보세요." },
      { title: "내가 할 일", text: "지금은 나를 단단히 하는 시기예요. 다시 만나든 아니든, 그 시간이 당신을 지켜 줘요." },
    ],
    paidIntro: "조심스럽게, 그러나 솔직하게. 당신과 그 사람의 인연을 열 장에 걸쳐 살펴봤어요.",
  },
};

const DEFAULT_PAGE = (b: Brand): BrandPage => ({
  ...PAGES.dalbit,
  motif: b.theme.bgAsset ? "moon" : "none",
  badge: b.tone.concept,
  heroTitle: b.heroTitle,
  heroDesc: b.heroDesc,
});

export function getBrandPage(slug: string): { brand: Brand; page: BrandPage } | null {
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) return null;
  return { brand, page: PAGES[slug] ?? DEFAULT_PAGE(brand) };
}

/* ---------- 샘플 사주 (엔진 연결 전) ---------- */

export const ELEMENT = {
  목: { color: "#3f9b5a", bg: "#e7f4ea" },
  화: { color: "#d9483b", bg: "#fbe9e7" },
  토: { color: "#b7862f", bg: "#f6efdf" },
  금: { color: "#7d8796", bg: "#eef0f3" },
  수: { color: "#2f5fae", bg: "#e6edf8" },
} as const;
export type Element = keyof typeof ELEMENT;

/** @withusmkt-dev/saju-engine 의 calculateSaju() 결과 중 화면에 쓰는 부분만. 지금은 고정 샘플 */
export const SAMPLE_SAJU = {
  pillars: [
    { label: "시주", stem: "癸", stemKo: "계", branch: "未", branchKo: "미", stemEl: "수", branchEl: "토" },
    { label: "일주", stem: "庚", stemKo: "경", branch: "午", branchKo: "오", stemEl: "금", branchEl: "화" },
    { label: "월주", stem: "丙", stemKo: "병", branch: "戌", branchKo: "술", stemEl: "화", branchEl: "토" },
    { label: "년주", stem: "乙", stemKo: "을", branch: "亥", branchKo: "해", stemEl: "목", branchEl: "수" },
  ] as { label: string; stem: string; stemKo: string; branch: string; branchKo: string; stemEl: Element; branchEl: Element }[],
  elements: { 목: 1, 화: 2, 토: 2, 금: 1, 수: 2 } as Record<Element, number>,
  dayMaster: "경금(庚金)",
  /** 2027년 월별 흐름 점수 (엔진 scoring 결과 자리) */
  months: [52, 48, 55, 61, 58, 50, 47, 60, 72, 78, 70, 64],
};

export const PAID_CHAPTERS = [
  "타고난 기질",
  "성격의 빛과 그림자",
  "연애와 관계",
  "재물의 흐름",
  "일과 직업",
  "생활 리듬",
  "대운의 흐름",
  "2027년 월별 흐름",
  "귀인과 조심할 인연",
  "나를 위한 처방전",
];

/** 유료 해설서 본문 샘플 (실서비스는 Claude 가 앵커 1 + 섹션 10 으로 생성) */
export const PAID_SAMPLE: Record<number, string> = {
  0: "경금 일간은 원석을 닮았어요. 다듬어질수록 빛나는 사람이라, 어려운 시기를 지나고 나면 오히려 단단해지는 힘이 있어요. 월지 술토가 바탕을 받쳐 주니 책임을 맡으면 끝까지 해내는 성실함도 함께 타고났어요.",
  1: "기준이 분명한 만큼 스스로에게도 엄격해요. 남에게는 너그럽지만 자신에게는 쉽게 만족하지 못해 지치는 때가 있어요. 잘한 일을 스스로 인정해 주는 연습이 필요해요.",
  2: "가까운 사람에게 마음을 열기까지 시간이 걸리지만, 한번 믿은 사람은 오래 곁에 둬요. 일지 오화가 관계에 따뜻함을 더해 주어, 표현만 조금 늘리면 관계가 훨씬 편해져요.",
};
