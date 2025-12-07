// firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase 프로젝트 설정
// ⚠️ 실제 값으로 교체하세요!
const firebaseConfig = {
  apiKey: "AIzaSyBnqcHmUuTyMM08BFDWBfjOZl6O3sbZVhg",
  authDomain: "psych-beacd.firebaseapp.com",
  projectId: "psych-beacd",
  storageBucket: "psych-beacd.firebasestorage.app",
  messagingSenderId: "163874017534",
  appId: "1:163874017534:web:e7c8c174c7e5765a1df5af",
  measurementId: "G-C4Q2CL2L94"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 인증 및 Firestore 인스턴스
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;