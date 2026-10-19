"use client";

import { useMemo, useState } from "react";
import { Badge, Button, Card, Field, PageHead, Segmented, Stat, Table, Toggle, inputCls, td } from "@/components/ui";
import { num, pct, roas, won } from "@/lib/format";
import { useBrandMap, useStore } from "@/lib/store";
import type { AdCampaign, AdChannel } from "@/lib/types";

const CH_LABEL: Record<AdChannel, string> = { meta: "Meta", tiktok: "TikTok", youtube: "YouTube" };

export default function AdsPage() {
  const { campaigns, setCampaign, killRule, setKillRule, notify } = useStore();
  const brandMap = useBrandMap();
  const [ch, setCh] = useState<"all" | AdChannel>("all");
  const [rule, setRule] = useState(killRule);

  const list = campaigns.filter((c) => ch === "all" || c.channel === ch);
  const sum = useMemo(
    () => list.reduce((a, c) => ({ spend: a.spend + c.spend, revenue: a.revenue + c.revenue, clicks: a.clicks + c.clicks, conv: a.conv + c.conversions }), { spend: 0, revenue: 0, clicks: 0, conv: 0 }),
    [list],
  );

  const statusBadge = (c: AdCampaign) =>
    c.status === "active" ? <Badge color="green">집행 중</Badge> : c.status === "killed" ? <Badge color="red">킬 스위치</Badge> : <Badge>일시정지</Badge>;

  const runRule = () => {
    // TODO(API): POST /api/ads/kill-rule/run
    let n = 0;
    campaigns.forEach((c) => {
      if (c.status === "active" && c.spend >= rule.minSpend && roas(c.revenue, c.spend) < rule.minRoas) {
        setCampaign(c.id, { status: "killed" });
        n += 1;
      }
    });
    notify(n ? `${n}개 캠페인을 껐어요` : "기준 미달 캠페인이 없어요");
  };

  return (
    <>
      <PageHead
        title="광고 & 성과 분석"
        desc="매체 API 연결 전 · 더미 데이터"
        right={
          <Segmented
            value={ch}
            onChange={setCh}
            options={[
              { value: "all", label: "전체" },
              { value: "meta", label: "Meta" },
              { value: "tiktok", label: "TikTok" },
              { value: "youtube", label: "YouTube" },
            ]}
          />
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Stat label="광고비" value={won(sum.spend)} />
        <Stat label="매출" value={won(sum.revenue)} />
        <Stat label="ROAS" value={pct(roas(sum.revenue, sum.spend))} />
        <Stat label="클릭" value={num(sum.clicks)} />
        <Stat label="CPC" value={won(sum.clicks ? Math.round(sum.spend / sum.clicks) : 0)} />
      </div>

      <Card title={`캠페인 ${list.length}개`} className="mt-5">
        <Table head={["ON", "캠페인", "매체", "상태", "일 예산", "광고비", "클릭", "전환", "매출", "ROAS"]}>
          {list.map((c) => {
            const r = roas(c.revenue, c.spend);
            return (
              <tr key={c.id} className="hover:bg-paper">
                <td className={td}>
                  <Toggle label={`${c.name} 켜기/끄기`} on={c.status === "active"} onChange={(v) => { setCampaign(c.id, { status: v ? "active" : "paused" }); notify(`${c.name} ${v ? "켰어요" : "멈췄어요"}`); }} />
                </td>
                <td className={td}>
                  <span className="font-medium">{brandMap.get(c.brandId)?.name}</span>
                  <span className="ml-1 text-xs text-muted">{c.name.split("·")[1]}</span>
                </td>
                <td className={td}>{CH_LABEL[c.channel]}</td>
                <td className={td}>{statusBadge(c)}</td>
                <td className={td}>
                  <input
                    type="number"
                    step={1000}
                    min={0}
                    className={`${inputCls} h-7 w-24 text-right tabular-nums`}
                    value={c.dailyBudget}
                    onChange={(e) => setCampaign(c.id, { dailyBudget: Number(e.target.value) })}
                  />
                </td>
                <td className={`${td} tabular-nums`}>{won(c.spend)}</td>
                <td className={`${td} tabular-nums`}>{num(c.clicks)}</td>
                <td className={`${td} tabular-nums`}>{num(c.conversions)}</td>
                <td className={`${td} tabular-nums`}>{won(c.revenue)}</td>
                <td className={`${td} tabular-nums font-medium ${r < rule.minRoas ? "text-rose-600" : r >= rule.boostRoas ? "text-emerald-600" : ""}`}>{pct(r)}</td>
              </tr>
            );
          })}
        </Table>
      </Card>

      <Card
        title="킬 스위치 · 예산 규칙"
        className="mt-5"
        right={
          <div className="flex gap-2">
            <Button size="sm" onClick={runRule}>지금 규칙 적용</Button>
            <Button size="sm" variant="primary" onClick={() => { setKillRule(rule); notify("규칙을 저장했어요"); }}>저장</Button>
          </div>
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <label className="flex items-center justify-between text-sm font-medium">
              성과 저조 자동 OFF
              <Toggle on={rule.enabled} onChange={(v) => setRule({ ...rule, enabled: v })} label="자동 OFF" />
            </label>
            <div className="grid grid-cols-3 gap-2">
              <Field label="ROAS 미만 (%)">
                <input type="number" className={inputCls} value={rule.minRoas} onChange={(e) => setRule({ ...rule, minRoas: Number(e.target.value) })} />
              </Field>
              <Field label="판단 기간 (일)">
                <input type="number" className={inputCls} value={rule.windowDays} onChange={(e) => setRule({ ...rule, windowDays: Number(e.target.value) })} />
              </Field>
              <Field label="최소 광고비">
                <input type="number" step={10000} className={inputCls} value={rule.minSpend} onChange={(e) => setRule({ ...rule, minSpend: Number(e.target.value) })} />
              </Field>
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between text-sm font-medium">
              잘 되는 캠페인 예산 증액
              <Toggle on={rule.boostEnabled} onChange={(v) => setRule({ ...rule, boostEnabled: v })} label="예산 증액" />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Field label="ROAS 이상 (%)">
                <input type="number" className={inputCls} value={rule.boostRoas} onChange={(e) => setRule({ ...rule, boostRoas: Number(e.target.value) })} />
              </Field>
              <Field label="증액 (%)">
                <input type="number" className={inputCls} value={rule.boostPercent} onChange={(e) => setRule({ ...rule, boostPercent: Number(e.target.value) })} />
              </Field>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
