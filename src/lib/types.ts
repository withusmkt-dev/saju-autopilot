// 관리자 화면이 쓰는 데이터 모양. 백엔드(API·Supabase)를 붙일 때 이 타입에 맞춰 응답을 돌려준다.

export type BrandStatus = "live" | "paused" | "draft";
export type FontKey = "pretendard" | "maruburi" | "joseon" | "gmarket";
export type Channel = "threads" | "instagram" | "tiktok" | "youtube";
export type AdChannel = "meta" | "tiktok" | "youtube";
export type PixelKey = "meta" | "ga4" | "googleAds" | "tiktok" | "kakao" | "naver" | "daangn" | "x";

/* ---------- 브랜드 (site_config) ---------- */

export interface BrandTheme {
  primary: string; // 메인 컬러 hex
  accent: string; // 포인트 컬러 hex
  background: string; // 바탕색 hex
  font: FontKey;
  bgAsset: string | null; // 에셋 폴더 이미지 경로, 없으면 그라데이션
}

export interface BrandTone {
  concept: string; // 예: "MZ 팩폭"
  instruction: string; // 해설서·콘텐츠 프롬프트에 끼워 넣는 말투 지침
  focus: string; // 강조할 영역
}

export interface SnsConnection {
  channel: Channel;
  handle: string | null; // 계정 이름 (@...)
  connected: boolean; // 토큰 등록 여부
  tokenExpiresAt: string | null;
}

export interface SiteConfig {
  id: string;
  slug: string; // myeongwoljae.com/{slug}
  name: string;
  heroTitle: string;
  heroDesc: string;
  theme: BrandTheme;
  tone: BrandTone;
  orderNamePrefix: string; // 토스 orderName 앞부분, 예: "달빛운세"
  footerNote: string; // "달빛운세는 명월재가 운영하는 사주 서비스입니다"
  tracking: Record<PixelKey, string>; // 빈 값 = 안 심음
  sns: SnsConnection[];
}

export interface BrandStats {
  visitors: number;
  freeUsers: number; // 무료 풀이 본 사람
  buyers: number; // 유료 결제자
  revenue: number; // 원
  adSpend: number; // 원
}

export interface Brand extends SiteConfig {
  status: BrandStatus;
  createdAt: string;
  stats: BrandStats;
}

/** [브랜드 자동 생성] 결과 — Claude 가 JSON 으로 돌려줄 모양 */
export interface BrandDraft {
  name: string;
  slug: string;
  theme: BrandTheme;
  tone: BrandTone;
  heroTitle: string;
  heroDesc: string;
  bio: string; // SNS 프로필 소개글
  adCopies: string[]; // 1차 광고 카피
  profileImageUrl: string | null;
}

/* ---------- 대시보드 ---------- */

export type Period = "today" | "7d" | "30d" | "all";

export interface GlobalKpi {
  liveBrands: number;
  visitors: number;
  freeUsers: number;
  buyers: number;
  revenue: number;
  revenueDelta: number; // 직전 기간 대비 %
}

/* ---------- AI 콘텐츠 팩토리 ---------- */

export type GenerateMode = "text" | "video";
export type UploadMode = "auto" | "manual";

export type PartKey =
  | "threads.thread"
  | "threads.cardText"
  | "threads.cta"
  | "instagram.cardNews"
  | "instagram.reelsScript"
  | "instagram.caption"
  | "tiktok.script"
  | "tiktok.caption"
  | "youtube.script"
  | "youtube.thumbnail"
  | "youtube.titleDesc";

export interface ContentPart {
  key: PartKey;
  label: string;
  lines: string[]; // 타래 1/N, 카드 장별 문구, 대본 프레임별 문구 등
}

export interface ContentAsset {
  kind: "txt" | "mp3" | "png" | "mp4" | "zip";
  label: string;
  url: string | null; // null = 이 생성 모드에서는 안 만들어짐
}

export type PostStatus = "ready" | "posted" | "failed";

export interface ContentItem {
  id: string;
  brandId: string;
  concept: string;
  createdAt: string;
  mode: GenerateMode;
  upload: UploadMode; // auto = API 로 바로 게시, manual = 내려받아 직접 올림
  channels: { channel: Channel; parts: ContentPart[]; status: PostStatus; postedAt: string | null }[];
  assets: ContentAsset[];
  shortLink: string; // CTA 숏링크
}

export interface GenerateRequest {
  brandIds: string[];
  concept: string;
  count: number;
  mode: GenerateMode;
  upload: UploadMode;
  parts: PartKey[];
}

/* ---------- 광고 ---------- */

export interface AdCampaign {
  id: string;
  brandId: string;
  channel: AdChannel;
  name: string;
  status: "active" | "paused" | "killed";
  dailyBudget: number;
  spend: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface KillRule {
  enabled: boolean;
  minRoas: number; // % 미만이면 자동 OFF
  windowDays: number; // 판단 기간
  minSpend: number; // 이 금액 이상 쓴 뒤에만 판단
  boostEnabled: boolean;
  boostRoas: number; // % 이상이면 예산 증액
  boostPercent: number;
}

/* ---------- 고객 관리 ---------- */

export type PaymentStatus = "paid" | "refunded" | "pending" | "failed";
export type DeliveryStatus = "sent" | "failed" | "waiting";

export interface Order {
  id: string; // ord_YYYYMMDD_xxxxxxxx (명월재 orders 와 같은 형식)
  brandId: string;
  product: string;
  name: string;
  phone: string;
  email: string | null;
  birthDate: string;
  birthTime: string | null;
  calendar: "solar" | "lunar";
  amount: number;
  paymentStatus: PaymentStatus;
  delivery: DeliveryStatus;
  shortLink: string;
  createdAt: string;
}

export interface ShortLink {
  code: string; // myeongwoljae.com/r/{code}
  target: string;
  clicks: number;
  expiresAt: string;
}

/* ---------- 설정 ---------- */

export type AlertTrigger =
  | "pg_error"
  | "llm_fail"
  | "token_expiring"
  | "sms_balance"
  | "roas_drop"
  | "daily_report";

export interface AlertSettings {
  phones: string[];
  triggers: Record<AlertTrigger, boolean>;
}

export interface ApiKeyStatus {
  name: string;
  purpose: string;
  connected: boolean;
  note: string;
}
