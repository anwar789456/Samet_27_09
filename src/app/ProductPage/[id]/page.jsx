"use client";
import { NextUIProvider } from '@nextui-org/react';
import SelectBox from '@/components/SelectBox';
import Footer from '@/components/NewFooter/Footer';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './ProductPage.module.scss';
import Accordion from '@/components/ProductPageComponents/Accordion';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'; // Use react-icons
import { fetchProducts } from '../../../api/fetchProducts';
import RecentProductsClicked from '@/components/LivingComponents/RecentProductsClicked';
import RecommendedProducts from '@/components/RecommendationSystem';
import Link from 'next/link';
const ProductPage = ({ params }) => {
  const [recommendedProductsCategory, setRecommendedProductsCategory] = useState('');
  const [data, setData] = useState([]);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showTooltips, setShowTooltips] = useState(false);

  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedData = await fetchProducts();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (params.id) {
      const productData = data.find((item) => item.idProd === params.id);
      if (productData) {
        setProduct(productData);
        setRecommendedProductsCategory(productData.categorie.trim());
        setMainImage(productData.images[0].img);
        setSelectedImageIndex(0);
      }
    }
  }, [params.id, data]);

  const handleImageClick = (img, index) => {
    setMainImage(img);
    setSelectedImageIndex(index);
  };
  const handlePrevImage = () => {
    if (selectedImageIndex > 0) { 
      const prevIndex = selectedImageIndex - 1;
      setMainImage(product.images[prevIndex].img);
      setSelectedImageIndex(prevIndex);
    }
  };
  const handleNextImage = () => {
    if (selectedImageIndex < product.images.length - 1) {
      const nextIndex = selectedImageIndex + 1;
      setMainImage(product.images[nextIndex].img);
      setSelectedImageIndex(nextIndex);
    }
  };
  const handleMainImageClick = () => {
    setShowTooltips((prevState) => !prevState);
  };
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  if (!product) return <div>Loading...</div>;


  const scaleVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [1, 0.29, 0, 0.02],
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [.72,.34,0,1.58],
      },
    },
  };
  const renderTooltips = (hyperPoints, showTooltips) => {
    return (
      <AnimatePresence>
        {showTooltips &&
          hyperPoints.map((point, index) => (
            <motion.div
              key={index}
              className={styles.tooltipBox}
              style={{
                top: `calc(${point.posY}% + 10px)`,
                left: `calc(${point.posX}% - 20px)`,
              }}
              variants={scaleVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <div className={styles.tooltipContent}>
                <Link href={`/ProductPage/${point.produitID}`}>
                  <p className={styles.productName}>
                    {data.find((item) => item.idProd === point.produitID)?.nom}
                  </p>
                </Link>
              </div>
              <div className={styles.tooltipTriangle}></div>
            </motion.div>
          ))}
      </AnimatePresence>
    );
  };

  return (
    <>
      <Header sticky={true} />
      <div className={styles.productPage}>
        <div className={styles.imageGallery}>
          <button className={styles.arrowButtonUp} 
                  onClick={handlePrevImage} 
                  disabled={selectedImageIndex === 0}>
            <FaChevronUp />
          </button>
          <div className={styles.scrollImages} style={{ position: 'relative' }}>
            {product.images.map((img, index) => (
              <div key={index} 
                className={`${styles.thumbnail} ${index === selectedImageIndex ? styles.selected : ''}`}
                onClick={() => handleImageClick(img.img, index)} 
                style={{ position: 'relative' }}
              >
                <Image 
                  className={styles.image} 
                  src={img.img} 
                  alt={`${product.nom} image ${index + 1}`} 
                  width={100} 
                  height={100} 
                  layout="responsive"
                />
              </div>
            ))}
          </div>
          <button 
              className={styles.arrowButtonDown} 
              onClick={handleNextImage} 
              disabled={selectedImageIndex === product.images.length - 1}
            >
                <FaChevronDown />
          </button>
        </div>

        <motion.div
          key={mainImage}
          className={styles.mainImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleMainImageClick}
        >
          <div className={styles.mainImageWrapper} style={{ position: 'relative' }}>
            <Image
              src={mainImage}
              alt={product.nom}
              width={500}
              height={500}
              layout="responsive"
            />
            
              {renderTooltips(product.images[selectedImageIndex].hyperPoints, showTooltips)}
          </div>
        </motion.div>


        <div className={styles.imageCarousel} onClick={handleMainImageClick}>
          <Carousel >
            {product.images.map((img, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <Image
                  src={img.img}
                  alt={`${product.nom} image ${index + 1}`}
                  width={500}
                  height={500}
                  layout="responsive"
                />
                {renderTooltips(product.images[selectedImageIndex].hyperPoints, showTooltips)}
              </div>
            ))}
          </Carousel>
        </div>
        


        <div className={styles.productDetails}>
          <div className={styles.Productinfos}>
            <div className={styles.titleDiv}><h1 className={styles.titleInfo}>{product.nom}</h1></div>
            <div className={styles.priceDiv}>{product.minPrice === product.maxPrice ? (
                <p className={styles.priceInfo}>${product.minPrice}</p>) : (
                <p className={styles.priceInfo}>${product.minPrice} - ${product.maxPrice}</p>)}</div></div>
          <div className={styles.Description}>
            <p className={styles.DescriptionP}>{product.description}</p>
          </div>
          <NextUIProvider>
            <SelectBox />
          </NextUIProvider>
          <div className={styles.FullquantityDiv}>
            <div className={styles.quantityController}>
              <div className={styles.minusDiv} onClick={decreaseQuantity}>
                <button className={styles.quantityBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.minusIcon}
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      >
                  <path d="M5 12h14" />
                  </svg>
                </button>
              </div>
              <div className={styles.quantityDiv}>
                <span className={styles.quantityDisplay}>{quantity}</span>
              </div>
              <div className={styles.plusDiv} onClick={increaseQuantity}>
                <button className={styles.quantityBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.plusIcon}
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.addToCart}>
            <button className={styles.addToCartBTN}>
              Add to Cart
            </button>
          </div>
          <div className={styles.AccordionDiv}>
            <Accordion />
          </div>
        </div>
      </div>
      <RecentProductsClicked />
      <RecommendedProducts productCategorie={recommendedProductsCategory} allProducts={data} />
      <Footer />
    </>
  );
};
export default ProductPage;