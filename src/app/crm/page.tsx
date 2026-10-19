"use client";

import { useState } from "react";
import { Badge, Button, Card, Field, Modal, PageHead, Pagination, Table, inputBase, inputCls, td } from "@/components/ui";
import { maskPhone, won } from "@/lib/format";
import { useBrandMap, useStore } from "@/lib/store";
import type { Order } from "@/lib/types";

const PAGE = 10;

export default function CrmPage() {
  const { orders, brands } = useStore();
  const brandMap = useBrandMap();
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("all");
  const [delivery, setDelivery] = useState("all");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);

  const digits = q.replace(/\D/g, "");
  const list = orders.filter(
    (o) =>
      (brand === "all" || o.brandId === brand) &&
      (delivery === "all" || o.delivery === delivery) &&
      (!q || o.name.includes(q) || o.id.includes(q) || (digits.length >= 3 && o.phone.replace(/\D/g, "").includes(digits))),
  );
  const rows = list.slice((page - 1) * PAGE, page * PAGE);
  const open = orders.find((o) => o.id === openId) ?? null;

  return (
    <>
      <PageHead title="고객 관리" desc="주문·결제·결과 발송 · 명월재 orders 와 같은 데이터를 보게 됩니다" />

      <Card>
        <div className="flex flex-wrap gap-2">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder="이름 · 전화번호 · 주문번호"
            className={`${inputBase} w-full sm:w-64`}
          />
          <select className={inputBase} value={brand} onChange={(e) => { setBrand(e.target.value); setPage(1); }}>
            <option value="all">전체 브랜드</option>
            {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <select className={inputBase} value={delivery} onChange={(e) => { setDelivery(e.target.value); setPage(1); }}>
            <option value="all">발송 전체</option>
            <option value="sent">발송 완료</option>
            <option value="failed">발송 실패</option>
            <option value="waiting">대기</option>
          </select>
        </div>
      </Card>

      <Card className="mt-4" title={`주문 ${list.length}건`}>
        <Table head={["결제일시", "브랜드", "상품", "고객명", "전화번호", "금액", "결제", "결과 발송", ""]}>
          {rows.map((o) => (
            <tr key={o.id} className="cursor-pointer hover:bg-paper" onClick={() => setOpenId(o.id)}>
              <td className={`${td} text-muted`}>{o.createdAt.slice(5)}</td>
              <td className={td}>{brandMap.get(o.brandId)?.name}</td>
              <td className={td}>{o.product}</td>
              <td className={`${td} font-medium`}>{o.name}</td>
              <td className={`${td} tabular-nums`}>{maskPhone(o.phone)}</td>
              <td className={`${td} tabular-nums`}>{won(o.amount)}</td>
              <td className={td}><PayBadge s={o.paymentStatus} /></td>
              <td className={td}><DeliveryBadge s={o.delivery} /></td>
              <td className={td} onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-1">
                  <ResendButton order={o} />
                  <EmailButton order={o} />
                </div>
              </td>
            </tr>
          ))}
        </Table>
        <Pagination page={page} total={list.length} size={PAGE} onChange={setPage} />
      </Card>

      {open && <OrderModal order={open} onClose={() => setOpenId(null)} brandName={brandMap.get(open.brandId)?.name ?? ""} />}
    </>
  );
}

function PayBadge({ s }: { s: Order["paymentStatus"] }) {
  if (s === "paid") return <Badge color="green">결제</Badge>;
  if (s === "refunded") return <Badge color="gray">환불</Badge>;
  if (s === "failed") return <Badge color="red">실패</Badge>;
  return <Badge color="amber">대기</Badge>;
}

function DeliveryBadge({ s }: { s: Order["delivery"] }) {
  if (s === "sent") return <Badge color="green">성공</Badge>;
  if (s === "failed") return <Badge color="red">실패 🚨</Badge>;
  return <Badge color="amber">대기</Badge>;
}

function ResendButton({ order }: { order: Order }) {
  const { setOrder, notify } = useStore();
  return (
    <Button
      size="sm"
      disabled={order.paymentStatus !== "paid"}
      onClick={() => {
        // TODO(API): POST /api/orders/{id}/resend → 알림톡(알리고) 재발송
        setOrder(order.id, { delivery: "sent" });
        notify(`${order.name}님께 결과 링크를 다시 보냈어요`);
      }}
    >
      재발송
    </Button>
  );
}

function EmailButton({ order }: { order: Order }) {
  const { notify } = useStore();
  return (
    <Button
      size="sm"
      variant="ghost"
      disabled={order.paymentStatus !== "paid" || !order.email}
      title={order.email ? order.email : "이메일 없음"}
      onClick={() => {
        // TODO(API): POST /api/orders/{id}/resend-email (Resend)
        notify(`${order.email}로 결과 메일을 보냈어요`);
      }}
    >
      이메일
    </Button>
  );
}

function OrderModal({ order, onClose, brandName }: { order: Order; onClose: () => void; brandName: string }) {
  const { setOrder, notify } = useStore();
  const [form, setForm] = useState(order);
  const [refund, setRefund] = useState(false);
  const [reason, setReason] = useState("고객 요청");

  const save = (resend: boolean) => {
    setOrder(order.id, { ...form, delivery: resend ? "sent" : form.delivery });
    notify(resend ? "정보를 고치고 다시 보냈어요" : "저장했어요");
    onClose();
  };

  return (
    <>
      <Modal
        open={!refund}
        onClose={onClose}
        title={`주문 ${order.id}`}
        footer={
          <>
            <Button variant="danger" disabled={order.paymentStatus !== "paid"} onClick={() => setRefund(true)}>환불</Button>
            <Button onClick={() => { notify("리포트 재생성은 백엔드 연결 후 동작해요 (LLM 비용 발생)"); }}>리포트 다시 생성</Button>
            <Button variant="primary" onClick={() => save(true)}>저장하고 재발송</Button>
          </>
        }
      >
        <div className="mb-4 flex flex-wrap gap-2 text-sm text-muted">
          <span>{brandName}</span>·<span>{order.product}</span>·<span>{won(order.amount)}</span>·<PayBadge s={order.paymentStatus} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="이름">
            <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="전화번호">
            <input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Field label="생년월일">
            <input type="date" className={inputCls} value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} />
          </Field>
          <Field label="태어난 시간" hint="모르면 비워 두기">
            <input type="time" className={inputCls} value={form.birthTime ?? ""} onChange={(e) => setForm({ ...form, birthTime: e.target.value || null })} />
          </Field>
          <Field label="양력/음력">
            <select className={inputCls} value={form.calendar} onChange={(e) => setForm({ ...form, calendar: e.target.value as Order["calendar"] })}>
              <option value="solar">양력</option>
              <option value="lunar">음력</option>
            </select>
          </Field>
          <Field label="이메일 (선택)">
            <input className={inputCls} value={form.email ?? ""} onChange={(e) => setForm({ ...form, email: e.target.value || null })} />
          </Field>
        </div>
        <p className="mt-4 rounded-lg bg-paper px-3 py-2 text-xs text-muted">
          결과 링크 🔗 {order.shortLink} · 결과 발송 <DeliveryBadge s={order.delivery} />
        </p>
      </Modal>

      <Modal
        open={refund}
        onClose={() => setRefund(false)}
        title="환불 처리"
        footer={
          <>
            <Button onClick={() => setRefund(false)}>취소</Button>
            <Button
              variant="danger"
              onClick={() => {
                // TODO(API): POST /api/orders/{id}/refund → 토스 결제 취소
                setOrder(order.id, { paymentStatus: "refunded" });
                notify(`${won(order.amount)} 환불했어요`);
                setRefund(false);
                onClose();
              }}
            >
              {won(order.amount)} 환불
            </Button>
          </>
        }
      >
        <p className="mb-3 text-sm">{order.name}님 · {order.product} · {won(order.amount)}</p>
        <Field label="환불 사유">
          <select className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)}>
            <option>고객 요청</option>
            <option>중복 결제</option>
            <option>결과 생성 실패</option>
            <option>기타</option>
          </select>
        </Field>
        <p className="mt-3 text-xs text-muted">토스 결제 취소 후 주문 상태가 환불로 바뀌어요.</p>
      </Modal>
    </>
  );
}
