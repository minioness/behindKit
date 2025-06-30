import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { formatPrice } from '../../utils/formatPrice';

import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import { useWishList } from '../../hooks/useWishList';

import styles from './ProductDetailGrid.module.css';


export default function ProductDetailGrid() {

    const { id } = useParams();
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { wishlist, addToWishlist, removeFromWishlist} = useWishList();
    
    const product = products.find((p) => p.id === Number(id));

    const isWished =  product ? wishlist.includes(product.id) : false;
    

    const handleToggleWishlist = (productId: number) => {
        if (wishlist.includes(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };



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
                    <button className={styles.wishBtn} onClick={() => handleToggleWishlist(product.id)}>
                        <img 
                            src={
                                isWished
                                    ? '/src/assets/img/button/WishBtn.svg'
                                    : '/src/assets/img/button/noWishBtn.svg'
                                }
                                alt="찜하기"
                        />
                    </button>

                    <button className={styles.cartBtn} onClick={() => addToCart(product.id)}> 장바구니 담기</button>
                    <Link to='/cart' className={styles.cartMoveBtn}>장바구니 이동</Link>
                </div>

            </div>
        </div>
    )
}