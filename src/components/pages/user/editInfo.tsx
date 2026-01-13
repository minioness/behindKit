import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './editInfo.module.css';

import { reauthenticateWithCredential, updatePassword, type User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { EmailAuthProvider } from 'firebase/auth/web-extension';

interface RouterProps {
  user: User;
}

export default function EditInfo({ user }: RouterProps) {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setEmail(user.email || '');

        // firestore에서 이름, 닉네임 불러오기
        // Firestore의 'users' 컬렉션에서 현재 로그인한 유저의 UID로 문서를 참조
        const useRef = doc(db, 'users', user.uid);
        // Firestore에서 해당 문서의 데이터를 가져옴
        const docSnap = await getDoc(useRef);

        if (docSnap.exists()) {
          setNickName(docSnap.data().nickName || '');
          setName(docSnap.data().name || '');
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleUpdate = async () => {
    if (!user) return;

    try {
      // 닉네임 Firestore 업데이트
      const useRef = doc(db, 'users', user.uid);
      await updateDoc(useRef, {
        nickName: nickName,
      });

      // 비밀번호 변경
      // 1. 입력값이 하나라도 있다면 비밀번호 변경을 시도함
      if (currentPw || newPw || confirmPw) {
        // 2. 입력 안 된 칸이 있으면 중단
        if (!currentPw || !newPw || !confirmPw) {
          alert('비밀번호를 모두 입력해주세요.');
          return;
        }

        // 3. 새 비밀번호 두 개가 다르면 중단
        if (newPw !== confirmPw) {
          alert('새 비밀번호가 일치하지 않습니다.');
          return;
        }

        // 4. 현재 비밀번호로 사용자 인증
        const credential = EmailAuthProvider.credential(user.email!, currentPw);
        await reauthenticateWithCredential(user, credential);

        // 5. 새 비밀번호로 변경
        await updatePassword(user, newPw);
      }

      alert('회원 정보가 수정되었습니다.');
      navigate('/mypage');
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        alert('현재 비밀번호가 올바르지 않습니다.');
      }

      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.editContainer}>
      <div className={styles.title}>
        <h1>회원정보 수정</h1>
      </div>

      <div className={styles.editWrapper}>
        <div className={styles.userInfoWrapper}>
          <img src="/src/assets/img/profileImg.svg" alt="프로필 이미지" className={styles.profileImg} />

          <div className={styles.userInfo}>
            <div>
              <label>닉네임</label>
              <input value={nickName} onChange={(e) => setNickName(e.target.value)} className={styles.inputField} />
            </div>

            <div>
              <label>이름</label>
              <input value={name} readOnly className={styles.inputField} />
            </div>

            <div>
              <label>이메일</label>
              <input value={email} readOnly className={styles.inputField} />
            </div>

            {/* 구글 계정 로그인의 경우에는 비밀번호 영역 안보여주기 */}
            {user?.providerData[0].providerId !== 'google.com' && (
              <>
                <div>
                  <label>현재 비밀번호</label>
                  <input type="password" onChange={(e) => setCurrentPw(e.target.value)} className={styles.inputField} />
                </div>
                <div>
                  <label>새 비밀번호</label>
                  <input type="password" onChange={(e) => setNewPw(e.target.value)} className={styles.inputField} />
                </div>
                <div>
                  <label>새 비밀번호 확인</label>
                  <input type="password" onChange={(e) => setConfirmPw(e.target.value)} className={styles.inputField} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.btnGroup}>
          <button className={styles.cancelBtn} onClick={() => navigate('/mypage')}>
            취소
          </button>
          <button className={styles.editBtn} onClick={handleUpdate}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
