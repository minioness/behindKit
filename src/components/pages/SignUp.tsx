import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

import styles from './SignUp.module.css';


export default function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      alert("회원가입 성공!");
      navigate('/login');

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