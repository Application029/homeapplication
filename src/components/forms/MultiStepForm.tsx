"use client";

import React, { useState } from 'react';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import FormStep4 from './FormStep4';
import FormStep5 from './FormStep5';
import FormStep6 from './FormStep6';
import { FormProvider } from './formContext';
import styles from './FormStep.module.css';
import { sendEmail } from '@/app/emailService/emailService'; // Import the sendEmail function

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (formData: any): Promise<void> => {
    console.log('Form Data:', formData); // Output form data to console
    try {
      await sendEmail(formData); // Call sendEmail function with formData
      // Additional logic (if any) after email is sent
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  return (
    <FormProvider>
      <div className={styles.container}>
        {step === 1 && <FormStep1 nextStep={nextStep} />}
        {step === 2 && <FormStep2 nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <FormStep3 nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <FormStep4 nextStep={nextStep} prevStep={prevStep} />}
        {step === 5 && <FormStep5 nextStep={nextStep} prevStep={prevStep} />}
        {step === 6 && <FormStep6 prevStep={prevStep} handleSubmit={handleSubmit} />}
      </div>
    </FormProvider>
  );
};

export default MultiStepForm;
