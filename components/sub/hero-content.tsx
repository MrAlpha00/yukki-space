"use client";

import { useState, useEffect } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

const words = [
  "Software Engineer",
  "Full Stack Developer",
  "AI Developer",
  "Problem Solver",
  "Tech Enthusiast",
];

export const HeroContent = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[12px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5 flex-shrink-0" />
          <h1 className="Welcome-text text-[13px] flex items-center h-[20px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[wordIndex]}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 mt-6 text-6xl md:text-7xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span className="text-4xl md:text-5xl font-light text-gray-300">
            Hi, I&apos;m
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 leading-tight">
            Yuktha A R
          </span>
        </motion.div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-5 mt-8 w-full max-w-[500px]">
          <motion.a
            href="#projects"
            variants={slideInFromLeft(0.8)}
            className="py-3 px-6 text-center text-white cursor-pointer rounded-lg button-primary font-medium shadow-[0_0_15px_rgba(113,47,255,0.4)] hover:shadow-[0_0_25px_rgba(113,47,255,0.7)] transition-all duration-300 w-full sm:w-auto"
          >
            View My Work
          </motion.a>
          
          <motion.a
            href="/hire"
            variants={slideInFromLeft(1.0)}
            className="py-3 px-6 text-center text-white cursor-pointer rounded-lg border border-[#00f2fe]/40 bg-[#0300145e] backdrop-blur-md font-medium shadow-[0_0_15px_rgba(0,242,254,0.15)] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:border-[#00f2fe] transition-all duration-300 w-full sm:w-auto"
          >
            Hire Me
          </motion.a>
        </div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
};
