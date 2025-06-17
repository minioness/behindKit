import { Link } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>
          <h2>로그인</h2>
        </div>
        <form className={styles.loginArea}>
          <div className={styles.inputId}>
            <p>아이디</p>
            <input 
              type='text'
              placeholder='아이디를 입력해주세요' />
          </div>

          <div className={styles.inputPwd}>
            <p>비밀번호</p>
            <input 
              type='text'
              placeholder='비밀번호를 입력해주세요.' />
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