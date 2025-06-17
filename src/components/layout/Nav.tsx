import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";

export default function Nav() {
    const cartCount = 1;
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = false;

    const hideRightButtons = ['/login', '/signup'].includes(location.pathname);

    
    const handleMyPageClick = () => {
        if (isLoggedIn) {
            navigate('/mypage');
        } else {
            navigate('/login');
        }
    }


    return (
        <nav className={styles.navContainer}>
            <div className={styles.wrapper}>
                <div className={styles.navLeft}>
                    <Link to='/'>
                        <img src="/src/assets/img/logo.svg" alt="로고이미지"/>
                    </Link>
                </div>

                {!hideRightButtons && <div className={styles.navRight}>
                    <Link to='/wish'>
                        <img src="/src/assets/img/button/wishBtn.svg" alt="찜"/>
                    </Link>
                    <Link to='/cart' className={styles.cartBtn}>
                        <img src="/src/assets/img/button/cartBtn.svg" alt="장바구니"/>
                        { cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                    </Link>
                    <button onClick={handleMyPageClick} className={styles.myPageBtn}>
                        <img src="/src/assets/img/button/myPageBtn.svg" alt="마이페이지"/>
                    </button>
                    <div className={styles.hamburgerBtn}>
                        <button>
                            <img src="/src/assets/img/button/hamburgerBtn.svg" alt="메뉴버튼"/>
                        </button>

                        <div className={styles.menuArea}>햄버거버튼 누르면 나올 영역</div>
                    </div>
                </div>}

            </div>
        </nav>
    )
}