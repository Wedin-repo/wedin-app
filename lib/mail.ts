import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVericationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/email-verify?token=${token}&email=${email}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify your email',
    html: `<p>Click the link below to verify your <a href="${confirmationLink}">email address</a></p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const passwordResetLink = `http://localhost:3000/new-password?token=${token}&email=${email}`;
  return passwordResetLink;

  // await resend.emails.send({
  //   from: 'onboarding@resend.dev',
  //   to: email,
  //   subject: 'Reset your email',
  //   html: `<p>Click the link below to reset your <a href="${passwordResetLink}">email address</a></p>`,
  // });
};
