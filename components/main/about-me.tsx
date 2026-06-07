"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

export const AboutMe = () => {
  return (
    <section
      id="about-me"
      className="flex flex-col items-center justify-center min-h-[60vh] relative overflow-hidden py-20 px-6 md:px-20 z-[30]"
    >
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Side (50%) - Terminal/Window Style Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInFromLeft(0.3)}
          className="w-full md:w-1/2 flex flex-col justify-center"
        >
          {/* Terminal Card Container */}
          <div className="w-full rounded-2xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md shadow-lg shadow-[#2A0E61]/50 shadow-[inset_0_-7px_11px_#a48fff1f] overflow-hidden hover:border-[#9b7bf8] transition duration-300">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#7042f88b] bg-[#03001490]">
              {/* Three dots (red, yellow, green) */}
              <div className="flex items-center gap-2 w-16">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_#ff5f56] inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_#ffbd2e] inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_#27c93f] inline-block"></span>
              </div>
              
              {/* Title Text */}
              <div className="font-semibold text-sm tracking-widest text-[#b49bff] drop-shadow-[0_0_6px_#7042f8] select-none">
                ABOUT ME
              </div>
              
              {/* Balance spacer */}
              <div className="w-16"></div>
            </div>
            
            {/* Card Body */}
            <div className="p-8">
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                I am a Full Stack Developer passionate about building modern web applications, AI-powered tools, and innovative digital experiences. This content will be updated later.
              </p>
            </div>
            
          </div>
        </motion.div>

        {/* Right Side (50%) - Profile Image Frame */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInFromRight(0.3)}
          className="w-full md:w-1/2 flex justify-center items-center"
        >
          <div className="relative group cursor-pointer w-full max-w-[380px]">
            {/* Outer glowing ring background */}
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition duration-500"></div>
            
            {/* Frame container */}
            <div className="relative rounded-2xl bg-[#030014] border-2 border-[#7042f88b] overflow-hidden p-2 flex items-center justify-center">
              <Image
                src="/profile.png"
                alt="Profile Image"
                width={380}
                height={380}
                draggable={false}
                className="rounded-xl object-cover w-full h-auto aspect-square select-none filter brightness-95 group-hover:scale-[1.02] group-hover:brightness-105 transition duration-500"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
