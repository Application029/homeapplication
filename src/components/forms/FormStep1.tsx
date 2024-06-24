import React, { useContext } from "react";
import { FormContext } from "./formContext";
import styles from "./FormStep.module.css";

interface FormStep1Props {
  nextStep: () => void;
}

const FormStep1: React.FC<FormStep1Props> = ({ nextStep }) => {
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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  const numApplicants = formData.numApplicants;
  const numAdult = numApplicants ? parseInt(numApplicants.split("_")[0]) : 0;
  const numMinor = numApplicants ? parseInt(numApplicants.split("_")[2]) : 0;

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.header}>
          Section 1: Applicant's Personal Information
        </h1>

        <label className={styles.label}>
          Verify Address you are applying on:
          <input
            type="text"
            name="applyAddress"
            value={formData.applyAddress || ""}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Applicant Anticipation Possession date:
          <input
            type="date"
            name="possessionDate"
            value={formData.possessionDate || ""}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Term Tenancy:
          <input
            type="text"
            name="termTenancy"
            value={formData.termTenancy || ""}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <div className={styles.label}>
          Number of applicants moving in:
          <div className={styles["radio-group"]}>
            <label className={styles["radio-label"]}>
              <input
                type="radio"
                name="numApplicants"
                value="2_adult_3_minor"
                onChange={handleRadioChange}
              />
              2 adults, 3 minors
            </label>
            <label className={styles["radio-label"]}>
              <input
                type="radio"
                name="numApplicants"
                value="3_adult_2_minor"
                onChange={handleRadioChange}
              />
              3 adults, 2 minors
            </label>
            <label className={styles["radio-label"]}>
              <input
                type="radio"
                name="numApplicants"
                value="4_adult_1_minor"
                onChange={handleRadioChange}
              />
              4 adults, 1 minor
            </label>
            <label className={styles["radio-label"]}>
              <input
                type="radio"
                name="numApplicants"
                value="1_adult_4_minor"
                onChange={handleRadioChange}
              />
              1 adult, 4 minors
            </label>
          </div>
        </div>

        {numApplicants && (
          <div className={styles.dynamicSection}>
            {Array.from({ length: numAdult }, (_, i) => (
              <div key={`adult_${i}`} className={styles.label}>
                <h3>Adult {i + 1}</h3>
                <label>
                  Applicant Full Name:
                  <input
                    type="text"
                    name={`adultName_${i}`}
                    value={formData[`adultName_${i}`] || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </label>
                <label>
                  Home Phone:
                  <input
                    type="tel"
                    name={`adultHomePhone_${i}`}
                    value={formData[`adultHomePhone_${i}`] || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </label>
                <label>
                  Alternative Phone:
                  <input
                    type="tel"
                    name={`adultAltPhone_${i}`}
                    value={formData[`adultAltPhone_${i}`] || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </label>
                <label>
                  Email Address:
                  <input
                    type="email"
                    name={`adultEmail_${i}`}
                    value={formData[`adultEmail_${i}`] || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </label>
                <label>
                  Date of Birth:
                  <input
                    type="date"
                    name={`adultDob_${i}`}
                    value={formData[`adultDob_${i}`] || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </label>
                <label>
                  Applicant SSN:
                  <input
                    type="text"
                    name={`adultSsn_${i}`}
                    value={formData[`adultSsn_${i}`] || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </label>
              </div>
            ))}

            {Array.from({ length: numMinor }, (_, i) => (
              <div key={`minor_${i}`} className={styles.label}>
                <h3>Minor {i + 1}</h3>
                <label>
                  Name:
                  <input
                    type="text"
                    name={`minorName_${i}`}
                    value={formData[`minorName_${i}`] || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </label>
                <label>
                  Date of Birth:
                  <input
                    type="date"
                    name={`minorDob_${i}`}
                    value={formData[`minorDob_${i}`] || ""}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </label>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className={styles.button}>
          Next
        </button>
      </form>
    </div>
  );
};

export default FormStep1;
