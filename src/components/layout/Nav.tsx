import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import type { User } from "firebase/auth";

export default function Nav({user}: { user: User | null }) {
    const cartCount = 1;


    return (
        <nav className={styles.navContainer}>
            <div className={styles.wrapper}>
                <div className={styles.navLeft}>
                    <Link to='/'>
                        <img src="/src/assets/img/logo.svg" alt="로고이미지"/>
                    </Link>
                </div>

                <div className={styles.navRight}>
                    <Link to='/wish'>
                        <img src="/src/assets/img/button/wishBtn.svg" alt="찜"/>
                    </Link>
                    <Link to='/cart' className={styles.cartBtn}>
                        <img src="/src/assets/img/button/cartBtn.svg" alt="장바구니"/>
                        { cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                    </Link>
                    <Link to={user? '/mypage' : '/login'} className={styles.myPageBtn}>
                        <img src="/src/assets/img/button/myPageBtn.svg" alt="마이페이지"/>
                    </Link>
                    <div className={styles.hamburgerBtn}>
                        <button>
                            <img src="/src/assets/img/button/hamburgerBtn.svg" alt="메뉴버튼"/>
                        </button>

                        <div className={styles.menuArea}>햄버거버튼 누르면 나올 영역</div>
                    </div>
                </div>

            </div>
        </nav>
    )
}