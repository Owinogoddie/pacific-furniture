'use client'

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

export default function ForgotPasswordForm() {
  const [resetSuccessful, setResetSuccessful] = useState(false)
  const supabase = createClientComponentClient()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/password-recovery`
      })
      
      if (error) {
        toast.error(error.message)
      } else {
        setResetSuccessful(true)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <>
      {resetSuccessful ? (
        <div className="pass-rec">
          <label>Check your email for the recovery link!</label>
        </div>
      ) : (
        <form className="pass-rec" onSubmit={handleSubmit}>
          <label>
            Forgot your password? No worries! Simply type in your email, and
            we will send you a reset link.
          </label>
          <input type="text" name="email" placeholder="Email" />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  )
}