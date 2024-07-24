import React, { useContext } from "react";
import { FormContext } from "@/components/forms/formContext";
import styles from "./FormStep.module.css";

interface FormStep2Props {
  nextStep: () => void;
  prevStep: () => void;
}

const FormStep2: React.FC<FormStep2Props> = ({ nextStep, prevStep }) => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("FormContext must be used within a FormProvider");
  }

  const { formData, setFormData } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.header}>Applicant Residential History</h1>

        <label className={styles.label}>
          Present Address:
          <input
            type="text"
            name="presentAddress"
            value={formData.presentAddress || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Present Address"
          />
        </label>
        <label className={styles.label}>
          How long at this address?:
          <input
            type="text"
            name="presentAddressDuration"
            value={formData.presentAddressDuration || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Present Address Duration"
          />
        </label>
        <label className={styles.label}>
          Landlord/Leaser:
          <input
            type="text"
            name="landlordLeaser"
            value={formData.landlordLeaser || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Landlord or Leaser"
          />
        </label>
        <label className={styles.label}>
          Landlord/Leaser Number:
          <input
            type="tel"
            name="landlordLeaserNumber"
            value={formData.landlordLeaserNumber || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Landlord or Leaser Number"
          />
        </label>
        <label className={styles.label}>
          Landlord/Leaser Email:
          <input
            type="email"
            name="landlordLeaserEmail"
            value={formData.landlordLeaserEmail || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Landlord or Leaser Email"
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

export default FormStep2;
