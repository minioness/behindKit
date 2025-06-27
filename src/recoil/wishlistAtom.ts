import { atom } from "recoil"



export const wishlistState = atom<number[]>({
    key: 'wishlistState',
    default: [],
    effects: [
    ({ setSelf, onSet }) => {
      // 초기화: localStorage에 저장된 값 있으면 불러오기
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        setSelf(JSON.parse(storedWishlist));
      }

      // 변경될 때마다 localStorage에 저장
      onSet((newWishlist) => {
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      });
    },
  ],
});