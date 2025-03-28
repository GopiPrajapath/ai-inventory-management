import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const loadTemplate = async (templateName, context) => {
  const filePath = path.join(process.cwd(), 'email-templates', `${templateName}.hbs`);
  const source = fs.readFileSync(filePath, 'utf8');
  const template = handlebars.compile(source);
  return template(context);
};

export const sendEmail = async ({ email, subject, template, context }) => {
  try {
    const html = await loadTemplate(template, context);

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: email,
      subject,
      html
    };

    if (process.env.NODE_ENV === 'production') {
      await transporter.sendMail(mailOptions);
    } else {
      console.log('Dev Mode - Email would be sent to:', email);
      console.log('Subject:', subject);
      console.log('Content:', html);
    }
  } catch (err) {
    console.error('Email sending error:', err);
    throw new Error('Failed to send email');
  }
};