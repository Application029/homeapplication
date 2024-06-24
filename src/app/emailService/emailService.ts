// src/app/emailService/emailService.ts
import axios from 'axios';

export const sendEmail = async (formData: any) => {
  try {
    const { frontID, backID, signature, ...data } = formData;

    const formDataToSend = {
      ...data,
      frontID: frontID?.name,
      backID: backID?.name,
      signature: signature?.name
    };

    console.log('Sending email with formData:', formDataToSend);

    const response = await axios.post('/api/sendEmail', formDataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Email sent successfully');
    } else {
      throw new Error(`Failed to send email: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error sending email:', error.response?.data || error.message);
      throw new Error(`Failed to send email: ${JSON.stringify(error.response?.data || error.message)}`);
    } else {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};
