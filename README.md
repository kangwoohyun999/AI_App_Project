## 인공지능앱개발 조별과제

## 추천 주제 (바꿔도 됨)
* AI 기반 캠퍼스 길찾기, POI 추천 앱
* AI 뉴스 요약 & 키워드 추출 앱

## Node.js 다운로드
https://nodejs.org/ko/download/
접속 후 20.xx.xx 버전 선택 후 다운로드

## npm 다운로드
터미널창에서 npm install npx -g

## 📌 expo 다운로드 (굳이 안해도 됨)
* npm install expo

## 📌 라이브러리 설치
* npm install react-native-chart-kit
* npm install @react-native-async-storage/async-storage
* npx expo install expo-font
* npx expo install react-native-svg
* npx expo install expo-linear-gradient
* npm install victory
* npm install victory-native
* npx expo install react-native-svg

## 📌 Expo 실행
* npx expo start

## 🔧 설치/주의사항
* react-native-chart-kit와 react-native-svg, @react-native-async-storage/async-storage가 필요합니다. (이전 package.json에 포함)
* 사전(WORD_DICT)은 utils/wordDictionary.js에서 조절하세요. 프로젝트 초기에는 적은 수의 키워드만 넣고 테스트 후 확장 권장.
* 감성 판단 문턱값(estimateSentimentFromWeighted)은 실사용 테스트 후 조정하세요.
* OpenAI API 등 외부 서비스를 연동할 경우 서버사이드에서 API 키를 안전하게 관리하세요. 직접 클라이언트에 키를 넣지 마세요.
