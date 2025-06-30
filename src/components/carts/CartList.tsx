import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';

import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

import styles from './CartList.module.css';


export default function CartPage() {

  const { cart, removeFromCart } = useCart();
  const { products } = useProducts();
  
  const cartProducts = products.filter((p) => cart.includes(p.id));



  if(cartProducts.length === 0) return (

    <div className={styles.cartCommentWrapper}>
      <p className={styles.cartComment}>장바구니에 담긴 상품이 없습니다</p>
      <Link to='/'>상품 담으러 가기</Link>
    </div>
  )


  return (
    <ul className={styles.cartWrapper}>
        {cartProducts.map((product) => (

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

            <button className={styles.deleteBtn} onClick={() => removeFromCart(product.id)}>
                삭제
            </button>

          </li>

        ))}

      </ul>
  );
}