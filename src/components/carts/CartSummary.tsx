import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

import { useRecoilState} from "recoil";
import { cartState } from "../../recoil/cartAtom";

import { useProducts } from "../../hooks/useProducts";

import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import styles from './CartSummary.module.css'

export default function CartSummary() {

    const [cart, setCart] = useRecoilState(cartState);

    const { products } = useProducts();
    const navigate = useNavigate();



    const cartProducts = products.filter((p) => cart.includes(p.id));

    const totalPrice = cartProducts.reduce((sum, item) => sum + item.price, 0);
    const fee = Math.floor(totalPrice * 0.045); // 수수료 4.5%
    const finalPrice = totalPrice + fee;


    const handlePayment = async () => {
        if (cartProducts.length === 0) return;

        const orderId = uuidv4();
        const createdAt = new Date();

        try {
            await setDoc(doc(db, "orders", orderId),{
                orderId,
                createdAt,
                totalPrice: finalPrice,
                items: cartProducts.map((p) => ({
                    id: p.id,
                    title: p.title,
                    price: p.price,
                    thumbnail: p.thumbnail,
                    fileUrl: p.fileUrl,
                })),
            });

            setCart([]);

            alert("결제가 완료되었습니다!");
        
            navigate(`/order-complete?orderId=${orderId}`);

            

        }  catch (error) {
            console.error("주문 저장 실패:", error);
        }
    }


    return (
        <div className={styles.cartSummaryContainer}>
            <h2 className={styles.title}>결제 금액</h2>

            <div className={styles.row}>
                <span>주문 금액</span>
                <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className={styles.row}>
                <span>수수료</span>
                <span>{formatPrice(fee)}</span>
            </div>

            <div className={styles.row}>
                <span>쿠폰 할인</span>
                <span>0원</span>
            </div>

            <div className={styles.divider} />

            <div className={styles.totalRow}>
                <span>총 결제 금액 <em>(VAT 포함)</em></span>
                <span className={styles.finalPrice}>{formatPrice(finalPrice)}</span>
            </div>

            <div className={styles.bottomWrapper}>
                <div className={styles.dropdownBox}>
                    <details>
                        <summary>결제 전 안내사항</summary>
                        <p>결제 완료 후에는 환불이 제한될 수 있습니다.</p>
                    </details>

                    <details>
                        <summary>개인정보 제3자 제공</summary>
                        <p>주문 처리 목적으로 제3자에게 정보가 제공될 수 있습니다.</p>
                    </details>
                </div>

                <div className={styles.agree}>
                    <p>위 내용을 확인하였고, 결제에 동의합니다.</p>
                </div>


                <button
                    className={styles.payButton}
                    disabled={cart.length === 0}
                    onClick={handlePayment}
                >
                    {cart.length === 0 ? '상품을 담아주세요' : '결제하기'}
                </button>
            </div>

                
        </div>
    )
}