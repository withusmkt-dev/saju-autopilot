# 사주 오토파일럿 (관리자 앱)

여러 사주 브랜드 랜딩을 만들고 관리하는 내부 관리자 앱입니다. Next.js 16 (App Router, `cacheComponents`) 기반이며, 지금은 더미 데이터와 목업만 씁니다.

## 로컬 개발

```bash
npm install
npm run dev -- -p 3100
```

- 관리자: http://localhost:3100/
- 예시 브랜드 페이지: http://localhost:3100/preview , /preview/dalbit , /preview/gungmyeong

## Cloudflare 배포 (Workers + OpenNext)

관리자 앱은 Vercel 이 아니라 Cloudflare Workers 에 [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) 로 올립니다. 정적 내보내기(Pages)는 서버 렌더링·PPR 이 필요한 이 앱에 맞지 않아 쓰지 않습니다.

| 파일 | 역할 |
| --- | --- |
| `wrangler.jsonc` | Worker 이름(`saju-autopilot-admin`), 호환 날짜, 정적 자산 설정 |
| `open-next.config.ts` | 캐시 설정. 지금은 빌드 결과를 읽기만 하는 정적 자산 캐시 (재검증 없음) |
| `public/_headers` | `/_next/static/*` 장기 캐시 헤더 |

비밀 값·R2·KV 바인딩은 아직 없습니다. 실제 API 키가 생기면 `npx wrangler secret put 이름` 으로 넣고, 데이터 재검증이 필요해지면 `open-next.config.ts` 를 R2 캐시로 바꿉니다.

### 배포 순서

1. Cloudflare 로그인 (처음 한 번): `npx wrangler login`
2. Workers 런타임으로 로컬 확인: `npm run preview` → http://localhost:8787
3. 배포: `npm run deploy` → `https://saju-autopilot-admin.<계정>.workers.dev` 에 올라감
4. (선택) Worker → Settings → Domains & Routes 에서 `admin.회사도메인` 같은 커스텀 도메인 연결

GitHub 자동 배포를 원하면 Workers & Pages → 해당 Worker → Settings → Build 에서 저장소를 연결하고 빌드 명령 `npx opennextjs-cloudflare build`, 배포 명령 `npx opennextjs-cloudflare deploy` 를 넣습니다.

> Windows 에서도 빌드·미리보기는 확인했지만 OpenNext 는 Windows 를 공식 보장하지 않습니다. 문제가 생기면 WSL 이나 GitHub 자동 배포(Linux)로 빌드하세요.

### Cloudflare Access 로 회사 계정만 들어오게 잠그기

관리자 앱이라 배포 직후 바로 잠가야 합니다.

1. Cloudflare 대시보드 → **Zero Trust** (처음이면 팀 이름 정하고 무료 플랜 선택)
2. **Settings → Authentication** 에서 로그인 방법 추가: 기본 One-time PIN(메일 인증코드) 또는 Google Workspace
3. **Access → Applications → Add an application → Self-hosted**
   - 도메인: 연결한 커스텀 도메인(예: `admin.회사도메인`) 또는 `saju-autopilot-admin.<계정>.workers.dev`
   - 세션 유지 시간: 예) 24시간
4. 정책(Policy) 추가: Action **Allow**, Include → **Emails ending in** `@회사도메인` (개인 메일을 허용하려면 **Emails** 에 주소를 하나씩 추가)
5. 저장 후 시크릿 창으로 접속해 로그인 화면이 뜨는지, 회사 메일만 통과하는지 확인

`workers.dev` 주소를 쓰는 경우 Worker → Settings → Domains & Routes 의 workers.dev 항목에서 **Cloudflare Access 켜기**로 한 번에 잠글 수도 있습니다. 커스텀 도메인만 쓸 거라면 workers.dev 주소와 Preview URLs 는 꺼 두어 우회 경로를 없앱니다.
