"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MockNote, PButton, PCard, PTitle, useAos, useAosInit, usePreview } from "@/components/preview/PreviewShell";
import { ElementBars, Lock, MonthFlow, PillarTable } from "@/components/preview/SajuChart";
import { josa } from "@/lib/format";
import { PAID_CHAPTERS, SAMPLE_SAJU } from "@/lib/preview/brandPages";
import { sendSmsMock, useIntake } from "@/lib/preview/mock";
import EmailOptIn from "@/components/preview/EmailOptIn";
import { FreeReadings } from "@/components/preview/ResultParts";

const hf = { fontFamily: "var(--hf)" };
const sf = { fontFamily: "var(--sf)" };

export default function FreeResultPage() {
  useAosInit();
  const { slug, base, brand, page, skin } = usePreview();
  const center = skin.result.align === "center";
  const plainChart = skin.result.pillar === "ink" || skin.result.pillar === "grid";
  const intake = useIntake(slug);
  const router = useRouter();
  const aos = useAos();
  const [sent, setSent] = useState<string | null>(null);
  const couple = page.formType === "couple" && intake.partner;

  const sendLink = async () => {
    // 실서비스: sendBrandSms(phone, "free", ...)  ← src/lib/server/sms.ts
    const r = await sendSmsMock(intake.phone, "free", { brand: brand.orderNamePrefix, name: intake.name, link: "myeongwoljae.com/r/free01" });
    setSent(`${r.to} 으로 보냈어요 (목업): ${r.text}`);
  };

  return (
    <>
      <section className={`px-5 pt-9 pb-3 ${center ? "text-center" : ""}`}>
        <p className="text-[13px] tracking-wider text-[var(--sub)]">무료 풀이 · {page.topic}</p>
        <h1 className="mt-2 text-[28px] leading-snug text-[var(--ink)]" style={hf}>
          {couple ? `${intake.name} ♥ ${intake.partner!.name}` : `${intake.name}님의 사주`}
        </h1>
        <p className="mt-1 text-[13px] text-[var(--sub)]">
          {intake.birthDate} ({intake.calendar === "solar" ? "양력" : "음력"}) · {intake.birthTime ?? "시간 모름"} · 일간 {SAMPLE_SAJU.dayMaster}
        </p>
      </section>

      {couple && (
        <section className="px-5 pt-5" {...aos()}>
          <PCard className="text-center">
            <p className="text-xs text-[var(--sub)]">두 사람의 궁합 점수</p>
            <p className="mt-1 text-5xl text-[var(--ink)]" style={hf}>78<span className="text-xl">점</span></p>
            <p className="mt-2 text-sm">서로의 부족한 기운을 채워 주는 사이예요.</p>
          </PCard>
        </section>
      )}

      <section className="px-5 py-5" {...aos()}>
        {(() => {
          const chart = (
            <>
              <p className={`mb-3 text-[16px] font-bold text-[var(--ink)] ${center ? "text-center" : ""}`} style={sf}>사주 원국</p>
              <PillarTable />
              <p className={`mt-6 mb-3 text-[16px] font-bold text-[var(--ink)] ${center ? "text-center" : ""}`} style={sf}>오행 분포</p>
              <ElementBars />
              <MockNote>사주 값은 샘플이에요. 실서비스: @withusmkt-dev/saju-engine 계산 결과</MockNote>
            </>
          );
          return plainChart ? chart : <PCard>{chart}</PCard>;
        })()}
      </section>

      <section className="px-5 pb-5">
        <div className={center ? "text-center" : ""}>
          <PTitle eyebrow="무료 풀이">{josa(brand.name, "이", "가")} 읽은 이야기</PTitle>
        </div>
        <FreeReadings items={page.free} name={intake.name} brand={brand.name} />
      </section>

      <section className="px-5 pb-5" {...aos()}>
        <PCard>
          <p className="mb-3 text-[16px] font-bold text-[var(--ink)]" style={sf}>2027년 월별 흐름</p>
          <MonthFlow locked />
          <p className="mt-2 text-[13px] text-[var(--sub)]">최고의 달과 조심할 달은 해설서에서 열려요.</p>
        </PCard>
      </section>

      {/* 잠긴 목차 → 결제로 */}
      <section className="px-5 pb-10">
        <PCard className="!p-0 overflow-hidden">
          <div className="bg-[var(--a)] px-4 py-2.5 text-[15px] font-bold text-[var(--p)]">해설서에서 이어지는 이야기</div>
          <ol className="divide-y divide-[var(--line)] px-4">
            {PAID_CHAPTERS.map((c, i) => (
              <li key={c} className={`flex items-center justify-between py-3 text-[15px] ${i < 3 ? "" : "text-[var(--sub)]"}`}>
                <span>{String(i + 1).padStart(2, "0")}. {c}</span>
                {i >= 3 && <Lock />}
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
          무료 결과 문자로 받기
        </button>
        {sent && <p className="mt-2 text-center text-[13px] text-[var(--ink)]">{sent}</p>}
        <EmailOptIn label="무료 결과 이메일로도 받기" />
      </section>
    </>
  );
}
