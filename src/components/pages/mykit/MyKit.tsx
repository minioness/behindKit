import styles from './MyKit.module.css'

export default function MyKit() {
  return (
    <div className={styles.myKitPageContainer}>
      <div className={styles.title}>
        <button>
          <img src='/src/assets/img/button/arrowIconBtn.svg'  />
        </button>
        <h1>My Kit</h1>
      </div>

    </div>
  );
}