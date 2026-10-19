// 토스페이먼츠 결제 승인. 지금은 예시 페이지라 주석 처리하고 mock.ts(confirmPaymentMock)로 대신한다.
// 실서비스는 명월재 lib/server/toss.ts · /api/payment/toss/confirm 을 그대로 쓴다 (상점명 = 명월재, orderName 만 브랜드별).
//
// 켤 때 할 일
//  1) 환경변수 TOSS_SECRET_KEY (gsk_ 결제위젯 키), NEXT_PUBLIC_TOSS_CLIENT_KEY (gck_)
//  2) 결제 페이지에서 @tosspayments/tosspayments-sdk 위젯을 띄우고 successUrl → /api/payment/toss/confirm
//  3) 아래 주석을 풀고 confirmPaymentMock 자리를 교체

/*
import "server-only";

export async function confirmTossPayment(paymentKey: string, orderId: string, amount: number) {
  // 금액은 반드시 DB 에 저장된 주문 금액과 대조한 뒤 승인 (쿼리 amount 를 믿지 않음)
  const res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });
  const data = await res.json();
  if (!res.ok) {
    // 장애 알림 문자 (설정 > 장애·알림 문자 > 결제(PG) 오류)
    // await sendAdminAlert("pg_error", `${orderId} ${data.code} ${data.message}`);
    throw new Error(data.message ?? "결제 승인 실패");
  }
  // pending → paid 를 한 번의 UPDATE 로 넘기고, DB 실패 시 즉시 취소 (명월재와 같은 규칙)
  return data;
}
*/

export {};
