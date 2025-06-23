import Slider from '../common/Slider';
import { FiSearch } from 'react-icons/fi';

import ProductGrid from '../products/ProductGrid';
import products from '../../data/data.json';

import styles from './Home.module.css';


export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Slider />

      <div className={styles.searchWrapper}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.icon} />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className={styles.searchInput}
          />
        </div>


        <button className={styles.categoryBtn}>
          카테고리 
          <img src='/src/assets/img/button/arrowIcon.svg' alt='화살표 아이콘' className={styles.arrowIcon}/>
        </button>

        <button className={styles.sortBtn}>
          정렬
          <img src='/src/assets/img/button/arrowIcon.svg' alt='화살표 아이콘' className={styles.arrowIcon}/>
        </button>

      </div>

      <ProductGrid products={products}/>
      
    </div>
  );
}