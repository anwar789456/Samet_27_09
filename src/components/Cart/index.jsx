import { useEffect, useRef } from 'react';
import styles from './style.module.scss';

export default function CartContainer({ isOpen, onClose }) {
    const cartRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            cartRef.current.style.transform = 'translateX(0)';
        } else {
            cartRef.current.style.transform = 'translateX(100%)';
        }
    }, [isOpen]);

    return (
        <div className={styles.cartContainer} ref={cartRef}>
            <div className={styles.headerContainer}>
                <div className={styles.cartTitle}><h1 className={styles.cartH1}>Cart</h1></div>
                <button className={styles.closeButton} onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        width={30} 
                        height={30} 
                        fill>
                        <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" 
                        stroke="currentColor" 
                        strokeWidth=".8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" />
                    </svg>
                    {//<h1 className={styles.closeH1}>Close</h1>
                    }
                </button>
            </div>
            {/* Cart items will be added here later */}
        </div>
    );
}