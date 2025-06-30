import { useRecoilState } from "recoil";
import { cartState } from "../recoil/cartAtom";

import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const useCart = () => {

    const [cart, setCart] = useRecoilState(cartState);

    const addToCart = (productId: number) => {
        if (cart.includes(productId)) {
            alert('이미 장바구니에 담긴 상품입니다.');
            return;
        }

        const updated = [...cart, productId];
        setCart(updated);
        alert('장바구니에 담겼습니다!');

        if (auth.currentUser) {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            setDoc(userRef, { cart: updated }, { merge: true });
        }
    }

    const removeFromCart = (productId: number) => {
        const updated = cart.filter((id) => id !== productId);
        setCart(updated);

        if (auth.currentUser) {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            setDoc(userRef, { cart: updated }, { merge: true });
        }

        alert('장바구니에서 제거되었습니다.');
    }

    return {cart, addToCart, removeFromCart}
}
