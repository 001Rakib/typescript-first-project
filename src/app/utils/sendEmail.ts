import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'hasanaomit1234@gmail.com',
      pass: config.smtp_pass,
    },
  });
  await transporter.sendMail({
    from: '"PH University 👻" <hasanaomit1234@gmail.com>', // sender address
    to, // list of receivers
    subject: 'Password Reset Link', // Subject line
    text: 'Change your password from the link bellow ', // plain text body
    html, // html body
  });
};
