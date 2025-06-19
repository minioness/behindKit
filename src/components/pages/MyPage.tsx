import { Link } from 'react-router-dom';
import type { User } from 'firebase/auth';

import styles from './MyPage.module.css'

interface MyPageProps {
  user: User | null;
}

export default function MyPage({ user }: MyPageProps) {
  return (
    <div className={styles.mypageContainer}>
      <div className={styles.title}>
        <h1>마이페이지</h1>
      </div>

      <div className={styles.userInfoWrapper}>
        <img src='/src/assets/img/profileImg.svg' alt='프로필 이미지' className={styles.profileImg} />

        <div className={styles.userInfo}>
          <div className={styles.userName}>
            <span>{user?.displayName || '사용자'}</span>님, 반가워요!
          </div>
          <div className={styles.userEmail}>이메일: {user?.email}</div>
        </div>

        <Link to='/mypage/changeinfo' className={styles.userChangeInfo}>
          <img src='/src/assets/img/button/settingBtn.svg' alt='회원정보수정 버튼' />
        </Link>
      </div>


      <div className={styles.buttonArea}>
        <Link to='/wishlist'>위시리스트</Link>
        <Link to='/mypage/orders'>구매 내역</Link>
      </div>

      <Link to='/mykit' className={styles.mykitBtn}>My Kit 보기</Link>
      
      <button className={styles.logoutBtn}>로그아웃</button>


    </div>
  );
}