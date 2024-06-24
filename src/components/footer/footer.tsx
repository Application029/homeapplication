import Image from 'next/image';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className="flex items-center space-x-2">
          <span className={styles.textGray300}>Powered by</span>
          <Image
            src="/logo1.png" // Make sure to replace this with the correct path to your logo
            alt="Home Logo"
            width={100} // Adjust width as needed
            height={100} // Adjust height as needed
            className={styles.logo}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className={styles.textGray300}>
            <p className={styles.textGray300}>
              914-979-1969
              <br />
              Homeapplicationform@gmail.com
            </p>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <p className={styles.textGray300}>
            &copy; {new Date().getFullYear()} Emphasys Software. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
