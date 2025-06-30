

import { Link } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import { formatPrice } from '../../../utils/formatPrice';

import { useRecoilState } from 'recoil';
import { wishlistState } from '../../../recoil/wishlistAtom';

import styles from './WishListPage.module.css'
import { useCart } from '../../../hooks/useCart';


export default function WishListPage() {
  const [ wishlist, setWishlist ] = useRecoilState(wishlistState);
  const { products } = useProducts();
  

  const wishProducts = products.filter((p) => wishlist.includes(p.id));

  const { addToCart } = useCart();
  

  const handleRemove = (productId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  }


  

  if (wishProducts.length === 0) return(

    <div className={styles.wishListPageContainer}>
      <div className={styles.title}>
        <h1>위시리스트</h1>
      </div>

      <div className={styles.wishCommentWrapper}>
          <p className={styles.wishlistComment}>위시리트스에 담긴 상품이 없습니다</p>

          <Link to='/'>상품 담으러 가기</Link>
      </div>

    </div>
  )


  return (
    <div className={styles.wishListPageContainer}>
      <div className={styles.title}>
        <h1>위시리스트</h1>
      </div>

      <ul className={styles.wishListWrapper}>
        {wishProducts.map((product) => (

          <li key={product.id}>
            <div className={styles.productInfo}>
              <Link to={`/product/${product.id}`}>
                <img src={product.thumbnail} alt={product.title} className={styles.productImg}/>
              </Link>

              <div className={styles.info}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.category}>{product.category}</p>
                <p className={styles.price}>{formatPrice(product.price)}</p>
              </div>

            </div>

            <div className={styles.buttonArea}>
              <button className={styles.deleteBtn} onClick={() => handleRemove(product.id)}>
                삭제
              </button>

              <button className={styles.cartBtn} onClick={() => addToCart(product.id)}>
                장바구니 담기
              </button>
            </div>
          </li>

        ))}




      </ul>

    </div>
  );
}