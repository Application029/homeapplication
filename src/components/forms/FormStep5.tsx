import React, { useState, useContext } from "react";
import { FormContext } from "@/components/forms/formContext";
import styles from "./FormStep.module.css";

interface FormStep5Props {
  nextStep: () => void;
  prevStep: () => void;
}

const FormStep5: React.FC<FormStep5Props> = ({ nextStep, prevStep }) => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("FormContext must be used within a FormProvider");
  }

  const { formData, setFormData } = context;

  const [numBanks, setNumBanks] = useState(formData.numBanks || 0);
  const [numReferences, setNumReferences] = useState(
    formData.numReferences || 0
  );
  const [numEmergencyContacts, setNumEmergencyContacts] = useState(
    formData.numEmergencyContacts || 0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRadioChange = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    key: string,
    value: any
  ) => {
    setter(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.header}>Banking Information</h1>

        <label className={styles.label}>
          Banking Institution Name:
          <input
            type="text"
            name="bankName"
            value={formData.bankName || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Banking Institution Name"
          />
        </label>
        <label className={styles.label}>
          Bank Institution Address:
          <input
            type="text"
            name="bankAddress"
            value={formData.bankAddress || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Bank Institution Address"
          />
        </label>

        <h1 className={styles.header}>
          If you bank with more than one institution, please list second bank
          below
        </h1>
        <div className={styles.radioGroup}>
          {[1, 2, 3, 4].map((num) => (
            <label key={num} className={styles.radioLabel}>
              <input
                type="radio"
                name="numBanks"
                value={num}
                checked={numBanks === num}
                onChange={() => handleRadioChange(setNumBanks, "numBanks", num)}
                aria-label={`Number of banks: ${num}`}
              />
              {num}
            </label>
          ))}
        </div>

        {Array.from({ length: numBanks }).map((_, index) => (
          <div key={index} className={styles.dynamicSection}>
            <h3>Bank {index + 1} Details</h3>
            <label className={styles.label}>
              Banking Institution Name:
              <input
                type="text"
                name={`additionalBankName_${index}`}
                value={formData[`additionalBankName_${index}`] || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label={`Additional Bank ${index + 1} Name`}
              />
            </label>
            <label className={styles.label}>
              Bank Institution Address:
              <input
                type="text"
                name={`additionalBankAddress_${index}`}
                value={formData[`additionalBankAddress_${index}`] || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label={`Additional Bank ${index + 1} Address`}
              />
            </label>
          </div>
        ))}

        <h1 className={styles.header}>References:</h1>
        <div className={styles.radioGroup}>
          {[1, 2, 3].map((num) => (
            <label key={num} className={styles.radioLabel}>
              <input
                type="radio"
                name="numReferences"
                value={num}
                checked={numReferences === num}
                onChange={() =>
                  handleRadioChange(setNumReferences, "numReferences", num)
                }
                aria-label={`Number of references: ${num}`}
              />
              {num}
            </label>
          ))}
        </div>

        {Array.from({ length: numReferences }).map((_, index) => (
          <div key={index} className={styles.dynamicSection}>
            <h3>Reference {index + 1}</h3>
            <label className={styles.label}>
              Name:
              <input
                type="text"
                name={`referenceName_${index}`}
                value={formData[`referenceName_${index}`] || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label={`Reference ${index + 1} Name`}
              />
            </label>
            <label className={styles.label}>
              Phone:
              <input
                type="tel"
                name={`referencePhone_${index}`}
                value={formData[`referencePhone_${index}`] || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label={`Reference ${index + 1} Phone`}
              />
            </label>
            <label className={styles.label}>
              Relationship:
              <input
                type="text"
                name={`referenceRelationship_${index}`}
                value={formData[`referenceRelationship_${index}`] || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label={`Reference ${index + 1} Relationship`}
              />
            </label>
          </div>
        ))}

        <h1 className={styles.header}>Emergency Contact:</h1>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Emergency Contact Name"
          />
        </label>
        <label className={styles.label}>
          Phone:
          <input
            type="tel"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Emergency Contact Phone"
          />
        </label>

        <h1 className={styles.header}>More emergency contacts?</h1>
        <div className={styles.radioGroup}>
          {[1, 2, 3].map((num) => (
            <label key={num} className={styles.radioLabel}>
              <input
                type="radio"
                name="numEmergencyContacts"
                value={num}
                checked={numEmergencyContacts === num}
                onChange={() =>
                  handleRadioChange(
                    setNumEmergencyContacts,
                    "numEmergencyContacts",
                    num
                  )
                }
                aria-label={`Number of emergency contacts: ${num}`}
              />
              {num}
            </label>
          ))}
        </div>

        {Array.from({ length: numEmergencyContacts }).map((_, index) => (
          <div key={index} className={styles.dynamicSection}>
            <h3>Emergency Contact {index + 1}</h3>
            <label className={styles.label}>
              Name:
              <input
                type="text"
                name={`additionalEmergencyContactName_${index}`}
                value={
                  formData[`additionalEmergencyContactName_${index}`] || ""
                }
                onChange={handleChange}
                className={styles.input}
                aria-label={`Additional Emergency Contact ${index + 1} Name`}
              />
            </label>
            <label className={styles.label}>
              Phone:
              <input
                type="tel"
                name={`additionalEmergencyContactPhone_${index}`}
                value={
                  formData[`additionalEmergencyContactPhone_${index}`] || ""
                }
                onChange={handleChange}
                className={styles.input}
                aria-label={`Additional Emergency Contact ${index + 1} Phone`}
              />
            </label>
          </div>
        ))}

        <h1 className={styles.header}>
          What date would you like to secure our property:
        </h1>
        <label className={styles.label}>
          Date:
          <input
            type="date"
            name="secureDate"
            value={formData.secureDate || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Secure Date"
          />
        </label>

        <h1 className={styles.header}>
          How much do you have at hand to secure our house:
        </h1>
        <label className={styles.label}>
          Amount:
          <input
            type="number"
            name="secureAmount"
            value={formData.secureAmount || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Secure Amount"
          />
        </label>

        <div className={styles.buttons}>
          <button type="button" onClick={prevStep} className={styles.button}>
            Previous
          </button>
          <button type="submit" className={styles.button}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStep5;
