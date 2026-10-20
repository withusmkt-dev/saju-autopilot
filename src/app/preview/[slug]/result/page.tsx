"use client";

import { useState } from "react";
import { MockNote, PCard, PTitle, useAos, useAosInit, usePreview } from "@/components/preview/PreviewShell";
import { ElementBars, PillarTable } from "@/components/preview/SajuChart";
import { PaidChapters } from "@/components/preview/ResultParts";
import { useIntake, useOrder } from "@/lib/preview/mock";
import EmailOptIn from "@/components/preview/EmailOptIn";

export default function PaidResultPage() {
  useAosInit();
  const { slug, brand, page, skin } = usePreview();
  const intake = useIntake(slug);
  const order = useOrder(slug);
  const aos = useAos();
  const [note, setNote] = useState("");

  return (
    <>
      {order && (
        <div className="bg-emerald-50 px-[5.5cqw] py-3 text-[13px] text-emerald-800">
          결제 완료 · 주문번호 {order.orderId}
          <br />
          {intake.phone} 으로 해설서 링크를 문자로 보냈어요 (목업) · {order.shortLink}
        </div>
      )}

      <section className="relative overflow-hidden bg-[var(--p)] px-[6.5cqw] py-12 text-center text-white">
        <p className="text-[13px] tracking-widest text-[var(--a)]">{brand.orderNamePrefix} {page.product.name}</p>
        <h1 className="mt-3 text-3xl leading-snug" style={{ fontFamily: "var(--hf)" }}>
          {intake.name}님의
          <br />
          해설서가 준비되었어요
        </h1>
        <p className="mx-auto mt-4 max-w-[300px] text-[15px] leading-relaxed opacity-85">{page.paidIntro}</p>
      </section>

      <section className="px-[5.5cqw] py-6" {...aos()}>
        {skin.result.pillar === "ink" || skin.result.pillar === "grid" ? (
          <>
            <PillarTable />
            <div className="mt-5">
              <ElementBars />
            </div>
          </>
        ) : (
          <PCard>
            <PillarTable />
            <div className="mt-5">
              <ElementBars />
            </div>
          </PCard>
        )}
      </section>

      <section className="px-[5.5cqw] pb-8">
        <div className={skin.result.align === "center" ? "text-center" : ""}>
          <PTitle eyebrow="목차">열 장의 이야기</PTitle>
        </div>
        <PaidChapters />
        <MockNote>본문은 앞 3장만 샘플이에요. 실서비스: 앵커 1회 + 섹션 10회 생성 (src/lib/server/reading.ts)</MockNote>
      </section>

      <section className="px-[5.5cqw] pb-10">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setNote("PDF 저장은 실서비스에서 /api/pdf 로 만들어요 (목업)")} className="border border-[var(--line)] py-3 text-[15px]">
            PDF로 저장
          </button>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(order?.shortLink ?? "").catch(() => {});
              setNote("결과 링크를 복사했어요");
            }}
            className="border border-[var(--line)] py-3 text-[15px]"
          >
            링크 복사
          </button>
        </div>
        {note && <p className="mt-2 text-center text-[13px] text-[var(--ink)]">{note}</p>}
        <EmailOptIn label="해설서 이메일로도 받기" />
        <p className="mt-4 text-center text-xs text-[var(--sub)]">이 해설서는 1년 동안 &lsquo;결과 다시 보기&rsquo;에서 다시 열 수 있어요.</p>
      </section>
    </>
  );
}
