import { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';

import styles from './ProductGrid.module.css';

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
  const [wishlist, setWishlist] = useState<number[]>([]);

  const handleToggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className={styles.grid}>
      {products.map((product) => {
        const isWished = wishlist.includes(product.id);

        return (
          <div key={product.id} className={styles.card}>
            <div className={styles.thumbnailWrapper}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.thumbnail}
              />
              <button
                className={styles.wishButton}
                onClick={() => handleToggleWishlist(product.id)}
              >
                <img
                  src={
                    isWished
                      ? '/src/assets/img/button/wishBtn.svg'
                      : '/src/assets/img/button/noWishBtn.svg'
                  }
                  alt="찜하기"
                />
              </button>
            </div>

            <div className={styles.info}>
              <h3 className={styles.title}>{product.title}</h3>
              <p className={styles.price}>{formatPrice(product.price)}</p>
              <p className={styles.category}>{product.category}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
