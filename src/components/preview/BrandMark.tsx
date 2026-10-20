// 브랜드 로고 마크 (SVG). 글자 대신 컨셉을 그림으로. 실서비스에서는 site_config.logo 로 바꿀 수 있다.
// 선 색은 currentColor, 강조 색은 accent 로 받는다.

type Props = { slug: string; accent: string; className?: string };

export default function BrandMark({ slug, accent, className = "h-5 w-5" }: Props) {
  const common = { viewBox: "0 0 24 24", className, fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (slug) {
    case "destiny-call": // 번개
      return (
        <svg {...common}>
          <path d="M13.5 2.5 5 13.5h6l-1.5 8 8.5-11h-6z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "love-lab": // 하트가 든 플라스크
      return (
        <svg {...common}>
          <path d="M9.5 3h5M10 3v5.2L5.2 17a2.6 2.6 0 0 0 2.3 4h9a2.6 2.6 0 0 0 2.3-4L14 8.2V3" />
          <path d="M12 18.2s-2.6-1.6-2.6-3.2a1.3 1.3 0 0 1 2.6-.4 1.3 1.3 0 0 1 2.6.4c0 1.6-2.6 3.2-2.6 3.2z" fill={accent} stroke="none" />
        </svg>
      );
    case "geumbit": // 겹친 금화
      return (
        <svg {...common}>
          <ellipse cx="9" cy="15" rx="5.5" ry="2.6" />
          <path d="M3.5 15v2.4c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6V15" />
          <circle cx="15.5" cy="8.5" r="5" fill={accent} stroke="currentColor" />
          <path d="M15.5 6.3v4.4M13.8 8.5h3.4" />
        </svg>
      );
    case "cheongwol": // 산 위의 달, 낙관 테두리
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="1.5" />
          <circle cx="15" cy="8.5" r="2.2" fill={accent} stroke="none" />
          <path d="M5.5 17.5 9.5 12l2.5 3 2-2.2 4.5 4.7" />
        </svg>
      );
    case "saju-secret": // 열쇠 구멍
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="10" r="2.3" fill="currentColor" stroke="none" />
          <path d="M11 11.5h2l.8 5h-3.6z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "fact-saju": // 서류 가방
      return (
        <svg {...common}>
          <rect x="3" y="7.5" width="18" height="12" rx="2" />
          <path d="M9 7.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5v2M3 12.5h18" />
          <rect x="10.5" y="11.2" width="3" height="2.6" rx=".5" fill={accent} stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "today-myeongri": // 수평선 위 해
      return (
        <svg {...common}>
          <path d="M6.5 16a5.5 5.5 0 0 1 11 0" fill={accent} />
          <path d="M3 16h18M5 19.5h14M12 4.5v2.2M5.5 8.2l1.5 1.5M18.5 8.2 17 9.7" />
        </svg>
      );
    case "soul-saju": // 맞물린 두 고리
      return (
        <svg {...common}>
          <circle cx="9" cy="12" r="5.5" />
          <circle cx="15" cy="12" r="5.5" stroke={accent} />
        </svg>
      );
    case "hongyeon": // 붉은 실 매듭
      return (
        <svg {...common}>
          <path d="M3 18c3-1 4.5-3 5-6s2.5-5.5 5-5 2.6 3.6.2 5.2-5.7.6-5-1.8 4.2-3.4 6.8-1.6S19 15 21 14" stroke={accent} strokeWidth="2" />
        </svg>
      );
    default: // 달빛운세: 초승달과 별
      return (
        <svg {...common}>
          <path d="M15.5 3.8A8.5 8.5 0 1 0 20.2 15a6.6 6.6 0 0 1-4.7-11.2z" fill="currentColor" stroke="none" />
          <path d="m18.5 4 .6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill={accent} stroke="none" />
        </svg>
      );
  }
}
