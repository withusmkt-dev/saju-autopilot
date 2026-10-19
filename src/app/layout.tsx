import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import AdminShell from "@/components/AdminShell";

export const metadata: Metadata = {
  title: "사주 오토파일럿 관리자",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        <StoreProvider>
          <AdminShell>{children}</AdminShell>
        </StoreProvider>
      </body>
    </html>
  );
}
