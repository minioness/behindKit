
import { useEffect, useState } from "react";

import ProductGrid from "./ProductGrid";

import styles from './FilteredProductGrid.module.css';
import cx from 'clsx'


interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  description: string;
}

interface FilteredProductGridProps {
  products: Product[];
  searchTerm: string;
  selectedCategory: string;
  selectedSort: string
}


export default function FilteredProductGrid({products, searchTerm, selectedCategory, selectedSort}: FilteredProductGridProps) {

    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 12;

    // 검색어, 카테고리 필터링
    const filteredProducts = products.filter((product) => { 
        
        // 검색어
        const matchesSearch  = product.title.toLowerCase().includes(searchTerm.toLowerCase())

        // 카테고리
        const matchesCategory = selectedCategory === '전체' || product.category === selectedCategory;

        return matchesCategory && matchesSearch;
    });


    // 정렬
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (selectedSort) {
            case '낮은 가격순':
                return a.price - b.price;
            case '높은 가격순':
                return b.price - a.price;
            case '이름순':
                return a.title.localeCompare(b.title, 'ko');
            case '기본순':
            default:
                return 0;
        }
    });

    // 검색어 변경 시 1페이지로 리셋
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);


    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

    
    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <>
            <ProductGrid products={paginatedProducts} />

            {totalPages > 1 && (
                <div className={styles.pagination}>
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isActive = currentPage === pageNumber;

                    return (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={cx(styles.pageButton, {
                        [styles.activePage]: isActive,
                        })}
                    >
                        {pageNumber}
                    </button>
                    );
                })}
                </div>
            )}
            
        </>
    );
}