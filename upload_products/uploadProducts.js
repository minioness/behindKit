/**
 * uploadProducts.js
 * 실행 방법: 터미널에서 `node uploadProducts.js`
 */

// firebase-admin 모듈 가져옴 (Node.js용 Firebase 관리 도구)
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// data.json 파일 불러오기 → 상품 배열
const products = require("./data.json");

// Firebase 서비스 계정 키 파일 불러오기
const serviceAccount = require("./serviceAccountKey.json");

// Firebase Admin SDK 초기화 → 관리자 권한으로 Firestore 연결 준비
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "behindkit-246dd.firebasestorage.app",
});

// Firestore DB 인스턴스 가져오기
const db = admin.firestore();
const bucket = admin.storage().bucket();

// 공통 다운로드용 더미 ZIP 파일명
const dummyFilePath = "products/downloads/dummy.zip";

// Firestore에 업로드할 비동기 함수 선언
async function uploadProducts() {
  // batch: 여러 문서를 한 번에 쓰기 위한 Firestore 기능
  const batch = db.batch();

  // 더미 파일 Download URL 한 번만 생성
  const dummyFile = bucket.file(dummyFilePath);
  const [dummyMeta] = await dummyFile.getMetadata();

  const dummyToken = dummyMeta.metadata?.firebaseStorageDownloadTokens;
  if (!dummyToken) {
    console.error(`더미 파일 ${dummyFilePath} 액세스 토큰 없음! 콘솔에서 만들어주세요.`);
    return;
  }
  const encodedDummyPath = encodeURIComponent(dummyFilePath);
  const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodedDummyPath}?alt=media&token=${dummyToken}`;

  // data.json 안의 상품들을 하나씩 꺼내서 처리
  for (const product of products) {
    try {
      // Storage 썸네일 경로
      const thumbPath = `products/thumbnails/product-${product.id}.png`;
      const thumbFile = bucket.file(thumbPath);
      const [thumbMeta] = await thumbFile.getMetadata();

      const thumbToken = thumbMeta.metadata?.firebaseStorageDownloadTokens;
      if (!thumbToken) {
        console.log(`썸네일 ${thumbPath} 액세스 토큰 없음! 콘솔에서 만들어주세요.`);
        continue;
      }

      const encodedThumbPath = encodeURIComponent(thumbPath);
      const thumbnailUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodedThumbPath}?alt=media&token=${thumbToken}`;

      // Firestore 문서 참조
      const ref = db.collection("products").doc(String(product.id));

      // batch에 썸네일 + fileUrl 덮어쓰기 포함해서 추가 + merge 옵션
      batch.set(ref, {
        ...product,
        thumbnail: thumbnailUrl,
        fileUrl: fileUrl, // 모든 상품에 공통 ZIP
      }, { merge: true });

      console.log(`product-${product.id}: 썸네일 + fileUrl 적용 완료!`);
    } catch (err) {
      console.error(`product-${product.id} 처리 중 오류:`, err);
    }
  }

  // batch 작업 실행 (한 번에 Firestore에 반영)
  await batch.commit();

  // 완료 메시지 출력
  console.log(`총 ${products.length}개 Firestore 업로드 완료 (썸네일 + 더미 파일)!`);
}

// 함수 실행! → 오류 나면 console.error로 출력
uploadProducts().catch(console.error);
