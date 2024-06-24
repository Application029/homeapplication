import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container mx-auto flex flex-col items-center">
        <Link href="/" passHref>
          <Image 
            src="/logo1.png" // Make sure to replace this with the correct path to your logo
            alt="Home Logo"
            width={200} // Adjust width as needed
            height={200} // Adjust height as needed
            className={styles.logo}
          />
        </Link>

        <span className={styles.applicationTitle}>RESIDENTIAL HOME RENTAL APPLICATION</span>

        {/* Add other header content here if needed */}
      </div>
    </header>
  );
}
