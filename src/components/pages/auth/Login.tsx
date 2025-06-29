import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { auth, db, provider } from '../../../firebase';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import styles from './Login.module.css';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 세션으로 유지 설정
      await setPersistence(auth, browserSessionPersistence);

      // 로그인
      await signInWithEmailAndPassword(auth, email, password);

      alert('로그인 성공');
      navigate('/');
    } catch(error: any) {
      if(error.code === 'auth/user-not-found') {
        alert('가입되지 않은 이메일입니다.');
      } else if (error.code === 'auth/invalid-email') {
        alert('이메일을 확인해주세요.')
      }else if (error.code === 'auth/wrong-password') {
        alert('비밀번호를 확인해주세요.')
      } else {
        alert(`로그인 실패: ${error.message}`)
      }
    } 
  };

  const handleGoogleLogin = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Firestore에 이 사용자의 닉네임이 존재하는지 확인
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      alert('구글 계정으로 로그인 되었습니다.');

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          nickname: '', // 처음에는 비워두고 이후에 등록하도록
          createdAt: new Date()
        });

        // 닉네임 등록 페이지로 이동
        alert(`${user.displayName}님, 닉네임을 등록해주세요.`);
        navigate('/mypage/changeinfo');

      } else {
        // 기존 유저 → 마이페이지 이동
        navigate('/mypage');
      }

    } catch (error: any) {
      alert(`구글 로그인 실패: ${error.message}`);
    }
  }



  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>
          <h2>로그인</h2>
        </div>
        <form onSubmit={handleLogin} className={styles.loginArea}>
          <div className={styles.inputId}>
            <p>이메일</p>
            <input 
              type='text'
              placeholder='이메일을 입력해주세요'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputPwd}>
            <p>비밀번호</p>
            <input 
              type='password'
              placeholder='비밀번호를 입력해주세요.'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <button className={styles.loginBtn}>로그인</button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <button className={styles.GoogleLoginBtn} onClick={handleGoogleLogin}>
          <img src='/src/assets/img/Google.svg' alt='구글 아이콘' />
          <p>구글 계정 로그인</p>
        </button>
      </div>

      <div className={styles.notLogin}>
        <button>아이디 찾기</button>
        <button> 비밀번호 찾기</button>
        <Link to='/signup'>회원가입</Link>
      </div>

    </div>
  );
}