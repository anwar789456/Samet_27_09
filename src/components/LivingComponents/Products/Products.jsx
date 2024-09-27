import React from 'react';
import ProductCard from './ProductCard';
import styles from './style.module.scss';

export default function Products({ products }) {
  return (
    <div className={styles.Productsflex}>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          image={product.images[0].img}
          imageObject={product.images}
          title={product.nom}
          description={product.description}
          priceMin={product.minPrice}
          priceMax={product.maxPrice}
          products={products}
          idProd={product.idProd}
        />
      ))}
    </div>
  );
}
