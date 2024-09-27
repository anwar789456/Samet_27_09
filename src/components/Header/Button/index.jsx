import { motion } from 'framer-motion';
import styles from './style.module.scss';
export default function Button({ isActive, toggleMenu, isSticky }) {
  return (
    <div className={styles.button}>
      <motion.div className={styles.slider}
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}>
        <div className={styles.el} onClick={() => toggleMenu()}>
          <MenuIcon color={isSticky ? "rgba(48, 48, 48, 0.7)" : "rgb(231, 231, 231)"} />
        </div>
        <div className={styles.el} onClick={() => toggleMenu()}>
          <CloseIcon color={isSticky ? "black" : "white"} />
        </div>
      </motion.div>
    </div>
  );
}
function MenuIcon({ color }) {
  return (
    <div className={styles.icon}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="4" width="24" height="2" fill={color} />
        <rect y="11" width="24" height="2" fill={color} />
        <rect y="18" width="24" height="2" fill={color} />
      </svg>
    </div>
  );
}
function CloseIcon() {
  return (
    <div className={styles.icon}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="2" y1="2" x2="22" y2="22" stroke={"black"} strokeWidth="2" />
        <line x1="22" y1="2" x2="2" y2="22" stroke={"black"} strokeWidth="2" />
      </svg>
    </div>
  );
}