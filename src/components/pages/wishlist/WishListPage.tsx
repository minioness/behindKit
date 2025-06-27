

import { Link } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import { formatPrice } from '../../../utils/formatPrice';

import { useRecoilValue } from 'recoil';
import { wishlistState } from '../../../recoil/wishlistAtom';

import styles from './WishListPage.module.css'


export default function WishListPage() {
  const wishlist = useRecoilValue(wishlistState);
  const { products } = useProducts();

  const wishProducts = products.filter((p) => wishlist.includes(p.id));

  if (!wishProducts) return <p>상품을 찾을 수 없습니다.</p>;


  return (
    <div className={styles.WishListPageContainer}>
      <div className={styles.title}>
        <h1>위시리스트</h1>
      </div>

      <ul className={styles.WishListWrapper}>
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
              <button className={styles.wishBtn}>
                <img src='/src/assets/img/button/wishBtn.svg' />
              </button>

              <button className={styles.cartBtn}>
                <img src='/src/assets/img/button/cartBtn.svg' />
              </button>
            </div>
          </li>

        ))}




      </ul>

    </div>
  );
}