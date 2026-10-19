"use client";

import { useState } from "react";
import { Badge, Button, Card, PageHead, Table, Toggle, inputCls, td } from "@/components/ui";
import { ALERT_SETTINGS, API_KEYS } from "@/lib/dummy";
import { useStore } from "@/lib/store";
import type { AlertTrigger } from "@/lib/types";

const TRIGGER_LABEL: Record<AlertTrigger, [string, string]> = {
  pg_error: ["결제(PG) 오류", "토스 승인 실패·통신 오류"],
  llm_fail: ["해설 생성 실패", "Claude API 오류·지연"],
  token_expiring: ["SNS 토큰 만료 임박", "만료 3일 전"],
  sms_balance: ["발송 잔액 부족", "알리고 잔액·발송 실패"],
  roas_drop: ["ROAS 저하·킬 스위치 작동", "광고 자동 OFF 됐을 때"],
  daily_report: ["일일 요약", "매일 밤 매출·광고비"],
};

const ROLES = [
  ["총관리자", "모든 기능 · API 키 · 계정 관리"],
  ["운영자", "브랜드·콘텐츠·광고·고객 관리 (키·계정 제외)"],
  ["뷰어", "조회만"],
];

const SHORT_LINKS = [
  ["x7K2mP", "/result/paid?order=ord_20261019_…", 3, "2027-10-19"],
  ["Qa91zT", "/dalbit?utm_source=threads", 128, "2027-10-18"],
  ["mN3bV8", "/love-lab?utm_source=threads", 87, "2027-10-17"],
] as const;

export default function SettingsPage() {
  const { notify } = useStore();
  const [alerts, setAlerts] = useState(ALERT_SETTINGS);
  const [phone, setPhone] = useState("");

  return (
    <>
      <PageHead title="설정" />

      <div className="space-y-5">
        <div id="alerts">
          <Card title="장애·알림 문자" right={<Button size="sm" variant="primary" onClick={() => notify("알림 설정을 저장했어요")}>저장</Button>}>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium">받는 번호</p>
                <ul className="space-y-1.5">
                  {alerts.phones.map((p) => (
                    <li key={p} className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-sm">
                      {p}
                      <button type="button" className="text-xs text-muted hover:text-rose-600" onClick={() => setAlerts({ ...alerts, phones: alerts.phones.filter((x) => x !== p) })}>삭제</button>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex gap-2">
                  <input className={inputCls} placeholder="010-0000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <Button onClick={() => { if (phone) { setAlerts({ ...alerts, phones: [...alerts.phones, phone] }); setPhone(""); } }}>추가</Button>
                </div>
                <Button size="sm" className="mt-3" onClick={() => notify("테스트 문자는 백엔드 연결 후 동작해요")}>테스트 문자 보내기</Button>
              </div>
              <ul className="divide-y divide-line">
                {(Object.keys(TRIGGER_LABEL) as AlertTrigger[]).map((k) => (
                  <li key={k} className="flex items-center justify-between gap-3 py-2">
                    <div>
                      <p className="text-sm">{TRIGGER_LABEL[k][0]}</p>
                      <p className="text-xs text-muted">{TRIGGER_LABEL[k][1]}</p>
                    </div>
                    <Toggle label={TRIGGER_LABEL[k][0]} on={alerts.triggers[k]} onChange={(v) => setAlerts({ ...alerts, triggers: { ...alerts.triggers, [k]: v } })} />
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        <div id="accounts">
          <Card title="계정·권한">
            <p className="mb-3 text-sm text-muted">로그인은 Cloudflare Access(이메일 인증)로 받고, 여기서는 이메일별 권한만 정해요.</p>
            <Table head={["이메일", "권한", "마지막 접속", ""]}>
              {[
                ["admin@withus.example", "총관리자", "2026-10-19 16:20"],
                ["operator@withus.example", "운영자", "2026-10-18 11:02"],
              ].map(([email, role, last]) => (
                <tr key={email}>
                  <td className={td}>{email}</td>
                  <td className={td}>
                    <select className={`${inputCls} h-7 w-28`} defaultValue={role}>
                      {ROLES.map(([r]) => <option key={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className={`${td} text-muted`}>{last}</td>
                  <td className={td}><Button size="sm" onClick={() => notify("계정 삭제는 백엔드 연결 후 동작해요")}>삭제</Button></td>
                </tr>
              ))}
            </Table>
            <ul className="mt-3 space-y-0.5 text-xs text-muted">
              {ROLES.map(([r, d]) => <li key={r}><b className="font-medium text-ink">{r}</b> — {d}</li>)}
            </ul>
          </Card>
        </div>

        <div id="keys">
          <Card title="API 키 연결">
            <Table head={["서비스", "용도", "상태", "메모", ""]}>
              {API_KEYS.map((k) => (
                <tr key={k.name}>
                  <td className={`${td} font-medium`}>{k.name}</td>
                  <td className={td}>{k.purpose}</td>
                  <td className={td}>{k.connected ? <Badge color="green">연결됨</Badge> : <Badge>미연결</Badge>}</td>
                  <td className={`${td} text-xs text-muted`}>{k.note}</td>
                  <td className={td}><Button size="sm" onClick={() => notify("키는 Cloudflare 환경변수(비밀값)로 넣어요")}>{k.connected ? "교체" : "연결"}</Button></td>
                </tr>
              ))}
            </Table>
          </Card>
        </div>

        <div id="links">
          <Card title="숏링크" right={<span className="text-xs text-muted">myeongwoljae.com/r/…</span>}>
            <Table head={["코드", "연결 주소", "클릭", "만료"]}>
              {SHORT_LINKS.map(([code, target, clicks, exp]) => (
                <tr key={code}>
                  <td className={`${td} font-mono`}>{code}</td>
                  <td className={`${td} text-muted`}>{target}</td>
                  <td className={`${td} tabular-nums`}>{clicks}</td>
                  <td className={`${td} text-muted`}>{exp}</td>
                </tr>
              ))}
            </Table>
          </Card>
        </div>
      </div>
    </>
  );
}
