"use client";

// 콘텐츠 팩토리 '업로드 미리보기'. 만든 문구가 실제 매체에 올라가면 어떻게 보이는지 휴대폰 화면 모양으로 보여 준다.
// 매체 화면을 그대로 베끼지 않고 구성(프로필·본문·카드·자막 위치)만 맞춘 모형이다.
import { useState } from "react";
import BrandMark from "@/components/preview/BrandMark";
import type { Brand, Channel, ContentPart, PartKey } from "@/lib/types";

/** 매체 글자 수 제한 */
const LIMIT: Partial<Record<PartKey, number>> = { "threads.thread": 500, "instagram.caption": 2200, "tiktok.caption": 2200, "youtube.titleDesc": 100 };

type Props = { channel: Channel; parts: ContentPart[]; brand: Brand; link: string };

export default function PostPreview({ channel, parts, brand, link }: Props) {
  const get = (k: PartKey) => parts.find((p) => p.key === k)?.lines ?? [];
  const handle = (brand.sns.find((s) => s.channel === channel)?.handle ?? `@${brand.slug.replace(/-/g, "_")}`).replace(/^@/, "");
  const ctx = { brand, handle, link };
  switch (channel) {
    case "threads":
      return <Threads {...ctx} thread={get("threads.thread")} cards={get("threads.cardText")} cta={get("threads.cta")} />;
    case "instagram":
      return <Instagram {...ctx} cards={get("instagram.cardNews")} caption={get("instagram.caption")} reels={get("instagram.reelsScript")} />;
    case "tiktok":
      return <Vertical {...ctx} kind="tiktok" script={get("tiktok.script")} caption={get("tiktok.caption")} />;
    case "youtube":
      return <YouTube {...ctx} script={get("youtube.script")} thumb={get("youtube.thumbnail")} titleDesc={get("youtube.titleDesc")} />;
  }
}

type Ctx = { brand: Brand; handle: string; link: string };

/* ---------- 공통 ---------- */

function Phone({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`mx-auto w-full max-w-[340px] overflow-hidden rounded-[28px] border-[6px] border-[#1c1c1e] shadow-lg ${dark ? "bg-black text-white" : "bg-white text-[#111]"}`}>
      <div className={`flex justify-between px-5 pt-2 pb-1 text-[11px] font-semibold ${dark ? "text-white" : "text-[#111]"}`}>
        <span>9:41</span>
        <span>●●● ▮</span>
      </div>
      {children}
    </div>
  );
}

function Avatar({ brand, size = 32 }: { brand: Brand; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full text-white" style={{ width: size, height: size, background: brand.theme.primary }}>
      <BrandMark slug={brand.slug} accent={brand.theme.accent} className="h-[55%] w-[55%]" />
    </span>
  );
}

/** {link} → 숏링크, 해시태그·링크는 파랗게 */
function Rich({ text, link }: { text: string; link: string }) {
  const t = text.replace(/\{link\}/g, link);
  return (
    <>
      {t.split(/(#[^\s#]+|myeongwoljae\.com\/\S+)/g).map((s, i) =>
        s.startsWith("#") || s.startsWith("myeongwoljae.com") ? <span key={i} className="text-[#2f6fde]">{s}</span> : <span key={i}>{s}</span>,
      )}
    </>
  );
}

function Over({ text, limit }: { text: string; limit?: number }) {
  if (!limit || text.length <= limit) return null;
  return <p className="mt-1 text-[11px] font-semibold text-red-600">{text.length}/{limit}자 · 매체 제한을 넘어요</p>;
}

/** 카드 한 장 (브랜드 색 + 대표 이미지) */
function CardImage({ big, small, brand, idx, total, ratio = "aspect-square" }: { big: string; small?: string; brand: Brand; idx: number; total: number; ratio?: string }) {
  const bg = brand.theme.bgAsset;
  return (
    <div
      className={`relative flex ${ratio} w-full flex-col justify-center px-6 text-center text-white`}
      style={{ background: bg ? `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.55)), url("${bg}") center / cover` : brand.theme.primary }}
    >
      <p className="text-[clamp(18px,6cqw,24px)] leading-snug font-bold [word-break:keep-all]">{big}</p>
      {small && <p className="mt-2 text-[13px] opacity-85">{small}</p>}
      <span className="absolute top-2.5 right-2.5 rounded-full bg-black/45 px-2 py-0.5 text-[11px]">{idx + 1}/{total}</span>
      <span className="absolute bottom-2.5 left-3 text-[11px] opacity-80">{brand.name}</span>
    </div>
  );
}

function Carousel({ slides, brand, ratio }: { slides: { big: string; small?: string }[]; brand: Brand; ratio?: string }) {
  const [i, setI] = useState(0);
  if (!slides.length) return null;
  const s = slides[Math.min(i, slides.length - 1)];
  return (
    <div className="relative [container-type:inline-size]">
      <CardImage {...s} brand={brand} idx={i} total={slides.length} ratio={ratio} />
      {i > 0 && <button type="button" onClick={() => setI(i - 1)} className="absolute top-1/2 left-1.5 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[13px] text-black">‹</button>}
      {i < slides.length - 1 && <button type="button" onClick={() => setI(i + 1)} className="absolute top-1/2 right-1.5 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[13px] text-black">›</button>}
      <div className="mt-2 flex justify-center gap-1">
        {slides.map((_, k) => <span key={k} className={`h-1.5 w-1.5 rounded-full ${k === i ? "bg-[#2f6fde]" : "bg-black/20"}`} />)}
      </div>
    </div>
  );
}

const strip = (l: string) => l.replace(/^\s*\d+\s*장\s*[:：]\s*/, "");
const cardOf = (l: string) => {
  const [big, small] = strip(l).split("|").map((x) => x.trim());
  return { big, small };
};
/** "0–3초: 문구" → [시간, 문구] */
const scene = (l: string): [string, string] => {
  const m = l.match(/^\s*([^:：]{1,14})[:：]\s*(.*)$/);
  return m ? [m[1], m[2]] : ["", l];
};

function Actions({ items }: { items: string[] }) {
  return <div className="flex gap-4 text-[13px] text-[#555]">{items.map((x) => <span key={x}>{x}</span>)}</div>;
}

/* ---------- 스레드 ---------- */

function Threads({ brand, handle, link, thread, cards, cta }: Ctx & { thread: string[]; cards: string[]; cta: string[] }) {
  const posts = [...thread, ...cta];
  return (
    <Phone>
      <p className="border-b border-black/10 pb-2 text-center text-[13px] font-semibold">스레드</p>
      <div className="max-h-[560px] overflow-y-auto px-3 pt-3">
        {posts.length === 0 && <p className="py-10 text-center text-[13px] text-[#888]">스레드 문구가 없어요</p>}
        {posts.map((t, i) => (
          <div key={i} className="flex gap-2.5">
            <div className="flex flex-col items-center">
              <Avatar brand={brand} size={34} />
              {i < posts.length - 1 && <span className="my-1 w-0.5 flex-1 bg-black/10" />}
            </div>
            <div className="min-w-0 flex-1 pb-4">
              <p className="text-[13px]">
                <b>{handle}</b> <span className="text-[#999]">{i === 0 ? "방금" : `${i}분`}</span>
              </p>
              <p className="mt-0.5 text-[14px] leading-snug whitespace-pre-line [word-break:keep-all]">
                <Rich text={t} link={link} />
              </p>
              <Over text={t.replace(/\{link\}/g, link)} limit={i < thread.length ? LIMIT["threads.thread"] : undefined} />
              {i === 0 && cards.length > 0 && (
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                  {cards.map((c, k) => (
                    <div key={k} className="w-[62%] shrink-0 overflow-hidden rounded-xl [container-type:inline-size]">
                      <CardImage {...cardOf(c)} brand={brand} idx={k} total={cards.length} ratio="aspect-[4/5]" />
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-2">
                <Actions items={["♡", "💬", "↻", "➤"]} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

/* ---------- 인스타그램 ---------- */

function Instagram({ brand, handle, link, cards, caption, reels }: Ctx & { cards: string[]; caption: string[]; reels: string[] }) {
  const [tab, setTab] = useState<"feed" | "reels">(cards.length || caption.length ? "feed" : "reels");
  const [more, setMore] = useState(false);
  const cap = caption.join("\n");
  const short = cap.length > 70 && !more;
  return (
    <div>
      {reels.length > 0 && (cards.length > 0 || caption.length > 0) && (
        <div className="mb-2 flex justify-center gap-1 text-[12px]">
          {(["feed", "reels"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={`rounded-full px-3 py-1 ${tab === t ? "bg-ink text-white" : "bg-black/5"}`}>{t === "feed" ? "피드" : "릴스"}</button>
          ))}
        </div>
      )}
      {tab === "reels" ? (
        <Vertical brand={brand} handle={handle} link={link} kind="reels" script={reels} caption={caption} />
      ) : (
        <Phone>
          <div className="flex items-center gap-2 px-3 py-2">
            <Avatar brand={brand} size={30} />
            <b className="text-[13px]">{handle}</b>
            <span className="ml-auto text-[#999]">···</span>
          </div>
          {cards.length > 0 ? <Carousel slides={cards.map(cardOf)} brand={brand} /> : <div className="grid aspect-square place-items-center bg-black/5 text-[12px] text-[#888]">카드뉴스 없음</div>}
          <div className="px-3 pt-2 pb-4">
            <Actions items={["♡", "💬", "➤"]} />
            <p className="mt-2 text-[13px] leading-snug whitespace-pre-line [word-break:keep-all]">
              <b>{handle}</b> <Rich text={short ? `${cap.slice(0, 70)}…` : cap} link={link} />
              {short && <button type="button" onClick={() => setMore(true)} className="ml-1 text-[#999]">더 보기</button>}
            </p>
            <Over text={cap} limit={LIMIT["instagram.caption"]} />
            <p className="mt-1 text-[11px] text-[#999]">링크는 캡션에서 눌리지 않아요. 프로필 링크로 안내하세요.</p>
          </div>
        </Phone>
      )}
    </div>
  );
}

/* ---------- 세로 영상 (릴스·틱톡·쇼츠) ---------- */

function Vertical({ brand, handle, link, kind, script, caption }: Ctx & { kind: "reels" | "tiktok" | "shorts"; script: string[]; caption: string[] }) {
  const [i, setI] = useState(0);
  const scenes = script.map(scene);
  const [time, line] = scenes[Math.min(i, scenes.length - 1)] ?? ["", ""];
  // "[자막] ... / [말] ..." 형식이면 자막만 화면에
  const sub = line.match(/\[자막\]\s*([^/]+)/)?.[1]?.trim() ?? line.replace(/^(훅|본문|CTA)\s*[:：]\s*/, "");
  const bg = brand.theme.bgAsset;
  return (
    <Phone dark>
      <div
        className="relative aspect-[9/16] w-full"
        style={{ background: bg ? `linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.65)), url("${bg}") center / cover` : `linear-gradient(160deg, ${brand.theme.primary}, #000)` }}
      >
        <p className="absolute top-3 w-full text-center text-[13px] font-semibold opacity-90">{kind === "reels" ? "릴스" : kind === "tiktok" ? "추천" : "Shorts"}</p>
        {scenes.length > 0 ? (
          <p className="absolute inset-x-6 top-[38%] text-center text-[19px] leading-snug font-bold [word-break:keep-all] [text-shadow:0_2px_8px_rgba(0,0,0,.6)]">
            <span className="rounded bg-black/35 box-decoration-clone px-1.5">{sub}</span>
          </p>
        ) : (
          <p className="absolute inset-x-6 top-[45%] text-center text-[13px] opacity-70">대본이 없어요</p>
        )}
        <div className="absolute right-2.5 bottom-24 flex flex-col items-center gap-4 text-[18px]">
          <Avatar brand={brand} size={36} />
          <span>♡</span>
          <span>💬</span>
          <span>➤</span>
        </div>
        <div className="absolute inset-x-3 bottom-4 pr-12">
          <p className="text-[13px] font-semibold">@{handle}</p>
          <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug opacity-90 [word-break:keep-all]">
            <Rich text={caption.join(" ")} link={link} />
          </p>
        </div>
        {scenes.length > 1 && (
          <div className="absolute inset-x-3 top-9 flex gap-1">
            {scenes.map((_, k) => <span key={k} className={`h-0.5 flex-1 rounded ${k <= i ? "bg-white" : "bg-white/30"}`} />)}
          </div>
        )}
      </div>
      {scenes.length > 1 && (
        <div className="flex items-center justify-between bg-[#1c1c1e] px-3 py-2 text-[12px]">
          <button type="button" disabled={i === 0} onClick={() => setI(i - 1)} className="disabled:opacity-30">‹ 이전 장면</button>
          <span className="opacity-70">{time || `${i + 1}장면`} · {i + 1}/{scenes.length}</span>
          <button type="button" disabled={i >= scenes.length - 1} onClick={() => setI(i + 1)} className="disabled:opacity-30">다음 장면 ›</button>
        </div>
      )}
    </Phone>
  );
}

/* ---------- 유튜브 ---------- */

function YouTube({ brand, handle, link, script, thumb, titleDesc }: Ctx & { script: string[]; thumb: string[]; titleDesc: string[] }) {
  const [tab, setTab] = useState<"shorts" | "thumb">(script.length ? "shorts" : "thumb");
  const [title, ...desc] = titleDesc;
  const [t, setT] = useState(0);
  return (
    <div>
      {(thumb.length > 0 || titleDesc.length > 0) && script.length > 0 && (
        <div className="mb-2 flex justify-center gap-1 text-[12px]">
          {(["shorts", "thumb"] as const).map((x) => (
            <button key={x} type="button" onClick={() => setTab(x)} className={`rounded-full px-3 py-1 ${tab === x ? "bg-ink text-white" : "bg-black/5"}`}>{x === "shorts" ? "쇼츠" : "썸네일·제목"}</button>
          ))}
        </div>
      )}
      {tab === "shorts" ? (
        <Vertical brand={brand} handle={handle} link={link} kind="shorts" script={script} caption={title ? [title] : []} />
      ) : (
        <Phone>
          <div className="relative [container-type:inline-size]">
            <CardImage big={thumb[t] ?? title ?? ""} brand={brand} idx={t} total={Math.max(thumb.length, 1)} ratio="aspect-video" />
            {thumb.length > 1 && (
              <div className="absolute right-2 bottom-2 flex gap-1">
                {thumb.map((_, k) => (
                  <button key={k} type="button" onClick={() => setT(k)} className={`rounded px-1.5 text-[11px] ${k === t ? "bg-white text-black" : "bg-black/50 text-white"}`}>{k + 1}안</button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2.5 px-3 pt-3 pb-4">
            <Avatar brand={brand} size={34} />
            <div className="min-w-0">
              <p className="text-[14px] leading-snug font-semibold [word-break:keep-all]">{title || "제목 없음"}</p>
              <Over text={title ?? ""} limit={LIMIT["youtube.titleDesc"]} />
              <p className="mt-0.5 text-[12px] text-[#666]">{brand.name} · 조회수 0회 · 방금</p>
              {desc.length > 0 && (
                <p className="mt-2 rounded-lg bg-black/5 p-2 text-[12px] leading-snug whitespace-pre-line [word-break:keep-all]">
                  <Rich text={desc.join("\n")} link={link} />
                </p>
              )}
            </div>
          </div>
        </Phone>
      )}
    </div>
  );
}
