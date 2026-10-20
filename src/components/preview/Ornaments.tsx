"use client";

// 디테일: 섹션 사이 장식, 하단 고정 버튼
import { useEffect, useState } from "react";
import { usePreview } from "./PreviewShell";

/** 섹션 사이 작은 장식. 스킨마다 다르게, 없는 스킨도 있음 */
export function Divider() {
  const { page } = usePreview();
  switch (page.skin) {
    case "night":
      return <p className="py-2 text-center text-[13px] tracking-[0.6em] text-[var(--a)] opacity-70" aria-hidden>· ✦ ·</p>;
    case "hanji":
      return (
        <div className="flex items-center gap-3 px-[10cqw] py-2" aria-hidden>
          <span className="h-px flex-1 bg-[var(--p)]/30" />
          <span className="h-2.5 w-2.5 rounded-full border border-[var(--p)]/50" />
          <span className="h-px flex-1 bg-[var(--p)]/30" />
        </div>
      );
    case "daily":
      return <div className="mx-[5.5cqw] border-t-4 border-double border-[var(--p)]/40" aria-hidden />;
    case "letter":
      return <p className="py-1 text-center text-[16px] text-[var(--p)] opacity-50" aria-hidden>~ ♡ ~</p>;
    case "soft":
      return <p className="py-1 text-center text-[14px] tracking-[0.5em] text-[var(--p)] opacity-40" aria-hidden>♡ ♡ ♡</p>;
    case "calendar":
      return <div className="mx-[5.5cqw] border-t-2 border-dotted border-[var(--p)]/30" aria-hidden />;
    case "duo":
      return (
        <div className="flex justify-center py-1" aria-hidden>
          <svg viewBox="0 0 40 16" className="h-4 w-10 text-[var(--p)] opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="15" cy="8" r="6" />
            <circle cx="25" cy="8" r="6" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

/** 첫 화면을 지나면 아래에 따라다니는 '무료로 보기' 버튼. 입력 폼이 보이면 숨는다. 살짝 통통 (명월재·랜딩 CTA 방식) */
export function StickyCta({ onStart }: { onStart: () => void }) {
  const { page, skin } = usePreview();
  const [show, setShow] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const form = document.getElementById("form");
    let formVisible = false;
    const io = new IntersectionObserver(([e]) => {
      formVisible = e.isIntersecting;
      setShow(window.scrollY > 520 && !formVisible);
    });
    if (form) io.observe(form);
    const onScroll = () => setShow(window.scrollY > 520 && !formVisible);
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setInterval(() => setBounce((b) => !b), 900);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearInterval(t);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[430px] px-[5.5cqw] pb-4 transition-all duration-300 ${show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
    >
      <button
        type="button"
        onClick={onStart}
        className={`pointer-events-auto w-full text-[16px] font-bold shadow-lg transition-transform duration-500 ${skin.btn} ${bounce ? "scale-[1.03]" : "scale-100"}`}
        style={{ fontFamily: "'Pretendard Variable', sans-serif", height: "3.2em" }}
        tabIndex={show ? 0 : -1}
      >
        {page.cta}
      </button>
    </div>
  );
}
