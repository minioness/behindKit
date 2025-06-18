import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import styles from './Login.module.css';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
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
            />
          </div>

          <div className={styles.inputPwd}>
            <p>비밀번호</p>
            <input 
              type='password'
              placeholder='비밀번호를 입력해주세요.'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.loginBtn}>로그인</button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <button className={styles.kakaoLoginBtn}>
          <img src='/src/assets/img/kakaoTalk.svg' />
          <p>카카오톡 로그인</p>
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