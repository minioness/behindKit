import type { User } from "firebase/auth";
import styles from './Orders.module.css'
import { collection, getDocs, query, where, type Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { formatPrice } from "../../../utils/formatPrice";
import { formatDate } from "../../../utils/formatDate";
import { useCart } from "../../../hooks/useCart";
import { Link } from "react-router-dom";

interface RouterProps {
  user: User;
}

interface Order {
  userId: string;
  orderId: string;
  createdAt: Timestamp;
  totalPrice: number;
  items: {
    id: number;
    title: string;
    price: number;
    category: string;
    thumbnail: string;
    fileUrl: string;
  }[];
}


export default function Orders( {user}:RouterProps ) {

  const [orders, setOrders] = useState<Order[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return ;


      const ordersRef = collection(db, 'orders');

      // Firestore에서 내 주문만 가져옴
      const q = query(ordersRef, where('userId', '==', user.uid));
      const snapshot = await getDocs(q);

      const userOrders :Order[]  = snapshot.docs.map(doc => doc.data() as Order);


      setOrders(userOrders);
    } 
      fetchOrders();
  }, [user]);


  if (orders.length === 0) {
    return (
      <div className={styles.ordersContainer}>
        <div className={styles.title}>
          <h1>구매 내역</h1>
        </div>

        <div className={styles.noOrdersWrapper}>
          <p className={styles.orderComment}>구매 내역이 없습니다</p>
          <Link to='/' className={styles.Btn}>
              구매하러 가기
          </Link>
        </div>
        
      </div>
    )
  }


  return (
    <div className={styles.ordersContainer}>
      <div className={styles.title}>
        <h1>구매 내역</h1>
      </div>

      {orders.map((order) => (

        <div className={styles.ordersWrapper}>
          <div className={styles.orderInfo}>
            <span>{formatDate(order.createdAt)}</span>
            <span>주문번호: {order.orderId}</span>
          </div>

          {order.items.map((item) => (
            <div className={styles.itemWrapper}>
              <div className={styles.items}>
                <img src={item.thumbnail} alt={item.title} className={styles.itemImg} />

                <div className={styles.itemInfo}>                  
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemCategory}>{item.category}</span>
                  <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                </div>
              </div>

              <div className={styles.btnGroup}>

                <a
                  href={item.fileUrl}
                  download
                  className={styles.downloadBtn}
                >
                  <img src='/src/assets/img/button/downloadIcon.png' alt='다운로드 아이콘' />
                </a>

                <button className={styles.cartBtn} onClick={() => addToCart(item.id)}>
                  <img src='/src/assets/img/button/cartBtn.svg' />
                </button>
              </div>
  
            </div>

          ))}

          <div className={styles.totalPrice}> 
            <span>총 결제금액 :  </span> 
            <span>
              {formatPrice(order.totalPrice)}
            </span>
          </div>
        </div>
      ))}

    </div>
  );
}