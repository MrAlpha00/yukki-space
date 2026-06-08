"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";

export default function ThankYouPage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen py-20 px-6 md:px-20 z-[30] overflow-hidden">
      {/* Glowing Ambient Nebula Blobs */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-[#7042f8]/15 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[250px] h-[250px] bg-[#00f2fe]/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

      {/* Glassmorphic Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[600px] p-8 md:p-12 rounded-2xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md shadow-2xl shadow-[#2A0E61]/50 shadow-[inset_0_-7px_11px_#a48fff1f] flex flex-col items-center text-center gap-6"
      >
        {/* Glow effect border on hover */}
        <div className="absolute -inset-0.5 rounded-2xl bg-[#7042f8] opacity-5 blur transition duration-300 z-[-1]" />
        
        {/* Icon */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#7042f815] border border-[#7042f830] text-[#00f2fe] animate-pulse">
          <FaCheckCircle className="h-8 w-8 text-[#00f2fe]" />
        </div>

        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Transmission Received!
        </h1>

        <p className="text-[#b49bff] font-mono text-xs tracking-widest uppercase">
          Mission Control Status: Secure Connection
        </p>

        {/* Message */}
        <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-[450px]">
          Thank you for reaching out. Your message has traveled across the cosmic web and landed safely in my database. 
          <br /><br />
          I will review your message and respond shortly. Clear skies!
        </p>

        {/* Divider line */}
        <div className="border-t border-[#7042f830] w-full my-2" />

        {/* Back Button */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/"
            className="group flex items-center gap-3 py-3 px-8 text-center text-white cursor-pointer rounded-lg button-primary font-medium shadow-[0_0_15px_rgba(113,47,255,0.4)] hover:shadow-[0_0_25px_rgba(113,47,255,0.7)] transition-all duration-300"
          >
            <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1.5 transition duration-300" />
            <span>explore the space</span>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
