import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase';

import { formatPrice } from '../../../utils/formatPrice';

import styles from './OrderComplete.module.css';

interface Order {
  userId: string;
  orderId: string;
  createdAt: Timestamp;
  totalPrice: number;
  items: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    fileUrl: string;
  }[];
}

export default function OrderComplete() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return;

      const ref = doc(db, 'orders', orderId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setOrder(snap.data() as Order);
      } else {
        alert('주문 정보 없음');
      }
    }
    fetchOrder();
  }, [orderId]);

  if (!order) return <div>주문 정보를 불러오는 중...</div>;

  return (
    <div className={styles.orderCompleteContainer}>
      <div className={styles.completeArea}>
        <figure>
          <img src="/assets/img/button/completeIcon.svg" />
        </figure>

        <p>결제가 완료되었습니다.</p>
      </div>

      <div className={styles.orderInfo}>
        <div className={styles.orderNumber}>
          <p>주문 번호</p>
          <p>{order.orderId}</p>
        </div>
        <div className={styles.orderPrice}>
          <p>결제 금액</p>
          <p>{formatPrice(order.totalPrice)}</p>
        </div>
        <div className={styles.orderDownloadArea}>
          {order.items.map((item) => (
            <li key={item.id} className={styles.downloadItem}>
              <div className={styles.itemInfo}>
                <img src={item.thumbnail} alt={item.title} className={styles.itemImg} />

                <span>{item.title}</span>
              </div>

              <a href={item.fileUrl} download className={styles.downloadBtn}>
                <img src="/assets/img/button/downloadIcon.png" alt="다운로드 아이콘" />
              </a>
            </li>
          ))}
        </div>
      </div>

      <div className={styles.btnGroup}>
        <Link to="/" className={styles.homeBtn}>
          홈으로
        </Link>
        <Link to="/mypage" className={styles.mypageBtn}>
          마이페이지
        </Link>
      </div>
    </div>
  );
}
