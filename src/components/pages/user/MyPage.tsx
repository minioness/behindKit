import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

import { useResetRecoilState } from 'recoil';
import { wishlistState } from '../../../recoil/wishlistAtom';
import { cartState } from '../../../recoil/cartAtom';

import styles from './MyPage.module.css'


interface MyPageProps {
  user: User | null;
}

export default function MyPage({ user }: MyPageProps) {

  const [nickName, setNickName] = useState('');
  const [loading, setLoading] = useState(true); 

  const resetCart = useResetRecoilState(cartState);
  const resetWishlist = useResetRecoilState(wishlistState);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchNickName = async () => {
      if (!user) {
      setLoading(false);
      return;
      }
      
      try {
        // Firestore의 'users' 컬렉션에서 현재 로그인한 유저의 UID로 문서를 참조
        const docRef = doc(db, 'users', user.uid);
        // Firestore에서 해당 문서의 데이터를 가져옴
        const docSnap =  await getDoc(docRef);

        if (docSnap.exists()) {
        setNickName(docSnap.data().nickName);
        }
      } catch (error) {
      console.error('닉네임 불러오기 실패:', error);
      } finally {
      setLoading(false);
      }
    };
    fetchNickName();
  }, [user]);

  if (loading) return null;
  
  

  const handleLogout = async() => {
    try {
      await signOut(auth);

      // Recoil 상태 초기화
      resetCart();
      resetWishlist();      

      alert('로그아웃 되었습니다.');
      navigate('/login');
    } catch (error) {
      alert(`로그아웃 실패: ${error}`)
    }
  }


  return (
    <div className={styles.mypageContainer}>
      <div className={styles.title}>
        <h1>마이페이지</h1>
      </div>

      <div className={styles.userInfoWrapper}>
        <img src='/src/assets/img/profileImg.svg' alt='프로필 이미지' className={styles.profileImg} />

        <div className={styles.userInfo}>
          <div className={styles.userName}>
            <span>{nickName || '사용자'}</span>님, 반가워요!
          </div>
          <div className={styles.userEmail}>이메일: {user?.email}</div>
        </div>

        <Link to='/mypage/editinfo' className={styles.userChangeInfo}>
          <img src='/src/assets/img/button/settingBtn.svg' alt='회원정보수정 버튼' />
        </Link>
      </div>


      <div className={styles.buttonArea}>
        <Link to='/wishlist'>위시리스트</Link>
        <Link to='/mypage/orders'>구매 내역</Link>
      </div>

      <Link to='/mykit' className={styles.mykitBtn}>My Kit 보기</Link>


      <button onClick={handleLogout} className={styles.logoutBtn}>로그아웃</button>

    </div>
  );
}