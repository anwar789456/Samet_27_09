import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.scss';

const ProductCard = ({ image, title, description, priceMin, priceMax, idProd }) => {
  const handleProductClick = () => {
    const recentProducts = JSON.parse(localStorage.getItem('RecentProductsClicked')) || [];
    if (!recentProducts.includes(idProd)) {
      recentProducts.push(idProd);
    }
    localStorage.setItem('RecentProductsClicked', JSON.stringify(recentProducts));
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <Link href={`/ProductPage/${idProd}`} onClick={handleProductClick}>
          <Image src={image} alt="Product Image" layout="fill" objectFit="cover" className={styles.image} />
        </Link>
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.PriceRange}>
          {priceMin === priceMax ? (
            <p className={styles.price}>${priceMin}</p>
          ) : (
            <>
              <p className={styles.price}>${priceMin} -</p>
              <p className={styles.price}>${priceMax}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;