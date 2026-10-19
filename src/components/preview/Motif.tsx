// 예시 페이지 상단 그림. 실제 배경 이미지가 들어오기 전까지 SVG 로 분위기만 낸다.
import type { Motif as MotifKey } from "@/lib/preview/brandPages";

export default function Motif({ kind, accent, bg }: { kind: MotifKey; accent: string; bg: string }) {
  if (kind === "none") return null;
  return (
    <svg viewBox="0 0 400 260" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" style={{ color: bg }} aria-hidden>
      {kind === "moon" && (
        <>
          <defs>
            <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor={accent} stopOpacity="0.55" />
              <stop offset="1" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="70" r="90" fill="url(#glow)" />
          <circle cx="300" cy="70" r="38" fill={accent} opacity="0.95" />
          <circle cx="318" cy="58" r="34" fill="currentColor" opacity="0.92" />
          {[
            [40, 40], [90, 90], [150, 30], [210, 110], [60, 170], [360, 170], [250, 200], [120, 220],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2 : 1.3} fill="#fff" opacity={0.5 + (i % 3) * 0.15} />
          ))}
        </>
      )}
      {kind === "flower" &&
        [
          [320, 60, 30], [370, 140, 20], [40, 200, 24], [260, 210, 14], [80, 50, 12],
        ].map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${i * 23})`} opacity={0.85 - i * 0.1}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy={-r * 0.6} rx={r * 0.42} ry={r * 0.62} fill={accent} transform={`rotate(${a})`} />
            ))}
            <circle r={r * 0.22} fill="#fff6c9" />
          </g>
        ))}
      {kind === "coin" && (
        <>
          {[
            [310, 70, 34], [350, 130, 24], [270, 140, 18], [60, 190, 22],
          ].map(([x, y, r], i) => (
            <g key={i} opacity={0.9 - i * 0.12}>
              <circle cx={x} cy={y} r={r} fill={accent} />
              <circle cx={x} cy={y} r={r * 0.72} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
              <rect x={x - r * 0.18} y={y - r * 0.18} width={r * 0.36} height={r * 0.36} fill="currentColor" opacity="0.5" />
            </g>
          ))}
          {[
            [230, 50], [380, 60], [120, 70], [200, 220],
          ].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2}Z`} fill="#fff" opacity="0.7" />
          ))}
        </>
      )}
      {kind === "cloud" && (
        <>
          <circle cx="320" cy="64" r="30" fill={accent} opacity="0.85" />
          <path d="M0 230 L70 170 L120 205 L190 140 L260 200 L320 160 L400 215 L400 260 L0 260Z" fill="#fff" opacity="0.08" />
          <path d="M0 250 L90 200 L160 235 L230 190 L310 240 L400 205 L400 260 L0 260Z" fill="#fff" opacity="0.12" />
          {[
            [250, 100, 1], [60, 70, 0.8],
          ].map(([x, y, s], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round">
              <path d="M0 20 Q10 0 30 10 Q45 -5 60 12 Q80 8 85 20" />
              <path d="M18 22 Q26 12 36 18" />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}
