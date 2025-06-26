import { useParams, useSearchParams } from 'react-router-dom';

import { useProducts } from '../../hooks/useProducts';
import { formatPrice } from '../../utils/formatPrice';

import styles from './ProductDetailGrid.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function ProductDetailGrid() {

    const { id } = useParams();
    const { products } = useProducts();
    const product = products.find((p) => p.id === Number(id));

    


    if (!product) return <p>상품을 찾을 수 없습니다.</p>;


    return (
        <div className={styles.productDetailContainer}>
            <figure className={styles.productImgWrapper}>
                <img src={product.thumbnail} alt={product.title} className={styles.productImg} />
            </figure>

            <div className={styles.productDetailWrapper}>
                <div className={styles.info}>
                    <h3 className={styles.title}>{product.title}</h3>
                    <p className={styles.price}>{formatPrice(product.price)}</p>
                    <p className={styles.category}>{product.category}</p>
                    <p className={styles.description}>{product.description}</p>
                </div>

            

                <div className={styles.btnGroup}>
                    <button className={styles.wishBtn}>
                        <img 
                            src='/src/assets/img/button/noWishBtn.svg'    
                        />
                    </button>

                    <button className={styles.cartBtn}> 장바구니 담기</button>
                    <Link to='/cart' className={styles.cartMoveBtn}>장바구니 이동</Link>
                </div>

            </div>
        </div>
    )
}