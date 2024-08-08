// src/app/api/sendEmail/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io', // Your SMTP server host
  port: 2525, // Your SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: '652a94d64d9f5d', // Your email address
    pass: '4800917fa6a46c', // Your email password
  },
});

const sendEmail = async (formData: any) => {
  try {
    console.log('Sending email with formData:', formData);

    const formDataHtml = `
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 8px; border: 1px solid #ddd;">Field</th>
          <th style="padding: 8px; border: 1px solid #ddd;">Value</th>
        </tr>
        ${Object.entries(formData).map(([key, value]) => `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${key}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${value}</td>
          </tr>
        `).join('')}
      </table>
    `;

    await transporter.sendMail({
      from: 'homeapplicationform@gmail.com',
      to: 'homeapplicationform@gmail.com',
      subject: 'New Form Submission',
      html: `
        <h1>New Form Submission</h1>
        <p>Form data:</p>
        ${formDataHtml}
      `,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

export const POST = async (req: NextRequest) => {
  if (req.method === 'POST') {
    const formData = await req.json();
    console.log('FormData received in API route:', formData);

    try {
      await sendEmail(formData);
      return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error: any) {
      console.error('Error in API route:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
  }
};

export const GET = async () => {
  return NextResponse.json({ message: 'This is the sendEmail API route and it is working!' });
};



