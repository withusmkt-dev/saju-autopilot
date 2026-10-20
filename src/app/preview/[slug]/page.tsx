"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Hero, { PhotoBand } from "@/components/preview/Hero";
import { MockNote, PButton, PCard, PTitle, useAos, useField, useAosInit, usePreview } from "@/components/preview/PreviewShell";
import { About, Feature } from "@/components/preview/Features";
import { Points, Product, Reviews } from "@/components/preview/Sections";
import { requestFreeReadingMock, type Intake } from "@/lib/preview/mock";
import type { Section } from "@/lib/preview/skins";

// 12시진 → 대표 시각 (엔진에는 HH:mm 로 넘김)
const SIJIN = [
  ["모름", ""], ["자시 (23:30~01:29)", "00:30"], ["축시 (01:30~03:29)", "02:30"], ["인시 (03:30~05:29)", "04:30"],
  ["묘시 (05:30~07:29)", "06:30"], ["진시 (07:30~09:29)", "08:30"], ["사시 (09:30~11:29)", "10:30"], ["오시 (11:30~13:29)", "12:30"],
  ["미시 (13:30~15:29)", "14:30"], ["신시 (15:30~17:29)", "16:30"], ["유시 (17:30~19:29)", "18:30"], ["술시 (19:30~21:29)", "20:30"],
  ["해시 (21:30~23:29)", "22:30"],
];

export default function BrandMainPage() {
  useAosInit();
  const { skin } = usePreview();
  const scrollToForm = () => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  const SECTION: Record<Section, React.ReactNode> = {
    points: (
      <div key="points">
        <Points />
        <PhotoBand />
      </div>
    ),
    form: <IntakeForm key="form" />,
    reviews: <Reviews key="reviews" />,
    product: <Product key="product" />,
    feature: <Feature key="feature" />,
    about: <About key="about" />,
  };
  return (
    <>
      <Hero onStart={scrollToForm} />
      {skin.order.map((s) => SECTION[s])}
    </>
  );
}

function IntakeForm() {
  const { page, slug, base } = usePreview();
  const field = useField();
  const aos = useAos();
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

  const genderPick = (value: Intake["gender"], onPick: (g: Intake["gender"]) => void) => (
    <div className="grid grid-cols-2 gap-2">
      {(["female", "male"] as const).map((g) => (
        <button
          key={g}
          type="button"
          onClick={() => onPick(g)}
          className={`h-11 text-sm font-medium ${field} ${value === g ? "!border-[var(--ink)] !bg-[var(--ink)] !text-[var(--pbg)]" : ""}`}
        >
          {g === "female" ? "여성" : "남성"}
        </button>
      ))}
    </div>
  );

  const person = (who: "me" | "partner") =>
    who === "me" ? (
      <div className="space-y-3">
        <input className={field} placeholder="이름" value={f.name} onChange={(e) => set({ name: e.target.value })} />
        {genderPick(f.gender, (g) => set({ gender: g }))}
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <input type="date" className={field} value={f.birthDate} max="2026-12-31" onChange={(e) => set({ birthDate: e.target.value })} aria-label="생년월일" />
          <select className={`${field} !w-24`} value={f.calendar} onChange={(e) => set({ calendar: e.target.value as Intake["calendar"] })} aria-label="양력/음력">
            <option value="solar">양력</option>
            <option value="lunar">음력</option>
          </select>
        </div>
        <select className={field} value={f.birthTime} onChange={(e) => set({ birthTime: e.target.value })} aria-label="태어난 시간">
          {SIJIN.map(([l, v]) => <option key={l} value={v}>{v ? l : "태어난 시간 (모르면 그대로)"}</option>)}
        </select>
      </div>
    ) : (
      <div className="space-y-3">
        <input className={field} placeholder="상대방 이름" value={f.pName} onChange={(e) => set({ pName: e.target.value })} />
        {genderPick(f.pGender, (g) => set({ pGender: g }))}
        <input type="date" className={field} value={f.pBirthDate} onChange={(e) => set({ pBirthDate: e.target.value })} aria-label="상대방 생년월일" />
        <select className={field} value={f.pBirthTime} onChange={(e) => set({ pBirthTime: e.target.value })} aria-label="상대방 태어난 시간">
          {SIJIN.map(([l, v]) => <option key={l} value={v}>{v ? l : "상대방 태어난 시간 (모르면 그대로)"}</option>)}
        </select>
      </div>
    );

  return (
    <section id="form" className="scroll-mt-24 px-5 py-8">
      <div {...aos()}><PTitle>{page.titles.form}</PTitle></div>
      <form onSubmit={submit} className="space-y-3" {...aos(1)}>
        {couple ? (
          <>
            <PCard>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--ink)]"><span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--p)] text-xs text-white">나</span>내 정보</p>
              {person("me")}
            </PCard>
            <p className="text-center text-xl text-[var(--a)]">♥</p>
            <PCard>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--ink)]"><span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--a)] text-xs text-[var(--p)]">너</span>상대방 정보</p>
              {person("partner")}
            </PCard>
          </>
        ) : (
          <PCard>{person("me")}</PCard>
        )}
        <PCard className="space-y-3">
          <input className={field} inputMode="numeric" placeholder="휴대폰 번호 (결과 링크를 보내 드려요)" value={f.phone} onChange={(e) => set({ phone: e.target.value.replace(/[^\d-]/g, "") })} />
          <label className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--sub)]">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-[var(--ink)]" />
            <span>[필수] 개인정보 수집·이용 동의. 이름, 생년월일시, 휴대폰 번호는 풀이와 결과 안내에만 쓰고 1년 뒤 지워요.</span>
          </label>
        </PCard>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <PButton type="submit" disabled={sending}>{sending ? "보내는 중…" : page.cta}</PButton>
        <MockNote>지금은 입력값을 이 브라우저에만 저장하고 다음 화면으로 넘어가요. 실서비스: 주문 생성 + 사주 엔진 계산.</MockNote>
      </form>
    </section>
  );
}
