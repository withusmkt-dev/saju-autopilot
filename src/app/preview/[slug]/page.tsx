"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Motif from "@/components/preview/Motif";
import { MockNote, PButton, PTitle, usePreview } from "@/components/preview/PreviewShell";
import { requestFreeReadingMock, type Intake } from "@/lib/preview/mock";

// 12시진 → 대표 시각 (엔진에는 HH:mm 로 넘김)
const SIJIN = [
  ["모름", ""], ["자시 (23:30~01:29)", "00:30"], ["축시 (01:30~03:29)", "02:30"], ["인시 (03:30~05:29)", "04:30"],
  ["묘시 (05:30~07:29)", "06:30"], ["진시 (07:30~09:29)", "08:30"], ["사시 (09:30~11:29)", "10:30"], ["오시 (11:30~13:29)", "12:30"],
  ["미시 (13:30~15:29)", "14:30"], ["신시 (15:30~17:29)", "16:30"], ["유시 (17:30~19:29)", "18:30"], ["술시 (19:30~21:29)", "20:30"],
  ["해시 (21:30~23:29)", "22:30"],
];

const field = "h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-[15px] outline-none focus:border-[var(--p)]";

export default function BrandMainPage() {
  const { brand, page, slug, base } = usePreview();
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [f, setF] = useState({
    name: "", gender: "female" as Intake["gender"], birthDate: "", calendar: "solar" as Intake["calendar"], birthTime: "", phone: "",
    pName: "", pGender: "male" as Intake["gender"], pBirthDate: "", pBirthTime: "",
  });
  const couple = page.formType === "couple";
  const set = (patch: Partial<typeof f>) => setF((v) => ({ ...v, ...patch }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = f.phone.replace(/\D/g, "");
    if (!f.name.trim() || !f.birthDate) return setError("이름과 생년월일을 넣어 주세요.");
    if (couple && (!f.pName.trim() || !f.pBirthDate)) return setError("상대방 이름과 생년월일도 넣어 주세요.");
    if (!/^01\d{8,9}$/.test(digits)) return setError("휴대폰 번호를 확인해 주세요. 결과 링크를 보내 드려요.");
    if (!agree) return setError("개인정보 수집·이용에 동의해 주세요.");
    setError("");
    setSending(true);
    const intake: Intake = {
      name: f.name.trim(),
      gender: f.gender,
      birthDate: f.birthDate,
      calendar: f.calendar,
      birthTime: f.birthTime || null,
      phone: digits.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3"),
      ...(couple && { partner: { name: f.pName.trim(), gender: f.pGender, birthDate: f.pBirthDate, calendar: "solar" as const, birthTime: f.pBirthTime || null } }),
    };
    await requestFreeReadingMock(slug, intake);
    router.push(`${base}/analyzing`);
  };

  const scrollToForm = () => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* 첫 화면 */}
      <section className="relative overflow-hidden bg-[var(--p)] px-6 pt-14 pb-12 text-white">
        <Motif kind={page.motif} accent={brand.theme.accent} bg={brand.theme.primary} />
        {page.motif === "none" && <div className="absolute top-0 right-0 h-full w-2 bg-[var(--a)]" />}
        <div className="relative">
          <span className="inline-block rounded-full bg-[var(--a)] px-3 py-1 text-xs font-bold text-[var(--p)]">{page.badge}</span>
          <h1 className={`mt-4 leading-tight whitespace-pre-line ${page.motif === "none" ? "text-[44px]" : "text-[32px]"}`} style={{ fontFamily: "var(--hf)" }}>
            {page.heroTitle}
          </h1>
          <p className="mt-4 max-w-[300px] text-sm leading-relaxed opacity-85">{page.heroDesc}</p>
          <div className="mt-8 max-w-[260px]">
            <PButton onClick={scrollToForm}>{page.cta}</PButton>
          </div>
          <p className="mt-3 text-[11px] opacity-60">무료 풀이 · 1분이면 끝나요</p>
        </div>
      </section>

      {/* 무엇을 알려주나 */}
      <section className="px-5 py-10">
        <PTitle eyebrow={page.topic}>이런 걸 알려 드려요</PTitle>
        <ul className="space-y-3">
          {page.points.map((pt, i) => (
            <li key={pt.title} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--p)] text-sm font-bold text-[var(--a)]">{i + 1}</span>
              <div>
                <p className="font-bold text-[var(--p)]">{pt.title}</p>
                <p className="text-sm text-[#666]">{pt.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 입력 폼 */}
      <section id="form" className="scroll-mt-20 bg-white px-5 py-10">
        <PTitle eyebrow="무료 풀이">{couple ? "두 사람 정보를 넣어 주세요" : "내 정보를 넣어 주세요"}</PTitle>
        <form onSubmit={submit} className="space-y-3">
          {couple && <p className="text-sm font-bold text-[var(--p)]">나</p>}
          <input className={field} placeholder="이름" value={f.name} onChange={(e) => set({ name: e.target.value })} />
          <div className="grid grid-cols-2 gap-2">
            {(["female", "male"] as const).map((g) => (
              <button key={g} type="button" onClick={() => set({ gender: g })} className={`h-11 rounded-lg border text-sm font-medium ${f.gender === g ? "border-[var(--p)] bg-[var(--p)] text-white" : "border-black/15 bg-white text-[#555]"}`}>
                {g === "female" ? "여성" : "남성"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <input type="date" className={field} value={f.birthDate} max="2026-12-31" onChange={(e) => set({ birthDate: e.target.value })} aria-label="생년월일" />
            <select className={`${field} w-24`} value={f.calendar} onChange={(e) => set({ calendar: e.target.value as Intake["calendar"] })} aria-label="양력/음력">
              <option value="solar">양력</option>
              <option value="lunar">음력</option>
            </select>
          </div>
          <select className={field} value={f.birthTime} onChange={(e) => set({ birthTime: e.target.value })} aria-label="태어난 시간">
            {SIJIN.map(([l, v]) => <option key={l} value={v}>{v ? l : "태어난 시간 (모르면 그대로)"}</option>)}
          </select>

          {couple && (
            <>
              <p className="pt-3 text-sm font-bold text-[var(--p)]">상대방</p>
              <input className={field} placeholder="상대방 이름" value={f.pName} onChange={(e) => set({ pName: e.target.value })} />
              <div className="grid grid-cols-2 gap-2">
                {(["female", "male"] as const).map((g) => (
                  <button key={g} type="button" onClick={() => set({ pGender: g })} className={`h-11 rounded-lg border text-sm font-medium ${f.pGender === g ? "border-[var(--p)] bg-[var(--p)] text-white" : "border-black/15 bg-white text-[#555]"}`}>
                    {g === "female" ? "여성" : "남성"}
                  </button>
                ))}
              </div>
              <input type="date" className={field} value={f.pBirthDate} onChange={(e) => set({ pBirthDate: e.target.value })} aria-label="상대방 생년월일" />
              <select className={field} value={f.pBirthTime} onChange={(e) => set({ pBirthTime: e.target.value })} aria-label="상대방 태어난 시간">
                {SIJIN.map(([l, v]) => <option key={l} value={v}>{v ? l : "상대방 태어난 시간 (모르면 그대로)"}</option>)}
              </select>
            </>
          )}

          <input className={field} inputMode="numeric" placeholder="휴대폰 번호 (결과 링크를 보내 드려요)" value={f.phone} onChange={(e) => set({ phone: e.target.value.replace(/[^\d-]/g, "") })} />
          <label className="flex items-start gap-2 pt-1 text-xs text-[#666]">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-[var(--p)]" />
            <span>
              [필수] 개인정보 수집·이용 동의 — 이름·생년월일시·휴대폰 번호를 풀이와 결과 안내에만 쓰고 1년 뒤 지워요.
            </span>
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <PButton type="submit" disabled={sending}>{sending ? "보내는 중…" : page.cta}</PButton>
          <MockNote>지금은 입력값을 이 브라우저에만 저장하고 다음 화면으로 넘어가요. 실서비스: 주문 생성 + 사주 엔진 계산.</MockNote>
        </form>
      </section>

      {/* 후기 */}
      <section className="px-5 py-10">
        <PTitle eyebrow="이용 후기">먼저 본 분들의 이야기</PTitle>
        <ul className="space-y-3">
          {page.reviews.map((r) => (
            <li key={r.name} className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-[var(--a)]">★★★★★</p>
              <p className="mt-1 text-sm leading-relaxed">{r.text}</p>
              <p className="mt-2 text-xs text-[#999]">{r.name}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 유료 상품 안내 */}
      <section className="px-5 pb-12">
        <div className="rounded-2xl bg-[var(--p)] p-5 text-white">
          <p className="text-xs opacity-70">더 깊이 보고 싶다면</p>
          <p className="mt-1 text-lg font-bold" style={{ fontFamily: "var(--hf)" }}>{brand.orderNamePrefix} {page.product.name}</p>
          <p className="mt-1 text-sm opacity-80">{page.product.desc}</p>
          <p className="mt-3">
            <span className="mr-2 text-sm line-through opacity-50">₩{page.product.listPrice.toLocaleString()}</span>
            <span className="text-2xl font-bold text-[var(--a)]">₩{page.product.price.toLocaleString()}</span>
          </p>
          <p className="mt-3 text-xs opacity-60">무료 풀이를 본 뒤 결과 화면에서 바로 이어 볼 수 있어요.</p>
        </div>
      </section>
    </>
  );
}
