import React, { useState, useContext } from "react";
import { FormContext } from "@/components/forms/formContext";
import styles from "./FormStep.module.css";

interface FormStep4Props {
  nextStep: () => void;
  prevStep: () => void;
}

const FormStep4: React.FC<FormStep4Props> = ({ nextStep, prevStep }) => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("FormContext must be used within a FormProvider");
  }

  const { formData, setFormData } = context;

  const [numCars, setNumCars] = useState(formData.numCars || 0);
  const [hasPet, setHasPet] = useState(formData.hasPet || false);

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
        <h1 className={styles.header}>Vehicle Information</h1>

        <label className={styles.label}>
          Make/Model:
          <input
            type="text"
            name="vehicleMakeModel"
            value={formData.vehicleMakeModel || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Vehicle Make and Model"
          />
        </label>
        <label className={styles.label}>
          Year:
          <input
            type="number"
            name="vehicleYear"
            value={formData.vehicleYear || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Vehicle Year"
          />
        </label>
        <label className={styles.label}>
          License Plate Number:
          <input
            type="text"
            name="vehicleLicensePlate"
            value={formData.vehicleLicensePlate || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Vehicle License Plate Number"
          />
        </label>
        <label className={styles.label}>
          Driver's License Number:
          <input
            type="text"
            name="driversLicense"
            value={formData.driversLicense || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Driver's License Number"
          />
        </label>

        <h1 className={styles.header}>Have more cars?</h1>
        <div className={styles.radioGroup}>
          {[1, 2, 3, 4].map((num) => (
            <label key={num} className={styles.radioLabel}>
              <input
                type="radio"
                name="numCars"
                value={num}
                checked={numCars === num}
                onChange={() => handleRadioChange(setNumCars, "numCars", num)}
                aria-label={`Number of cars: ${num}`}
              />
              {num}
            </label>
          ))}
        </div>

        {Array.from({ length: numCars }).map((_, index) => (
          <div key={index} className={styles.dynamicSection}>
            <h3>Car {index + 1} Details</h3>
            <label className={styles.label}>
              Make/Model:
              <input
                type="text"
                name={`additionalCarMakeModel_${index}`}
                value={formData[`additionalCarMakeModel_${index}`] || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label={`Additional Car ${index + 1} Make and Model`}
              />
            </label>
            <label className={styles.label}>
              Year:
              <input
                type="number"
                name={`additionalCarYear_${index}`}
                value={formData[`additionalCarYear_${index}`] || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label={`Additional Car ${index + 1} Year`}
              />
            </label>
            <label className={styles.label}>
              License Plate Number:
              <input
                type="text"
                name={`additionalCarLicensePlate_${index}`}
                value={formData[`additionalCarLicensePlate_${index}`] || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label={`Additional Car ${index + 1} License Plate Number`}
              />
            </label>
          </div>
        ))}

        <h1 className={styles.header}>Do you have a pet?</h1>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="hasPet"
              value="yes"
              checked={hasPet}
              onChange={() => handleRadioChange(setHasPet, "hasPet", true)}
              aria-label="Has Pet"
            />
            Yes
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="hasPet"
              value="no"
              checked={!hasPet}
              onChange={() => handleRadioChange(setHasPet, "hasPet", false)}
              aria-label="No Pet"
            />
            No
          </label>
        </div>

        {hasPet && (
          <div className={styles.dynamicSection}>
            <label className={styles.label}>
              Please state details:
              <input
                type="text"
                name="petDetails"
                value={formData.petDetails || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label="Pet Details"
              />
            </label>
          </div>
        )}

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

export default FormStep4;
