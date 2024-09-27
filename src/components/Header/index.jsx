import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import SearchBar from '../searchBar';
import Button from './Button';
import NavMenuPhoneNav from './NavPhoneNavigation';
import MenuNav from './nav/Menu_nav/menu_nav';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity } from './animation';
import logoblack from "./img/LogoBlack.png";
import logowhite from "./img/LogoWhite.png";
import Magnetic from '../../common/Magnetic';
import Image from 'next/image';
import Link from 'next/link';
import CartContainer from '../Cart';
import { fetchProducts } from '../../api/fetchProducts';
const menuPhoneNavjs = {
    open: {width: "95vw",height: "95vh", top: "-5px",left: "-5px", backgroundColor: "#ffffff",
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
    },
    closed: {width: "40px",height: "40px", top: "0",left: "0", backgroundColor: "transparent",
      transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
    }
};
export default function Header({ sticky }) {
    const [isActivePhoneNav, setIsActivePhoneNav] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isSticky, setIsSticky] = useState(sticky);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    //const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenWidth, setScreenWidth] = useState(0);
    const [data, setData] = useState([]);
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
        if (typeof window !== 'undefined') {
          // Code that uses the window object
          setScreenWidth(window.innerWidth);
          const handleResize = () => {
            setScreenWidth(window.innerWidth);
          };
          window.addEventListener('resize', handleResize);
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }
      }, []);

      
    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
      


    const handleScroll = () => {
        if (window.scrollY > 10 || isActive || sticky || isSearchOpen) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isActive, sticky, isSearchOpen]);
    
    const handleMouseEnter = () => {
        if ((isActive)||(isSearchOpen)){
            setIsSticky(true);
        }
    };
    const handleMouseLeave = () => {
        if ((isActive)||(isSearchOpen)||(sticky)){
            setIsSticky(true);
        }
        else if (window.scrollY <= 10){
            setTimeout(() => {
                setIsSticky(false);
            }, 500);
        }
        
    };
    const handleClick = () => {
        setIsActive(!isActive);
        if (!isActive) {
            setIsSticky(true);
        } else {
            setTimeout(() => {
                if (window.scrollY <= 10 && !isActive && !sticky) {
                    setIsSticky(false);
                }
            }, 1500);
        }
    };
    const handleLinkClick = () => {
        setIsActive(false);
    };
    const toggleSearchBar = () => {
        setIsSearchOpen(prev => !prev);
        setIsSticky(true);
        if (isActive){
            setIsActive(false);
        }
    };
    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
        if (isActive){
            setIsActive(false);
        }
    };
    return (
        <>
            <div className={`${styles.header} ${isSticky ? styles.HeaderSticky : ''}`}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className={styles.nav_top}>
                    <div className={styles.logo}>
                        <Link href="/" onClick={handleLinkClick}>
                            <Image className={styles.blacklogo} 
                                src={logoblack} alt="logohere"/>
                            <Image className={styles.whitelogo}
                                src={logowhite} alt="logohere"/>
                        </Link>
                    </div>
                    <div className={styles.nav}>
                        <Magnetic>
                            <div className={styles.bar}>
                                <div onClick={handleClick} className={styles.el}>
                                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`} />
                                    <div className={styles.label}>
                                        <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}
                                            className={styles.paragraph}>
                                            SHOP
                                        </motion.p>
                                        <motion.p variants={opacity} animate={isActive ? "open" : "closed"}
                                            className={styles.paragraph}>
                                            CLOSE
                                        </motion.p>
                                    </div>
                                </div>
                            </div>
                        </Magnetic>
                        <Magnetic>
                            <div className={styles.el}>
                                <Link href="/about" onClick={handleLinkClick} className={styles.paragraph}>ABOUT</Link>
                            </div>
                            </Magnetic>
                        <Magnetic>
                            <div className={styles.el}>
                                <Link href="/contact" onClick={handleLinkClick} className={styles.paragraph}>CONTACT</Link>
                            </div>
                        </Magnetic>
                    </div>
                    <div className={styles.icons}>
                        <div className={styles.margedRight}>
                            <div className={styles.searchIconDiv} onClick={toggleSearchBar}>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    width={22} 
                                    height={22} 
                                    fill={"none"} 
                                    className="closeIcon"
                                >
                                    <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                                <h1 className={styles.PIcon}>Search</h1>
                            </div>
                            <div  className={styles.cartIconDiv} onClick={toggleCart}>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    width={22} 
                                    height={22} 
                                    fill={"none"}
                                    className={styles.icon}>
                                    <path d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="10.5" cy="20.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="17.5" cy="20.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                <h1 className={styles.PIcon}>Cart(2)</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.headerPhoneNav}>
                    <motion.div
                        className={styles.menuPhoneNav}
                        variants={menuPhoneNavjs}
                        animate={isActivePhoneNav ? "open" : "closed"}
                        initial="closed">
                        <AnimatePresence>
                        {isActivePhoneNav && <NavMenuPhoneNav setIsActive={setIsActivePhoneNav} />}
                        </AnimatePresence>
                    </motion.div>
                    <Button 
                        isActive={isActivePhoneNav} 
                        toggleMenu={() => setIsActivePhoneNav(!isActivePhoneNav)} 
                        isSticky={isSticky} 
                    />
                </div>
                <AnimatePresence mode="wait">
                    {isActive && <MenuNav handleLinkClick={handleLinkClick} />}
                </AnimatePresence>
            </div>
            <SearchBar isOpen={isSearchOpen} products={data} onClose={() => setIsSearchOpen(false)} />
            <CartContainer isOpen={isCartOpen} onClose={toggleCart} />
        </>
    );
}