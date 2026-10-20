// 브랜드 페이지 문자 발송 (무료 결과 / 결제 / 완료 / 문의 답변 / 환불) + 관리자 장애 알림.
// 명월재(리뉴얼·심층사주)는 알림톡, 브랜드 페이지는 문자. 알림톡은 '명월재' 채널 템플릿이라 브랜드 이름으로 못 보낸다.
// 지금은 예시 페이지라 주석 처리하고 mock.ts(sendSmsMock)로 대신한다.
//
// 켤 때 할 일
//  1) 알리고에 회사 대표번호를 발신번호로 등록 (통신사 발신번호 사전등록 — 개인 번호 X)
//  2) 명월재 가비아 중계(aligo-relay.php)에 문자 발송(/send/) 경로 추가. 알리고는 등록된 IP 에서만 받는다
//  3) 환경변수 ALIGO_RELAY_URL, ALIGO_RELAY_SECRET, SMS_SENDER (발신번호)
//  4) 아래 주석을 풀고 sendSmsMock 자리를 sendBrandSms 로 교체
//
// 모두 결제·서비스 안내(정보성)라 (광고) 표기·수신거부 문구는 넣지 않는다.
// 링크는 자체 숏링크(myeongwoljae.com/r/{code})라 대부분 단문(90바이트) 안에 들어간다.

export type SmsKind = "free" | "paid" | "done" | "answer" | "refund";

/** 문자 문구 5종. brand = 브랜드 이름(예: 달빛운세) */
export const SMS_TEMPLATES: Record<SmsKind, (v: { brand: string; name?: string; amount?: number; link?: string }) => string> = {
  free: (v) => `[${v.brand}] ${v.name}님 무료 풀이 결과예요 ${v.link}`,
  paid: (v) => `[${v.brand}] ${v.amount?.toLocaleString()}원 결제 완료. 해설서가 준비되면 바로 알려 드릴게요.`,
  done: (v) => `[${v.brand}] ${v.name}님 해설서가 준비됐어요 ${v.link}`,
  answer: (v) => `[${v.brand}] 문의하신 내용에 답변을 드렸어요 ${v.link}`,
  refund: (v) => `[${v.brand}] ${v.amount?.toLocaleString()}원 환불 처리됐어요. 카드사에 따라 3~5일 걸릴 수 있어요.`,
};

/*
import "server-only";

// 한글 2바이트 기준 90바이트 넘으면 장문(LMS)
const bytes = (s: string) => [...s].reduce((n, ch) => n + (ch.charCodeAt(0) > 127 ? 2 : 1), 0);

export async function sendBrandSms(to: string, kind: SmsKind, vars: Parameters<(typeof SMS_TEMPLATES)[SmsKind]>[0]) {
  const msg = SMS_TEMPLATES[kind](vars);
  const res = await fetch(process.env.ALIGO_RELAY_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Relay-Secret": process.env.ALIGO_RELAY_SECRET! },
    body: JSON.stringify({ type: bytes(msg) > 90 ? "LMS" : "SMS", sender: process.env.SMS_SENDER, receiver: to, msg }),
  });
  if (!res.ok) {
    // 실패하면 주문을 completed 로 넘기지 않고 남겨서 재시도 (명월재 알림톡과 같은 규칙)
    // await sendAdminAlert("sms_balance", `${kind} 문자 실패 ${res.status}`);
    throw new Error(`문자 실패 ${res.status}`);
  }
}

// 설정 > 장애·알림 문자 에 등록한 번호로 보냄
export async function sendAdminAlert(trigger: string, message: string) {
  // const phones = await getAlertPhones(trigger);
  // await Promise.all(phones.map((to) => sendRaw(to, `[사주오토 경고] ${message}`.slice(0, 45))));
  void trigger;
  void message;
}
*/
