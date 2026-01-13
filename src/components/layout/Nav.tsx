import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signOut, type User } from 'firebase/auth';
import { auth } from '../../firebase';

import { useRecoilState, useResetRecoilState } from 'recoil';
import { cartState } from '../../recoil/cartAtom';

import styles from './Nav.module.css';
import cx from 'clsx';
import { wishlistState } from '../../recoil/wishlistAtom';

export default function Nav({ user }: { user: User | null }) {
  const [cart] = useRecoilState(cartState);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const resetCart = useResetRecoilState(cartState);
  const resetWishlist = useResetRecoilState(wishlistState);

  const hamburgerRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);

    // Recoil 상태 초기화
    resetCart();
    resetWishlist();

    alert('로그아웃 되었습니다.');
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.wrapper}>
        <div className={styles.navLeft}>
          <Link to="/">
            <img src="/assets/img/logo.svg" alt="로고이미지" />
          </Link>
        </div>

        <div className={styles.navRight}>
          <Link to="/wishlist">
            <img src="/assets/img/button/wishBtn.svg" alt="찜" />
          </Link>
          <Link to="/cart" className={styles.cartBtn}>
            <img src="/assets/img/button/cartBtn.svg" alt="장바구니" />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </Link>
          <Link to="/mypage" className={styles.myPageBtn}>
            <img src="/assets/img/button/myPageBtn.svg" alt="마이페이지" />
          </Link>
        </div>

        <div className={styles.hamburgerBtn} ref={hamburgerRef}>
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <img src="/assets/img/button/hamburgerBtn.svg" alt="메뉴버튼" />
          </button>

          <div className={cx(styles.hamburgerArea, { [styles.active]: menuOpen })}>
            <Link to={'/mypage'} onClick={() => setMenuOpen(false)} className={styles.moveBtn}>
              마이페이지
            </Link>
            <Link to={'/mypage/orders'} onClick={() => setMenuOpen(false)} className={styles.moveBtn}>
              구매 내역
            </Link>
            <Link to={'/wishlist'} onClick={() => setMenuOpen(false)} className={styles.moveBtn}>
              위시리스트
            </Link>
            <Link to={'/mypage/mykit'} onClick={() => setMenuOpen(false)} className={styles.moveBtn}>
              마이 키트
            </Link>
            <Link to={'/cart'} onClick={() => setMenuOpen(false)} className={styles.moveBtn}>
              장바구니
            </Link>
            {user ? (
              <button onClick={handleLogout} className={styles.logoutBtn}>
                로그아웃
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setMenuOpen(false);
                }}
                className={styles.logoutBtn}
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
