// src/components/Esignup.tsx
'use client';

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

// Types
interface SubscriptionState {
  subType: string[];
}

interface SubscriptionData {
  id: string;
  offers: boolean;
  events: boolean;
  discounts: boolean;
}

interface CheckboxOption {
  value: string;
  label: string;
}

export default function Esignup() {
  // State
  const [email, setEmail] = useState<string>("");
  const [sub, setSub] = useState<SubscriptionState>({
    subType: ["offers", "events", "discounts"],
  });

  // Checkbox options
  const checkboxOptions: CheckboxOption[] = [
    { value: "offers", label: "Exclusive offers" },
    { value: "events", label: "Free events" },
    { value: "discounts", label: "Large discounts" },
  ];

  // Handlers
  const handleSub = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    setSub((prevSub) => ({
      subType: checked
        ? [...prevSub.subType, value]
        : prevSub.subType.filter((e) => e !== value),
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleSignUp = async (): Promise<void> => {
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (sub.subType.length === 0) {
      toast.error("Please select at least one subscription type.");
      return;
    }

    try {
      const subscriptionData: SubscriptionData = {
        id: email,
        offers: sub.subType.includes("offers"),
        events: sub.subType.includes("events"),
        discounts: sub.subType.includes("discounts"),
      };

      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([subscriptionData]),
      });

      if (response.ok) {
        toast.success("Subscription successful!");
        setEmail(""); // Clear email after successful subscription
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="email-signup">
      <Image
        id="signup-image"
        src="/img/signup.webp"
        alt="signup promotional image"
        width={1200}  // Adjust based on your image
        height={800}  // Adjust based on your image
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."  // Add your blur data URL
        priority
      />

      <div className="signup-content">
        <h2 className="join-the-club">Join the club and get the benefits</h2>
        
        <p className="newsletter">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </p>

        <div className="email-checkbox">
          {checkboxOptions.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                onChange={handleSub}
                name="subscribe"
                value={option.value}
                className="checkbox"
                defaultChecked
              />
              {option.label}
            </label>
          ))}
        </div>

        <div className="email-input">
          <input
            id="email"
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setEmail(e.target.value)}
            value={email}
            placeholder="your@email.com"
            aria-label="Email address"
          />
          <button 
            onClick={handleSignUp}
            id="signupBtn"
            aria-label="Sign up for newsletter"
          >
            Sign up
          </button>
        </div>
      </div>
    </section>
  );
}