import { useEffect, useRef, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { FiSearch } from 'react-icons/fi';

import Slider from '../common/Slider';
import FilteredProductGrid from '../products/FilteredProductGrid';

import styles from './Home.module.css';
import cx from 'clsx';

// 정렬 목록
const SORT_LIST = ['기본순', '낮은 가격순', '높은 가격순', '이름순'];

export default function Home() {
  const { products, categories } = useProducts();
  const CATEGORY_LIST = ['전체', ...categories];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showCategoryList, setShowCategoryList] = useState(false);

  const [selectedSort, setSelectedSort] = useState('기본순');
  const [showSortList, setShowSortList] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node) &&
        sortRef.current &&
        !sortRef.current.contains(e.target as Node)
      ) {
        setShowCategoryList(false);
        setShowSortList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 드롭다운 토글 함수
  const toggleCategoryList = () => {
    setShowCategoryList((prev) => !prev);
    setShowSortList(false); // 정렬은 무조건 닫기
  };

  const toggleSortList = () => {
    setShowSortList((prev) => !prev);
    setShowCategoryList(false); // 카테고리는 무조건 닫기
  };

  // 선택 처리
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowCategoryList(false);
  };

  const handleSortClick = (sort: string) => {
    setSelectedSort(sort);
    setShowSortList(false);
  };

  return (
    <div className={styles.homeContainer}>
      <Slider />

      <div className={styles.searchWrapper}>
        {/* 검색창 */}
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

        {/* 카테고리 */}
        <div className={styles.categoryBtnWrapper} ref={categoryRef}>
          <button className={styles.categoryToggleBtn} onClick={toggleCategoryList}>
            {selectedCategory}
            <img src="/assets/img/button/arrowIcon.svg" alt="화살표 아이콘" className={styles.arrowIcon} />
          </button>

          <div className={cx(styles.categoryGroup, { [styles.show]: showCategoryList })}>
            {CATEGORY_LIST.map((category) => (
              <button
                key={category}
                className={cx(styles.categoryBtn, { [styles.active]: selectedCategory === category })}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 정렬 */}
        <div className={styles.sortBtnWrapper} ref={sortRef}>
          <button className={styles.sortToggleBtn} onClick={toggleSortList}>
            {selectedSort}
            <img src="/assets/img/button/arrowIcon.svg" alt="화살표 아이콘" className={styles.arrowIcon} />
          </button>

          <div className={cx(styles.sortGroup, { [styles.show]: showSortList })}>
            {SORT_LIST.map((sort) => (
              <button
                key={sort}
                className={cx(styles.sortBtn, { [styles.active]: selectedSort === sort })}
                onClick={() => handleSortClick(sort)}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 상품 목록 */}
      <FilteredProductGrid
        products={products}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
      />
    </div>
  );
}
