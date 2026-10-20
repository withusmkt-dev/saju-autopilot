// 광고·SNS 콘텐츠 생성 프롬프트. 두 가지:
//  1) SNS 콘텐츠 (콘텐츠 팩토리): POST /api/content/generate (GenerateRequest) → ContentItem 의 parts
//  2) 유료 광고 소재 (Meta·TikTok·YouTube): 광고 관리 화면에서 새 소재 만들 때
// 브랜드 말투(tone.instruction)를 그대로 끼워 넣어 브랜드마다 다른 글이 나오게 한다. 호출부는 src/lib/server/generate.ts
import { DEEP_LIST_PRICE, DEEP_PRICE, won } from "@/lib/pricing";
import type { AdChannel, Brand, GenerateMode, PartKey } from "@/lib/types";

/** 매체별 조각 규격 (글자 수는 매체 제한보다 여유 있게) */
export const PART_SPEC: Record<PartKey, string> = {
  "threads.thread": "텍스트 타래 3~5개. 각 400자 이내(스레드 제한 500자). 첫 글 첫 줄이 훅. 각 글 앞에 '1/N' 표기. 마지막 글은 반드시 홍보 글(아래 '스레드 홍보 글' 규칙)",
  "threads.cardText": "첫 글에 붙일 카드 이미지 문구 2~4장. 장마다 큰 글씨 20자 이내 한 줄, 필요하면 '|' 뒤에 작은 글씨 한 줄. 카드는 빠질 수도 있으니 카드에만 있는 정보를 두지 않음",
  "threads.cta": "작성자가 첫 글에 다는 댓글 1~2줄. 브랜드 이름 + '무료' + {link}. 본문 마지막 글 문장을 그대로 반복하지 않음",
  "instagram.cardNews": "카드뉴스 5~7장. '1장: ...' 형식. 1장은 훅(15자 안팎), 가운데는 한 장에 한 가지 내용, 마지막 장은 '프로필 링크에서 무료 풀이'",
  "instagram.reelsScript": "릴스 15~30초. '0–3초: [자막] ... / [말] ...' 형식. 처음 3초 안에 훅",
  "instagram.caption": "피드 캡션 300자 안팎. 마지막 줄에 해시태그 5~8개",
  "tiktok.script": "숏폼 15~30초. 첫 2초 훅, '훅: / 본문: / CTA:' 형식",
  "tiktok.caption": "캡션 80자 안팎 + 해시태그 3~5개",
  "youtube.script": "쇼츠 60초 이하. '0초: ...' 타임코드 형식. 마지막에 설명란 링크 안내",
  "youtube.thumbnail": "썸네일 문구 2안, 각 12자 이내",
  "youtube.titleDesc": "1줄: 제목 40자 이내 / 2줄부터: 설명. 설명 첫 줄에 {link}",
};

/** 광고·콘텐츠 공통 규칙. 매체 정책·표시광고법·우리 문체 */
const COMMON_RULES = `## 문체
- 한국어로, 사람이 쓴 것처럼 씁니다. 줄표(—)는 쓰지 않고, 이모지는 매체 관습상 필요할 때만 글 하나에 1~2개까지.
- '특별한', '완벽한', '여정', '당신만을 위한' 같은 뻔한 말과 번역투를 피합니다.
- 사주 용어(일간, 재성, 도화, 대운 등)는 써도 되지만 처음 나올 때 쉬운 말로 한 번 풀어 줍니다.

## 하지 않는 것
- 겁주기: 죽음·사고·질병·이혼·파산을 예고하거나 '이 사주는 위험' 식으로 불안을 파는 글.
- 보장: '반드시', '100%', '무조건', '인생이 바뀐다' 같은 결과 보장.
- 단정: 건강·투자·법률 판단. 특정 종목·로또 번호·병명.
- 지어내기: 후기, 이용자 수, 적중률, 전문가 경력, '제가 봐 드린 손님' 같은 실화 위장. 주어진 숫자만 씁니다.
- 실존 인물(연예인·정치인 등)의 이름이나 사주.
- 보는 사람의 처지를 단정하기: '빚 있는 당신', '우울한 당신', '이혼한 분' 처럼 개인 사정·건강·재정 상태를 안다는 듯이 부르는 말 (Meta·TikTok 광고 정책 위반).
- 할인·무료 과장: 무료인 것은 '무료 풀이'뿐입니다. 유료 해설서는 무료 풀이를 본 뒤 고를 수 있다고만 말합니다.
- 가격: 유료 해설서는 모든 브랜드 ${won(DEEP_PRICE)}. ${DEEP_LIST_PRICE ? `할인을 말할 때는 '정가 ${won(DEEP_LIST_PRICE)} → ${won(DEEP_PRICE)}' 그대로만 쓰고,` : "정가·할인 표현은 쓰지 않고,"} 다른 할인율이나 '오늘만', '마감 임박' 같은 기한 한정은 지어내지 않습니다.`;

export interface ContentBrand {
  name: string;
  slug: string;
  topic: string; // 이 브랜드의 주제, 예: 연애운
  tone: Brand["tone"];
  productName: string; // 유료 해설서 이름
  freePoints: string[]; // 무료 풀이에서 알려 주는 것 (랜딩 points)
  cta: string; // 랜딩 버튼 문구
}

/* ---------- 1) SNS 콘텐츠 ---------- */

export function contentSystemPrompt(): string {
  return `당신은 사주 브랜드의 SNS 콘텐츠를 쓰는 한국어 에디터입니다. 브랜드 말투와 주제를 지키면서, 피드에서 멈춰 읽게 만들고 무료 풀이 링크로 이어지게 씁니다.
결과는 반드시 save_contents 도구로만 돌려줍니다.

## 좋은 글
- 첫 줄에서 '내 얘기 같다'고 느끼게: 구체적인 상황 하나(예: 연락을 먼저 못 하는 사람, 월급날 다음 주가 제일 가난한 사람).
- 사주는 근거로 짧게, 읽는 사람이 얻는 건 분명하게(알게 되는 것, 해 볼 만한 것 하나).
- 링크는 한 번만. 본문에서 '구매'를 조르지 않습니다.
- 여러 편을 만들 때는 각도(angle)를 모두 다르게: 공감, 정보, 반전, 체크리스트, 질문형 등.

## 스레드 홍보 글 (타래 마지막 글)
스레드는 글만 올라갈 수도, 카드 이미지가 붙을 수도, 링크 댓글이 달릴 수도 안 달릴 수도 있습니다. 어떤 조합이든 마지막 글 하나만 읽어도 홍보가 되게 씁니다.
- 반드시 들어갈 것: ① 브랜드 이름 ② 무료로 무엇을 알 수 있는지 (주어진 '무료 풀이 내용'에서 1~3개, 구체적으로) ③ 하는 법 (생년월일시만 넣으면 / 1분 / 가입 없이 중 하나 이상) ④ 행동 한 줄.
- 앞 글 이야기에서 넘어오는 한 문장('그래서 내 사주는?' 같은)으로 시작하면 광고 티가 덜 납니다.
- 링크 위치: threads.cta 조각이 있으면 링크는 댓글에만 두고, 마지막 글에는 '첫 댓글에 링크 있어요'처럼 안내만. threads.cta 가 없으면 마지막 글 끝에 {link}.
- 홍보 글 모양은 편마다 다르게: 목록형(· 세 줄), 한 문단형, 질문으로 끝나는 형 등.
- 유료 해설서는 넣더라도 한 줄, '무료 풀이를 보고 더 궁금하면' 정도로만.

${COMMON_RULES}

## 조각 규격
${(Object.keys(PART_SPEC) as PartKey[]).map((k) => `- ${k}: ${PART_SPEC[k]}`).join("\n")}

링크 자리에는 {link} 를 그대로 둡니다. 나중에 숏링크로 바뀝니다.`;
}

export interface ContentInput {
  brand: ContentBrand;
  concept: string; // 이번 콘텐츠 주제, 예: 2027 신년운세
  count: number; // 몇 편
  parts: PartKey[]; // 만들 조각
  mode: GenerateMode; // video 면 대본에 화면·자막 지시를 더 자세히
  avoidAngles?: string[]; // 최근에 쓴 각도 (반복 피하기)
}

/** 이번에 고른 스레드 조각 조합에 맞춘 안내 (글만 / 카드 / 링크 댓글 유무) */
function threadsCase(parts: PartKey[]): string {
  if (!parts.includes("threads.thread")) return "";
  const link = parts.includes("threads.cta") ? "스레드 링크는 댓글(threads.cta)에만 넣고, 마지막 글에는 댓글 안내만 하세요." : "스레드 링크 댓글이 없습니다. 마지막 홍보 글 끝에 {link} 를 넣으세요.";
  const cards = parts.includes("threads.cardText") ? "" : " 카드 이미지 없이 글만 올라갑니다.";
  return link + cards;
}

export function contentUserPrompt(i: ContentInput): string {
  return `브랜드: ${i.brand.name} (myeongwoljae.com/${i.brand.slug})
브랜드 주제: ${i.brand.topic}
말투: ${i.brand.tone.instruction}
강조: ${i.brand.tone.focus}
유료 해설서: ${i.brand.productName}
무료 풀이 내용: ${i.brand.freePoints.join(" / ")}
랜딩 버튼: ${i.brand.cta}

이번 주제: ${i.concept}
만들 편수: ${i.count}편 (편마다 각도가 달라야 합니다)
편마다 만들 조각: ${i.parts.join(", ")}
${threadsCase(i.parts)}
${i.mode === "video" ? "영상으로 만듭니다. 대본에 화면 구성·자막·내레이션을 구분해 적어 주세요. 내레이션은 성우가 읽기 편한 짧은 문장으로." : "글과 이미지 카드로만 만듭니다."}
${i.avoidAngles?.length ? `최근에 쓴 각도라 피할 것: ${i.avoidAngles.join(" / ")}` : ""}`.trim();
}

export const CONTENT_TOOL = {
  name: "save_contents",
  description: "만든 SNS 콘텐츠를 저장한다",
  input_schema: {
    type: "object",
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            angle: { type: "string", description: "이 편의 각도 한 줄, 예: 공감형 / 연락 먼저 못 하는 사람" },
            parts: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  key: { type: "string", enum: Object.keys(PART_SPEC) },
                  lines: { type: "array", items: { type: "string" }, description: "타래 한 개, 카드 한 장, 대본 한 구간이 한 줄" },
                },
                required: ["key", "lines"],
              },
            },
          },
          required: ["angle", "parts"],
        },
      },
    },
    required: ["items"],
  },
} as const;

/* ---------- 2) 유료 광고 소재 ---------- */

/** 매체별 광고 문구 규격 */
const AD_SPEC: Record<AdChannel, string> = {
  meta: "primaryText 125자 이내(앞 40자 안에 훅), headline 25자 이내, description 25자 이내. 피드·스토리·릴스에 같이 나가므로 이미지 없이도 읽히게",
  tiktok: "primaryText 50자 이내(광고 문구), headline 은 표시 이름 옆 짧은 문구 20자 이내, description 은 비워도 됨. videoHook 필수",
  youtube: "headline 30자 이내, description 90자 이내, primaryText 는 쇼츠 첫 화면 자막 20자 이내. videoHook 필수",
};

export function adSystemPrompt(): string {
  return `당신은 사주 브랜드의 퍼포먼스 광고 카피를 쓰는 한국어 카피라이터입니다. 목표는 광고를 본 사람이 랜딩에서 무료 풀이를 받게 하는 것(전환: 무료 풀이 신청)입니다.
결과는 반드시 save_ad_creatives 도구로만 돌려줍니다.

## 좋은 소재
- 소재마다 각도가 달라야 합니다: 공감(상황), 호기심(사주 지식 한 조각), 시기(올해·이번 달), 가벼운 재미(테스트형), 브랜드 분위기.
- 첫 문장에 '누구 얘기인지'가 보이게. 질문형은 한 소재에만.
- 랜딩 첫 화면 문구(heroTitle)와 말이 이어지게 써서, 눌렀을 때 다른 곳에 온 느낌이 들지 않게 합니다.
- visualNote 에는 어떤 이미지·영상이 어울리는지 한 줄(브랜드 이미지 라이브러리에서 고를 수 있게 분위기 위주로).

${COMMON_RULES}

## 매체별 규격
${(Object.keys(AD_SPEC) as AdChannel[]).map((k) => `- ${k}: ${AD_SPEC[k]}`).join("\n")}`;
}

export interface AdInput {
  brand: ContentBrand & { heroTitle: string; cta: string };
  channel: AdChannel;
  count: number; // 소재 몇 개
  angleHint?: string; // 이번에 밀고 싶은 방향, 예: 연말 신년운세
  winners?: string[]; // 성과 좋았던 기존 문구 (참고만, 베끼지 않기)
  losers?: string[]; // 성과 나빴던 문구 (피하기)
}

export function adUserPrompt(i: AdInput): string {
  return `브랜드: ${i.brand.name} (myeongwoljae.com/${i.brand.slug})
브랜드 주제: ${i.brand.topic}
말투: ${i.brand.tone.instruction}
랜딩 첫 화면 제목: ${i.brand.heroTitle.replace(/\n/g, " ")}
랜딩 버튼: ${i.brand.cta}

매체: ${i.channel}
소재 수: ${i.count}개 (각도가 모두 달라야 합니다)
${i.angleHint ? `이번 방향: ${i.angleHint}` : ""}
${i.winners?.length ? `성과 좋았던 문구 (분위기만 참고):\n${i.winners.map((w) => `- ${w}`).join("\n")}` : ""}
${i.losers?.length ? `성과 나빴던 문구 (비슷하게 쓰지 않기):\n${i.losers.map((w) => `- ${w}`).join("\n")}` : ""}`.trim();
}

export const AD_TOOL = {
  name: "save_ad_creatives",
  description: "만든 광고 소재를 저장한다",
  input_schema: {
    type: "object",
    properties: {
      creatives: {
        type: "array",
        items: {
          type: "object",
          properties: {
            angle: { type: "string", description: "각도 한 줄" },
            primaryText: { type: "string" },
            headline: { type: "string" },
            description: { type: "string" },
            videoHook: { type: "string", description: "영상 첫 2초 자막·말 (tiktok·youtube 필수, meta 는 릴스용으로 선택)" },
            visualNote: { type: "string", description: "어울리는 이미지·영상 한 줄" },
          },
          required: ["angle", "primaryText", "headline", "visualNote"],
        },
      },
    },
    required: ["creatives"],
  },
} as const;

/** 생성 결과 모양 */
export interface AdCreative {
  angle: string;
  primaryText: string;
  headline: string;
  description?: string;
  videoHook?: string;
  visualNote: string;
}
