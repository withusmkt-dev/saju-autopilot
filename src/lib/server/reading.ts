// 브랜드 페이지의 무료·유료 풀이 생성. 지금은 예시 페이지라 아래 코드는 주석 처리하고 mock.ts 로 대신한다.
// 실서비스에서는 명월재 lib/server/llm.ts · prompts/ 를 그대로 쓰고, 브랜드 말투(site_config.tone)만 끼워 넣는다.
//
// 켤 때 할 일
//  1) npm i @anthropic-ai/sdk @withusmkt-dev/saju-engine   (.npmrc 에 GitHub Packages 토큰 필요)
//  2) 환경변수 ANTHROPIC_API_KEY, LLM_MODEL_FREE, LLM_MODEL_PAID
//  3) 아래 주석을 풀고 페이지에서 requestFreeReadingMock → requestFreeReading 으로 교체

/*
import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { calculateSaju } from "@withusmkt-dev/saju-engine";
import type { Intake } from "@/lib/preview/mock";
import type { BrandTone } from "@/lib/types";

const client = new Anthropic(); // ANTHROPIC_API_KEY

// 명월재와 같은 기준: 무료 Sonnet, 유료 Opus, 990원 개인화 Haiku
const MODEL_FREE = process.env.LLM_MODEL_FREE ?? "claude-sonnet-5-5";
const MODEL_PAID = process.env.LLM_MODEL_PAID ?? "claude-opus-5-5";

export async function requestFreeReading(intake: Intake, tone: BrandTone) {
  const calc = calculateSaju({
    birthDate: intake.birthDate,
    birthTime: intake.birthTime,
    calendar: intake.calendar,
    isLeapMonth: false,
    gender: intake.gender,
  });

  // 무료는 미리 생성해 DB 에 넣어 둔 문장을 조회하는 게 기본 (LLM 비용 0).
  // 브랜드 말투로 살짝 다듬을 때만 아래 호출을 쓴다.
  const msg = await client.messages.create({
    model: MODEL_FREE,
    max_tokens: 1200,
    system: [
      { type: "text", text: "당신은 사주명리 해설가입니다. 건강·투자를 단정하지 않습니다." },
      { type: "text", text: `말투: ${tone.instruction}\n강조: ${tone.focus}` },
    ],
    messages: [{ role: "user", content: `사주 계산 결과(JSON):\n${JSON.stringify(calc.core)}\n\n타고난 기질 / 올해의 흐름 / 지금의 한 걸음 세 단락으로 써 주세요.` }],
  });
  return { calc, text: msg.content.map((c) => (c.type === "text" ? c.text : "")).join("") };
}

// 유료 해설서: 앵커 1 + 섹션 10 (명월재 cron/generate 와 같은 흐름, QStash 로 비동기)
export async function enqueuePaidReport(orderId: string) {
  // await qstash.publishJSON({ url: `${BASE_URL}/api/cron/generate`, body: { orderId } });
  void orderId;
  void MODEL_PAID;
}
*/

export {};
