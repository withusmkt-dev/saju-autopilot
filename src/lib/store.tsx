"use client";

// 더미 데이터를 탭 사이에서 같이 쓰는 임시 저장소. 백엔드가 붙으면 이 자리를 API 호출로 바꾼다.
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ASSET_IMAGES, BRANDS, CAMPAIGNS, CONTENT_HISTORY, KILL_RULE, ORDERS } from "./dummy";
import type { AdCampaign, AssetImage, Brand, ContentItem, KillRule, Order } from "./types";

interface Store {
  brands: Brand[];
  setBrand: (id: string, patch: Partial<Brand>) => void;
  addBrand: (b: Brand) => void;
  campaigns: AdCampaign[];
  setCampaign: (id: string, patch: Partial<AdCampaign>) => void;
  killRule: KillRule;
  setKillRule: (r: KillRule) => void;
  contents: ContentItem[];
  setContents: (fn: (prev: ContentItem[]) => ContentItem[]) => void;
  orders: Order[];
  setOrder: (id: string, patch: Partial<Order>) => void;
  assets: AssetImage[];
  addAssets: (files: File[]) => AssetImage[];
  toast: string | null;
  notify: (msg: string) => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [brands, setBrands] = useState(BRANDS);
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);
  const [killRule, setKillRule] = useState(KILL_RULE);
  const [contents, setContents] = useState(CONTENT_HISTORY);
  const [orders, setOrders] = useState(ORDERS);
  const [assets, setAssets] = useState(ASSET_IMAGES);
  const [toast, setToast] = useState<string | null>(null);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((t) => (t === msg ? null : t)), 2400);
  }, []);

  const value = useMemo<Store>(
    () => ({
      brands,
      setBrand: (id, patch) => setBrands((list) => list.map((b) => (b.id === id ? { ...b, ...patch } : b))),
      addBrand: (b) => setBrands((list) => [b, ...list]),
      campaigns,
      setCampaign: (id, patch) => setCampaigns((list) => list.map((c) => (c.id === id ? { ...c, ...patch } : c))),
      killRule,
      setKillRule,
      contents,
      setContents,
      orders,
      setOrder: (id, patch) => setOrders((list) => list.map((o) => (o.id === id ? { ...o, ...patch } : o))),
      assets,
      // TODO(API): Supabase Storage 업로드 후 URL 저장. 지금은 브라우저 안에서만 보이는 임시 URL
      addAssets: (files) => {
        const added = files.map((f, i) => ({ id: `img_up_${Date.now()}_${i}`, name: f.name, src: URL.createObjectURL(f), tags: [], addedAt: "2026-10-19" }));
        setAssets((list) => [...added, ...list]);
        return added;
      },
      toast,
      notify,
    }),
    [brands, campaigns, killRule, contents, orders, assets, toast, notify],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("StoreProvider 밖에서 useStore 사용");
  return s;
}

export function useBrandMap() {
  const { brands } = useStore();
  return useMemo(() => new Map(brands.map((b) => [b.id, b])), [brands]);
}
