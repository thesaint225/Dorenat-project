import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { NavbarProps } from '../types/types';
import styles from '../css/Navbar.module.css';

export default function Navbar({ totalItems }: NavbarProps) {
  return (
    <div>
      <nav className={styles.navbar}>
        <Link to='/' className={styles.logo}>
          Dernat 🍿
        </Link>

        <Link to='/cart' className={styles.cartLink}>
          <ShoppingCart size={28} />
          {totalItems > 0 && (
            <span className={styles.cartBadge}>{totalItems}</span>
          )}
        </Link>
      </nav>
    </div>
  );
}
