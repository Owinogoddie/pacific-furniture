'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

export default function PasswordRecoveryForm() {
  const supabase = createClientComponentClient()
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("You have successfully reset your password.")
        router.push("/account")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <form className="pass-rec-form" onSubmit={handleSubmit}>
      <div className="pass-rec-inner">
        <label>Type a new password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Your new password"
        />
        <button
          type="button"
          className="pass-rec-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
        <button className="pass-rec-sub" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}