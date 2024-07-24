import React, { useState, useContext } from 'react';
import { FormContext } from '@/components/forms/formContext';
import styles from './FormStep.module.css';
import { sendEmail } from '@/app/emailService/emailService';
import SuccessfulDialog from '../successMessage/SuccessfulDialog';

interface FormStep6Props {
  prevStep: () => void;
  handleSubmit: (formData: any) => Promise<void>; // Adjusted handleSubmit type to include formData
}

const FormStep6: React.FC<FormStep6Props> = ({ prevStep, handleSubmit }) => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('FormContext must be used within a FormProvider');
  }

  const { formData, setFormData } = context;
  const [loading, setLoading] = useState(false);
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);
  const [paymentType, setPaymentType] = useState(formData.paymentType || '');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // Handle file inputs separately
    if (e.target.type === 'file') {
      const { name, files } = e.target as HTMLInputElement;
      if (files && files.length > 0) {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { frontID, backID, signature, ...data } = formData;
      const formDataToSend = {
        ...data,
        frontID: frontID?.name,
        backID: backID?.name,
        signature: signature?.name
      };

      await sendEmail(formDataToSend); // Call sendEmail function with formData

      setSubmissionSuccessful(true);
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error (e.g., show a notification to the user)
    } finally {
      setLoading(false);
    }
  };

  function handleCloseDialog(): void {
    window.location.reload();
  }

  return (
    <div className={styles['form-container']}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <h1 className={styles.header}>Section 8 Applicant:</h1>
        <p className={styles.mainText}>
          Section 8 applicants are to be responsible for the application fee and deposit if possible, then secure our house and get the keys as a sign of being secure. Then the paperwork should be submitted within 3 hours to the landlord to work on and get it back to the Section 8 program or any program for inspection. The rent should be paid after inspection. All payments made by the applicant are refundable if not approved, and the key should also be returned to the landlord. Also, our property is on a first-come, first-served basis.
        </p>

        <h1 className={styles.header}>Securing process:</h1>
        <p className={styles.mainText}>
          All payments should be made via bank by cash deposit or any other legal form of payment or bank-related processes. The applicant should come with the receipt from the bank or store to use that to obtain a property payment receipt, which will be issued to you by the property owner/lawyer for proper documentation. Any applicant who first makes the payment to secure the property should receive the property key within 3 hours. The property should be taken down within 1 hour. All payments made are REFUNDABLE if any changes come up, and the key should also be returned to the property owner.
        </p>

        <h1 className={styles.header}>Copy of your ID front/back and signature (sign on paper, snap, and upload)</h1>
        <label className={styles.label}>
          Front ID:
          <input
            type="file"
            name="frontID"
            required
            className={styles.input}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Back ID:
          <input
            type="file"
            name="backID"
            required
            className={styles.input}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Signature:
          <input
            type="file"
            name="signature"
            required
            className={styles.input}
            onChange={handleChange}
          />
        </label>

        <h1 className={styles.header}>Application submission Date:</h1>
        <label className={styles.label}>
          Date:
          <input
            type="date"
            name="submissionDate"
            required
            className={styles.input}
            onChange={handleChange}
          />
        </label>

        <h1 className={styles.header}>Application fee:</h1>
        <p className={styles.mainText}>
          We do have a refundable application fee of $75 for each adult from the age of 18 years and above moving into our house. Kindly select the suitable form of payment to pay the application fee.
        </p>
        <label className={styles.label}>
          Payment Type:
          <select
            name="paymentType"
            value={paymentType}
            onChange={(e) => {
              setPaymentType(e.target.value);
              handleChange(e);
            }}
            required
            className={styles.input}
          >
            <option value="">Select</option>
            <option value="cashApp">Cash App</option>
            <option value="paypal">PayPal</option>
            <option value="zelle">Zelle</option>
            <option value="applePay">Apple Pay</option>
            <option value="googlePay">Google Pay</option>
          </select>
        </label>

        <h1 className={styles.header}>Terms</h1>
        <p className={styles.mainText}>
          I declare that the information I have provided is accurate. I authorize the individual or organization to which this application is submitted to: (a) contact my references and all other persons that I have named in this application; and (b) perform a credit and/or criminal check to assess my suitability as a tenant/lessee.
        </p>
        <label className={styles.checkbox}>
          <input type="checkbox" name="terms" required onChange={handleChange} />
          I accept the terms and conditions on this application form by checking this box.
        </label>

        <div className={styles.buttons}>
          <button type="button" onClick={prevStep} className={styles.button}>
            Previous
          </button>
          <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Submitting....' : 'Submit'}
          </button>
        </div>
      </form>
      
     
      {submissionSuccessful && (
        <SuccessfulDialog onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default FormStep6;
