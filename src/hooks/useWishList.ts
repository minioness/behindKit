import { useRecoilState } from "recoil";
import { wishlistState } from "../recoil/wishlistAtom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const useWishList = () => {
    const [wishlist, setWishlist] = useRecoilState(wishlistState);

    const addToWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      alert('이미 찜한 상품입니다.');
      return;
    }

    const updated = [...wishlist, productId];
    setWishlist(updated);

    // Firestore 연동 (로그인 상태면)
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      setDoc(userRef, { wishlist: updated }, { merge: true });
    }

    alert('찜했습니다!');
    };

    // 찜 제거
    const removeFromWishlist = (productId: number) => {
    const updated = wishlist.filter((id) => id !== productId);
    setWishlist(updated);

    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      setDoc(userRef, { wishlist: updated }, { merge: true });
    }

    alert('찜에서 제거했습니다!');
  };

  return { wishlist, addToWishlist, removeFromWishlist };
};
