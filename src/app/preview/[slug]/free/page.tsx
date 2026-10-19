"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MockNote, PButton, PCard, PTitle, usePreview } from "@/components/preview/PreviewShell";
import { ElementBars, MonthFlow, PillarTable } from "@/components/preview/SajuChart";
import { josa } from "@/lib/format";
import { PAID_CHAPTERS, SAMPLE_SAJU } from "@/lib/preview/brandPages";
import { sendResultAlimtalkMock, useIntake } from "@/lib/preview/mock";

const hf = { fontFamily: "var(--hf)" };

export default function FreeResultPage() {
  const { slug, base, brand, page } = usePreview();
  const intake = useIntake(slug);
  const router = useRouter();
  const [sent, setSent] = useState<string | null>(null);
  const couple = page.formType === "couple" && intake.partner;

  const sendLink = async () => {
    // 실서비스: sendResultAlimtalk(phone, name, shortLink)  ← src/lib/server/alimtalk.ts
    const r = await sendResultAlimtalkMock(intake.phone, "myeongwoljae.com/r/free01");
    setSent(`${r.to} 으로 결과 링크를 보냈어요 (목업)`);
  };

  return (
    <>
      <section className="px-5 pt-8 pb-2">
        <p className="text-xs text-[var(--sub)]">무료 풀이 · {page.topic}</p>
        <h1 className="mt-1 text-[28px] font-bold text-[var(--ink)]" style={hf}>
          {couple ? `${intake.name} ♥ ${intake.partner!.name}` : `${intake.name}님의 사주`}
        </h1>
        <p className="mt-1 text-xs text-[var(--sub)]">
          {intake.birthDate} ({intake.calendar === "solar" ? "양력" : "음력"}) · {intake.birthTime ?? "시간 모름"} · 일간 {SAMPLE_SAJU.dayMaster}
        </p>
      </section>

      {couple && (
        <section className="px-5 pt-5">
          <PCard className="text-center">
            <p className="text-xs text-[var(--sub)]">두 사람의 궁합 점수</p>
            <p className="mt-1 text-5xl font-bold text-[var(--ink)]" style={hf}>78<span className="text-xl">점</span></p>
            <p className="mt-2 text-sm">서로의 부족한 기운을 채워 주는 사이예요.</p>
          </PCard>
        </section>
      )}

      <section className="px-5 py-5">
        <PCard>
          <p className="mb-3 text-sm font-bold text-[var(--ink)]">사주 원국</p>
          <PillarTable />
          <p className="mt-4 mb-2 text-sm font-bold text-[var(--ink)]">오행 분포</p>
          <ElementBars />
          <MockNote>사주 값은 샘플이에요. 실서비스: @withusmkt-dev/saju-engine 계산 결과</MockNote>
        </PCard>
      </section>

      <section className="px-5 pb-5">
        <PTitle eyebrow="무료 풀이">{josa(brand.name, "이", "가")} 읽은 이야기</PTitle>
        <div className="space-y-3">
          {page.free.map((s) => (
            <PCard key={s.title}>
              <h3 className="font-bold text-[var(--ink)]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{s.text}</p>
            </PCard>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <PCard>
          <p className="mb-3 text-sm font-bold text-[var(--ink)]">2027년 월별 흐름</p>
          <MonthFlow locked />
          <p className="mt-2 text-xs text-[var(--sub)]">최고의 달과 조심할 달은 해설서에서 열려요.</p>
        </PCard>
      </section>

      {/* 잠긴 목차 → 결제로 */}
      <section className="px-5 pb-10">
        <PCard className="!p-0 overflow-hidden">
          <div className="bg-[var(--a)] px-4 py-2 text-sm font-bold text-[var(--p)]">🔒 해설서에서 이어지는 이야기</div>
          <ol className="divide-y divide-[var(--line)] px-4">
            {PAID_CHAPTERS.map((c, i) => (
              <li key={c} className={`flex items-center justify-between py-2.5 text-sm ${i < 3 ? "" : "text-[var(--sub)]"}`}>
                <span>{String(i + 1).padStart(2, "0")}. {c}</span>
                {i >= 3 && <span>🔒</span>}
              </li>
            ))}
          </ol>
          <div className="p-4">
            <p className="text-center text-sm">
              <span className="mr-2 text-[var(--sub)] line-through">₩{page.product.listPrice.toLocaleString()}</span>
              <b className="text-xl text-[var(--ink)]">₩{page.product.price.toLocaleString()}</b>
            </p>
            <PButton className="mt-3" onClick={() => router.push(`${base}/pay`)}>{page.product.name} 열어 보기</PButton>
          </div>
        </PCard>

        <button type="button" onClick={sendLink} className="mt-4 w-full border border-[var(--line)] py-3 text-sm text-[var(--sub)]">
          📩 무료 결과 링크 문자로 받기
        </button>
        {sent && <p className="mt-2 text-center text-xs text-[var(--ink)]">{sent}</p>}
      </section>
    </>
  );
}
