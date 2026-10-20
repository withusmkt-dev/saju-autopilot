"use client";

// '이메일로도 받기' — 문자는 기본, 이메일은 원하는 사람만. 입력 폼에 이메일 칸을 두지 않으려고 결과 화면에서 받는다.
import { useState } from "react";
import { useField, usePreview } from "./PreviewShell";
import { sendEmailMock } from "@/lib/preview/mock";

export default function EmailOptIn({ label = "이메일로도 받기" }: { label?: string }) {
  const field = useField();
  const { skin } = usePreview();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setState("error");
    setState("sending");
    // 실서비스: 주문에 email 저장 후 sendReportEmail(...)  ← src/lib/server/email.ts
    await sendEmailMock(email.trim());
    setState("sent");
  };

  if (state === "sent") {
    return <p className="mt-3 text-center text-[13px] text-[var(--ink)]">{email} 으로 보냈어요 (목업). 메일함에 없으면 스팸함도 확인해 주세요.</p>;
  }
  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="mt-3 w-full py-2 text-[14px] text-[var(--sub)] underline underline-offset-4">
        {label}
      </button>
    );
  }
  return (
    <form onSubmit={send} className="mt-3 flex flex-wrap gap-2">
      <input type="email" className={`${field} !w-auto flex-1`} placeholder="받을 이메일 주소" value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }} autoFocus />
      <button type="submit" disabled={state === "sending"} className={`h-11 shrink-0 px-4 text-[14px] font-bold ${skin.btn}`}>
        {state === "sending" ? "보내는 중" : "보내기"}
      </button>
      {state === "error" && <p className="w-full text-[13px] text-red-500" role="alert">이메일 주소를 확인해 주세요.</p>}
    </form>
  );
}
