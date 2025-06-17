import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.customerService}>
                        <span>고객센터 1577-0000</span>
                        <span>|</span>
                        <span>오전 9시 ~ 오후 6시</span>
                    </div>

                    <address className={styles.companyInfo}>
                        <p>비하인드킷 사업자등록번호: 111-11-12345</p>
                        <p>주소: (02345) 서울특별시 강남구 테헤란로 101 (역삼동)</p>
                        <p>Email : behindkit@behindkit.kr</p>
                    </address>

                </div>
                <div className={styles.copyright}>
                    <p>Copyright © 2025 (주)비하인드컷 All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}