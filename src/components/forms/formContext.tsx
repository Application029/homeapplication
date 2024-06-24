import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface FormData {
  applyAddress: string;
  possessionDate: string;
  termTenancy: string;
  numApplicants: string;
  [key: string]: any; // This allows for dynamic keys like 'adultName_0', 'minorName_1', etc.
}

interface FormContextType {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    applyAddress: '',
    possessionDate: '',
    termTenancy: '',
    numApplicants: '',
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
