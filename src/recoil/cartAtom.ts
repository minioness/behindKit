import { atom } from "recoil"




export const cartState = atom<number[]>({
    key: 'cartState',
    default: [],
    effects: [
    ({ setSelf, onSet }) => {
      // 초기화: localStorage에 저장된 값 있으면 불러오기
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setSelf(JSON.parse(storedCart));
      }

      // 변경될 때마다 localStorage에 저장
      onSet((newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
      });
    },
  ],
});