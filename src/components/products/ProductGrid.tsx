import { formatPrice } from '../../utils/formatPrice';
import { Link } from 'react-router-dom';

import { useCart } from '../../hooks/useCart';
import { useWishList } from '../../hooks/useWishList';

import styles from './ProductGrid.module.css';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  description: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {

  const { wishlist, addToWishlist, removeFromWishlist } = useWishList();


  const handleToggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const { addToCart } = useCart();

  return (

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

              <button
                className={styles.cartArea}
                onClick={() => addToCart(product.id)}
              >
                <img src="/src/assets/img/button/cartBtn.svg" />
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

  );
}
