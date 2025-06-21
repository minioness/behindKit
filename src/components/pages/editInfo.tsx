import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './EditInfo.module.css'

import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';


interface RouterProps {
  user: User | null;
}

export default function EditInfo({user}: RouterProps ) {

  const navigate = useNavigate();
  const [nickname, setNickName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if(user) {
        setName(user.displayName || '');
        setEmail(user.email || '');
        
        //firestore에서 닉네임 불러오기
        // Firestore의 'users' 컬렉션에서 현재 로그인한 유저의 UID로 문서를 참조
        const useRef = doc(db, 'users', user.uid);
        // Firestore에서 해당 문서의 데이터를 가져옴
        const docSnap = await getDoc(useRef);
        
        if (docSnap.exists()) {
        setNickName(docSnap.data().nickName || '');
        }
      }
    };

    fetchUserData();
  }, [user]);


  return (
    <div className={styles.editContainer}>
      
      <div className={styles.title}>
        <h1>회원정보 수정</h1>
      </div>

      <div className={styles.editWrapper}>
        <div className={styles.userInfoWrapper}>
          <img src='/src/assets/img/profileImg.svg' alt='프로필 이미지' className={styles.profileImg} />

          <div className={styles.userInfo}>
            <div>
              <label>닉네임</label>
              <input value={nickname} onChange={(e) => setNickName(e.target.value)} className={styles.inputField}/>
            </div>
            
            <div>
              <label>이름</label>
              <input value={name} readOnly className={styles.inputField}/>
            </div>

            <div>
              <label>이메일</label>
              <input value={email} readOnly className={styles.inputField}/>
            </div>

            <div>
              <label>현재 비밀번호</label>
              <input type='password' className={styles.inputField}/>
            </div>

             <div>
              <label>새 비밀번호</label>
              <input type='password' className={styles.inputField}/>
            </div>

             <div>
              <label>새 비밀번호 확인</label>
              <input type='password' className={styles.inputField}/>
            </div>
          </div>
        </div>

        <div className={styles.btnGroup}>
          <button className={styles.cancelBtn} onClick={() => navigate('/mypage')}>취소</button>
          <button className={styles.editBtn}>수정하기</button>
        </div>

      </div>

      

    </div>
  );
}