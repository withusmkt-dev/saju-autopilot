// 브랜드 랜딩 자동 생성 프롬프트.
// 관리자 [브랜드 자동 생성] → POST /api/brands/draft → Claude 가 이 프롬프트로 LandingDraft(JSON) 를 돌려준다.
// 스킨·맛보기 목록은 코드에서 읽어 넣으므로 스킨을 추가하면 프롬프트도 따라 바뀐다. 호출부는 src/lib/server/generate.ts
import { SKINS, type SkinKey } from "@/lib/preview/skins";
import { getBrandPage, SAMPLE_SAJU, type BrandPage, type FeatureKey } from "@/lib/preview/brandPages";
import type { AssetImage, BrandDraft, FontKey } from "@/lib/types";

/** Claude 가 돌려줄 모양. 후기는 만들지 않는다(실제 후기만 씀), 가격은 관리자 값을 쓴다 */
export type LandingDraft = Omit<BrandDraft, "profileImageUrl"> & Omit<BrandPage, "reviews" | "product"> & { product: { name: string; desc: string } };

/** 스킨 고르는 기준 (Claude 에게 보여 줄 설명) */
export const SKIN_GUIDE: Record<SkinKey, string> = {
  night: "어두운 남보라 바탕에 달. 차분하고 따뜻한 종합 사주",
  poster: "검정 테두리, 굵은 표제, 띠 문구. 직설적인 팩폭, 2030 대상",
  soft: "분홍 파스텔, 둥근 카드, 옆으로 넘기는 카드. 연애운",
  finance: "그래프·영수증 모양. 재물운, 돈 들어오는 시기",
  hanji: "한지 질감, 세로쓰기, 먹선 표. 고급 정통 명리",
  calendar: "열두 달 달력. 신년운세, 한 해 흐름",
  office: "진단서·체크리스트, 고정폭 글씨. 직장·이직·취업운",
  daily: "신문 지면, 오늘의 일진. 매일 들르는 운세",
  duo: "두 원이 겹치는 그림, 두 사람 입력. 궁합",
  letter: "편지지, 한 사람에게 쓰는 말투. 재회·이별·위로",
  sticker: "스티커처럼 두꺼운 테두리, 둥근 글씨. 귀여운 행운·부적",
  royal: "남색에 금선, 궁궐 선화. 비싼 평생 사주",
  sky: "하늘 사진, 반투명 카드. 힐링·위로·마음 운세",
  invite: "청첩장, 아치 사진, 가운데 정렬. 결혼운, 두 사람 입력",
};

/** 맛보기 섹션 (Features.tsx). couple 표시가 있는 건 formType 이 couple 일 때만 */
export const FEATURE_GUIDE: Record<FeatureKey, string> = {
  pillars: "사주 여덟 글자를 읽는 법 (종합)",
  factShuffle: "누를 때마다 바뀌는 팩폭 한 줄",
  loveTypes: "일간으로 보는 연애 유형",
  wealthBowls: "재물 그릇 모양 고르기",
  glossary: "명리 용어 풀이 (정통)",
  zodiac2027: "2027년 띠별 한 줄 운세",
  jobMatch: "직장 고민 체크리스트",
  weekIljin: "이번 주 일진 달력",
  zodiacMatch: "띠 궁합 바로 계산 (couple)",
  reunionCheck: "재회 마음 체크리스트",
  luckyPouch: "복주머니 하나 고르기, 행운 색·숫자",
  daeunTimeline: "평생 대운 그래프",
  moodWeather: "오늘 마음 날씨 고르고 위로 한마디",
  weddingYear: "결혼하기 좋은 해와 달 (couple)",
};

const FONT_GUIDE: Record<FontKey, string> = {
  pretendard: "깔끔한 고딕. 리포트·서류·모던",
  maruburi: "부드러운 명조. 따뜻함·힐링",
  joseon: "격식 있는 명조. 정통·고급·청첩장",
  gmarket: "아주 굵은 고딕. 첫 화면 큰 제목에만 쓰임, 팩폭·포스터",
  jua: "둥근 글씨. 귀여움·스티커",
};

/** 시스템 프롬프트. 브랜드마다 바뀌지 않으므로 캐시해서 쓴다 (cache_control) */
export function landingSystemPrompt(): string {
  const skins = (Object.keys(SKIN_GUIDE) as SkinKey[]).map((k) => `- ${k} (${SKINS[k].label}): ${SKIN_GUIDE[k]}`).join("\n");
  const features = (Object.keys(FEATURE_GUIDE) as FeatureKey[]).map((k) => `- ${k}: ${FEATURE_GUIDE[k]}`).join("\n");
  const fonts = (Object.keys(FONT_GUIDE) as FontKey[]).map((k) => `- ${k}: ${FONT_GUIDE[k]}`).join("\n");

  // 형식 참고용 예시 하나 (후기·가격은 빼고)
  const ex = getBrandPage("hongyeon")!;
  const { reviews: _r, product, ...exPage } = ex.page;
  void _r;
  const example = JSON.stringify({ name: ex.brand.name, slug: ex.brand.slug, ...exPage, product: { name: product.name, desc: product.desc } }, null, 2);

  return `당신은 사주 서비스 '명월재'가 운영하는 여러 브랜드의 랜딩 페이지를 기획하는 한국어 카피라이터이자 브랜드 디자이너입니다.
키워드와 이미지 하나를 받아, 같은 마스터 템플릿 위에 올라갈 새 브랜드 하나를 만듭니다. 결과는 반드시 save_landing_draft 도구로만 돌려줍니다.

## 이 페이지가 하는 일
광고나 SNS로 들어온 사람이 첫 화면을 보고, 맛보기 섹션을 한 번 눌러 보고, 생년월일시를 넣어 무료 풀이를 받은 뒤, 마음에 들면 유료 해설서를 사는 흐름입니다.
결제·문자·약관 표기는 명월재 이름으로 나가므로 브랜드는 '명월재가 운영하는 사주 서비스' 중 하나입니다.

## 고를 수 있는 스킨
${skins}

## 고를 수 있는 맛보기 섹션
${features}

## 글꼴
${fonts}

## 브랜드 정하기
- 이름: 한글 2~6자. 부르기 쉽고 컨셉이 들리는 이름. 실존하는 운세 앱·브랜드(점신, 포스텔러, 헬로우봇, 천명 등)나 유명 상표와 비슷하게 짓지 않습니다.
- slug: 이름을 소문자 로마자로 옮긴 것, 하이픈 허용, 20자 이내. 사용 중인 slug 와 겹치면 안 됩니다.
- 색: primary 는 흰 글씨를 올려도 읽히는 진한 색(명도 대비 4.5:1 이상), accent 는 primary 위에서 눈에 띄는 색. background 는 거의 흰색.
- 스킨·글꼴·맛보기는 컨셉에 맞춰 고르고, 같은 컨셉의 기존 브랜드와 겹치지 않게 다른 조합을 우선합니다.
- formType: 두 사람 정보가 필요한 주제(궁합·결혼·재회 상대 등)만 couple. couple 표시가 있는 맛보기는 couple 일 때만 고릅니다.

## 이미지
- 받은 이미지가 있으면 그 분위기에서 컨셉을 출발시키고, 어울리는 자리(images.hero / pageBg / band / card / product / loading)에 넣습니다.
- 사람 사진은 hero 나 band 에만, 종이 질감(paper-*)은 pageBg 나 card 에만 씁니다.
- 어두운 이미지는 어두운 스킨(night·royal)에서만 hero 로 씁니다. 글씨가 사진의 복잡한 부분과 겹치는 배치는 피합니다.
- 어울리는 게 없으면 images 를 비워 둡니다. 억지로 넣지 않습니다.
- band 를 넣으면 bandCaption 에 사진 아래 붙일 한 줄(20자 안팎)을 씁니다.

## 문구
- 한국어로, 사람이 쓴 것처럼 씁니다. 이모지와 줄표(—)는 쓰지 않습니다.
- '특별한', '완벽한', '여정', '당신만을 위한', '~의 모든 것' 같은 뻔한 말을 피합니다. 세 섹션 제목이 같은 문형으로 반복되지 않게 합니다.
- heroTitle: 두 줄, \\n 으로 나눔. 한 줄에 12자 안팎, 단어 중간에서 끊지 않습니다.
- heroDesc: 60자 안팎 한 문장. 무엇을 알려 주는지 구체적으로.
- badge: 12자 이내. cta: 12자 이내, '무료'가 들어가면 좋습니다.
- tone.instruction 은 이 브랜드의 해설서·SNS 글을 쓸 때 그대로 끼워 넣을 말투 지침입니다. 존댓말 수준, 문장 길이, 자주 쓰는 표현과 피할 표현까지 2~3문장으로.
- points 는 정확히 3개, 무료 풀이 세 단락(free)의 제목과 같은 순서·같은 이름으로 맞춥니다.
- free 는 아래 샘플 사주를 이 브랜드 말투로 풀어 쓴 예시 3단락(단락당 2~3문장)입니다. 미리보기 화면에 '예시'로만 쓰입니다.
- about 은 이 브랜드를 왜 만들었는지 3~4문장. 과장된 경력·수상·인원수를 지어내지 않습니다.
- product 는 유료 해설서 이름과 한 줄 설명만 씁니다. 가격은 관리자가 정합니다. 해설서는 열 장입니다.
- bio 는 SNS 프로필 소개 150자 이내, adCopies 는 첫 광고에 쓸 카피 3개(각 40자 이내, 서로 다른 각도).

## 하지 않는 것
- 후기·별점·이용자 수를 만들지 않습니다. 후기는 실제 이용자 글만 따로 붙입니다.
- 건강·투자·법률을 단정하지 않고, 죽음·사고·질병으로 겁주지 않습니다. '반드시', '100%', '무조건' 같은 보장 표현을 쓰지 않습니다.
- 실존 인물(연예인 등)의 이름이나 사주를 쓰지 않습니다.

## 샘플 사주 (free 예시용)
일간 ${SAMPLE_SAJU.dayMaster}, 사주 ${SAMPLE_SAJU.pillars.map((p) => `${p.label} ${p.stem}${p.branch}`).join(" · ")}, 오행 ${Object.entries(SAMPLE_SAJU.elements).map(([k, v]) => `${k}${v}`).join(" ")}. 2027년은 하반기(9~10월)로 갈수록 흐름이 좋아짐.

## 형식 예시 (문구는 베끼지 말고 형식만 참고)
${example}`;
}

export interface LandingInput {
  keyword: string; // 비어 있으면 자유롭게
  image: AssetImage | null; // 관리자가 고른 이미지. null = 라이브러리에서 알아서
  noImage: boolean; // true = 이미지 없는 페이지
  library: AssetImage[]; // 고를 수 있는 이미지 전체
  takenSlugs: string[]; // 예약어 + 이미 쓰는 slug
  existing: { name: string; concept: string; skin: SkinKey }[]; // 겹치지 않게 참고
}

/** 사용자 메시지 (브랜드마다 바뀌는 부분) */
export function landingUserPrompt(i: LandingInput): string {
  const lib = i.library.map((a) => `${a.name.replace(/\.webp$/, "")} [${a.tags.join(", ")}]`).join("\n");
  const img = i.noImage
    ? "이미지 없이 만듭니다. images 는 비워 두세요."
    : i.image
      ? `관리자가 고른 이미지: ${i.image.name.replace(/\.webp$/, "")} [${i.image.tags.join(", ")}]. 이 이미지에서 컨셉을 출발시키세요. 다른 자리에는 아래 라이브러리에서 더 골라도 됩니다.`
      : "이미지는 아래 라이브러리에서 어울리는 것을 골라 주세요. 없으면 비워 둬도 됩니다.";
  return `키워드: ${i.keyword || "(없음. 기존 브랜드와 겹치지 않는 컨셉으로 자유롭게)"}
${img}

이미지 라이브러리 (이름 [태그]):
${lib}

이미 있는 브랜드 (컨셉이 겹치지 않게):
${i.existing.map((b) => `- ${b.name}: ${b.concept} / ${b.skin}`).join("\n")}

쓸 수 없는 slug: ${i.takenSlugs.join(", ")}`;
}

/* ---------- 도구 스키마 (Claude 가 이 모양으로만 답하게) ---------- */

const str = (description: string) => ({ type: "string", description });
const titled = { type: "object", properties: { title: { type: "string" }, desc: { type: "string" } }, required: ["title", "desc"] };

export const LANDING_TOOL = {
  name: "save_landing_draft",
  description: "새 브랜드 랜딩 초안을 저장한다",
  input_schema: {
    type: "object",
    properties: {
      name: str("브랜드 이름, 한글 2~6자"),
      slug: str("소문자 로마자와 하이픈, 20자 이내"),
      theme: {
        type: "object",
        properties: {
          primary: str("#hex"),
          accent: str("#hex"),
          background: str("#hex, 거의 흰색"),
          font: { type: "string", enum: Object.keys(FONT_GUIDE) },
          bgAsset: { type: ["string", "null"], description: "관리자 카드용 대표 이미지 경로 /assets/bg/{이름}.webp 또는 null" },
        },
        required: ["primary", "accent", "background", "font", "bgAsset"],
      },
      tone: {
        type: "object",
        properties: { concept: str("컨셉 한 단어, 예: 힐링, MZ 팩폭"), instruction: str("말투 지침 2~3문장"), focus: str("강조할 영역") },
        required: ["concept", "instruction", "focus"],
      },
      skin: { type: "string", enum: Object.keys(SKIN_GUIDE) },
      topic: str("이 브랜드가 파는 주제, 예: 결혼운"),
      formType: { type: "string", enum: ["single", "couple"] },
      motif: { type: "string", enum: ["moon", "none", "flower", "coin", "cloud"] },
      badge: str("12자 이내"),
      heroTitle: str("두 줄, \\n 으로 나눔"),
      heroDesc: str("60자 안팎"),
      cta: str("12자 이내"),
      images: {
        type: "object",
        properties: { hero: { type: "string" }, pageBg: { type: "string" }, band: { type: "string" }, bandCaption: { type: "string" }, card: { type: "string" }, product: { type: "string" }, loading: { type: "string" } },
        description: "라이브러리 이미지 이름(확장자 없이). 안 쓰는 자리는 빼기",
      },
      feature: { type: "string", enum: Object.keys(FEATURE_GUIDE) },
      about: { type: "object", properties: { title: { type: "string" }, body: { type: "string" }, sign: { type: "string" } }, required: ["title", "body", "sign"] },
      titles: { type: "object", properties: { points: { type: "string" }, reviews: { type: "string" }, form: { type: "string" } }, required: ["points", "reviews", "form"] },
      points: { type: "array", items: titled, minItems: 3, maxItems: 3 },
      free: { type: "array", items: { type: "object", properties: { title: { type: "string" }, text: { type: "string" } }, required: ["title", "text"] }, minItems: 3, maxItems: 3 },
      paidIntro: str("유료 결과 맨 앞 한 줄"),
      product: { type: "object", properties: { name: str("해설서 이름"), desc: str("한 줄 설명, '10장 · ...' 형식") }, required: ["name", "desc"] },
      bio: str("SNS 프로필 소개, 150자 이내"),
      adCopies: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 3 },
    },
    required: ["name", "slug", "theme", "tone", "skin", "topic", "formType", "motif", "badge", "heroTitle", "heroDesc", "cta", "feature", "about", "titles", "points", "free", "paidIntro", "product", "bio", "adCopies"],
  },
} as const;
