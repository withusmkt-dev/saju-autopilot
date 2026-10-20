// 예시 브랜드 페이지(마스터 템플릿)에 들어가는 문구·구성.
// 실서비스에서는 site_config(브랜드 생성 때 Claude 가 만든 값)에서 읽는다.
import { BRANDS } from "@/lib/dummy";
import type { Brand } from "@/lib/types";
import type { SkinKey } from "./skins";

export type FeatureKey = "pillars" | "factShuffle" | "loveTypes" | "wealthBowls" | "glossary" | "zodiac2027" | "jobMatch" | "weekIljin" | "zodiacMatch" | "reunionCheck" | "luckyPouch" | "daeunTimeline" | "moodWeather" | "weddingYear";

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
  /** 이미지 (public/assets/bg). hero=첫 화면, pageBg=바탕 질감, band=중간 사진 띠, card=카드 종이 */
  images?: { hero?: string; pageBg?: string; band?: string; bandCaption?: string; card?: string; product?: string; loading?: string };
  /** 주제 맞춤 섹션 (Features.tsx) */
  feature: FeatureKey;
  /** 브랜드 이야기 */
  about: { title: string; body: string; sign: string };
  /** 섹션 제목 (브랜드 말투) */
  titles: { points: string; reviews: string; form: string };
  points: { title: string; desc: string }[];
  reviews: { name: string; text: string }[];
  product: PageProduct;
  /** 무료 결과 3단락, 브랜드 말투로 */
  free: { title: string; text: string }[];
  /** 유료 결과 앞머리 한 줄 */
  paidIntro: string;
}

/** 예시 브랜드 (주제별 하나씩). 뒤의 넷은 이미지에서 출발한 컨셉 */
export const SHOWCASE = ["dalbit", "destiny-call", "love-lab", "geumbit", "cheongwol", "saju-secret", "fact-saju", "today-myeongri", "soul-saju", "hongyeon", "dal-tokki", "gungmyeong", "gureum", "baengnyeon"] as const;

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
    titles: { points: "오늘 밤 펼쳐 볼 세 가지", reviews: "다녀간 분들이 남긴 말", form: "생년월일시를 알려 주세요" },
    feature: "pillars",
    about: { title: "달빛운세는요", body: "밤에 혼자 생각이 많아질 때 찾는 곳이었으면 해서 만들었어요. 사주를 겁주는 말로 쓰지 않고, 지금 내가 어떤 계절을 지나고 있는지 차분히 알려 드리는 게 목표예요.", sign: "달빛운세 드림" },
    images: { hero: "navy-moon-tassel", loading: "moon-rabbit" },
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
    titles: { points: "각오할 것 세 개", reviews: "맞아서 화난 사람들", form: "정보 입력. 빨리." },
    feature: "factShuffle",
    about: { title: "운명소환소가 뭐냐면", body: "좋은 말만 해 주는 사주는 이미 많아서요. 여기는 듣기 싫어도 알아야 하는 얘기를 먼저 합니다. 대신 해결책 없이 겁만 주는 말은 안 써요. 그건 팩폭이 아니라 그냥 막말이니까.", sign: "운명소환소" },
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
    titles: { points: "연구소에서 보는 것", reviews: "먼저 본 언니들 후기", form: "내 정보만 있으면 돼요" },
    feature: "loveTypes",
    about: { title: "연구소 소개", body: "연애 고민은 결국 언제, 그리고 어떤 사람으로 모이더라고요. 그래서 연애사주연구소는 사주에서 그 두 가지만 깊게 봐요. 다른 건 과감하게 뺐어요.", sign: "연애사주연구소 연구원 일동" },
    images: { hero: "pink-silk", band: "couple-bouquet", bandCaption: "좋은 인연은 타이밍이에요" },
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
    titles: { points: "재물 리포트 구성", reviews: "이용자 후기", form: "기본 정보 입력" },
    feature: "wealthBowls",
    about: { title: "금빛운세의 원칙", body: "투자 종목이나 숫자를 찍어 드리지 않아요. 대신 내 돈이 들어오고 나가는 결을 사주로 읽어 드려요. 언제 모으고 언제 지킬지, 그 타이밍만큼은 분명하게 말씀드릴게요.", sign: "금빛운세" },
    images: { pageBg: "paper-kraft" },
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
    titles: { points: "해석의 차례", reviews: "독자 소감", form: "명조를 세울 정보" },
    feature: "glossary",
    about: { title: "청월당에 대하여", body: "청월당은 명리학의 오래된 해석 방식을 지금의 말로 옮기는 곳입니다. 격국과 용신을 기준으로 삼되, 어려운 용어는 풀어서 설명드립니다. 서두르지 않고 한 사람의 명조를 끝까지 살핍니다.", sign: "청월당 삼가 올림" },
    images: { hero: "ink-mountains-sun", pageBg: "paper-hanji", product: "palace-gold-line" },
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
    titles: { points: "2027 운세에 담긴 것", reviews: "작년에 본 분들", form: "새해 운세 받을 정보" },
    feature: "zodiac2027",
    about: { title: "왜 신년운세만 하냐면요", body: "한 해를 시작할 때 딱 한 번 꺼내 보는 지도가 있으면 좋겠다고 생각했어요. 사주시크릿은 매년 그 지도 하나를 정성껏 만들어요. 열두 달을 한 장에 펼쳐 두고, 달이 바뀔 때마다 다시 열어 보세요.", sign: "사주시크릿 2027 에디션" },
    images: { hero: "sky-dawn-pastel" },
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
    titles: { points: "진단 항목", reviews: "먼저 진단받은 사람들", form: "지원서 작성" },
    feature: "jobMatch",
    about: { title: "팩폭사주 입사 안내", body: "이직이냐 존버냐, 이 질문 하나만 진지하게 봐요. 사주로 일 체질과 움직일 타이밍을 보고, 지금 회사에서 막히는 이유까지 짚어 드려요. 퇴사를 부추기지도, 무조건 버티라고 하지도 않습니다.", sign: "인사팀 아님 주의" },
    images: { hero: "clipboard", pageBg: "paper-grid", band: "desk-night", bandCaption: "오늘도 퇴근 못 한 당신에게" },
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
    titles: { points: "오늘의 지면", reviews: "독자 엽서", form: "오늘 운세 받을 정보" },
    feature: "weekIljin",
    about: { title: "오늘의명리를 만드는 사람들", body: "매일 아침 한 장짜리 신문처럼 읽히는 운세를 만들고 싶었어요. 길게 읽을 시간 없는 날에도 출근길 1분이면 충분하게요. 오늘의 일진과 내 사주가 어떻게 만나는지만 담백하게 적어요.", sign: "오늘의명리 편집부" },
    images: { hero: "window-summer" },
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
    titles: { points: "궁합에서 보는 것", reviews: "같이 본 커플들", form: "두 사람 정보" },
    feature: "zodiacMatch",
    about: { title: "소울사주는", body: "두 사람을 같이 보는 곳이에요. 누가 더 맞추고 누가 더 참는지보다, 둘이 어디서 편하고 어디서 부딪히는지를 알려 드려요. 싸운 날 같이 열어 보면 좋아요.", sign: "소울사주" },
    images: { hero: "beach-couple-heart", band: "hands-sea", bandCaption: "둘이라서 더 잘 보이는 것들" },
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
    titles: { points: "이 편지에 담길 이야기", reviews: "같은 마음이었던 분들", form: "당신의 정보를 적어 주세요" },
    feature: "reunionCheck",
    about: { title: "홍연사주의 약속", body: "다시 만날 수 있다는 말을 쉽게 하지 않아요. 사주에 보이는 흐름만 조심스럽게 전해 드리고, 기다릴지 정리할지는 당신이 정할 수 있게 돕는 게 저희 일이에요.", sign: "붉은 실을 잇는 곳, 홍연" },
    images: { hero: "couple-sunset", card: "paper-lined" },
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

  /* ---------- 이미지에서 출발한 새 컨셉 4종 ---------- */

  "dal-tokki": {
    skin: "sticker",
    topic: "행운·부적",
    formType: "single",
    motif: "moon",
    badge: "이번 달 행운 배달",
    heroTitle: "달토끼가 빚어 온\n내 몫의 복",
    heroDesc: "타고난 오행에 모자란 기운을 찾아서, 이번 달 나한테 맞는 행운 색·숫자·물건을 골라 드려요.",
    cta: "내 행운 무료로 받기",
    titles: { points: "복주머니에 든 것", reviews: "복 받아 간 사람들", form: "어디로 배달할까요?" },
    feature: "luckyPouch",
    about: { title: "달토끼복점 이야기", body: "보름달 아래에서 떡 대신 복을 빚는 토끼가 있다는 얘기에서 시작했어요. 무서운 말은 빼고, 오늘 하루 기분 좋게 챙길 수 있는 작은 행운만 골라 드려요. 부적도 결국 마음을 다잡는 물건이니까요.", sign: "달토끼복점 점장 토끼" },
    images: { hero: "moon-rabbit", loading: "moon-rabbit" },
    points: [
      { title: "모자란 기운", desc: "내 오행에서 비어 있는 한 칸" },
      { title: "이번 달 행운템", desc: "색·숫자·방향·물건 하나씩" },
      { title: "복 들어오는 날", desc: "이번 달 기분 좋은 날 세 번" },
    ],
    reviews: [
      { name: "20대 · 윤*아", text: "행운 색이 남색이라길래 남색 키링 샀어요. 귀여워서 그냥 기분 좋음." },
      { name: "30대 · 임*솔", text: "매달 초에 하나씩 받아 보는 재미가 있어요. 토끼가 다 했어요." },
    ],
    product: { name: "올해 행운 부적 해설서", price: 9900, listPrice: 19800, desc: "10장 · 모자란 오행 채우기, 달마다 행운템과 좋은 날" },
    free: [
      { title: "모자란 기운", text: "여덟 글자 중에 나무(목)가 한 칸뿐이에요. 시작하는 힘이 살짝 부족해서, 마음먹고도 첫발이 늦어지는 때가 있어요." },
      { title: "이번 달 행운템", text: "초록색 작은 물건 하나를 가방에 넣어 다니세요. 숫자는 3과 8, 방향은 동쪽이 좋아요." },
      { title: "복 들어오는 날", text: "이번 달은 셋째 주 수요일 전후가 가장 가벼워요. 미뤄 둔 연락은 그날 해 보세요." },
    ],
    paidIntro: "토끼가 한 해 치 복을 열두 달로 나눠 담았어요. 하나씩 꺼내 쓰세요.",
  },
  gungmyeong: {
    skin: "royal",
    topic: "평생 사주",
    formType: "single",
    motif: "none",
    badge: "평생 한 번 보는 사주",
    heroTitle: "한 사람의 일생을\n궁의 법도로 읽다",
    heroDesc: "타고난 그릇부터 열 해마다 바뀌는 대운까지, 평생의 흐름을 한 권으로 정리해 드려요.",
    cta: "평생 사주 무료로 열기",
    titles: { points: "한 권에 담는 세 가지", reviews: "먼저 받아 본 분들", form: "태어난 때를 적어 주세요" },
    feature: "daeunTimeline",
    about: { title: "궁명당(宮明堂)", body: "옛 궁에서는 왕실의 사주를 여러 사람이 나누어 보고 한 권으로 엮었다고 해요. 궁명당은 그 방식을 따라, 한 해 운세가 아니라 평생의 큰 줄기를 먼저 세우고 그 위에 해마다의 흐름을 얹어요.", sign: "궁명당 서고에서" },
    images: { hero: "palace-gold-line", product: "navy-moon-tassel" },
    points: [
      { title: "타고난 그릇", desc: "일간과 격국으로 보는 평생의 바탕" },
      { title: "열 해의 대운", desc: "인생을 열 해씩 나눈 큰 계절" },
      { title: "지금 서 있는 곳", desc: "지금 대운에서 할 일과 쉴 일" },
    ],
    reviews: [
      { name: "50대 · 최*수", text: "지난 대운 설명이 제 삶이랑 너무 맞아서 앞으로 부분을 더 믿게 됐습니다." },
      { name: "40대 · 문*희", text: "부모님 선물로 같이 봤어요. 책처럼 정리돼 있어서 어르신들이 좋아하세요." },
    ],
    product: { name: "평생사주 대운 해설서", price: 29000, listPrice: 59000, desc: "10장 · 타고난 그릇, 대운 여덟 마디, 나이대별 조언" },
    free: [
      { title: "타고난 그릇", text: "경금(庚金) 일간이 술월에 나서 바탕이 단단해요. 쉽게 휘지 않는 대신, 스스로 다듬을 때를 기다리는 그릇이에요." },
      { title: "열 해의 대운", text: "서른넷부터 시작된 지금의 대운은 물의 기운이 들어오는 때예요. 굳어 있던 생각이 풀리고, 사람을 통해 길이 열려요." },
      { title: "지금 서 있는 곳", text: "지금은 넓히기보다 깊게 파는 시기예요. 마흔 즈음 다음 대운이 오기 전까지 한 가지를 확실히 내 것으로 만들어 두세요." },
    ],
    paidIntro: "평생의 흐름을 열 장으로 엮었습니다. 지난 대운부터 천천히 넘겨 보세요.",
  },
  gureum: {
    skin: "sky",
    topic: "마음 운세",
    formType: "single",
    motif: "cloud",
    badge: "오늘 하루 잠깐 쉬어 가요",
    heroTitle: "괜찮아,\n흐린 날도 지나가요",
    heroDesc: "지금 내 사주의 날씨를 읽고, 오늘 나한테 필요한 말 한마디를 건네 드려요.",
    cta: "내 마음 날씨 보기",
    titles: { points: "구름쉼표에서 읽어 드리는 것", reviews: "쉬어 간 사람들", form: "당신을 조금만 알려 주세요" },
    feature: "moodWeather",
    about: { title: "구름쉼표를 만든 이유", body: "운세를 보러 오는 날은 대개 마음이 복잡한 날이더라고요. 그래서 여기서는 좋다 나쁘다를 가르기보다, 지금 지나는 계절이 어떤지 알려 드리고 쉬어 가도 된다고 말해 드려요.", sign: "구름쉼표 드림" },
    images: { hero: "sky-blue-clouds", band: "sky-dawn-pastel", bandCaption: "해는 늘 같은 자리에서 다시 떠요" },
    points: [
      { title: "지금 마음의 계절", desc: "사주로 보는 요즘 내 기운" },
      { title: "나를 지치게 하는 것", desc: "오행으로 보는 마음의 버릇" },
      { title: "오늘의 쉼표", desc: "오늘 해 볼 작은 한 가지" },
    ],
    reviews: [
      { name: "20대 · 서*린", text: "운세 보러 왔다가 위로받고 갔어요. 캡처해서 배경화면 했어요." },
      { name: "30대 · 황*준", text: "겁주는 말이 하나도 없어서 좋았어요. 자기 전에 읽기 좋아요." },
    ],
    product: { name: "마음 처방 해설서", price: 9900, listPrice: 19800, desc: "10장 · 마음의 계절, 지치는 패턴, 달마다 쉼표" },
    free: [
      { title: "지금 마음의 계절", text: "요즘의 당신은 늦가을에 서 있어요. 거둬들일 건 많은데 몸이 먼저 지치는 때라, 조금 느려져도 괜찮아요." },
      { title: "나를 지치게 하는 것", text: "금의 기운이 강한 사람은 스스로에게 기준이 높아요. 다 잘하려는 마음이 가장 큰 짐일 수 있어요." },
      { title: "오늘의 쉼표", text: "오늘은 휴대폰을 내려놓고 십 분만 하늘을 보세요. 물의 기운이 마음을 식혀 줘요." },
    ],
    paidIntro: "서두르지 않아도 돼요. 한 장씩, 읽고 싶은 만큼만 읽어 주세요.",
  },
  baengnyeon: {
    skin: "invite",
    topic: "결혼운",
    formType: "couple",
    motif: "flower",
    badge: "두 사람의 결혼운",
    heroTitle: "우리, 언제\n결혼하면 좋을까요",
    heroDesc: "두 사람의 사주로 결혼하기 좋은 해와 달, 함께 살며 맞춰 갈 점을 미리 짚어 드려요.",
    cta: "결혼운 무료로 보기",
    titles: { points: "청첩장보다 먼저 볼 것", reviews: "먼저 날 잡은 커플들", form: "두 사람의 정보를 적어 주세요" },
    feature: "weddingYear",
    about: { title: "백년서약은요", body: "결혼은 날짜 하나보다 두 사람이 오래 같은 쪽을 보는 일이라고 생각해요. 그래서 좋은 날만 골라 드리지 않고, 둘이 함께 살며 부딪힐 만한 곳과 서로 채워 줄 곳까지 같이 적어 드려요.", sign: "백년서약 드림" },
    images: { hero: "couple-bouquet", band: "hands-sea", bandCaption: "같은 쪽을 오래 보는 사이" },
    points: [
      { title: "결혼하기 좋은 해", desc: "두 사람 대운이 함께 열리는 때" },
      { title: "날 잡기 좋은 달", desc: "그해 가장 순한 달 세 개" },
      { title: "함께 살며 맞출 것", desc: "돈·집안일·말투에서 다른 점" },
    ],
    reviews: [
      { name: "30대 · 김*현 ♥ 이*정", text: "양가 어른들한테 보여 드렸더니 날 잡는 얘기가 훨씬 수월해졌어요." },
      { name: "30대 · 박*우 ♥ 최*아", text: "돈 쓰는 방식이 다르다는 얘기가 진짜 맞아서 둘이 한참 웃었어요." },
    ],
    product: { name: "결혼운 궁합 해설서", price: 19800, listPrice: 39600, desc: "10장 · 결혼 적기, 날 잡기 좋은 달, 함께 살며 맞출 것" },
    free: [
      { title: "결혼하기 좋은 해", text: "두 사람의 대운이 함께 순해지는 해는 2028년이에요. 2027년 가을부터 준비를 시작하면 흐름을 타기 좋아요." },
      { title: "날 잡기 좋은 달", text: "2028년에는 4월, 5월, 10월이 두 사람 모두에게 무난해요. 그중 5월은 집안 어른들의 기운도 함께 좋아요." },
      { title: "함께 살며 맞출 것", text: "한 사람은 모아야 마음이 놓이고, 한 사람은 써야 기운이 도는 사주예요. 생활비 통장을 일찍 나눠 두면 다툴 일이 줄어요." },
    ],
    paidIntro: "두 사람이 함께 쓸 백 년을 열 장에 나눠 적었어요.",
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

/** 이미지 이름 → CSS url() (public/assets/bg/{name}.webp) */
export const bgImg = (name: string) => `url("/assets/bg/${name}.webp")`;

/** 바탕 질감 위에 덮는 바탕색 비율 (질감이 글씨를 방해하지 않게) */
export const PAGE_BG_VEIL: Record<string, number> = { "paper-kraft": 80, "paper-hanji": 55, "paper-grid": 20 };
