// components/SubscribeForm.tsx
"use client";

import { useTranslation } from "@/i18n";
import { useState } from "react";

export default function SubscribeForm() {
  const { t } = useTranslation(["footer", "common"]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError(t("form_1", "common"));
      return;
    }

    try {
      const res = await fetch(
        "https://hook.eu2.make.com/6y83ud178dqxsbqfqstabkvyyaxhysbi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(t("form_2", "common"));
    }
  };

  return (
    <>
      <h5 className="mb-0">{t("newsletter_1", "footer")}</h5>
      <form onSubmit={handleSubmit} className="subscribe-form">
        <input
          type="email"
          className="form-control"
          placeholder={t("newsletter_3", "footer")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="btn">
          <span className="material-symbols-outlined">arrow_forward</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>

        {submitted && (
          <p className="text-green-600">
            {t("newsletter_1", "common")}
          </p>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </>
  );
}
