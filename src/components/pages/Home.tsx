import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import products from '../../data/data.json';
import Slider from '../common/Slider';
import FilteredProductGrid from '../products/FilteredProductGrid';

import styles from './Home.module.css';
import cx from 'clsx';

// 상품 카테고리 추출
const categories = Array.from(
  new Set(products.map((product) => product.category))
);

const CATEGORY_LIST = ['전체', ...categories];


export default function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showCategoryList, setShowCategoryList] = useState(false);


  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowCategoryList(false);    // 목록 숨기기
  }

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


        <div className={styles.categoryBtnWrapper}>
          <button 
            className={styles.categoryToggleBtn} 
            onClick={() => setShowCategoryList((prev)=> !prev)}
          >
            {selectedCategory === '전체' ? '카테고리' : selectedCategory}

            <img 
              src='/src/assets/img/button/arrowIcon.svg' 
              alt='화살표 아이콘' 
              className={styles.arrowIcon}
            />
          </button>

          
          <div className={cx(styles.categoryGroup, {[styles.show]: showCategoryList })}>
            {CATEGORY_LIST.map((category) => (
              <button
                key={category}
                className={cx(styles.categoryBtn, selectedCategory === category ? styles.active : '')}
                onClick= {() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
        </div>

        <button className={styles.sortToggleBtn}>
          정렬
          <img 
            src='/src/assets/img/button/arrowIcon.svg' 
            alt='화살표 아이콘' 
            className={styles.arrowIcon}
          />
        </button>

      </div>

      <FilteredProductGrid products={products} searchTerm={searchTerm}/>
      
    </div>
  );
}