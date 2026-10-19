"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge, Button, Card, Modal, PageHead, Pagination, Segmented, Stat, Table, Toggle, td } from "@/components/ui";
import { BrandStatusBadge } from "@/components/BrandBits";
import KillSwitchPanel from "@/components/KillSwitchPanel";
import { PREV_PERIOD_REVENUE } from "@/lib/dummy";
import { conversion, num, pct, roas, won } from "@/lib/format";
import { useStore } from "@/lib/store";
import type { Brand, Period } from "@/lib/types";

const PAGE = 7;
// 더미: 기간별로 누적 수치를 비율로 줄여서 보여 준다
const FACTOR: Record<Period, number> = { today: 0.04, "7d": 0.28, "30d": 1, all: 1.7 };

export default function DashboardPage() {
  const { brands, setBrand, notify } = useStore();
  const [period, setPeriod] = useState<Period>("30d");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);

  const f = FACTOR[period];
  const scaled = (b: Brand) => ({
    visitors: Math.round(b.stats.visitors * f),
    freeUsers: Math.round(b.stats.freeUsers * f),
    buyers: Math.round(b.stats.buyers * f),
    revenue: Math.round(b.stats.revenue * f),
    adSpend: Math.round(b.stats.adSpend * f),
  });

  const kpi = useMemo(() => {
    const t = { visitors: 0, freeUsers: 0, buyers: 0, revenue: 0 };
    brands.forEach((b) => {
      t.visitors += b.stats.visitors;
      t.freeUsers += b.stats.freeUsers;
      t.buyers += b.stats.buyers;
      t.revenue += b.stats.revenue;
    });
    return t;
  }, [brands]);

  const live = brands.filter((b) => b.status === "live").length;
  const rows = brands.slice((page - 1) * PAGE, page * PAGE);
  const open = brands.find((b) => b.id === openId) ?? null;

  return (
    <>
      <PageHead
        title="대시보드"
        desc="모든 브랜드 합계 · 더미 데이터"
        right={
          <Segmented
            value={period}
            onChange={setPeriod}
            options={[
              { value: "today", label: "오늘" },
              { value: "7d", label: "7일" },
              { value: "30d", label: "30일" },
              { value: "all", label: "전체" },
            ]}
          />
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Stat label="운영 중인 브랜드" value={`${live}개`} sub={`전체 ${brands.length}개`} />
        <Stat label="총 방문자" value={num(Math.round(kpi.visitors * f))} />
        <Stat label="무료 풀이 이용자" value={num(Math.round(kpi.freeUsers * f))} />
        <Stat label="유료 구매자" value={num(Math.round(kpi.buyers * f))} />
        <Stat label="무료 → 유료 전환율" value={pct(conversion(kpi))} />
        <Stat label="총수입" value={won(Math.round(kpi.revenue * f))} sub={`직전 기간 대비 ${pct(((kpi.revenue * f) / (PREV_PERIOD_REVENUE * f) - 1) * 100)}`} tone="up" />
      </div>

      <Card className="mt-5" title="브랜드 페이지" right={<Link href="/brands" className="text-xs text-muted hover:text-ink">브랜드 관리 →</Link>}>
        <Table head={["브랜드", "주소", "ON/OFF", "방문자", "무료", "구매", "전환율", "수입", ""]}>
          {rows.map((b) => {
            const s = scaled(b);
            return (
              <tr key={b.id} onClick={() => setOpenId(b.id)} className="cursor-pointer hover:bg-paper">
                <td className={td}>
                  <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ background: b.theme.primary }} />
                  <span className="font-medium">{b.name}</span>
                </td>
                <td className={`${td} text-muted`}>/{b.slug}</td>
                <td className={td}>
                  {b.status === "draft" ? (
                    <BrandStatusBadge status={b.status} />
                  ) : (
                    <Toggle
                      label={`${b.name} 켜기/끄기`}
                      on={b.status === "live"}
                      onChange={(v) => {
                        setBrand(b.id, { status: v ? "live" : "paused" });
                        notify(`${b.name} ${v ? "켰어요" : "껐어요 (페이지·광고 중지)"}`);
                      }}
                    />
                  )}
                </td>
                <td className={`${td} tabular-nums`}>{num(s.visitors)}</td>
                <td className={`${td} tabular-nums`}>{num(s.freeUsers)}</td>
                <td className={`${td} tabular-nums`}>{num(s.buyers)}</td>
                <td className={`${td} tabular-nums`}>{pct(conversion(s))}</td>
                <td className={`${td} tabular-nums`}>{won(s.revenue)}</td>
                <td className={td} onClick={(e) => e.stopPropagation()}>
                  <Link href={`/brands/${b.id}`} className="text-xs text-muted underline-offset-2 hover:text-ink hover:underline">수정</Link>
                </td>
              </tr>
            );
          })}
        </Table>
        <Pagination page={page} total={brands.length} size={PAGE} onChange={setPage} />
      </Card>

      <div className="mt-5">
        <KillSwitchPanel showSummary />
      </div>
      <AdExtras />

      <Modal
        open={!!open}
        onClose={() => setOpenId(null)}
        title={open ? `${open.name} 상세` : ""}
        footer={
          open && (
            <>
              <Button onClick={() => setOpenId(null)}>닫기</Button>
              <Link href={`/brands/${open.id}`} className="inline-flex h-9 items-center rounded-lg bg-ink px-3.5 text-sm font-medium text-white">
                이 브랜드 수정하기
              </Link>
            </>
          )
        }
      >
        {open && <BrandDetail brand={open} f={f} />}
      </Modal>
    </>
  );
}

function BrandDetail({ brand, f }: { brand: Brand; f: number }) {
  const s = brand.stats;
  // 더미 일별 추이 (7일)
  const days = Array.from({ length: 7 }, (_, i) => Math.round((s.visitors / 30) * (0.7 + ((i * 37) % 10) / 15)));
  const max = Math.max(...days, 1);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <BrandStatusBadge status={brand.status} />
        <span>myeongwoljae.com/{brand.slug}</span>
        <span>· {brand.tone.concept}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Stat label="방문자" value={num(Math.round(s.visitors * f))} />
        <Stat label="무료 풀이" value={num(Math.round(s.freeUsers * f))} />
        <Stat label="구매자" value={num(Math.round(s.buyers * f))} />
        <Stat label="전환율" value={pct(conversion(s))} />
        <Stat label="총수입" value={won(Math.round(s.revenue * f))} />
        <Stat label="ROAS" value={pct(roas(s.revenue, s.adSpend))} />
      </div>
      <div>
        <p className="mb-2 text-xs text-muted">최근 7일 방문자</p>
        <div className="flex h-24 items-end gap-1.5">
          {days.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full rounded-t" style={{ height: `${(d / max) * 80}px`, background: brand.theme.primary }} />
              <span className="text-[10px] text-muted">10/{13 + i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CH_COLOR = { meta: "bg-ink", tiktok: "bg-gold", youtube: "bg-sky-400" } as const;
const CH_NAME = { meta: "Meta", tiktok: "TikTok", youtube: "YouTube" } as const;

/** 효자 브랜드 Top 3 · 매체별 광고비 비중 */
function AdExtras() {
  const { campaigns, brands } = useStore();
  const { top, byChannel, spend } = useMemo(() => {
    const byBrand = new Map<string, { spend: number; revenue: number }>();
    const byChannel = { meta: 0, tiktok: 0, youtube: 0 };
    let spend = 0;
    campaigns.forEach((c) => {
      spend += c.spend;
      byChannel[c.channel] += c.spend;
      const r = byBrand.get(c.brandId) ?? { spend: 0, revenue: 0 };
      r.spend += c.spend;
      r.revenue += c.revenue;
      byBrand.set(c.brandId, r);
    });
    const top = [...byBrand.entries()].map(([id, r]) => ({ id, roas: roas(r.revenue, r.spend), revenue: r.revenue })).sort((a, b) => b.roas - a.roas).slice(0, 3);
    return { top, byChannel, spend };
  }, [campaigns]);
  const name = (id: string) => brands.find((b) => b.id === id)?.name ?? id;
  const channels = (Object.keys(byChannel) as (keyof typeof byChannel)[]).filter((k) => byChannel[k] > 0);

  return (
    <div className="mt-5 grid gap-5 md:grid-cols-2">
      <Card title="효자 브랜드 Top 3" right={<Link href="/ads" className="text-xs text-muted hover:text-ink">광고 →</Link>}>
        <ol className="space-y-2.5">
          {top.map((r, i) => (
            <li key={r.id} className="flex items-center justify-between gap-2 text-sm">
              <span className="truncate">
                <span className="mr-2 text-xs font-bold text-gold">{i + 1}</span>
                {name(r.id)}
                <span className="ml-2 text-xs text-muted">매출 {won(r.revenue)}</span>
              </span>
              <Badge color="green">ROAS {pct(r.roas)}</Badge>
            </li>
          ))}
        </ol>
      </Card>
      <Card title="매체별 광고비 비중">
        <div className="flex h-3 overflow-hidden rounded-full bg-paper">
          {channels.map((k) => (
            <div key={k} style={{ width: `${(byChannel[k] / spend) * 100}%` }} className={CH_COLOR[k]} />
          ))}
        </div>
        <ul className="mt-3 space-y-1.5 text-sm">
          {channels.map((k) => (
            <li key={k} className="flex items-center justify-between">
              <span>
                <span className={`mr-2 inline-block h-2.5 w-2.5 rounded-full ${CH_COLOR[k]}`} />
                {CH_NAME[k]}
              </span>
              <span className="text-muted tabular-nums">{won(byChannel[k])} · {pct((byChannel[k] / spend) * 100)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
