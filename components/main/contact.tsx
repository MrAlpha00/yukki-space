"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaLinkedin,
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

import { slideInFromLeft, slideInFromRight } from "@/lib/motion";
import { Turnstile } from "@/components/sub/turnstile";

interface ToastType {
  id: number;
  message: string;
  type: "success" | "error";
}

const contactPlatforms = [
  {
    name: "Email",
    display: "yukthaaryukthaar@gmail.com",
    icon: FaEnvelope,
    buttonText: "Send Email",
    link: "mailto:yukthaaryukthaar@gmail.com",
    color: "from-blue-600/30 to-purple-600/10",
    shadow: "shadow-blue-500/20",
  },
  {
    name: "WhatsApp",
    display: "+91 7353299377",
    icon: FaWhatsapp,
    buttonText: "Message",
    link: "https://wa.me/917353299377",
    color: "from-green-600/30 to-emerald-600/10",
    shadow: "shadow-green-500/20",
  },
  {
    name: "LinkedIn",
    display: "Yukthaar28",
    icon: FaLinkedin,
    buttonText: "Visit Profile",
    link: "https://linkedin.com/in/Yukthaar28",
    color: "from-sky-600/30 to-blue-600/10",
    shadow: "shadow-sky-500/20",
  },
  {
    name: "Discord",
    display: "YukthaAr28",
    icon: FaDiscord,
    buttonText: "Open Discord",
    link: "https://discord.com/users/YukthaAr28",
    color: "from-indigo-600/30 to-violet-600/10",
    shadow: "shadow-indigo-500/20",
  },
  {
    name: "GitHub",
    display: "YukthaAr28",
    icon: FaGithub,
    buttonText: "View GitHub",
    link: "https://github.com/YukthaAr28",
    color: "from-gray-600/30 to-slate-600/10",
    shadow: "shadow-gray-500/20",
  },
  {
    name: "Instagram",
    display: "sharmikrishna_28_",
    icon: FaInstagram,
    buttonText: "View Profile",
    link: "https://instagram.com/sharmikrishna_28_",
    color: "from-pink-600/30 to-rose-600/10",
    shadow: "shadow-pink-500/20",
  },
];

export const Contact = () => {
  const router = useRouter();
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toasts state
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const addToast = (msg: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Live email validation
  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (val.trim() === "") {
      setEmailError(null);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(null);
    }
  };

  // Form submission check
  const isFormValid =
    name.trim() !== "" &&
    subject.trim() !== "" &&
    message.trim() !== "" &&
    email.trim() !== "" &&
    emailError === null &&
    (turnstileSiteKey === "" || turnstileToken !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      addToast("Message sent successfully.", "success");
      
      // Clear inputs
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTurnstileToken("");

      // Redirect to thank you page
      router.push("/thank-you");
    } catch (err: any) {
      addToast(err.message || "Failed to send message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden py-20 px-6 md:px-20 z-[30]"
    >
      {/* Title */}
      <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10 text-center">
        Contact Me
      </h2>

      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-stretch justify-between gap-12">
        {/* Left Side (50%) - Contact Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInFromLeft(0.3)}
          className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {contactPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noreferrer noopener"
                className={`relative group flex flex-col justify-between p-6 rounded-2xl border border-[#7042f840] bg-gradient-to-br ${platform.color} backdrop-blur-md shadow-lg ${platform.shadow} hover:border-[#9b7bf8] hover:scale-[1.03] transition-all duration-300`}
              >
                {/* Glowing Aura Effect */}
                <div className="absolute -inset-0.5 rounded-2xl bg-[#7042f8] opacity-0 group-hover:opacity-10 blur transition duration-300 z-[-1]" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#b49bff] font-semibold text-lg">{platform.name}</span>
                    <Icon className="h-6 w-6 text-[#00f2fe] group-hover:scale-110 transition duration-300" />
                  </div>
                  <p className="text-gray-300 text-sm font-light truncate max-w-[200px]">
                    {platform.display}
                  </p>
                </div>

                <div className="mt-6">
                  <span className="inline-block py-2 px-4 text-xs font-medium text-white button-primary rounded-lg shadow-md">
                    {platform.buttonText}
                  </span>
                </div>
              </a>
            );
          })}
        </motion.div>

        {/* Right Side (50%) - Glassmorphism Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={slideInFromRight(0.3)}
          className="w-full lg:w-1/2 flex"
        >
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-between p-8 rounded-2xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md shadow-lg shadow-[#2A0E61]/50 shadow-[inset_0_-7px_11px_#a48fff1f] hover:border-[#9b7bf8] transition duration-300 gap-6"
          >
            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="How can I help you?"
                className="w-full px-4 py-3 rounded-lg border border-[#7042f840] bg-[#03001480] text-white focus:outline-none focus:border-[#00f2fe] transition duration-300"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Yuktha A R"
                className="w-full px-4 py-3 rounded-lg border border-[#7042f840] bg-[#03001480] text-white focus:outline-none focus:border-[#00f2fe] transition duration-300"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="yuktha@example.com"
                className={`w-full px-4 py-3 rounded-lg border bg-[#03001480] text-white focus:outline-none transition duration-300 ${
                  emailError ? "border-red-500/80 focus:border-red-500" : "border-[#7042f840] focus:border-[#00f2fe]"
                }`}
              />
              {emailError && (
                <span className="text-xs text-red-500 font-light mt-1">{emailError}</span>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message goes here..."
                className="w-full px-4 py-3 rounded-lg border border-[#7042f840] bg-[#03001480] text-white focus:outline-none focus:border-[#00f2fe] transition duration-300 resize-none"
              />
            </div>

            {/* Cloudflare Turnstile */}
            {turnstileSiteKey ? (
              <Turnstile
                siteKey={turnstileSiteKey}
                onVerify={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken("")}
              />
            ) : (
              <div className="text-[11px] text-[#00f2fe]/75 border border-[#00f2fe]/20 rounded-lg p-3 bg-[#0300145e]">
                💡 Turnstile simulated. Define NEXT_PUBLIC_TURNSTILE_SITE_KEY to enable Cloudflare verification.
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full py-3 px-6 text-center text-white cursor-pointer rounded-lg button-primary font-medium shadow-[0_0_15px_rgba(113,47,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none hover:shadow-[0_0_25px_rgba(113,47,255,0.6)] transition-all duration-300"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-md shadow-lg ${
                toast.type === "success"
                  ? "border-green-500/50 bg-[#030014d0] shadow-green-500/20 text-green-300"
                  : "border-red-500/50 bg-[#030014d0] shadow-red-500/20 text-red-300"
              }`}
            >
              {toast.type === "success" ? (
                <span className="text-xl">✔</span>
              ) : (
                <span className="text-xl">❌</span>
              )}
              <span className="text-sm font-medium">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
