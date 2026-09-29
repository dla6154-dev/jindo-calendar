# 진도 업무 달력

사무실 화면 표시 + 핸드폰 입력용 업무 달력 (Supabase 실시간 연동)

## 파일
- `index.html` — 앱 전체 (빌드 불필요)
- `config.js` — Supabase 주소와 공개(publishable) 키

## 사용법
| 용도 | 주소 |
|---|---|
| 사무실 화면(TV) | `https://<배포주소>/?tv=1` — 오늘부터 2주를 7일×2줄로 표시, 업무 내용 전체 표시, 편집 버튼 숨김, 시계·QR 표시, 더블클릭하면 전체화면 |
| 핸드폰 | `https://<배포주소>/` — 오늘부터 14일을 날짜별 목록으로 표시, 날짜의 "+ 추가"로 등록, 업무 탭하면 수정·삭제 |
| PC 편집 | `https://<배포주소>/` — TV와 같은 2주 화면, 빈 칸 클릭하면 그 날짜로 등록 |

- 등록·수정·삭제에는 **팀 PIN**이 필요합니다 (기기마다 한 번 입력하면 기억됨).
- 업무 내용이 많으면 글자 크기가 자동으로 줄어 한 화면에 들어갑니다 (최소 60%까지, 그래도 넘치면 그 주만 스크롤).
- ‹ › 버튼은 1주씩 이동합니다. TV 화면은 1분간 조작이 없으면 오늘로 돌아오고, 자정에 날짜가 바뀌며, 매일 새벽 4시에 자동 새로고침됩니다.
- 공휴일은 한국천문연구원 특일정보 API(공공데이터포털)에서 자동으로 받아옵니다. 대체공휴일·임시공휴일·선거일 포함.

## Supabase
- 테이블: `public.jindo_work_events` (누구나 조회 가능, 쓰기는 PIN 확인 함수로만 가능)
- PIN·공휴일 API 키 저장: `public.jindo_app_secret` (브라우저에서 접근 불가)
- 공휴일: `public.jindo_holidays` ← Edge Function `jindo-sync-holidays`가 매월 2일 한국시간 03:00에 올해·내년 공휴일을 갱신 (pg_cron 작업 `jindo-sync-holidays-daily`)
  - API 인증키 변경 (공공데이터포털 키는 활용기간 만료 시 연장 필요):
    ```sql
    update public.jindo_app_secret set value = '새 인증키' where key = 'holiday_api_key';
    ```
- PIN 변경 (SQL Editor):
  ```sql
  update public.jindo_app_secret set value = '새PIN' where key = 'pin';
  ```
  변경하면 각 기기에서 새 PIN을 다시 물어봅니다.

## 로컬 테스트
```bash
py -m http.server 5500
```
