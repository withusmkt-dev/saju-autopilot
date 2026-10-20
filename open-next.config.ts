import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// 빌드 때 미리 렌더한 페이지·'use cache' 결과를 정적 자산에서 읽는다 (읽기 전용, 재검증 없음).
// 더미 데이터 단계라 충분하고, 실데이터·revalidate 가 생기면 r2IncrementalCache 로 바꾼다.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
