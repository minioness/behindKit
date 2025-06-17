import styles from './SignUp.module.css';

export default function SignUp() {
  return (
    <div className={styles.signUpContainer}>
        <div className={styles.signUpWrapper}>
          <div className={styles.title}>
            <h2>회원가입</h2>
          </div>

          <form className={styles.signUpArea}>
            <div className={styles.inputName}>
              <p>이름</p>
              <input 
                type='text'
                placeholder='이름을 입력해주세요' />
            </div>
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

            <button className={styles.signUpBtn}>회원가입</button>
          </form>
        </div>

    </div>
  );
}