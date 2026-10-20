// 브랜드 랜딩·SNS 콘텐츠·광고 소재 생성 호출. 지금은 관리자 화면이 dummy.ts 로 대신하므로 주석 처리.
// 프롬프트 본문은 src/lib/prompts/ (landing.ts · adContent.ts)
//
// 켤 때 할 일
//  1) npm i @anthropic-ai/sdk
//  2) 환경변수 ANTHROPIC_API_KEY, LLM_MODEL_BRAND, LLM_MODEL_CONTENT
//  3) 아래 주석을 풀고 /api/brands/draft · /api/content/generate · /api/ads/creatives 라우트에서 부른다
//
// 모델·비용 (2026-10 기준 단가)
//  - 랜딩: Sonnet 5.5 ($2/$10 per 1M). 한 번에 입력 ~5k + 출력 ~2.5k 토큰 → 브랜드 하나에 약 $0.035
//  - SNS·광고: Haiku 5.5 ($0.10/$0.50). 편당 입력 ~3k + 출력 ~1.5k → 편당 약 $0.001
//    여러 브랜드를 한꺼번에 만들 때는 Batch API(50% 할인)로 돌리고, 돌리기 전에 예상 비용을 보여 주고 승인받는다 (명월재 규칙)
//  - 시스템 프롬프트는 cache_control 로 캐시 (브랜드·편마다 바뀌는 건 사용자 메시지뿐)

/*
import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { LANDING_TOOL, landingSystemPrompt, landingUserPrompt, NAMES_TOOL, namesUserPrompt, type LandingDraft, type LandingInput } from "@/lib/prompts/landing";
import { AD_TOOL, adSystemPrompt, adUserPrompt, CONTENT_TOOL, contentSystemPrompt, contentUserPrompt, type AdCreative, type AdInput, type ContentInput } from "@/lib/prompts/adContent";
import type { ContentPart } from "@/lib/types";

const client = new Anthropic(); // ANTHROPIC_API_KEY
const MODEL_BRAND = process.env.LLM_MODEL_BRAND ?? "claude-sonnet-5-5";
const MODEL_CONTENT = process.env.LLM_MODEL_CONTENT ?? "claude-haiku-5-5";

// 도구 하나를 꼭 쓰게 해서 JSON 만 받는다
async function callTool<T>(model: string, system: string, user: string, tool: { name: string; description: string; input_schema: object }, maxTokens: number): Promise<T> {
  const msg = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    tools: [tool as Anthropic.Tool],
    tool_choice: { type: "tool", name: tool.name },
    messages: [{ role: "user", content: user }],
  });
  const use = msg.content.find((c) => c.type === "tool_use");
  if (!use || use.type !== "tool_use") throw new Error(`${tool.name}: 도구 응답 없음 (stop_reason ${msg.stop_reason})`);
  return use.input as T;
}

export async function generateLanding(input: LandingInput): Promise<LandingDraft> {
  const d = await callTool<LandingDraft>(MODEL_BRAND, landingSystemPrompt(), landingUserPrompt(input), LANDING_TOOL, 4000);
  // 저장 전 검사: slug 중복·형식, 색 대비, heroTitle 두 줄, points 와 free 제목 일치. 어긋나면 한 번 더 요청
  if (input.takenSlugs.includes(d.slug) || !/^[a-z0-9-]{2,20}$/.test(d.slug)) throw new Error(`쓸 수 없는 slug: ${d.slug}`);
  return d;
}

// 이름만 다시 추천 (POST /api/brands/names). 컨셉은 그대로, 후보 4개
export async function suggestBrandNames(draft: LandingDraft, exclude: string[]): Promise<{ name: string; slug: string; why: string }[]> {
  const r = await callTool<{ names: { name: string; slug: string; why: string }[] }>(MODEL_BRAND, landingSystemPrompt(), namesUserPrompt(draft, exclude), NAMES_TOOL, 800);
  return r.names.filter((n) => !exclude.includes(n.slug) && /^[a-z0-9-]{2,20}$/.test(n.slug));
}

export async function generateContents(input: ContentInput): Promise<{ angle: string; parts: Pick<ContentPart, "key" | "lines">[] }[]> {
  const r = await callTool<{ items: { angle: string; parts: Pick<ContentPart, "key" | "lines">[] }[] }>(MODEL_CONTENT, contentSystemPrompt(), contentUserPrompt(input), CONTENT_TOOL, 1500 * input.count + 500);
  return r.items;
}

export async function generateAdCreatives(input: AdInput): Promise<AdCreative[]> {
  const r = await callTool<{ creatives: AdCreative[] }>(MODEL_CONTENT, adSystemPrompt(), adUserPrompt(input), AD_TOOL, 600 * input.count + 300);
  return r.creatives;
}
*/

export {};
