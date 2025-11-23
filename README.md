## 인공지능앱개발 조별과제

## 📌 프로젝트 생성
* npx create-expo-app Today_Condition

## 📌 라이브러리 설치
## 1. ### cd Today_Condition
## 2. ### npm install @react-navigation/native @react-navigation/stack
3. npm install react-native-chart-kit
4. npm install @react-native-async-storage/async-storage
5. npm install react-native-svg
6. npm install expo-font
7. npm install expo-linear-gradient

## 📌 Expo 실행
* npx expo start

## 🔧 설치/주의사항
* react-native-chart-kit와 react-native-svg, @react-native-async-storage/async-storage가 필요합니다. (이전 package.json에 포함)
* 사전(WORD_DICT)은 utils/wordDictionary.js에서 조절하세요. 프로젝트 초기에는 적은 수의 키워드만 넣고 테스트 후 확장 권장.
* 감성 판단 문턱값(estimateSentimentFromWeighted)은 실사용 테스트 후 조정하세요.
* OpenAI API 등 외부 서비스를 연동할 경우 서버사이드에서 API 키를 안전하게 관리하세요. 직접 클라이언트에 키를 넣지 마세요.
