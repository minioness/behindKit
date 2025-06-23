import Slider from '../common/Slider';
import styles from './Home.module.css';


export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.bannerWrapper}>
        <Slider />
      </div>

      <div className={styles.searchWrapper}>
        <input />

        <div className={styles.category}>
          <button>카테고리</button>
        </div>
        <div className={styles.sort}>
          <button>정렬</button>
        </div>
      </div>

      <div className={styles.productsWrapper}>

      </div>
      
    </div>
  );
}