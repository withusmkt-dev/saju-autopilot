"use client";

import { useRef } from "react";
import { inputBase } from "./ui";
import { useStore } from "@/lib/store";
import type { AssetImage } from "@/lib/types";

/** 실제로 띄울 수 있는 이미지 주소인지 (더미 경로는 파일이 없어서 색 박스로 대신 그림) */
export const isViewable = (src: string | null | undefined): boolean => !!src && /^(blob:|data:|https?:)/.test(src);

const TAG_BG: Record<string, string> = {
  동양풍: "linear-gradient(135deg,#3d2c1e,#c0944d)",
  밤하늘: "linear-gradient(135deg,#0f172a,#4338ca)",
  꽃: "linear-gradient(135deg,#9d174d,#fda4af)",
  모던: "linear-gradient(135deg,#334155,#cbd5e1)",
};

export function AssetThumb({ asset, className = "h-10 w-10" }: { asset: AssetImage; className?: string }) {
  if (isViewable(asset.src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={asset.src} alt={asset.name} className={`${className} rounded-md object-cover`} />;
  }
  return <span className={`${className} inline-block rounded-md`} style={{ background: TAG_BG[asset.tags[0]] ?? "#e7e5e0" }} title={asset.name} />;
}

/** 이미지 여러 장을 라이브러리에 추가 */
export function AddImagesButton({ onAdded, size = "md" }: { onAdded?: (added: AssetImage[]) => void; size?: "sm" | "md" }) {
  const { addAssets, notify } = useStore();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={`inline-flex shrink-0 items-center justify-center gap-1 rounded-lg border border-line bg-white font-medium whitespace-nowrap text-ink hover:bg-paper ${size === "sm" ? "h-8 px-2.5 text-xs" : "h-9 px-3.5 text-sm"}`}
      >
        🖼️ 이미지 추가하기
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = "";
          if (!files.length) return;
          const added = addAssets(files);
          notify(`이미지 ${added.length}장을 추가했어요`);
          onAdded?.(added);
        }}
      />
    </>
  );
}

/** 등록해 둔 이미지 중 하나 고르기. 빈 값 = 자동으로 골라 씀 */
export function AssetSelect({ value, onChange, emptyLabel = "이미지 자동 선택" }: { value: string; onChange: (id: string) => void; emptyLabel?: string }) {
  const { assets } = useStore();
  return (
    <select className={`${inputBase} h-8 min-w-0 flex-1 text-xs`} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{emptyLabel}</option>
      {assets.map((a) => (
        <option key={a.id} value={a.id}>
          {a.name}
          {a.tags.length ? ` · ${a.tags.join(", ")}` : ""}
        </option>
      ))}
    </select>
  );
}
