"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MockNote, usePreview } from "@/components/preview/PreviewShell";
import { josa } from "@/lib/format";
import { useIntake } from "@/lib/preview/mock";

const STEPS = ["만세력으로 사주 여덟 글자 세우는 중", "오행과 십성 살피는 중", "올해 흐름 정리하는 중", "풀이 문장 다듬는 중"];

export default function AnalyzingPage() {
  const { base, brand, page, slug } = usePreview();
  const intake = useIntake(slug);
  const router = useRouter();
  const [step, setStep] = useState(0);

  // 실서비스: 무료 풀이가 준비되면(서버 응답) 이동. 지금은 시간으로 흉내
  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length)), 700);
    const go = setTimeout(() => router.replace(`${base}/free`), 700 * STEPS.length + 400);
    return () => {
      clearInterval(t);
      clearTimeout(go);
    };
  }, [base, router]);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-[var(--line)] border-t-[var(--a)]" />
        <span className="absolute inset-0 grid place-items-center text-2xl font-bold text-[var(--ink)]" style={{ fontFamily: "var(--hf)" }}>
          {brand.name[0]}
        </span>
      </div>
      <p className="mt-8 text-lg font-bold text-[var(--ink)]" style={{ fontFamily: "var(--hf)" }}>
        {intake.name}님의 {josa(page.topic, "을", "를")} 읽고 있어요
      </p>
      <ul className="mt-6 space-y-2 text-left text-sm">
        {STEPS.map((s, i) => (
          <li key={s} className={`flex items-center gap-2 transition ${i < step ? "text-[var(--ink)]" : "text-[var(--sub)] opacity-50"}`}>
            <span>{i < step ? "✓" : "·"}</span>
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-8 w-full max-w-[280px]">
        <MockNote>실서비스: 사주 엔진 계산 + 미리 만든 문장 조회 (src/lib/server/reading.ts)</MockNote>
      </div>
    </section>
  );
}
