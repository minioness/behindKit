

import { Link } from 'react-router-dom';
import styles from './OrderComplete.module.css';



export default function OrderComplete() {
    // const { id } = useParams();

    // const { products } = useProducts();
    // const product = products.find((p) => p.id === Number(id));

    return (
        <div className={styles.orderCompleteContainer}>
            <div className={styles.completeArea}>
                <figure>
                    <img src='/src/assets/img/button/completeIcon.svg' />
                </figure>


                <p>결제가 완료되었습니다.</p>

            </div>

            <div className={styles.orderInfo}>
                <div className={styles.orderNumber}></div>
                <div className={styles.orderPrice}></div>
                <div className={styles.orderDownloadArea}>
                    <div>
                        {/* <Link to={`/product/${product.id}`}>
                            <img src={product.thumbnail} alt={product.title} className={styles.productImg}/>
                        </Link>
                        <p className={styles.title}>{product.title}</p> */}
                    </div>

                    <button>
                        <img src='/src/assets/img/button/downloadIcon.png' />
                    </button>
                </div>

            </div>

            <div className={styles.btnArea}>
                <Link to='/'>홈으로</Link>
                <Link to='/mypage'>마이페이지로 가기</Link>
            </div>

        </div>
    )
}