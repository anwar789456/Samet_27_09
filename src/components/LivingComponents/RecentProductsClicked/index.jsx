import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../../api/fetchProducts';
import styles from './style.module.scss';
import Image from 'next/image';
import { Virtual, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link';

export default function RecentProductsClicked() {
  const [recentProducts, setRecentProducts] = useState([]);
  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        const storedIds = JSON.parse(localStorage.getItem('RecentProductsClicked')) || [];
        const filteredProducts = allProducts.filter(product => storedIds.includes(product.idProd));
        setRecentProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.titleDiv}>
        <h1 className={styles.title}>Recently Viewed</h1>
      </div>
      <Swiper
        className={styles.swiperContainer}
        slidesPerView={4}
        spaceBetween={20}
        centeredSlides={false}
        
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}>
        {recentProducts.map((product, index) => (
          <SwiperSlide key={product.idProd} virtualIndex={index} className={styles.swiperSlide}>
            <div className={styles.productCard}>
            <Link href={`/ProductPage/${product.idProd}`} className={styles.linkContainer}>
              <div className={styles.slideContainer}>              
                <Image
                  src={product.images[0].img}  
                  alt={product.nom} width={600} height={600}
                  className={styles.productImage}
                />
                {/* Product name */}
                <h3 className={styles.productName}>{product.nom}</h3> 
                <p className={styles.productPrice}>
                  {/* Product price range */}
                  {product.minPrice === product.maxPrice
                    ? `$${product.minPrice}`
                    : `$${product.minPrice} - $${product.maxPrice}`}
                </p>

                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}