import { Metadata } from 'next'
import PasswordRecoveryForm from './PasswordRecoveryForm'

export const metadata: Metadata = {
  title: 'Password reset | Modern Furniture Pacific',
}

export default function PasswordRecoveryPage() {
  return (
    <div>
      <PasswordRecoveryForm />
    </div>
  )
}