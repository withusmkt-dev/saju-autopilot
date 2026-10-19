import type { BrandStats } from "./types";

export const won = (n: number) => `₩${n.toLocaleString("ko-KR")}`;
export const num = (n: number) => n.toLocaleString("ko-KR");
export const pct = (n: number) => `${n.toFixed(1)}%`;

/** 무료 → 유료 전환율 */
export const conversion = (s: Pick<BrandStats, "freeUsers" | "buyers">) =>
  s.freeUsers === 0 ? 0 : (s.buyers / s.freeUsers) * 100;

/** 광고비 대비 매출 % */
export const roas = (revenue: number, spend: number) => (spend === 0 ? 0 : (revenue / spend) * 100);

export const maskPhone = (p: string) => p.replace(/^(\d{3})-(\d{2})\d{2}-(\d{4})$/, "$1-$2**-$3");

/** 받침에 따라 조사 고르기: josa("청월당", "은", "는") → "청월당은" */
export function josa(word: string, withBatchim: string, without: string) {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  const has = code >= 0 && code <= 11171 && code % 28 !== 0;
  return word + (has ? withBatchim : without);
}

export const footerNoteOf = (name: string) => `${josa(name, "은", "는")} 명월재가 운영하는 사주 서비스입니다.`;
