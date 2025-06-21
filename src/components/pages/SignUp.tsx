import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import styles from './SignUp.module.css';


export default function SignUp() {

  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // 1. Firebase Auth로 유저 생성
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);


    // 2. Firestore에 유저 정보 저장
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      name,
      nickName,
      email,
      createdAt: new Date(), // 서버 시간 기준
    });

    

    alert("회원가입이 완료되어 자동으로 로그인되었습니다.");
    navigate("/mypage");
    
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      alert('이미 가입된 이메일입니다.');
    } else if (error.code === 'auth/invalid-email') {
      alert('이메일 형식이 올바르지 않습니다.');
    } else if (error.code === 'auth/weak-password') {
      alert('비밀번호는 6자 이상이어야 합니다.');
    } else {
      alert(`회원가입 실패: ${error.message}`);
    }
  }
};


  return (
    <div className={styles.signUpContainer}>
        <div className={styles.signUpWrapper}>
          <div className={styles.title}>
            <h2>회원가입</h2>
          </div>

          <form className={styles.signUpArea} onSubmit={handleSignup}>
            <div className={styles.inputName}>
              <p>이름</p>
              <input 
                type='text'
                placeholder='이름을 입력해주세요'
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <p>닉네임</p>
              <input 
                type='text'
                placeholder='닉네임을 입력해주세요'
                value={nickName}
                onChange={e => setNickName(e.target.value)}
              />
            </div>
            <div className={styles.inputId}>
              <p>이메일</p>
              <input 
                type='text'
                placeholder='이메일을 입력해주세요.'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputPwd}>
              <p>비밀번호</p>
              <input 
                type='password'
                placeholder='비밀번호를 입력해주세요.'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button type='submit' className={styles.signUpBtn}>회원가입</button>
          </form>
        </div>

    </div>
  );
}