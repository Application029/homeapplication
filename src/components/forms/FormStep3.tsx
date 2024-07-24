import React, { useState, useContext } from "react";
import { FormContext } from "@/components/forms/formContext";
import styles from "./FormStep.module.css";

interface FormStep3Props {
  nextStep: () => void;
  prevStep: () => void;
}

const FormStep3: React.FC<FormStep3Props> = ({ nextStep, prevStep }) => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("FormContext must be used within a FormProvider");
  }

  const { formData, setFormData } = context;

  const [hasSecondJob, setHasSecondJob] = useState(
    formData.hasSecondJob || false
  );
  const [hasOtherIncome, setHasOtherIncome] = useState(
    formData.hasOtherIncome || false
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    key: string
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      setter(isChecked);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [key]: isChecked,
      }));
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.header}>Details of Employment</h1>

        <label className={styles.label}>
          Office/Company Name:
          <input
            type="text"
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Office or Company Name"
          />
        </label>
        <label className={styles.label}>
          Employer:
          <input
            type="text"
            name="employer"
            value={formData.employer || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Employer"
          />
        </label>
        <label className={styles.label}>
          Position:
          <input
            type="text"
            name="position"
            value={formData.position || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Position"
          />
        </label>
        <label className={styles.label}>
          Job Duration:
          <input
            type="text"
            name="jobDuration"
            value={formData.jobDuration || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Job Duration"
          />
        </label>
        <label className={styles.label}>
          Supervisor's Name:
          <input
            type="text"
            name="supervisorName"
            value={formData.supervisorName || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Supervisor's Name"
          />
        </label>
        <label className={styles.label}>
          Phone:
          <input
            type="tel"
            name="supervisorPhone"
            value={formData.supervisorPhone || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Supervisor's Phone"
          />
        </label>
        <label className={styles.label}>
          Monthly Income:
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome || ""}
            onChange={handleChange}
            className={styles.input}
            aria-label="Monthly Income"
          />
        </label>

        <div className={styles.checkbox}>
          <label>
            <input
              type="checkbox"
              checked={hasSecondJob}
              onChange={handleCheckboxChange(setHasSecondJob, "hasSecondJob")}
              aria-label="Second Job"
            />
            You have more than one job kindly state the details of the second
            job below.
          </label>
        </div>

        {hasSecondJob && (
          <div className={styles.dynamicSection}>
            <h3>Second Job Details</h3>
            <label className={styles.label}>
              Office/Company Name:
              <input
                type="text"
                name="secondCompanyName"
                value={formData.secondCompanyName || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label="Second Job Office or Company Name"
              />
            </label>
            <label className={styles.label}>
              Employer:
              <input
                type="text"
                name="secondEmployer"
                value={formData.secondEmployer || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label="Second Job Employer"
              />
            </label>
            <label className={styles.label}>
              Position:
              <input
                type="text"
                name="secondPosition"
                value={formData.secondPosition || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label="Second Job Position"
              />
            </label>
            <label className={styles.label}>
              Job Duration:
              <input
                type="text"
                name="secondJobDuration"
                value={formData.secondJobDuration || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label="Second Job Duration"
              />
            </label>
            <label className={styles.label}>
              Supervisor's Name:
              <input
                type="text"
                name="secondSupervisorName"
                value={formData.secondSupervisorName || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label="Second Job Supervisor's Name"
              />
            </label>
            <label className={styles.label}>
              Phone:
              <input
                type="tel"
                name="secondSupervisorPhone"
                value={formData.secondSupervisorPhone || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label="Second Job Supervisor's Phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                title="Phone number format: 123-456-7890"
              />
            </label>
            <label className={styles.label}>
              Monthly Income:
              <input
                type="number"
                name="secondMonthlyIncome"
                value={formData.secondMonthlyIncome || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label="Second Job Monthly Income"
              />
            </label>
          </div>
        )}

        <h1 className={styles.header}>Other Sources of Income</h1>

        <div className={styles.checkbox}>
          <label>
            <input
              type="checkbox"
              checked={hasOtherIncome}
              onChange={handleCheckboxChange(
                setHasOtherIncome,
                "hasOtherIncome"
              )}
              aria-label="Other Sources of Income"
            />
            Do you receive income from any other sources?
          </label>
        </div>

        {hasOtherIncome && (
          <div className={styles.dynamicSection}>
            <label className={styles.label}>
              Please state the other source of income:
              <input
                type="text"
                name="otherIncomeSource"
                value={formData.otherIncomeSource || ""}
                onChange={handleChange}
                className={styles.input}
                aria-label="Other Source of Income"
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

export default FormStep3;
