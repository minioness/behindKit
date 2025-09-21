# 🎁 BehindKit: N잡러 & 프리랜서 생산성 키트 마켓

## 🚀 프로젝트 소개
BehindKit은 **N잡러와 프리랜서**를 위한 **디지털 생산성 도구 마켓 플랫폼**입니다.  
프리셋, 노션 템플릿, 워크북 등 다양한 디지털 파일을 판매·구매할 수 있으며, 단순한 다운로드가 아닌 **나만의 생산성 키트(MyKit)**를 구성하고 관리할 수 있는 경험을 제공합니다.  



## 👩‍💻 개발자 소개
| 이름   | 역할            | 담당 페이지 / 기능                                                                 |
|--------|-----------------|-------------------------------------------------------------------------------------|
| 민희원 | 프론트엔드 개발 | 홈 / 검색 / 카테고리 / 상품 상세 / 장바구니 / 위시리스트 / 결제 완료 / 마이페이지 / MyKit / 회원 관리 |



## 💡 프로젝트 기본 컨셉
- **이름**: BehindKit  
- **콘셉트**: N잡러 & 프리랜서 생산성 키트 마켓 → 디지털 파일(프리셋, 노션 템플릿 등) 판매  
- **포인트 컬러**: `#E35050` (레드 계열)  



## 💪 기획 배경
- MZ세대 및 프리랜서(N잡러)의 **비정형 업무 증가** → 다양한 생산성 도구(템플릿, 프리셋 등) 수요 증가  
- 그러나 이 도구들이 여러 플랫폼에 **분산**되어 있어 접근성과 큐레이션 부족  
- 단순 PDF 다운로드가 아닌 **나의 목적에 맞게 묶어 관리할 수 있는 구조** 부재  



## 💡 해결 컨셉
- **타깃**: 프리랜서, N잡러, 사이드 프로젝트 유저  
- **제공 가치**:
  - 직무별로 큐레이션된 생산성 템플릿을 쉽고 빠르게 탐색  
  - 위시리스트 / 장바구니 / MyKit 기능으로 나만의 생산성 키트 구성  
  - 로그인 기반 개인화(닉네임, 구매 이력, 찜, MyKit 등)  
- **차별점**: 단순 CRUD가 아닌 **개인화 경험 + 생산성 키트 관리**  



## 🎯 기대 효과
- 사용자가 **자신의 업무에 맞는 디지털 도구를 빠르게 탐색** 가능  
- 단순 다운로드를 넘어 **나만의 생산성 키트 관리 습관** 형성  
- Firebase Auth + Firestore, 상태 관리(Recoil) 등 실사용 중심 기술 학습 및 적용  



## 🛠️ 기술 스택
#### **Frontend**
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Recoil](https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=cssmodules&logoColor=white)

#### **Backend / API**
- **Firebase Authentication + Firestore** → 회원 관리(로그인/닉네임 저장/비밀번호 변경)  
- **Mock Data** → 상품, 카테고리, 장바구니, 위시리스트 등 (자체 JSON 기반)  



## 🏗️ 아키텍처
```
src/
┣ components/
┃ ┣ products/ # 상품 관련 컴포넌트
┃ ┣ cart/ # 장바구니
┃ ┣ wishlist/ # 위시리스트
┃ ┗ common/ # 공용 컴포넌트
┣ hooks/ # 커스텀 훅
┣ pages/ # 페이지 단위
┣ recoil/ # Recoil 상태 관리
┣ styles/ # CSS Modules
┣ App.tsx
┗ main.tsx

```



## ✨ 주요 기능

### 🔑 회원 기능
- 이메일/비밀번호 회원가입 및 로그인  
- Google 소셜 로그인 (Firestore 닉네임 등록 체크)  
- Firebase `browserSessionPersistence` 기반 세션 유지  
- 로그인 여부에 따라 접근 권한 차등  

### 🏠 홈 페이지
- 배너 슬라이더  
- 상품 리스트(페이지네이션: 12개 단위)  
- 카테고리 필터 & 정렬 기능  
- 검색창을 통한 키워드 검색  
- 상품 클릭 시 상세 페이지 이동  

### 📄 상품 상세 페이지
- 상품 썸네일, 가격, 설명 표시  
- 장바구니 담기 → Recoil 상태 반영  
- 찜하기(위시리스트 추가/해제)  

### 🛒 장바구니 페이지
- 담은 상품 리스트 표시  
- 개별 삭제 및 수량 변경 가능  
- 총합 + 수수료 자동 계산  
- 결제하기 클릭 시 결제 완료 페이지 이동  

### ✅ 결제 완료 페이지
- mock 결제 완료 처리  
- 결제 상품 다운로드 버튼 제공  
- “마이페이지로 이동” 버튼 제공  

### 💖 위시리스트 페이지
- 찜한 상품 리스트 표시  
- 찜 해제 및 장바구니 담기 가능  

### 🙋 마이페이지
- 프로필(닉네임, 비밀번호) 수정  
- 내 찜 리스트 / 구매 이력 확인  
- MyKit 바로가기 버튼 제공  

### 📦 MyKit 페이지
- 사용자가 직접 만든 생산성 키트 관리  
- 구매한 템플릿 중 선택하여 키트 생성  
- 키트명, 설명 수정 / 템플릿 추가/삭제  
- 키트 삭제 및 상세 조회 기능




