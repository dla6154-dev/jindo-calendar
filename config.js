// Supabase 접속 정보 (publishable 키는 브라우저 공개용이라 노출돼도 괜찮습니다.
// 쓰기 권한은 DB 함수의 팀 PIN으로 보호됩니다.)
window.APP_CONFIG = {
  SUPABASE_URL: 'https://fnpsaypaxpxyyqmrqwai.supabase.co',
  SUPABASE_KEY: 'sb_publishable_o-xN5hfZL6zWqrSGfilJDw_YJNhNEOx',
  TITLE: '진도 업무 달력',
  // 핸드폰이 접속할 주소 (화면의 QR코드가 이 주소로 만들어짐).
  // GitHub Pages 배포 주소
  PUBLIC_URL: 'https://dla6154-dev.github.io/jindo-calendar/',
};
