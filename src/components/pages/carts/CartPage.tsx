import CartList from '../../carts/CartList'
import CartSummary from '../../carts/CartSummary';

import styles from './CartPage.module.css';


export default function CartPage() {
  return (
    <div className={styles.cartPageContainer}>
      <div className={styles.title}>
        <h1>장바구니</h1>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.left}>
          <CartList />
        </div>

        <div className={styles.right}>
          <CartSummary />
        </div>
      </div>

    </div>
  );
}