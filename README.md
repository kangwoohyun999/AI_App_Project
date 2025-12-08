## 인공지능앱개발 조별과제

## Node.js 다운로드
https://nodejs.org/ko/download/
접속 후 20.xx.xx 버전 선택 후 다운로드

## npm 다운로드
터미널창에서 npm install npx -g

## 📌 expo 다운로드
* npm install expo

## ✅ 버전 오류 해결 방법
### 1번
* npm uninstall @expo/webpack-config
### 2번
* @expo/webpack-config@19.0.3
* npm install @expo/webpack-config@19.0.3 --save-dev
### ⚠️ 절대로 하면 안 되는 것
* npm install --force
* npm install --legacy-peer-deps

## 📌 expo fix
* npm audit fix
* npm audit fix --force

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

## 🍎 iOS 설치 및 실행 가이드
📋 사전 요구사항
macOS에서 실행 시:

macOS Catalina (10.15) 이상
Xcode 14.0 이상
CocoaPods 1.11 이상
Node.js 16 이상

Windows에서 실행 시:

Expo Go 앱만 사용 가능 (시뮬레이터 불가)

## 📌 ios 필수 라이브러리
* npx pod-install ios
* npm install react-native-reanimated@~2.14.4
* npm install react-native-safe-area-context@4.5.0
* npx expo install expo-build-properties

## ios 오류 시 해결 방법
### 1. 완전히 클린 설치
* rm -rf node_modules
* rm -rf .expo
* rm -rf ios
* rm package-lock.json
* npm cache clean --force

### 2. 재설치
* npm install

### 3. Metro 캐시 클리어하고 재시작
* npx expo start -c

### 4. iOS에서 실행
* npx expo start --ios
