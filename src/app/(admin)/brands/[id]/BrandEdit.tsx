"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import { BrandPreview, BrandStatusBadge, Dropzone, PageLink } from "@/components/BrandBits";
import CopyPackage from "@/components/CopyPackage";
import { AddImagesButton, AssetThumb } from "@/components/AssetPicker";
import { Badge, Button, Card, Field, PageHead, Segmented, inputCls, textareaCls } from "@/components/ui";
import { CHANNEL_ICON, CHANNEL_LABEL, FONT_LABEL, PIXELS } from "@/lib/dummy";
import { useStore } from "@/lib/store";
import type { Brand, FontKey } from "@/lib/types";

type Tab = "basic" | "design" | "tone" | "connect" | "package";


export default function BrandEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { brands, setBrand, notify, assets } = useStore();
  const saved = brands.find((b) => b.id === id);
  const [form, setForm] = useState<Brand | null>(saved ?? null);
  const [tab, setTab] = useState<Tab>("basic");
  if (!saved || !form) notFound();

  const set = (patch: Partial<Brand>) => setForm({ ...form, ...patch });
  const dirty = JSON.stringify(form) !== JSON.stringify(saved);

  const save = () => {
    // TODO(API): PATCH /api/brands/{id} → site_config 저장
    setBrand(form.id, form);
    notify("저장했어요");
  };

  return (
    <>
      <PageHead
        title={form.name}
        desc={`myeongwoljae.com/${form.slug}`}
        right={
          <>
            <Link href="/brands" className="inline-flex h-9 items-center rounded-lg border border-line bg-white px-3.5 text-sm">목록</Link>
            <PageLink slug={saved.slug} big />
            {form.status === "draft" && (
              <Button onClick={() => { setBrand(form.id, { ...form, status: "live" }); setForm({ ...form, status: "live" }); notify(`${form.name} 페이지를 열었어요`); }}>
                페이지 열기 (라이브)
              </Button>
            )}
            <Button variant="primary" disabled={!dirty} onClick={save}>저장</Button>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <BrandStatusBadge status={form.status} />
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: "basic", label: "기본 정보" },
            { value: "design", label: "디자인" },
            { value: "tone", label: "문구·톤" },
            { value: "connect", label: "추적·SNS" },
            { value: "package", label: "복붙 패키지" },
          ]}
        />
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[1fr_320px]">
        <Card>
          {tab === "basic" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="상호명">
                <input className={inputCls} value={form.name} onChange={(e) => set({ name: e.target.value })} />
              </Field>
              <Field label="주소 (slug)" hint="바꾸면 기존 링크·광고가 끊겨요">
                <input className={inputCls} value={form.slug} onChange={(e) => set({ slug: e.target.value.toLowerCase() })} />
              </Field>
              <Field label="결제 상품명 앞부분" hint={`토스 결제창 상품명: "${form.orderNamePrefix} 심층사주"`}>
                <input className={inputCls} value={form.orderNamePrefix} onChange={(e) => set({ orderNamePrefix: e.target.value })} />
              </Field>
              <Field label="상태">
                <select className={inputCls} value={form.status} onChange={(e) => set({ status: e.target.value as Brand["status"] })}>
                  <option value="draft">준비 중</option>
                  <option value="live">운영 중</option>
                  <option value="paused">일시정지</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="푸터 운영 문구" hint="사업자 정보는 명월재와 같은 값이 자동으로 들어가요">
                  <input className={inputCls} value={form.footerNote} onChange={(e) => set({ footerNote: e.target.value })} />
                </Field>
              </div>
              <Field label="로고·파비콘">
                <div className="flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-lg text-sm font-bold text-white" style={{ background: form.theme.primary }}>{form.name[0]}</span>
                  <Button size="sm" onClick={() => notify("업로드는 백엔드 연결 후 동작해요")}>업로드</Button>
                  <Button size="sm" onClick={() => notify("AI 로고 생성은 백엔드 연결 후 동작해요")}>AI로 생성</Button>
                </div>
              </Field>
            </div>
          )}

          {tab === "design" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {(["primary", "accent", "background"] as const).map((k) => (
                  <Field key={k} label={k === "primary" ? "메인 컬러" : k === "accent" ? "포인트 컬러" : "바탕색"}>
                    <div className="flex items-center gap-2">
                      <input type="color" value={form.theme[k]} onChange={(e) => set({ theme: { ...form.theme, [k]: e.target.value } })} className="h-9 w-10 cursor-pointer rounded border border-line" />
                      <span className="text-xs text-muted">{form.theme[k]}</span>
                    </div>
                  </Field>
                ))}
              </div>
              <Field label="폰트">
                <select className={inputCls} value={form.theme.font} onChange={(e) => set({ theme: { ...form.theme, font: e.target.value as FontKey } })}>
                  {Object.entries(FONT_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="SNS 프로필 이미지 (.png)">
                  <Dropzone label="프로필" onPick={(n) => notify(`${n} — 업로드는 백엔드 연결 후 동작해요`)} />
                </Field>
                <Field label="배경 이미지 직접 올리기" hint="올리면 라이브러리에도 들어가요">
                  <div className="flex h-[50px] items-center">
                    <AddImagesButton onAdded={(added) => set({ theme: { ...form.theme, bgAsset: added[0].src } })} />
                  </div>
                </Field>
              </div>
              <Field label="배경 이미지 (라이브러리)" hint="선택 안 하면 메인 컬러 그라데이션">
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  <button type="button" onClick={() => set({ theme: { ...form.theme, bgAsset: null } })} className={`h-16 rounded-lg border-2 text-xs ${form.theme.bgAsset === null ? "border-ink" : "border-line"}`} style={{ background: `linear-gradient(${form.theme.primary}, ${form.theme.primary}aa)`, color: "#fff" }}>
                    없음
                  </button>
                  {assets.map((a) => (
                    <button key={a.id} type="button" title={a.name} onClick={() => set({ theme: { ...form.theme, bgAsset: a.src } })} className={`h-16 overflow-hidden rounded-lg border-2 ${form.theme.bgAsset === a.src ? "border-ink" : "border-line"}`}>
                      <AssetThumb asset={a} className="h-full w-full" />
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {tab === "tone" && (
            <div className="space-y-4">
              <Field label="메인 제목">
                <input className={inputCls} value={form.heroTitle} onChange={(e) => set({ heroTitle: e.target.value })} />
              </Field>
              <Field label="메인 설명">
                <input className={inputCls} value={form.heroDesc} onChange={(e) => set({ heroDesc: e.target.value })} />
              </Field>
              <Field label="컨셉">
                <input className={inputCls} value={form.tone.concept} onChange={(e) => set({ tone: { ...form.tone, concept: e.target.value } })} />
              </Field>
              <Field label="말투 지침" hint="해설서·콘텐츠 프롬프트의 {tone_instruction} 자리에 들어가요">
                <textarea rows={3} className={textareaCls} value={form.tone.instruction} onChange={(e) => set({ tone: { ...form.tone, instruction: e.target.value } })} />
              </Field>
              <Field label="강조할 영역">
                <input className={inputCls} value={form.tone.focus} onChange={(e) => set({ tone: { ...form.tone, focus: e.target.value } })} />
              </Field>
            </div>
          )}

          {tab === "connect" && (
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium">추적 픽셀</p>
                  <Badge color="blue">사용 {PIXELS.filter((px) => form.tracking[px.key]).length}개</Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PIXELS.map((px) => (
                    <Field key={px.key} label={px.label} hint={px.hint}>
                      <input
                        className={inputCls}
                        placeholder={px.placeholder}
                        value={form.tracking[px.key]}
                        onChange={(e) => set({ tracking: { ...form.tracking, [px.key]: e.target.value.trim() } })}
                      />
                    </Field>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted">비워 두면 안 심어요. 보내는 이벤트: 방문 · 무료 풀이 신청 · 결제 완료 (매체별 표준 이벤트로 변환)</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium">SNS 계정 연결</p>
                <ul className="divide-y divide-line rounded-lg border border-line">
                  {form.sns.map((s, i) => (
                    <li key={s.channel} className="flex flex-wrap items-center gap-2 px-3 py-2.5 text-sm">
                      <span className="w-24">{CHANNEL_ICON[s.channel]} {CHANNEL_LABEL[s.channel]}</span>
                      <input
                        className={`${inputCls} h-8 w-40`}
                        placeholder="@계정"
                        value={s.handle ?? ""}
                        onChange={(e) => set({ sns: form.sns.map((x, j) => (j === i ? { ...x, handle: e.target.value || null } : x)) })}
                      />
                      {s.connected ? <Badge color="green">토큰 연결됨</Badge> : <Badge>미연결</Badge>}
                      {s.tokenExpiresAt && <span className="text-xs text-muted">만료 {s.tokenExpiresAt}</span>}
                      <Button size="sm" className="ml-auto" onClick={() => notify(`${CHANNEL_LABEL[s.channel]} 토큰 등록은 백엔드 연결 후 동작해요`)}>
                        {s.connected ? "토큰 교체" : "토큰 등록"}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "package" && <CopyPackage brand={form} />}
        </Card>

        <div className="lg:sticky lg:top-20">
          <p className="mb-2 text-center text-xs text-muted">미리보기 (실제 페이지는 별도 프로젝트)</p>
          <BrandPreview name={form.name} heroTitle={form.heroTitle} heroDesc={form.heroDesc} theme={form.theme} footerNote={form.footerNote} />
        </div>
      </div>
    </>
  );
}
