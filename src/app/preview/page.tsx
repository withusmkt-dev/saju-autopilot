import Link from "next/link";
import { getBrandPage, SHOWCASE } from "@/lib/preview/brandPages";
import { SKINS } from "@/lib/preview/skins";

export const metadata = { title: "예시 브랜드 페이지", robots: { index: false, follow: false } };

/** 예시 브랜드 페이지 모음 (주제별 10개) */
export default function PreviewIndex() {
  const items = SHOWCASE.map((slug) => getBrandPage(slug)!).filter(Boolean);
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-ink">예시 브랜드 페이지</h1>
          <p className="mt-1 text-sm text-muted">마스터 템플릿 하나에 브랜드 설정값만 바꿔 끼운 결과예요. 분석·결제·알림톡은 목업이에요.</p>
        </div>
        <Link href="/brands" className="text-sm text-muted hover:text-ink">← 관리자</Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ brand, page }) => (
          <li key={brand.slug}>
            <Link href={`/preview/${brand.slug}`} className="block overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex h-24 items-end justify-between p-4" style={{ background: brand.theme.primary }}>
                <span className="text-lg font-bold text-white">{brand.name}</span>
                <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: brand.theme.accent, color: brand.theme.primary }}>{page.topic}</span>
              </div>
              <div className="p-4">
                <p className="text-sm whitespace-pre-line text-ink">{page.heroTitle}</p>
                <p className="mt-2 text-xs text-muted">
                  /{brand.slug} · {page.formType === "couple" ? "두 사람 입력" : "한 사람 입력"} · {SKINS[page.skin].label} 스킨
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
