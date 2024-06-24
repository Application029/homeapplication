// successfulDialog/SuccessfulDialog.tsx
import React from 'react';
import styles from './SuccessfulDialog.module.css';

interface SuccessfulDialogProps {
  onClose: () => void; // Function to close the dialog
}

const SuccessfulDialog: React.FC<SuccessfulDialogProps> = ({ onClose }) => {
  const handleClose = () => {
    onClose();
    window.location.reload(); // Reload the page on close
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2 className={styles.title}>Thank you for your submission!</h2>
        <p className={styles.description}>Your form has been successfully submitted.</p>
        <button className={styles.closeButton} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessfulDialog;
