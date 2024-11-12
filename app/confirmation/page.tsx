import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Email Confirmation | Modern Furniture Pacific',
}

export default function Confirmation() {
  return (
    <div className="confirmation-page">
      <h2>Thank you for signing up!</h2>
      <p>
        We&apos;ve sent a confirmation email to your email address. Please check
        your inbox and click on the confirmation link to complete the
        registration process.
      </p>
      <p>
        If you don&apos;t see the email in your inbox, please check your spam
        folder.
      </p>
      <p>
        Once you&apos;ve confirmed your email, you&apos;ll be able to log in and access
        all the features of Modern Furniture Pacific.
      </p>
      <p>Thank you for joining us!</p>
    </div>
  );
}
