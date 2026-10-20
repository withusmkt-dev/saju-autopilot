// '이메일로도 받기' (원하는 사람만). 결과 화면에서 이메일을 받으면 해설서 링크를 메일로 보낸다.
// 명월재는 Resend 로 문의 답변·완료 메일을 보내고 있으니 같은 계정·도메인을 쓴다.
// 지금은 예시 페이지라 주석 처리하고 mock.ts(sendEmailMock)로 대신한다.
//
// 켤 때 할 일
//  1) 환경변수 RESEND_API_KEY, MAIL_FROM (명월재와 같은 보내는 주소)
//  2) 주문에 email 저장 (선택 입력이라 비어 있을 수 있음)
//  3) 아래 주석을 풀고 sendEmailMock 자리를 sendReportEmail 로 교체

/*
import "server-only";

export async function sendReportEmail(to: string, brand: string, name: string, link: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `${brand} <${process.env.MAIL_FROM}>`,
      to,
      subject: `[${brand}] ${name}님 해설서가 준비됐어요`,
      html: `<p>${name}님, 요청하신 해설서 링크를 보내 드려요.</p><p><a href="https://${link}">해설서 열어 보기</a></p><p>이 링크는 1년 동안 열 수 있어요.</p>`,
    }),
  });
  if (!res.ok) throw new Error(`메일 실패 ${res.status}`);
}
*/

export {};
