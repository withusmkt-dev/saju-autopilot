"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MockNote, PButton, PTitle, useField, useAosInit, usePreview } from "@/components/preview/PreviewShell";
import { useOrder } from "@/lib/preview/mock";

/** 결제 내역 / 결과 다시 보기. 명월재와 같은 방식(주문번호 + 연락처) */
export default function LookupPage() {
  useAosInit();
  const { slug, base } = usePreview();
  const field = useField();
  const lastOrder = useOrder(slug);
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실서비스: app/actions/lookup.ts: 주문번호+연락처 일치 시 report_token 링크로 이동 (틀린 횟수 제한)
    if (!orderId.trim() || phone.replace(/\D/g, "").length < 10) return setError("주문번호와 휴대폰 번호를 넣어 주세요.");
    if (!lastOrder) return setError("일치하는 주문이 없어요. (목업: 이 브라우저에서 결제한 주문만 찾을 수 있어요)");
    router.push(`${base}/result`);
  };

  return (
    <section className="px-5 py-10">
      <PTitle eyebrow="결제 내역">결과 다시 보기</PTitle>
      <p className="mb-5 text-sm text-[var(--sub)]">결제할 때 받은 알림톡의 주문번호와 휴대폰 번호를 넣어 주세요.</p>
      <form onSubmit={submit} className="space-y-3">
        <input className={field} placeholder="주문번호 (ord_로 시작)" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        <input className={field} inputMode="numeric" placeholder="휴대폰 번호" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d-]/g, ""))} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <PButton type="submit">내 결과 보기</PButton>
      </form>
      {lastOrder && <MockNote>이 브라우저의 최근 주문: {lastOrder.orderId}</MockNote>}
      <p className="mt-6 text-xs text-[var(--sub)]">알림톡을 못 받으셨다면 고객센터로 문의해 주세요. 결제 정보 확인 후 다시 보내 드려요.</p>
    </section>
  );
}
