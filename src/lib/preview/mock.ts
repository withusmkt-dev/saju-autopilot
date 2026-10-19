// 예시 페이지용 목업. 진짜 연결 코드는 src/lib/server/*.ts 에 써 두고 주석 처리해 둠.
// 백엔드를 붙일 때 이 함수들을 서버 액션 / API 호출로 바꾸면 화면은 그대로 쓴다.
import { useMemo, useSyncExternalStore } from "react";

export interface Intake {
  name: string;
  gender: "female" | "male";
  birthDate: string; // YYYY-MM-DD
  calendar: "solar" | "lunar";
  birthTime: string | null; // HH:mm, 모르면 null
  phone: string;
  /** 궁합처럼 두 사람을 받는 주제일 때 */
  partner?: { name: string; gender: "female" | "male"; birthDate: string; calendar: "solar" | "lunar"; birthTime: string | null };
}

export interface MockOrder {
  orderId: string;
  orderName: string; // 토스 결제창 상품명
  amount: number;
  shortLink: string;
}

const KEY = (slug: string) => `preview:${slug}`;

export const SAMPLE_INTAKE: Intake = {
  name: "김명월",
  gender: "female",
  birthDate: "1995-10-08",
  calendar: "solar",
  birthTime: "14:30",
  phone: "010-0000-0000",
};

/** 입력값은 이 탭 안(sessionStorage)에만 둔다. 주소창에 개인정보를 싣지 않기 위해 */
export function saveIntake(slug: string, intake: Intake) {
  try {
    sessionStorage.setItem(KEY(slug), JSON.stringify(intake));
  } catch {
    /* 저장 안 되는 환경이면 샘플로 보여 줌 */
  }
}

export function loadIntake(slug: string): Intake {
  try {
    const raw = sessionStorage.getItem(KEY(slug));
    if (raw) return JSON.parse(raw) as Intake;
  } catch {
    /* ignore */
  }
  return SAMPLE_INTAKE;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 무료 풀이 요청. 실서비스: 사주 엔진 계산 → 미리 생성해 둔 문장 조회 (+ 일부 Claude 맞춤) */
export async function requestFreeReadingMock(slug: string, intake: Intake) {
  saveIntake(slug, intake);
  // return await requestFreeReading(slug, intake)  ← src/lib/server/reading.ts
  await wait(300);
  return { ok: true as const };
}

/** 결제 준비. 실서비스: 주문 생성 후 토스 결제위젯 requestPayment */
export function prepareOrderMock(brandPrefix: string, productName: string, amount: number): MockOrder {
  const code = Math.random().toString(36).slice(2, 8);
  return {
    orderId: `ord_20261019_${code}xx`,
    orderName: `${brandPrefix} ${productName}`,
    amount,
    shortLink: `myeongwoljae.com/r/${code}`,
  };
}

/** 결제 승인. 실서비스: successUrl → /api/payment/toss/confirm (src/lib/server/payment.ts) */
export async function confirmPaymentMock(order: MockOrder) {
  await wait(600);
  return { ok: true as const, orderId: order.orderId };
}

/** 결과 알림톡. 실서비스: src/lib/server/alimtalk.ts (알리고, 가비아 중계) */
export async function sendResultAlimtalkMock(phone: string, shortLink: string) {
  await wait(400);
  return { ok: true as const, to: phone, link: shortLink };
}

/* ---------- 이 탭에 저장된 값 읽기 (서버 렌더 때는 샘플) ---------- */

const noop = () => () => {};

function useSessionValue(key: string): string | null {
  return useSyncExternalStore(
    noop,
    () => {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );
}

export function useIntake(slug: string): Intake {
  const raw = useSessionValue(KEY(slug));
  return useMemo(() => (raw ? (JSON.parse(raw) as Intake) : SAMPLE_INTAKE), [raw]);
}

export function saveOrder(slug: string, order: MockOrder) {
  try {
    sessionStorage.setItem(`${KEY(slug)}:order`, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function useOrder(slug: string): MockOrder | null {
  const raw = useSessionValue(`${KEY(slug)}:order`);
  return useMemo(() => (raw ? (JSON.parse(raw) as MockOrder) : null), [raw]);
}
