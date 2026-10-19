"use client";

import { useState } from "react";
import { MockNote, PTitle, usePreview } from "@/components/preview/PreviewShell";
import { ElementBars, MonthFlow, PillarTable } from "@/components/preview/SajuChart";
import { PAID_CHAPTERS, PAID_SAMPLE } from "@/lib/preview/brandPages";
import { useIntake, useOrder } from "@/lib/preview/mock";

export default function PaidResultPage() {
  const { slug, brand, page } = usePreview();
  const intake = useIntake(slug);
  const order = useOrder(slug);
  const [open, setOpen] = useState(0);
  const [note, setNote] = useState("");

  return (
    <>
      {order && (
        <div className="bg-emerald-50 px-5 py-3 text-xs text-emerald-800">
          ✓ 결제 완료 · 주문번호 {order.orderId}
          <br />
          {intake.phone} 으로 해설서 링크를 보냈어요 (목업) · 🔗 {order.shortLink}
        </div>
      )}

      <section className="relative overflow-hidden bg-[var(--p)] px-6 py-12 text-center text-white">
        <p className="text-xs tracking-widest text-[var(--a)]">{brand.orderNamePrefix} {page.product.name}</p>
        <h1 className="mt-3 text-3xl leading-snug" style={{ fontFamily: "var(--hf)" }}>
          {intake.name}님의
          <br />
          해설서가 준비되었어요
        </h1>
        <p className="mx-auto mt-4 max-w-[300px] text-sm leading-relaxed opacity-80">{page.paidIntro}</p>
      </section>

      <section className="px-5 py-6">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <PillarTable />
          <div className="mt-4">
            <ElementBars />
          </div>
        </div>
      </section>

      <section className="px-5 pb-6">
        <PTitle eyebrow="목차">열 장의 이야기</PTitle>
        <ol className="space-y-2">
          {PAID_CHAPTERS.map((c, i) => (
            <li key={c} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between px-4 py-3.5 text-left">
                <span className="font-bold text-[var(--p)]">
                  <span className="mr-2 text-[var(--a)]">{String(i + 1).padStart(2, "0")}</span>
                  {c}
                </span>
                <span className="text-xs text-[#999]">{open === i ? "접기" : "펼치기"}</span>
              </button>
              {open === i && (
                <div className="border-t border-black/5 px-4 py-4 text-[15px] leading-relaxed text-[#333]">
                  {i === 7 ? (
                    <MonthFlow />
                  ) : (
                    <p>{PAID_SAMPLE[i] ?? `${c}에 대한 본문이 들어가는 자리예요. 실서비스에서는 사주 계산 결과와 브랜드 말투(${brand.tone.concept})로 Claude 가 이 장을 써요.`}</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ol>
        <MockNote>본문은 앞 3장만 샘플이에요. 실서비스: 앵커 1회 + 섹션 10회 생성 (src/lib/server/reading.ts)</MockNote>
      </section>

      <section className="px-5 pb-10">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setNote("PDF 저장은 실서비스에서 /api/pdf 로 만들어요 (목업)")} className="rounded-xl border border-black/10 bg-white py-3 text-sm">
            📄 PDF로 저장
          </button>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(order?.shortLink ?? "").catch(() => {});
              setNote("결과 링크를 복사했어요");
            }}
            className="rounded-xl border border-black/10 bg-white py-3 text-sm"
          >
            🔗 링크 복사
          </button>
        </div>
        {note && <p className="mt-2 text-center text-xs text-[var(--p)]">{note}</p>}
        <p className="mt-4 text-center text-xs text-[#999]">이 해설서는 1년 동안 &lsquo;결과 다시 보기&rsquo;에서 다시 열 수 있어요.</p>
      </section>
    </>
  );
}
