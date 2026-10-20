"use client";

import { useState } from "react";
import { Badge, Button, Card, Field, PageHead, Segmented, inputCls } from "@/components/ui";
import { CHANNEL_ICON, CHANNEL_LABEL, CONCEPTS, makeContent } from "@/lib/dummy";
import { useBrandMap, useStore } from "@/lib/store";
import PostPreview from "@/components/content/PostPreview";
import type { Brand, Channel, ContentItem, GenerateMode, PartKey, UploadMode } from "@/lib/types";

const PART_OPTIONS: Record<Channel, { key: PartKey; label: string }[]> = {
  threads: [
    { key: "threads.thread", label: "텍스트 타래(1/N)" },
    { key: "threads.cardText", label: "카드뉴스 문구" },
    { key: "threads.cta", label: "CTA 숏링크" },
  ],
  instagram: [
    { key: "instagram.cardNews", label: "카드뉴스" },
    { key: "instagram.reelsScript", label: "릴스 대본" },
    { key: "instagram.caption", label: "피드 캡션" },
  ],
  tiktok: [
    { key: "tiktok.script", label: "숏폼 대본" },
    { key: "tiktok.caption", label: "캡션·태그" },
  ],
  youtube: [
    { key: "youtube.script", label: "쇼츠 대본" },
    { key: "youtube.thumbnail", label: "썸네일 문구" },
    { key: "youtube.titleDesc", label: "제목·설명" },
  ],
};

const CHANNELS: Channel[] = ["threads", "instagram", "tiktok", "youtube"];
// 처음에는 스레드만 운영
const ENABLED: Record<Channel, boolean> = { threads: true, instagram: false, tiktok: false, youtube: false };

export default function ContentPage() {
  const { brands, contents, setContents, notify } = useStore();
  const brandMap = useBrandMap();
  const live = brands.filter((b) => b.status !== "draft");

  const [brandIds, setBrandIds] = useState<string[]>([live[0]?.id].filter(Boolean) as string[]);
  const [concept, setConcept] = useState(CONCEPTS[0]);
  const [count, setCount] = useState(3);
  const [mode, setMode] = useState<GenerateMode>("text");
  const [upload, setUpload] = useState<UploadMode>("manual");
  const [parts, setParts] = useState<PartKey[]>(PART_OPTIONS.threads.map((p) => p.key));
  const [loading, setLoading] = useState(false);

  const togglePart = (k: PartKey) => setParts((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const chosenChannels = CHANNELS.filter((c) => PART_OPTIONS[c].some((p) => parts.includes(p.key)));

  const generate = () => {
    if (brandIds.length === 0 || chosenChannels.length === 0) return;
    setLoading(true);
    // TODO(API): POST /api/content/generate (GenerateRequest) → ContentItem[]
    //   프롬프트: src/lib/prompts/adContent.ts, 호출: src/lib/server/generate.ts generateContents
    window.setTimeout(() => {
      const stamp = Date.now().toString(36);
      const made: ContentItem[] = brandIds.flatMap((bid) =>
        Array.from({ length: count }, (_, i) => {
          const item = makeContent(`cnt_${stamp}${bid}${i}`, bid, concept, mode, chosenChannels, upload);
          item.channels = item.channels.map((c) => ({ ...c, parts: c.parts.filter((p) => parts.includes(p.key)) }));
          return item;
        }),
      );
      setContents((prev) => [...made, ...prev]);
      setLoading(false);
      notify(`${made.length}개 만들었어요`);
    }, 900);
  };

  return (
    <>
      <PageHead title="AI 콘텐츠 팩토리" desc="지금은 스레드만 운영 · 다른 매체는 껍데기만 열어 둠" />

      <Card title="1. 무엇을 만들까">
        <div className="space-y-4">
          <Field label="브랜드 (여러 개 선택 가능)">
            <div className="flex flex-wrap gap-1.5">
              <Button size="sm" variant={brandIds.length === live.length ? "primary" : "outline"} onClick={() => setBrandIds(brandIds.length === live.length ? [] : live.map((b) => b.id))}>
                전체
              </Button>
              {live.map((b) => {
                const on = brandIds.includes(b.id);
                return (
                  <Button key={b.id} size="sm" variant={on ? "primary" : "outline"} onClick={() => setBrandIds((ids) => (on ? ids.filter((x) => x !== b.id) : [...ids, b.id]))}>
                    {b.name}
                  </Button>
                );
              })}
            </div>
          </Field>
          <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
            <Field label="컨셉">
              <input list="concepts" className={inputCls} value={concept} onChange={(e) => setConcept(e.target.value)} />
              <datalist id="concepts">{CONCEPTS.map((c) => <option key={c} value={c} />)}</datalist>
            </Field>
            <Field label="브랜드당 개수">
              <select className={inputCls} value={count} onChange={(e) => setCount(Number(e.target.value))}>
                {[1, 2, 3, 5, 10].map((n) => <option key={n} value={n}>{n}개</option>)}
              </select>
            </Field>
          </div>
        </div>
      </Card>

      <Card title="2. 매체와 구성 요소" className="mt-4">
        <div className="grid gap-3 md:grid-cols-2">
          {CHANNELS.map((ch) => (
            <div key={ch} className={`rounded-lg border p-3 ${ENABLED[ch] ? "border-line" : "border-dashed border-line bg-paper/60"}`}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{CHANNEL_ICON[ch]} {CHANNEL_LABEL[ch]}</span>
                {!ENABLED[ch] && <Badge>추후 오픈</Badge>}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {PART_OPTIONS[ch].map((p) => (
                  <label key={p.key} className={`flex items-center gap-1.5 text-sm ${ENABLED[ch] ? "" : "opacity-50"}`}>
                    <input type="checkbox" disabled={!ENABLED[ch]} checked={parts.includes(p.key)} onChange={() => togglePart(p.key)} className="accent-ink" />
                    {p.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="3. 생성·업로드 방식" className="mt-4">
        <div className="flex flex-wrap items-end gap-6">
          <Field label="생성 모드">
            <Segmented
              value={mode}
              onChange={setMode}
              options={[
                { value: "text", label: "텍스트·이미지 (빠름·저렴)" },
                { value: "video", label: "숏폼 영상 (대본+음성+영상)" },
              ]}
            />
          </Field>
          <Field label="업로드 모드">
            <Segmented
              value={upload}
              onChange={setUpload}
              options={[
                { value: "manual", label: "수동 (다운로드·복사)" },
                { value: "auto", label: "자동 포스팅 API" },
              ]}
            />
          </Field>
          <Button variant="primary" className="ml-auto" disabled={loading || brandIds.length === 0 || chosenChannels.length === 0} onClick={generate}>
            {loading ? "생성 중…" : `✨ ${brandIds.length * count}개 생성하기`}
          </Button>
        </div>
        {mode === "video" && <p className="mt-3 text-xs text-amber-700">영상 모드는 TTS·렌더링 비용이 들어요. 버튼을 눌렀을 때만 만들어요.</p>}
        {upload === "auto" && <p className="mt-2 text-xs text-muted">자동 포스팅은 브랜드별 SNS 토큰이 연결돼 있어야 해요.</p>}
      </Card>

      <h2 className="mt-8 mb-3 text-sm font-semibold">생성 결과 {contents.length}개</h2>
      <div className="space-y-4">
        {contents.map((item) => (
          <ContentCard key={item.id} item={item} brand={brandMap.get(item.brandId)} />
        ))}
      </div>
    </>
  );
}

function ContentCard({ item, brand }: { item: ContentItem; brand: Brand | undefined }) {
  const brandName = brand?.name ?? item.brandId;
  const { setContents, notify } = useStore();
  const [picked, setPicked] = useState<Channel[]>(item.channels.filter((c) => c.status === "ready").map((c) => c.channel));
  const [open, setOpen] = useState(true);
  // 매체별 보기: 미리보기(업로드했을 때 모습) / 문구
  const [view, setView] = useState<Record<string, "preview" | "text">>({});

  const post = () => {
    // TODO(API): auto 면 POST /api/content/{id}/post { channels }, manual 이면 게시 완료 표시만
    const at = "2026-10-19 16:45";
    setContents((list) => list.map((x) => (x.id === item.id ? { ...x, channels: x.channels.map((c) => (picked.includes(c.channel) ? { ...c, status: "posted", postedAt: at } : c)) } : x)));
    const names = picked.map((c) => CHANNEL_LABEL[c]).join("·");
    notify(item.upload === "auto" ? `${names}에 올렸어요` : `${names} 업로드 완료로 표시했어요`);
    setPicked([]);
  };

  const copyAll = () => {
    const text = item.channels.flatMap((c) => c.parts.flatMap((p) => p.lines)).join("\n");
    navigator.clipboard?.writeText(text).catch(() => {});
    notify("문구를 복사했어요");
  };

  return (
    <Card
      title={`${brandName} · ${item.concept}`}
      right={
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>{item.createdAt}</span>
          <Badge color={item.mode === "video" ? "blue" : "gray"}>{item.mode === "video" ? "영상" : "텍스트"}</Badge>
          <button type="button" onClick={() => setOpen((v) => !v)} className="hover:text-ink">{open ? "접기" : "펼치기"}</button>
        </div>
      }
    >
      {open && (
        <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
          <div className="space-y-3">
            {item.channels.map((c) => (
              <div key={c.channel} className="rounded-lg border border-line p-3">
                <div className="mb-2 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <input
                      type="checkbox"
                      className="accent-ink"
                      disabled={c.status === "posted"}
                      checked={picked.includes(c.channel)}
                      onChange={() => setPicked((p) => (p.includes(c.channel) ? p.filter((x) => x !== c.channel) : [...p, c.channel]))}
                    />
                    {CHANNEL_ICON[c.channel]} {CHANNEL_LABEL[c.channel]}
                  </label>
                  <div className="flex items-center gap-2">
                    {brand && (
                      <Segmented
                        value={view[c.channel] ?? "preview"}
                        options={[{ value: "preview", label: "업로드 미리보기" }, { value: "text", label: "문구" }]}
                        onChange={(v) => setView((m) => ({ ...m, [c.channel]: v }))}
                      />
                    )}
                    {c.status === "posted" ? <Badge color="green">게시됨 {c.postedAt?.slice(5)}</Badge> : c.status === "failed" ? <Badge color="red">실패</Badge> : <Badge>대기</Badge>}
                  </div>
                </div>
                {brand && (view[c.channel] ?? "preview") === "preview" ? (
                  <div className="rounded-lg bg-paper py-4">
                    <PostPreview channel={c.channel} parts={c.parts} brand={brand} link={item.shortLink} />
                  </div>
                ) : (
                <div className="space-y-2">
                  {c.parts.map((p) => (
                    <div key={p.key}>
                      <p className="text-xs text-muted">{p.label}</p>
                      <ul className="mt-0.5 space-y-0.5 text-sm">
                        {p.lines.map((l, i) => <li key={i} className="rounded bg-paper px-2 py-1">{l}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border border-line p-3">
              <p className="mb-2 text-xs font-medium">에셋 다운로드</p>
              <ul className="space-y-1.5">
                {item.assets.map((a) => (
                  <li key={a.kind}>
                    <Button size="sm" className="w-full justify-between" disabled={!a.url} onClick={() => notify(`${a.label} 다운로드는 백엔드 연결 후 동작해요`)}>
                      <span>{a.label}</span>
                      <span className="text-muted">{a.url ? "↓" : "영상 모드"}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <p className="truncate text-xs text-muted">🔗 {item.shortLink}</p>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1" onClick={copyAll}>문구 복사</Button>
              <Button size="sm" variant="primary" className="flex-1" disabled={picked.length === 0} onClick={post}>{item.upload === "auto" ? "🚀 즉시 포스팅" : "업로드 완료 표시"}</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
