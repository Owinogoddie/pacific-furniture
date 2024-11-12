"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import Log from "@/public/img/log.webp";

const passwordConditions = {
  minLength: 8,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasDigit: /\d/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>+-]/,
  hasNoSpaces: /^\S+$/,
};

function validatePassword(password: string): boolean {
  return (
    password.length >= passwordConditions.minLength &&
    passwordConditions.hasUppercase.test(password) &&
    passwordConditions.hasLowercase.test(password) &&
    passwordConditions.hasDigit.test(password) &&
    passwordConditions.hasSpecialChar.test(password) &&
    passwordConditions.hasNoSpaces.test(password)
  );
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordFocused(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;

    if (!validatePassword(password)) {
      toast.error("Password does not meet the required conditions.");
      return;
    }

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (isValidEmail(email)) {
      try {
        console.log("Attempting signup with:", email); // Debug log
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: `${firstName} ${lastName}`,
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
          },
        });

        if (error) {
          console.error("Signup error:", error); // Debug log
          toast.error(error.message);
        } else if (data.user) {
          console.log("Signup successful:", data.user); // Debug log

          // Create cookies record for the user
          const { error: cookieError } = await supabase.from("cookies").insert([
            {
              id: data.user.id,
              cart: [],
            },
          ]);

          if (cookieError) {
            console.error("Cookie creation error:", cookieError); // Debug log
            // Don't return here, still allow signup to complete
          }

          router.push("/confirmation");
        }
      } catch (error) {
        console.error("Unexpected error:", error); // Debug log
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    } else {
      toast.warning("Invalid email format.");
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(false);
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-img">
        <Image src={Log} alt="Sign-img" placeholder="blur" priority />
      </div>
      <div className="sign-in-form">
        <form onSubmit={handleSubmit}>
          <div className="sign-in-name">
            <input
              type="text"
              name="first-name"
              placeholder="First Name"
              required
            />
            <label id="nameLabel">First Name</label>
            <input
              id="lastName"
              type="text"
              name="last-name"
              placeholder="Last Name"
              required
            />
            <label id="lastLabel">Last Name</label>
          </div>
          <div className="sign-in-email">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
            <label>Your email</label>
            <div className="pass-container">
              <input
                id="signpass"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                required
              />
              <label id="signLabel">Password</label>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <ul
              className={`password-conditions ${
                isPasswordFocused || validatePassword(password) ? "active" : ""
              }`}
            >
              <li
                style={{
                  color:
                    password.length >= passwordConditions.minLength
                      ? "green"
                      : "red",
                }}
              >
                At least {passwordConditions.minLength} characters
              </li>
              <li
                style={{
                  color: passwordConditions.hasUppercase.test(password)
                    ? "green"
                    : "red",
                }}
              >
                Contains at least one uppercase letter
              </li>
              <li
                style={{
                  color: passwordConditions.hasLowercase.test(password)
                    ? "green"
                    : "red",
                }}
              >
                Contains at least one lowercase letter
              </li>
              <li
                style={{
                  color: passwordConditions.hasDigit.test(password)
                    ? "green"
                    : "red",
                }}
              >
                Contains at least one digit
              </li>
              <li
                style={{
                  color: passwordConditions.hasSpecialChar.test(password)
                    ? "green"
                    : "red",
                }}
              >
                Contains at least one special character
              </li>
              <li
                style={{
                  color: passwordConditions.hasNoSpaces.test(password)
                    ? "green"
                    : "red",
                }}
              >
                Contains no spaces
              </li>
            </ul>
          </div>
          <div className="sign-up-button">
            <p>
              Have an account? <br /> <Link href="/login">Log in instead.</Link>
            </p>
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
