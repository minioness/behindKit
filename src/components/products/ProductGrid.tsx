
import { formatPrice } from '../../utils/formatPrice';
import styles from './ProductGrid.module.css';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { wishlistState } from '../../recoil/wishlistAtom';


interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [wishlist, setWishlist] = useRecoilState(wishlistState);
  

  const handleToggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };


  return (
    <div>
      <div className={styles.grid}>
        {products.map((product) => {
          const isWished = wishlist.includes(product.id);

          return (
            <div key={product.id} className={styles.card}>
              <div className={styles.thumbnailWrapper}>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={styles.thumbnail}
                  />
                </Link>
                <button
                  className={styles.wishButton}
                  onClick={() => handleToggleWishlist(product.id)}
                >
                  <img
                    src={
                      isWished
                        ? 'src/assets/img/button/WishBtn.svg'
                        : 'src/assets/img/button/noWishBtn.svg'
                    }
                    alt="찜하기"
                  />
                </button>
              </div>

  
              <button className={styles.cartArea}>
                <img src='/src/assets/img/button/cartBtn.svg' />
                담기
              </button>


              <Link to={`/product/${product.id}`} className={styles.info}>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.price}>{formatPrice(product.price)}</p>
                <p className={styles.category}>{product.category}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
