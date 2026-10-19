// 결과 안내 알림톡 + 관리자 장애 알림. 지금은 예시 페이지라 주석 처리하고 mock.ts(sendResultAlimtalkMock)로 대신한다.
// 실서비스는 명월재 lib/server/aligo.ts · alimtalkSend.ts 를 그대로 쓴다.
// 알리고는 등록된 IP 에서만 받으므로 Vercel → 가비아 중계(aligo-relay.php) → 알리고 경로를 거친다.
//
// 켤 때 할 일
//  1) 환경변수 ALIGO_RELAY_URL, ALIGO_RELAY_SECRET
//  2) 브랜드 결과 링크는 자체 숏링크(myeongwoljae.com/r/{code})로 보냄. 템플릿 버튼 URL 은 카카오에 등록된 그대로 둔다
//  3) 아래 주석을 풀고 sendResultAlimtalkMock 자리를 교체

/*
import "server-only";

export async function sendResultAlimtalk(phone: string, name: string, shortLink: string) {
  const res = await fetch(process.env.ALIGO_RELAY_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Relay-Secret": process.env.ALIGO_RELAY_SECRET! },
    body: JSON.stringify({ template: "REPORT_DONE", to: phone, vars: { name, link: shortLink } }),
  });
  if (!res.ok) {
    // 실패하면 주문을 completed 로 넘기지 않고 generated 로 남겨 재시도 (명월재와 같은 규칙)
    throw new Error(`알림톡 실패 ${res.status}`);
  }
}

// 설정 > 장애·알림 문자 에 등록한 번호로 보냄
export async function sendAdminAlert(trigger: string, message: string) {
  // const phones = await getAlertPhones(trigger);
  // await Promise.all(phones.map((to) => sendSms(to, `[사주오토 경고] ${message}`.slice(0, 90))));
  void trigger;
  void message;
}
*/

export {};
