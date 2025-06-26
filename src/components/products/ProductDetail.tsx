import { useParams } from 'react-router-dom';

import { useProducts } from '../../hooks/useProducts';
import { formatPrice } from '../../utils/formatPrice';

import styles from './ProductDetail.module.css';

export default function ProductDetail() {

    const { id } = useParams();
    const { products } = useProducts();
    const product = products.find((p) => p.id === Number(id));

    if (!product) return <p>상품을 찾을 수 없습니다.</p>;

    return (
        <section className={styles.ProductDetailContainer}>
            <figure>
                <img src={product.thumbnail} alt={product.title} />
            </figure>

            <div className={styles.ProductDetailWrapper}>
                <div className={styles.info}>
                    <h3 className={styles.title}>{product.title}</h3>
                    <p className={styles.price}>{formatPrice(product.price)}</p>
                    <p className={styles.category}>{product.category}</p>
                    <p className={styles.description}></p>
                </div>

                <div className={styles.btnGroup}>
                    <button className={styles.cartBtn}>
                        <img 
                            src='/src/assets/img/button/cartBtn.svg'    
                        />
                        담기
                    </button>
                    <button className={styles.cartMoveBtn}>
                        <img 
                            src='/src/assets/img/button/cartBtn.svg'    
                        />
                        이동
                    </button>
                </div>

            </div>
        </section>
    )
}