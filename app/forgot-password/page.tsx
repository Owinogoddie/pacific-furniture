import { Metadata } from 'next'
import ForgotPasswordForm from './ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Password reset | Modern Furniture Pacific',
}

export default function ForgotPasswordPage() {
  return (
    <div>
      <ForgotPasswordForm />
    </div>
  )
}