"use client";

import { useState } from "react";
import { Badge, Card, Pagination, Toggle } from "./ui";
import { pct, roas, won } from "@/lib/format";
import { useBrandMap, useStore } from "@/lib/store";

const PAGE = 6;
const CH_LABEL = { meta: "Meta", tiktok: "TikTok", youtube: "YouTube" } as const;

/** ROAS 기준 미달 캠페인만 모아 켜고 끄는 패널. 대시보드(요약 포함)와 광고 탭에서 같이 쓴다 */
export default function KillSwitchPanel({ showSummary = false }: { showSummary?: boolean }) {
  const { campaigns, setCampaign, killRule, notify } = useStore();
  const brandMap = useBrandMap();
  const [page, setPage] = useState(1);

  const low = campaigns.filter((c) => c.status !== "paused" && roas(c.revenue, c.spend) < killRule.minRoas);
  const lowOn = low.filter((c) => c.status === "active");
  const pages = Math.max(1, Math.ceil(low.length / PAGE));
  const current = Math.min(page, pages);
  const rows = low.slice((current - 1) * PAGE, current * PAGE);

  const spend = campaigns.reduce((s, c) => s + c.spend, 0);
  const revenue = campaigns.reduce((s, c) => s + c.revenue, 0);
  const summary = [
    ["총 광고비", won(spend)],
    ["광고 매출", won(revenue)],
    ["평균 ROAS", pct(roas(revenue, spend))],
    ["킬 대상 (켜짐)", `${lowOn.length} / ${low.length}개`],
  ];

  const killAll = () => {
    // TODO(API): POST /api/ads/campaigns/pause { ids }
    lowOn.forEach((c) => setCampaign(c.id, { status: "killed" }));
    notify(`${lowOn.length}개 캠페인을 껐어요`);
  };

  return (
    <Card title={showSummary ? "광고 성과 요약 & 킬 스위치" : `킬 스위치 대상 (ROAS ${killRule.minRoas}% 미만)`} className="flex flex-col">
      {showSummary && (
        <div className="mb-4 grid grid-cols-2 gap-2 text-center md:grid-cols-4">
          {summary.map(([label, value]) => (
            <div key={label} className="rounded-lg bg-paper p-2">
              <p className="text-xs text-muted">{label}</p>
              <p className="text-sm font-semibold tabular-nums">{value}</p>
            </div>
          ))}
        </div>
      )}
      <ul className="grid gap-x-8 lg:grid-cols-2">
        {rows.map((c) => (
          <li key={c.id} className="flex items-center justify-between gap-3 border-b border-line py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {brandMap.get(c.brandId)?.name} · {CH_LABEL[c.channel]}
              </p>
              <p className="text-xs text-muted">광고비 {won(c.spend)}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Badge color="red">ROAS {pct(roas(c.revenue, c.spend))}</Badge>
              <Toggle
                label={`${c.name} 켜기/끄기`}
                on={c.status === "active"}
                onChange={(v) => {
                  setCampaign(c.id, { status: v ? "active" : "killed" });
                  notify(`${brandMap.get(c.brandId)?.name} ${CH_LABEL[c.channel]} 광고 ${v ? "켰어요" : "껐어요"}`);
                }}
              />
            </div>
          </li>
        ))}
        {low.length === 0 && <li className="py-6 text-center text-sm text-muted lg:col-span-2">기준 미달 캠페인이 없어요</li>}
      </ul>
      {/* 목록 길이와 상관없이 버튼은 항상 맨 아래 */}
      <div className="mt-auto">
        {low.length > PAGE && <Pagination page={current} total={low.length} size={PAGE} onChange={setPage} />}
        <button
          type="button"
          onClick={killAll}
          disabled={lowOn.length === 0}
          className="mt-4 w-full rounded-lg bg-rose-600 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ROAS {killRule.minRoas}% 미만 전부 끄기 ({lowOn.length}개)
        </button>
      </div>
    </Card>
  );
}
