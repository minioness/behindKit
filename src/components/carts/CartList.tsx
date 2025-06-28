import { useRecoilState } from 'recoil';
import { cartState } from '../../recoil/cartAtom';

import { useProducts } from '../../hooks/useProducts';

import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

import styles from './CartList.module.css';


export default function CartPage() {

    const [cart, setCart] = useRecoilState(cartState);
    const { products } = useProducts();
    
    const cartProducts = products.filter((p) => cart.includes(p.id));


    const handleRemove = (productId: number) => {
        setCart((prev) => prev.filter((id) => id !== productId));
    }

    if(cartProducts.length === 0) return (

      <div className={styles.cartWrapper}>
        <p className={styles.cartComment}>장바구니에 담긴 상품이 없습니다</p>
        <Link to='/'>담으러 가기</Link>
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

            <button className={styles.deleteBtn} onClick={() => handleRemove(product.id)}>
                삭제
            </button>

          </li>

        ))}

      </ul>
  );
}