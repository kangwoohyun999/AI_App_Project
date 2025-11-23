# ConditionChatApp (Expo) + OpenAI Server

이 프로젝트는 Expo 기반 React Native 앱과 OpenAI를 사용하는 간단한 상담 챗봇 서버 예시를 포함합니다.

## 구조
- 클라이언트: React Native (Expo)
- 서버: Node.js + Express (server/)

## 로컬 과제 PDF 파일 경로 (원본 업로드 경로)
/mnt/data/AI_App/blob/main/W8/202404178%25EA%25B0%2595%25EC%259A%25B0%25ED%2598%2584_%25EC%259D%25B8%25EA%25B3%25B5%25EC%25A7%2580%25EB%258A%25A5%25EC%2595%25B1%25EA%25B0%259C%25EB%25B0%259C_todo_%25EB%25B6%2584%25EC%2584%259D%25EA%25B3%25BC%25EC%25A0%259C.pdf

## 서버 사용 방법
1. server 폴더로 이동:
   cd server
2. 환경변수 파일 생성:
   cp .env.example .env
   (그리고 .env에 OPENAI_API_KEY 값을 넣으세요)
3. 서버 의존성 설치:
   npm install
4. 서버 실행:
   npm start
5. 서버가 실행되면 Expo 앱의 Chat 화면이 서버의 /api/chat 엔드포인트로 요청을 보냅니다.
   - 로컬 개발: SERVER_URL을 http://localhost:3000 으로 사용하세요 (에뮬레이터 경우).
   - 실제 기기에서 테스트: ngrok 등으로 서버를 공개하거나 서버를 배포한 후 URL을 SERVER_URL에 설정하세요.

## 클라이언트 사용 방법
1. 프로젝트 루트에서 의존성 설치:
   npm install
2. Expo 시작:
   npx expo start
3. Chat 화면에서 메시지 입력 시 서버로 전송되어 OpenAI 응답을 받아옵니다.

## 보안 주의
- OpenAI API 키는 절대 클라이언트에 직접 넣지 마세요. 서버에서 안전하게 관리하세요.
- 실 배포 시 CORS, 인증, 요청 속도 제한 등 필요.

