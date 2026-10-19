// 백엔드 연결 전까지 화면에 쓰는 더미 데이터. 모양은 types.ts 를 따른다.
import type {
  AdCampaign,
  AssetImage,
  AlertSettings,
  ApiKeyStatus,
  Brand,
  BrandDraft,
  Channel,
  ContentItem,
  FontKey,
  KillRule,
  PixelKey,
  Order,
} from "./types";
import { footerNoteOf, josa } from "./format";

/** 명월재에 이미 있는 주소. 브랜드 slug 로 쓰면 안 된다 (middleware rewrite 충돌) */
export const RESERVED_SLUGS = [
  "saju", "love", "reunion", "job", "year", "money", "daeun", "deep", "newyear",
  "start", "free", "pay", "reading", "payment", "result", "charge", "my", "login",
  "gunghap", "room", "gift", "today", "charm", "family", "friends", "share",
  "support", "inquiry", "dream", "ilju", "ilgan", "jiji", "sinsal", "sipseong",
  "samjae", "guide", "manseryeok", "unse", "apply", "pg-review", "theme-test",
  "preview", "about", "terms", "privacy", "refund", "marketing", "analyzing",
  "invite", "deepmyeongwol", "api", "r", "brand", "admin-preview",
];

export const FONT_LABEL: Record<FontKey, string> = {
  pretendard: "Pretendard",
  maruburi: "마루부리",
  joseon: "조선궁서",
  gmarket: "G마켓 산스",
};

/** 브랜드 페이지에 심을 수 있는 픽셀. 페이지 쪽은 값이 있는 것만 스크립트를 넣는다 */
export const PIXELS: { key: PixelKey; label: string; placeholder: string; hint: string }[] = [
  { key: "meta", label: "Meta 픽셀", placeholder: "1234567890123456", hint: "인스타·페이스북·스레드 광고" },
  { key: "ga4", label: "GA4 측정 ID", placeholder: "G-XXXXXXXXXX", hint: "구글 애널리틱스" },
  { key: "googleAds", label: "Google Ads 전환", placeholder: "AW-123456789/라벨", hint: "유튜브·구글 광고" },
  { key: "tiktok", label: "TikTok 픽셀", placeholder: "C1A2B3C4D5E6F7G8H9", hint: "틱톡 광고" },
  { key: "kakao", label: "카카오 픽셀", placeholder: "1234567890123456789", hint: "카카오모먼트" },
  { key: "naver", label: "네이버 전환 추적", placeholder: "s_1a2b3c4d5e6f", hint: "네이버 검색·성과형 광고" },
  { key: "daangn", label: "당근 픽셀", placeholder: "당근 비즈니스 픽셀 ID", hint: "당근 광고" },
  { key: "x", label: "X 픽셀", placeholder: "o1a2b", hint: "X(트위터) 광고" },
];

export const emptyTracking = (): Record<PixelKey, string> => ({ meta: "", ga4: "", googleAds: "", tiktok: "", kakao: "", naver: "", daangn: "", x: "" });

export const CHANNEL_LABEL: Record<Channel, string> = {
  threads: "스레드",
  instagram: "인스타그램",
  tiktok: "틱톡",
  youtube: "유튜브",
};

export const CHANNEL_ICON: Record<Channel, string> = {
  threads: "🧵",
  instagram: "📸",
  tiktok: "🎵",
  youtube: "🔴",
};

export const CONCEPTS = [
  "2027 신년운세",
  "연애운 팩폭",
  "재물운 타이밍",
  "이직·취업운",
  "재회 가능성",
  "오늘의 일진",
];

type Seed = [
  id: string, slug: string, name: string, status: Brand["status"], primary: string, accent: string,
  font: FontKey, concept: string, visitors: number, free: number, buyers: number, adSpend: number,
];

const SEEDS: Seed[] = [
  ["b01", "dalbit", "달빛운세", "live", "#2c1a4d", "#f2c94c", "maruburi", "따뜻한 정통", 4820, 612, 41, 180000],
  ["b02", "destiny-call", "운명소환소", "live", "#111827", "#ef4444", "gmarket", "MZ 팩폭", 6310, 905, 58, 240000],
  ["b03", "saju-secret", "사주시크릿", "live", "#0f3d3e", "#e0b973", "pretendard", "고급 정통", 2140, 233, 9, 150000],
  ["b04", "love-lab", "연애사주연구소", "live", "#7a1f4b", "#ffb4c8", "pretendard", "연애 특화", 5530, 840, 47, 210000],
  ["b05", "cheongwol", "청월당", "live", "#14325c", "#c0944d", "joseon", "고급 정통", 1780, 190, 12, 130000],
  ["b06", "fact-saju", "팩폭사주", "paused", "#1f1f1f", "#facc15", "gmarket", "MZ 팩폭", 3900, 402, 6, 190000],
  ["b07", "today-myeongri", "오늘의명리", "live", "#3d2c1e", "#d9a066", "maruburi", "따뜻한 정통", 2600, 298, 19, 250000],
  ["b08", "geumbit", "금빛운세", "live", "#5b3a00", "#ffd166", "pretendard", "재물 특화", 3320, 371, 25, 120000],
  ["b09", "soul-saju", "소울사주", "paused", "#24304d", "#8ab4f8", "pretendard", "힐링", 1450, 120, 2, 80000],
  ["b10", "hongyeon", "홍연사주", "live", "#6d1a1a", "#f4a261", "joseon", "연애 특화", 2980, 355, 22, 240000],
  ["b11", "dawn-saju", "새벽사주", "draft", "#1b263b", "#e0e1dd", "pretendard", "힐링", 0, 0, 0, 0],
  ["b12", "myosi", "묘시운", "live", "#2d4a22", "#c5e384", "maruburi", "직설 조언", 1210, 140, 8, 100000],
];

const PRICE = 9900;

export const BRANDS: Brand[] = SEEDS.map(
  ([id, slug, name, status, primary, accent, font, concept, visitors, free, buyers, adSpend], i) => ({
    id,
    slug,
    name,
    status,
    createdAt: `2026-10-${String(1 + i).padStart(2, "0")}`,
    heroTitle: `${josa(name, "이", "가")} 읽어 주는 내 사주`,
    heroDesc: "생년월일시만 넣으면 1분 만에 무료 풀이를 보여 드려요.",
    theme: { primary, accent, background: "#fcfbf9", font, bgAsset: i % 3 === 0 ? "/assets/bg/oriental_0" + ((i % 4) + 1) + ".webp" : null },
    tone: {
      concept,
      instruction:
        concept === "MZ 팩폭"
          ? "직설적이고 거침없는 말투. 돌려 말하지 말고 현실 조언 위주."
          : concept === "연애 특화"
            ? "다정한 언니 말투. 연애·관계 흐름을 먼저 짚는다."
            : "품격 있는 경어체. 타고난 장점과 앞으로의 흐름을 차분히 설명.",
      focus: concept === "재물 특화" ? "재물운·투자 타이밍" : concept === "연애 특화" ? "연애운·궁합" : "올해 흐름·성향",
    },
    orderNamePrefix: name,
    footerNote: footerNoteOf(name),
    tracking: { ...emptyTracking(), ...(status === "draft" ? {} : { meta: `81${i}20394857`, ga4: `G-${slug.slice(0, 4).toUpperCase()}${i}X` }), ...(i % 3 === 0 ? { daangn: `dg_${slug}` } : {}) },
    sns: [
      { channel: "threads", handle: status === "draft" ? null : `@${slug.replace("-", "_")}`, connected: status !== "draft", tokenExpiresAt: status === "draft" ? null : i === 2 ? "2026-10-22" : "2026-12-10" },
      { channel: "instagram", handle: i % 2 === 0 && status !== "draft" ? `@${slug.replace("-", "_")}` : null, connected: i % 2 === 0 && status !== "draft", tokenExpiresAt: null },
      { channel: "tiktok", handle: null, connected: false, tokenExpiresAt: null },
      { channel: "youtube", handle: null, connected: false, tokenExpiresAt: null },
    ],
    stats: { visitors, freeUsers: free, buyers, revenue: buyers * PRICE + Math.round(free * 0.3) * 990, adSpend },
  }),
);

export const PREV_PERIOD_REVENUE = 1_980_000;

/* ---------- 브랜드 자동 생성 더미 ---------- */

const DRAFT_POOL: Omit<BrandDraft, "profileImageUrl">[] = [
  {
    name: "별빛사주", slug: "byeolbit",
    theme: { primary: "#1e1b4b", accent: "#fbbf24", background: "#faf8f3", font: "maruburi", bgAsset: "/assets/bg/night_02.webp" },
    tone: { concept: "몽환 힐링", instruction: "잔잔하고 위로하는 말투. 단정 대신 가능성으로 말한다.", focus: "올해 흐름·마음 정리" },
    heroTitle: "밤하늘처럼 내 사주를 펼쳐 볼까요", heroDesc: "생년월일시만 넣으면 무료 풀이를 바로 보여 드려요.",
    bio: "🌙 별빛사주 | 밤마다 읽는 내 사주 이야기\n무료 사주 풀이 👇", adCopies: ["요즘 마음이 복잡하다면, 사주부터 펼쳐 보세요", "올해 남은 석 달, 내 운은 어디쯤일까?"],
  },
  {
    name: "뼈사주", slug: "bone-saju",
    theme: { primary: "#0a0a0a", accent: "#22d3ee", background: "#f5f5f5", font: "gmarket", bgAsset: null },
    tone: { concept: "MZ 팩폭", instruction: "짧고 세게. 반말과 존댓말을 섞고 현실 조언으로 끝낸다.", focus: "연애·돈 실수 패턴" },
    heroTitle: "뼈 때리는 진짜 사주, 각오됐어?", heroDesc: "돌려 말 안 해요. 무료로 먼저 맞아 보세요.",
    bio: "🦴 뼈사주 | 듣기 싫은 말만 골라서 해 드림\n무료 풀이 👇", adCopies: ["연애할 때마다 같은 실수 하는 사주 특징", "통장 스치기만 하는 사람 사주에 있는 것"],
  },
  {
    name: "도화서재", slug: "dohwa",
    theme: { primary: "#831843", accent: "#fda4af", background: "#fff7f8", font: "pretendard", bgAsset: "/assets/bg/flower_01.webp" },
    tone: { concept: "연애 특화", instruction: "다정한 언니 말투. 관계의 타이밍을 구체적인 달로 짚는다.", focus: "연애운·도화살" },
    heroTitle: "내 사주에 도화가 피는 달", heroDesc: "연애 흐름을 달마다 짚어 드려요. 무료 풀이부터.",
    bio: "🌸 도화서재 | 연애운만 파는 사주 서재\n무료 연애 풀이 👇", adCopies: ["올해 연애운 터지는 달, 사주에 이미 적혀 있어요", "도화살 있는 사람 특징 3가지"],
  },
];

let draftCursor = 0;
/** 미리 넣어 둔 이미지 (실제 파일은 Supabase Storage 에 올라갈 예정) */
export const ASSET_IMAGES: AssetImage[] = [
  ["oriental_01", ["동양풍"]], ["oriental_02", ["동양풍"]], ["oriental_03", ["동양풍", "고급"]], ["oriental_04", ["동양풍"]],
  ["night_02", ["밤하늘", "몽환"]], ["flower_01", ["꽃", "연애"]], ["modern_01", ["모던"]],
].map(([name, tags], i) => ({ id: `img_${name}`, name: `${name}.webp`, src: `/assets/bg/${name}.webp`, tags: tags as string[], addedAt: `2026-10-${String(1 + i).padStart(2, "0")}` }));

/**
 * [브랜드 자동 생성] 더미. 키워드·이미지 둘 다 없으면 완전 랜덤,
 * 이미지를 고르면 그 이미지를 배경으로 쓰고, 안 고르면 라이브러리에서 하나 자동으로 고른다. "none" 이면 이미지 없이 만든다.
 * TODO(API): POST /api/brands/draft { keyword, imageId } → Claude 가 이미지 분위기·키워드에 맞춰 BrandDraft 생성
 */
export function nextDraft(keyword: string, image: AssetImage | null | "none", library: AssetImage[]): BrandDraft {
  const base = DRAFT_POOL[draftCursor++ % DRAFT_POOL.length];
  const picked = image === "none" ? null : (image ?? (library.length ? library[draftCursor % library.length] : null));
  return {
    ...base,
    theme: { ...base.theme, bgAsset: picked?.src ?? null },
    heroDesc: keyword ? `${keyword} — ${base.heroDesc}` : base.heroDesc,
    profileImageUrl: null,
  };
}

/* ---------- 콘텐츠 ---------- */

export function makeContent(id: string, brandId: string, concept: string, mode: "text" | "video", channels: Channel[], upload: "auto" | "manual" = "auto"): ContentItem {
  const brand = BRANDS.find((b) => b.id === brandId) ?? BRANDS[0];
  const link = `myeongwoljae.com/r/${id.slice(-6)}`;
  const parts: Record<Channel, ContentItem["channels"][number]["parts"]> = {
    threads: [
      { key: "threads.thread", label: "텍스트 타래", lines: [`1/3 ${concept}, 사주에 이미 적혀 있는 사람 특징 🧵`, "2/3 일간이 약한데 재성이 많으면 돈이 들어와도 오래 못 머물러요.", "3/3 그래서 이런 사주는 '모으는 달'을 먼저 알아야 해요."] },
      { key: "threads.cardText", label: "카드뉴스 문구", lines: [`${concept}`, "내 사주에 이게 있다면?"] },
      { key: "threads.cta", label: "CTA", lines: [`내 사주로 무료 풀이 보기 👉 ${link}`] },
    ],
    instagram: [
      { key: "instagram.cardNews", label: "카드뉴스 (장별)", lines: [`1장: ${concept}`, "2장: 이런 사주는 올해 이렇게 흘러가요", "3장: 지금 확인해야 할 한 가지", `4장: 무료 풀이는 프로필 링크에서`] },
      { key: "instagram.reelsScript", label: "릴스 대본", lines: ["0–3초: 이 사주 가진 사람, 올해 조심하세요", "3–12초: 재성이 강한데 일간이 약하면…", "12–15초: 내 사주는 프로필 링크에서"] },
      { key: "instagram.caption", label: "피드 캡션", lines: [`${concept} 🌙 내 사주에도 있을까? 무료 풀이는 프로필 링크에서.`, "#사주 #운세 #2027운세 #" + brand.name] },
    ],
    tiktok: [
      { key: "tiktok.script", label: "숏폼 대본", lines: ["훅: 이거 있으면 올해 돈 들어와요", "본문: 사주에 식신생재가 있는 사람은…", "CTA: 프로필 링크에서 무료로 확인"] },
      { key: "tiktok.caption", label: "캡션·태그", lines: [`${concept} #사주 #운세 #fyp`] },
    ],
    youtube: [
      { key: "youtube.script", label: "쇼츠 대본", lines: ["0초: 이 사주 가진 사람 특징", "5초: 일주가 강한 사람은…", "25초: 설명란 링크에서 무료 풀이"] },
      { key: "youtube.thumbnail", label: "썸네일 문구", lines: ["이 사주면 무조건 봐", concept] },
      { key: "youtube.titleDesc", label: "제목·설명", lines: [`${concept}｜이 사주 가진 사람 특징`, `내 사주 무료 풀이 👉 ${link}`] },
    ],
  };
  return {
    id,
    brandId: brand.id,
    concept,
    createdAt: "2026-10-19 16:40",
    mode,
    upload,
    shortLink: link,
    channels: channels.map((channel) => ({ channel, parts: parts[channel], status: "ready", postedAt: null })),
    assets: [
      { kind: "txt", label: "대본·문구.txt", url: "#" },
      { kind: "png", label: "카드뉴스·썸네일.png", url: "#" },
      { kind: "mp3", label: "성우 음성.mp3", url: mode === "video" ? "#" : null },
      { kind: "mp4", label: "완성 영상.mp4", url: mode === "video" ? "#" : null },
      { kind: "zip", label: "전체 묶음.zip", url: "#" },
    ],
  };
}

export const CONTENT_HISTORY: ContentItem[] = [
  { ...makeContent("cnt_20261019_a1b2c3", "b02", "연애운 팩폭", "text", ["threads"]), createdAt: "2026-10-19 09:10" },
  { ...makeContent("cnt_20261018_d4e5f6", "b01", "2027 신년운세", "text", ["threads", "instagram"]), createdAt: "2026-10-18 18:00" },
];
CONTENT_HISTORY[0].channels[0].status = "posted";
CONTENT_HISTORY[0].channels[0].postedAt = "2026-10-19 09:12";
CONTENT_HISTORY[1].channels[0].status = "posted";
CONTENT_HISTORY[1].channels[0].postedAt = "2026-10-18 18:01";

/* ---------- 광고 ---------- */

export const CAMPAIGNS: AdCampaign[] = BRANDS.filter((b) => b.status !== "draft").flatMap((b, i) => {
  const rows: AdCampaign[] = [
    { id: `cmp_${b.id}_meta`, brandId: b.id, channel: "meta", name: `${b.name} · 무료풀이 전환`, status: b.status === "paused" ? "paused" : "active", dailyBudget: 10000 + (i % 3) * 5000, spend: Math.round(b.stats.adSpend * 0.7), clicks: Math.round(b.stats.visitors * 0.6), conversions: Math.round(b.stats.buyers * 0.7), revenue: Math.round(b.stats.revenue * 0.7) },
  ];
  if (i % 3 === 0) rows.push({ id: `cmp_${b.id}_tt`, brandId: b.id, channel: "tiktok", name: `${b.name} · 숏폼`, status: "active", dailyBudget: 8000, spend: Math.round(b.stats.adSpend * 0.3), clicks: Math.round(b.stats.visitors * 0.3), conversions: Math.round(b.stats.buyers * 0.3), revenue: Math.round(b.stats.revenue * 0.3) });
  return rows;
});

export const KILL_RULE: KillRule = {
  enabled: true,
  minRoas: 150,
  windowDays: 3,
  minSpend: 30000,
  boostEnabled: false,
  boostRoas: 300,
  boostPercent: 20,
};

/* ---------- 주문 ---------- */

const NAMES = ["김하늘", "이서연", "박지후", "최민준", "정유나", "강도윤", "조수아", "윤지호", "장예린", "임시우", "한소율", "오태윤", "서하린", "신지안", "권도현", "황채원", "안준서", "송다인", "류건우", "전나연", "홍서준", "고은채", "문하준"];
const PRODUCTS: [string, number][] = [["심층사주 해설서", 9900], ["연애운", 990], ["재물운", 990], ["신년운세", 2900]];

export const ORDERS: Order[] = NAMES.map((name, i) => {
  const brand = BRANDS[i % 10];
  const [product, amount] = PRODUCTS[i % PRODUCTS.length];
  const day = 19 - Math.floor(i / 4);
  const code = (i * 7919).toString(36).padStart(6, "x").slice(-6);
  return {
    id: `ord_202610${String(day).padStart(2, "0")}_${code}${i}a`,
    brandId: brand.id,
    product,
    name,
    phone: `010-${String(2000 + i * 137).slice(0, 4)}-${String(5000 + i * 311).slice(0, 4)}`,
    email: i % 4 === 0 ? `user${i}@example.com` : null,
    birthDate: `19${88 + (i % 12)}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 27) + 1).padStart(2, "0")}`,
    birthTime: i % 5 === 0 ? null : `${String((i * 3) % 24).padStart(2, "0")}:30`,
    calendar: i % 6 === 0 ? "lunar" : "solar",
    amount,
    paymentStatus: i === 7 ? "refunded" : i === 12 ? "failed" : "paid",
    delivery: i === 3 || i === 15 ? "failed" : i === 1 ? "waiting" : "sent",
    shortLink: `myeongwoljae.com/r/${code}`,
    createdAt: `2026-10-${String(day).padStart(2, "0")} ${String(9 + (i % 12)).padStart(2, "0")}:${String((i * 13) % 60).padStart(2, "0")}`,
  };
});

/* ---------- 설정 ---------- */

export const ALERT_SETTINGS: AlertSettings = {
  phones: ["010-0000-0000"],
  triggers: { pg_error: true, llm_fail: true, token_expiring: true, sms_balance: true, roas_drop: true, daily_report: false },
};

export const API_KEYS: ApiKeyStatus[] = [
  { name: "Claude API", purpose: "브랜드 생성·콘텐츠 문구", connected: true, note: "회사 계정 키 (명월재와 같은 조직)" },
  { name: "Threads API", purpose: "스레드 자동 포스팅", connected: false, note: "Meta 앱 심사 후 브랜드별 토큰 등록" },
  { name: "Meta Marketing API", purpose: "광고 캠페인·예산 제어", connected: false, note: "비즈니스 인증 필요" },
  { name: "TikTok API", purpose: "업로드·광고", connected: false, note: "심사 전에는 비공개 업로드만" },
  { name: "YouTube Data API", purpose: "쇼츠 업로드", connected: false, note: "심사 전에는 비공개 업로드만" },
  { name: "알리고 (알림톡)", purpose: "결과 발송·장애 알림", connected: true, note: "명월재 가비아 중계 재사용" },
  { name: "TTS / 영상 렌더링", purpose: "숏폼 영상 생성", connected: false, note: "영상 모드 쓸 때 연결" },
];
