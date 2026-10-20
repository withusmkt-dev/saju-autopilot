"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MockNote, PButton, PCard, PTitle, useAosInit, usePreview } from "@/components/preview/PreviewShell";
import { confirmPaymentMock, prepareOrderMock, saveOrder, sendResultAlimtalkMock, useIntake } from "@/lib/preview/mock";

const METHODS = ["신용·체크카드", "토스페이", "카카오페이", "네이버페이", "계좌이체"];

export default function PayPage() {
  useAosInit();
  const { slug, base, brand, page } = usePreview();
  const intake = useIntake(slug);
  const router = useRouter();
  const [method, setMethod] = useState(METHODS[0]);
  const [paying, setPaying] = useState(false);
  const orderName = `${brand.orderNamePrefix} ${page.product.name}`;

  const pay = async () => {
    setPaying(true);
    const order = prepareOrderMock(brand.orderNamePrefix, page.product.name, page.product.price);

    /* 실서비스 (토스 결제위젯): 키 연결 후 주석 해제
    const widgets = (await loadTossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!)).widgets({ customerKey: ANONYMOUS });
    await widgets.setAmount({ currency: "KRW", value: order.amount });
    await widgets.renderPaymentMethods({ selector: "#payment-method" });
    await widgets.renderAgreement({ selector: "#agreement" });
    await widgets.requestPayment({
      orderId: order.orderId,
      orderName: order.orderName,          // 결제창 상품명 = "{브랜드} {상품}", 상점명은 명월재
      customerMobilePhone: intake.phone.replace(/\D/g, ""),
      successUrl: `${location.origin}/api/payment/toss/confirm?via=${slug}`,
      failUrl: `${location.origin}${base}/pay?fail=1`,
    });
    return;
    */

    await confirmPaymentMock(order);
    await sendResultAlimtalkMock(intake.phone, order.shortLink);
    saveOrder(slug, order);
    router.push(`${base}/result`);
  };

  return (
    <section className="px-5 py-8">
      <PTitle eyebrow="결제">주문 내용을 확인해 주세요</PTitle>

      <PCard>
        <p className="font-bold text-[var(--ink)]">{orderName}</p>
        <p className="mt-1 text-sm text-[var(--sub)]">{page.product.desc}</p>
        <dl className="mt-4 space-y-1.5 text-sm">
          <div className="flex justify-between"><dt className="text-[var(--sub)]">받는 분</dt><dd>{intake.name} · {intake.phone}</dd></div>
          <div className="flex justify-between"><dt className="text-[var(--sub)]">정가</dt><dd className="line-through text-[var(--sub)]">₩{page.product.listPrice.toLocaleString()}</dd></div>
          <div className="flex justify-between"><dt className="text-[var(--sub)]">할인</dt><dd className="text-red-500">−₩{(page.product.listPrice - page.product.price).toLocaleString()}</dd></div>
          <div className="flex justify-between border-t border-[var(--line)] pt-2 text-base font-bold"><dt>결제 금액</dt><dd className="text-[var(--ink)]">₩{page.product.price.toLocaleString()}</dd></div>
        </dl>
      </PCard>

      {/* 토스 결제위젯 자리 (#payment-method, #agreement) */}
      <div className="mt-4 rounded-2xl bg-white p-4 text-[#222] shadow-sm" id="payment-method">
        <p className="mb-3 text-sm font-bold">결제 수단</p>
        <div className="grid grid-cols-2 gap-2">
          {METHODS.map((m) => (
            <button key={m} type="button" onClick={() => setMethod(m)} className={`h-11 rounded-lg border text-sm ${method === m ? "border-[#3182f6] bg-[#e8f3ff] font-bold text-[#3182f6]" : "border-black/10"}`}>
              {m}
            </button>
          ))}
        </div>
        <p id="agreement" className="mt-3 text-[12px] text-[#666]">결제 약관 동의는 토스 결제창에서 받아요. 결제창 표시: 상점명: 명월재 · 상품명: {orderName}</p>
        <MockNote>여기에 토스 결제위젯이 들어가요. 지금은 버튼을 누르면 결제 완료로 처리해요.</MockNote>
      </div>

      <PButton className="mt-6" disabled={paying} onClick={pay}>
        {paying ? "결제 확인 중…" : `₩${page.product.price.toLocaleString()} 결제하기 (목업)`}
      </PButton>
      <p className="mt-3 text-center text-xs text-[var(--sub)]">결제 후 해설서 링크를 알림톡으로 보내 드려요.</p>
    </section>
  );
}
