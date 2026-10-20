"use client";

import Link from "next/link";
import { useState } from "react";
import { AddImagesButton, AssetSelect, AssetThumb } from "@/components/AssetPicker";
import { BrandPreview, BrandStatusBadge, PageLink } from "@/components/BrandBits";
import { Badge, Button, Card, Field, Modal, PageHead, Segmented, Table, inputCls, td } from "@/components/ui";
import { CHANNEL_ICON, RESERVED_SLUGS, emptyTracking, nextDraft, suggestNames } from "@/lib/dummy";
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
        right={
          <>
            <a href="/preview" target="_blank" rel="noreferrer" className="inline-flex h-9 items-center rounded-lg border border-line bg-white px-3.5 text-sm font-medium hover:bg-paper">예시 페이지 ↗</a>
            <AddImagesButton />
            <Button variant="primary" onClick={() => setCreating(true)}>✨ 브랜드 자동 생성</Button>
          </>
        }
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
              <td className={`${td} flex gap-1`}>
                <PageLink slug={b.slug} />
                <Link href={`/brands/${b.id}`} className="inline-flex h-7 items-center rounded-lg border border-line px-2.5 text-xs font-medium hover:bg-paper">
                  설정·패키지
                </Link>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <AssetLibrary />

      <CreateModal open={creating} onClose={() => setCreating(false)} />
    </>
  );
}

function AssetLibrary() {
  const { assets } = useStore();
  return (
    <Card className="mt-5" title={`이미지 라이브러리 ${assets.length}장`} right={<AddImagesButton size="sm" />}>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
        {assets.map((a) => (
          <li key={a.id} className="min-w-0">
            <AssetThumb asset={a} className="aspect-square w-full" />
            <p className="mt-1 truncate text-[11px] text-muted" title={a.name}>{a.name}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">브랜드 자동 생성 때 직접 고르거나, 안 고르면 여기서 어울리는 걸 골라 배경으로 써요.</p>
    </Card>
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
  const { brands, addBrand, notify, assets } = useStore();
  // 키워드: 쓰기 / 안 쓰기 (안 쓰면 컨셉부터 자유롭게)
  const [kwMode, setKwMode] = useState<"use" | "skip">("use");
  const [keyword, setKeyword] = useState("");
  // 이미지: 자동으로 고르기 / 직접 고르기 / 이미지 없이
  const [imgMode, setImgMode] = useState<"auto" | "pick" | "none">("auto");
  const [imageId, setImageId] = useState("");
  const image = imgMode === "pick" ? (assets.find((a) => a.id === imageId) ?? null) : null;
  const kw = kwMode === "use" ? keyword.trim() : "";
  const [draft, setDraft] = useState<BrandDraft | null>(null);
  const [loading, setLoading] = useState(false);
  // 이름: 마음에 들면 고정해서 '다시 생성'해도 유지
  const [keepName, setKeepName] = useState(false);
  const [names, setNames] = useState<ReturnType<typeof suggestNames> | null>(null);
  const needPick = imgMode === "pick" && !image;

  const generate = () => {
    if (needPick) return;
    setLoading(true);
    window.setTimeout(() => {
      const d = nextDraft(kw, imgMode === "none" ? "none" : image, assets);
      setDraft(keepName && draft ? { ...d, name: draft.name, slug: draft.slug } : d);
      setNames(null);
      setLoading(false);
    }, 700);
  };

  const setName = (name: string, slug?: string) => {
    if (!draft) return;
    setDraft({ ...draft, name, ...(slug && { slug }) });
    setKeepName(true);
  };

  const how = [
    kw ? `'${kw}' 키워드에 맞춰` : "키워드 없이 컨셉부터 자유롭게",
    imgMode === "none" ? "이미지 없이 색·그라데이션으로만" : imgMode === "pick" ? (image ? "고른 이미지 분위기로" : "이미지를 골라 주세요") : "이미지는 등록된 것 중 어울리는 걸 골라",
  ].join(", ");

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
    setImageId("");
    setKwMode("use");
    setImgMode("auto");
    setKeepName(false);
    setNames(null);
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
      tracking: emptyTracking(),
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
          <Button variant="primary" disabled={!draft || !!slugError} onClick={create}>이대로 만들기</Button>
        </>
      }
    >
      <div className="space-y-3 rounded-xl border border-line p-3">
        <div className="grid items-center gap-2 sm:grid-cols-[64px_auto_1fr]">
          <span className="text-sm font-medium">키워드</span>
          <Segmented value={kwMode} options={[{ value: "use", label: "활용" }, { value: "skip", label: "활용 안 함" }]} onChange={setKwMode} />
          <input
            value={keyword}
            disabled={kwMode === "skip"}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder={kwMode === "skip" ? "키워드 없이 만들어요" : "예: 20대 여성 팩폭 연애운 (비워 두면 자유롭게)"}
            className={`${inputCls} disabled:bg-paper disabled:text-muted`}
          />
        </div>
        <div className="grid items-center gap-2 sm:grid-cols-[64px_auto_1fr]">
          <span className="text-sm font-medium">이미지</span>
          <Segmented
            value={imgMode}
            options={[{ value: "auto", label: "자동" }, { value: "pick", label: "직접 고르기" }, { value: "none", label: "활용 안 함" }]}
            onChange={setImgMode}
          />
          {imgMode === "pick" ? (
            <div className="flex items-center gap-2">
              <AssetSelect value={imageId} onChange={setImageId} emptyLabel="이미지를 골라 주세요" />
              <AddImagesButton size="sm" onAdded={(added) => setImageId(added[0].id)} />
              {image && <AssetThumb asset={image} className="h-8 w-8" />}
            </div>
          ) : (
            <p className="text-xs text-muted">{imgMode === "auto" ? "등록된 이미지 중 컨셉에 어울리는 걸 골라요" : "사진 없이 색·그라데이션으로만 만들어요"}</p>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-line pt-3">
          <p className={`text-xs ${needPick ? "text-rose-600" : "text-muted"}`}>{how}</p>
          <Button variant="primary" onClick={generate} disabled={loading || needPick}>{loading ? "생성 중…" : draft ? "다시 생성" : "자동 생성"}</Button>
        </div>
      </div>

      {!draft && !loading && <p className="mt-6 text-center text-sm text-muted">상호명·주소·컬러·톤·소개글·광고 카피를 한 번에 만들어요.</p>}

      {draft && (
        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_300px]">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="상호명" hint="마음에 안 들면 직접 고치거나 아래에서 추천받기">
                <input className={inputCls} value={draft.name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <Field label="주소 (slug)" hint={slugError ?? `myeongwoljae.com/${draft.slug}`}>
                <input className={`${inputCls} ${slugError ? "border-rose-400" : ""}`} value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value.toLowerCase() })} />
              </Field>
            </div>
            <div className="-mt-1 flex flex-wrap items-center gap-3">
              <Button size="sm" onClick={() => setNames(suggestNames([draft.name, draft.slug, ...brands.map((b) => b.slug)]))}>다른 이름 추천</Button>
              <label className="flex items-center gap-1.5 text-xs text-muted">
                <input type="checkbox" className="accent-ink" checked={keepName} onChange={(e) => setKeepName(e.target.checked)} />
                다시 생성해도 이 이름·주소 유지
              </label>
            </div>
            {names && (
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {names.map((n) => (
                  <li key={n.slug}>
                    <button type="button" onClick={() => { setName(n.name, n.slug); setNames(null); }} className="w-full rounded-lg border border-line px-3 py-2 text-left hover:border-ink hover:bg-paper">
                      <span className="text-sm font-semibold">{n.name}</span> <span className="text-xs text-muted">/{n.slug}</span>
                      <span className="mt-0.5 block text-xs text-muted">{n.why}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
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
            <Field label="배경 이미지">
              <div className="flex items-center gap-2">
                <AssetSelect
                  emptyLabel="배경 없음 (그라데이션)"
                  value={assets.find((a) => a.src === draft.theme.bgAsset)?.id ?? ""}
                  onChange={(id) => setDraft({ ...draft, theme: { ...draft.theme, bgAsset: assets.find((a) => a.id === id)?.src ?? null } })}
                />
                <AddImagesButton size="sm" onAdded={(added) => setDraft({ ...draft, theme: { ...draft.theme, bgAsset: added[0].src } })} />
              </div>
            </Field>
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
