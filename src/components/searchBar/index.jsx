import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../LivingComponents/Products/ProductCard';
import styles from './SearchBar.module.scss';
import Link from 'next/link';

const SearchBar = ({ isOpen, onClose, products }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Handles the input change and filters the products by 'nom'
    const handleInputChange = (e) => {
        const searchValue = e.target.value.trim().toUpperCase(); // Convert to uppercase for case-insensitive search
        setInputValue(searchValue);

        if (searchValue === '') {
            setFilteredProducts([]); // Clear results when input is empty
        } else {
            // Filter by 'nom' only
            const filtered = products.filter(product =>
                product?.nom?.toUpperCase().includes(searchValue)
            );
            setFilteredProducts(filtered);
        }
    };

    // Clear the input gradually, then clear results
    const clearInput = () => {
        let currentValue = inputValue;
        const interval = setInterval(() => {
            if (currentValue.length > 0) {
                currentValue = currentValue.slice(0, -1);
                setInputValue(currentValue);
            } else {
                clearInterval(interval);
                setFilteredProducts([]); // Clear search results when input is cleared
            }
        }, 0);
    };

    const handleClear = () => {
        clearInput();
    };

    // Variants for the search bar itself
    const variants = {
        open: { y: 0, opacity: 1 },
        closed: { y: -100, opacity: 0 },
    };
    // Variants for the search results transition (for when searchbar opens/closes)
    const resultsVariants = {
        hidden: { 
            y: -50, 
            opacity: 0, 
            height: 0,
            transition: { duration: 0.3 }
        }, 
        visible: { 
            y: 0, 
            opacity: 1,
            height: "87vh",
            transition: { 
                duration: 0.5,
                ease: 'easeInOut' // You can tweak this ease timing
            }
        }, 
        exit: { 
            y: -50, 
            height: 0,
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            className={styles.searchBar}
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}  
        >
            <div className={styles.searchContent}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={styles.searchInput}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <span className={styles.animatedLine}></span>
                </div>
                <button className={styles.clearButton} onClick={handleClear}>
                    {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"}>
                        <path d="M21 3L13 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.44573 11.0854C6.96539 12.0368 4.98269 11.8736 3 11.0885C3.50059 17.531 6.50414 20.0089 10.5089 21C10.5089 21 13.5261 18.8664 13.961 13.8074C14.0081 13.2595 14.0317 12.9856 13.9178 12.6769C13.8038 12.3682 13.5802 12.1468 13.1329 11.704C12.3973 10.9757 12.0295 10.6116 11.5929 10.5204C11.1564 10.4293 10.5862 10.648 9.44573 11.0854Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.5 16.4464C4.5 16.4464 7 16.9286 9.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.5 7.25C8.5 7.94036 7.94036 8.5 7.25 8.5C6.55964 8.5 6 7.94036 6 7.25C6 6.55964 6.55964 6 7.25 6C7.94036 6 8.5 6.55964 8.5 7.25Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M11 4V4.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>*/}
                </button>
                <button className={styles.closeButton} onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        width={30} 
                        height={30} 
                        fill={"none"}>
                        <path d="M19.0005 4.99988L5.00049 
                        18.9999M5.00049 4.99988L19.0005 18.9999" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" />
                    </svg>
                </button>

                <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.searchResults}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={resultsVariants}
                    >
                        {/* Render filtered products or "No products found" */}
                        <div className={styles.foundProducts}>
                            {filteredProducts.length > 0 ? (  
                                filteredProducts.map((product, index) => (
                                    <div key={index} className={styles.productItem}>
                                        <Link href={`/ProductPage/${product.idProd}`}>
                                            <ProductCard
                                                image={product.images[0].img}
                                                title={product.nom}
                                                description={product.description}
                                                imageObject = {[]}
                                                priceMin={product.minPrice}
                                                priceMax={product.maxPrice}
                                                category={product.categorie}
                                                idProd = {product.idProd}
                                            />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noProductsFound}>
                                    <p>No products found</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>
        </motion.div>
    );
};
export default SearchBar;