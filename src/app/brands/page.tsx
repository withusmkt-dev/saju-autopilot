"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandPreview, BrandStatusBadge } from "@/components/BrandBits";
import { Badge, Button, Card, Field, Modal, PageHead, Segmented, Table, inputCls, td } from "@/components/ui";
import { CHANNEL_ICON, RESERVED_SLUGS, nextDraft } from "@/lib/dummy";
import { footerNoteOf } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Brand, BrandDraft, BrandStatus } from "@/lib/types";

type Filter = "all" | BrandStatus;

export default function BrandsPage() {
  const { brands } = useStore();
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const [creating, setCreating] = useState(false);

  const list = brands.filter((b) => (filter === "all" || b.status === filter) && (b.name.includes(q) || b.slug.includes(q)));

  return (
    <>
      <PageHead
        title="브랜드 관리"
        desc="브랜드 주소는 myeongwoljae.com/{slug} · 페이지 자체는 별도 프로젝트에서 이 설정값을 읽어 그립니다"
        right={<Button variant="primary" onClick={() => setCreating(true)}>✨ 브랜드 자동 생성</Button>}
      />

      <Card
        title={`브랜드 ${list.length}개`}
        right={
          <div className="flex items-center gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="이름·주소 검색" className={`${inputCls} h-8 w-36`} />
            <Segmented
              value={filter}
              onChange={setFilter}
              options={[
                { value: "all", label: "전체" },
                { value: "live", label: "운영" },
                { value: "paused", label: "정지" },
                { value: "draft", label: "준비" },
              ]}
            />
          </div>
        }
      >
        <Table head={["브랜드", "주소", "상태", "컨셉", "SNS 연결", "생성일", ""]}>
          {list.map((b) => (
            <tr key={b.id} className="hover:bg-paper">
              <td className={td}>
                <span className="mr-1 inline-flex gap-0.5 align-middle">
                  <i className="h-3 w-3 rounded-sm" style={{ background: b.theme.primary }} />
                  <i className="h-3 w-3 rounded-sm" style={{ background: b.theme.accent }} />
                </span>
                <span className="ml-1 font-medium">{b.name}</span>
              </td>
              <td className={`${td} text-muted`}>/{b.slug}</td>
              <td className={td}><BrandStatusBadge status={b.status} /></td>
              <td className={td}>{b.tone.concept}</td>
              <td className={td}>
                <SnsDots brand={b} />
              </td>
              <td className={`${td} text-muted`}>{b.createdAt}</td>
              <td className={td}>
                <Link href={`/brands/${b.id}`} className="inline-flex h-7 items-center rounded-lg border border-line px-2.5 text-xs font-medium hover:bg-paper">
                  설정·패키지
                </Link>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <CreateModal open={creating} onClose={() => setCreating(false)} />
    </>
  );
}

export function SnsDots({ brand }: { brand: Brand }) {
  return (
    <span className="flex gap-1">
      {brand.sns.map((s) => (
        <span key={s.channel} title={`${s.channel} ${s.connected ? "연결됨" : "미연결"}`} className={s.connected ? "" : "opacity-25 grayscale"}>
          {CHANNEL_ICON[s.channel]}
        </span>
      ))}
    </span>
  );
}

function CreateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { brands, addBrand, notify } = useStore();
  const [keyword, setKeyword] = useState("");
  const [draft, setDraft] = useState<BrandDraft | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    // TODO(API): POST /api/brands/draft { keyword } → Claude 가 BrandDraft JSON 반환
    window.setTimeout(() => {
      setDraft(nextDraft(keyword.trim()));
      setLoading(false);
    }, 700);
  };

  const slugError = draft
    ? !/^[a-z0-9-]{2,30}$/.test(draft.slug)
      ? "영문 소문자·숫자·하이픈 2~30자"
      : RESERVED_SLUGS.includes(draft.slug)
        ? "명월재에서 이미 쓰는 주소예요"
        : brands.some((b) => b.slug === draft.slug)
          ? "이미 있는 브랜드 주소예요"
          : null
    : null;

  const close = () => {
    setDraft(null);
    setKeyword("");
    onClose();
  };

  const create = () => {
    if (!draft || slugError) return;
    const id = `b${String(brands.length + 1).padStart(2, "0")}_${draft.slug}`;
    addBrand({
      id,
      slug: draft.slug,
      name: draft.name,
      heroTitle: draft.heroTitle,
      heroDesc: draft.heroDesc,
      theme: draft.theme,
      tone: draft.tone,
      orderNamePrefix: draft.name,
      footerNote: footerNoteOf(draft.name),
      tracking: { metaPixelId: "", ga4Id: "", tiktokPixelId: "" },
      sns: (["threads", "instagram", "tiktok", "youtube"] as const).map((channel) => ({ channel, handle: null, connected: false, tokenExpiresAt: null })),
      status: "draft",
      createdAt: "2026-10-19",
      stats: { visitors: 0, freeUsers: 0, buyers: 0, revenue: 0, adSpend: 0 },
    });
    notify(`${draft.name} 브랜드를 만들었어요 (준비 중)`);
    close();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="브랜드 자동 생성"
      wide
      footer={
        <>
          <Button onClick={close}>취소</Button>
          {draft && <Button onClick={generate} disabled={loading}>다시 생성</Button>}
          <Button variant="primary" disabled={!draft || !!slugError} onClick={create}>이대로 만들기</Button>
        </>
      }
    >
      <div className="flex gap-2">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="키워드·디자인 설명 (비우면 완전 랜덤) 예: 20대 여성 팩폭 연애운"
          className={inputCls}
        />
        <Button variant="primary" onClick={generate} disabled={loading}>{loading ? "생성 중…" : "자동 생성"}</Button>
      </div>

      {!draft && !loading && <p className="mt-6 text-center text-sm text-muted">상호명·주소·컬러·톤·소개글·광고 카피를 한 번에 만들어요.</p>}

      {draft && (
        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_300px]">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="상호명">
                <input className={inputCls} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </Field>
              <Field label="주소 (slug)" hint={slugError ?? `myeongwoljae.com/${draft.slug}`}>
                <input className={`${inputCls} ${slugError ? "border-rose-400" : ""}`} value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value.toLowerCase() })} />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(["primary", "accent", "background"] as const).map((k) => (
                <Field key={k} label={k === "primary" ? "메인 컬러" : k === "accent" ? "포인트 컬러" : "바탕색"}>
                  <div className="flex items-center gap-2">
                    <input type="color" value={draft.theme[k]} onChange={(e) => setDraft({ ...draft, theme: { ...draft.theme, [k]: e.target.value } })} className="h-9 w-10 cursor-pointer rounded border border-line" />
                    <span className="text-xs text-muted">{draft.theme[k]}</span>
                  </div>
                </Field>
              ))}
            </div>
            <Field label="톤앤매너">
              <p className="rounded-lg bg-paper px-3 py-2 text-sm">
                <Badge color="blue">{draft.tone.concept}</Badge> {draft.tone.instruction}
              </p>
            </Field>
            <Field label="SNS 소개글">
              <p className="rounded-lg bg-paper px-3 py-2 text-sm whitespace-pre-line">{draft.bio}</p>
            </Field>
            <Field label="1차 광고 카피">
              <ul className="space-y-1 rounded-lg bg-paper px-3 py-2 text-sm">
                {draft.adCopies.map((c) => <li key={c}>· {c}</li>)}
              </ul>
            </Field>
          </div>
          <BrandPreview name={draft.name} heroTitle={draft.heroTitle} heroDesc={draft.heroDesc} theme={draft.theme} footerNote={footerNoteOf(draft.name)} />
        </div>
      )}
    </Modal>
  );
}
