'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Log from "@/public/img/log.webp"
import { toast } from "sonner"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.warning(error.message)
      } else {
        toast.success(`Nice seeing you again`)
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <>
      <div className="sign-in-img">
        <Image src={Log} alt="Sign-img" placeholder="blur" priority />
      </div>
      <div className="sign-in-form">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
          />
          <label>Your email</label>
          <div className="pass-container">
            <input
              id="passwd"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
            />
            <label id="passwdLabel">Password</label>
            <button
              type="button"
              className="toggle-password-login"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            <div className="forgot">
              <Link href="/forgot-password">Forgot your password?</Link>
            </div>
          </div>
          <div className="sign-up-button">
            <p>
              Don&apos;t have an account? <br />
              <Link scroll={false} href="/signup">
                Sign up instead.
              </Link>
            </p>
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
    </>
  )
}