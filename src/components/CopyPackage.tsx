"use client";

import { Button } from "./ui";
import BrandMark from "./preview/BrandMark";
import { useStore } from "@/lib/store";
import type { Brand } from "@/lib/types";

/** 사람이 SNS 계정 만들 때 복사해 갈 것들 */
export default function CopyPackage({ brand }: { brand: Brand }) {
  const { notify } = useStore();
  const bio = `${brand.name} | ${brand.tone.concept} 사주\n${brand.heroDesc}\n무료 풀이 👇 myeongwoljae.com/${brand.slug}`;
  const copies = [`${brand.heroTitle}`, `올해 남은 석 달, ${brand.tone.focus} 흐름이 궁금하다면`];
  const copy = (t: string) => {
    navigator.clipboard?.writeText(t).catch(() => {});
    notify("복사했어요");
  };
  const steps = [
    "SNS·광고 계정 가입 (본인인증, 카드 등록)",
    "프로필 사진 업로드 · 이름·소개글 붙여넣기",
    "API 토큰 발급 → '추적·SNS' 탭에 등록",
    "브랜드 '페이지 열기' 후 오토파일럿 시작",
  ];
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-xs font-medium">사람이 할 일 (브랜드당 1회)</p>
        <ol className="space-y-1.5 text-sm">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-2">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-[10px] text-white">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex items-center gap-3">
        <span className="grid h-16 w-16 place-items-center rounded-full text-white" style={{ background: brand.theme.primary }}><BrandMark slug={brand.slug} accent={brand.theme.accent} className="h-9 w-9" /></span>
        <div className="space-y-1">
          <p className="text-sm font-medium">프로필 이미지</p>
          <Button size="sm" onClick={() => notify("이미지 다운로드는 백엔드 연결 후 동작해요")}>profile.png 다운로드</Button>
        </div>
      </div>
      <PackRow label="프로필 이름" text={brand.name} onCopy={copy} />
      <PackRow label="소개글 (Bio)" text={bio} onCopy={copy} />
      {copies.map((c, i) => <PackRow key={c} label={`1차 광고 카피 ${i + 1}`} text={c} onCopy={copy} />)}
      <div className="rounded-lg bg-paper p-3 text-xs leading-relaxed text-muted">
        토큰 발급 가이드 · Threads: Meta 개발자 앱 → Threads API → 사용자 토큰 · Meta 광고: 비즈니스 관리자 → 시스템 사용자 토큰 · TikTok·YouTube: 앱 심사 전에는 비공개 업로드만 돼요.
      </div>
    </div>
  );
}

function PackRow({ label, text, onCopy }: { label: string; text: string; onCopy: (t: string) => void }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium">{label}</span>
        <Button size="sm" onClick={() => onCopy(text)}>복사</Button>
      </div>
      <p className="rounded-lg border border-line bg-paper px-3 py-2 text-sm whitespace-pre-line">{text}</p>
    </div>
  );
}
