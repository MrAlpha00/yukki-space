"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import {
  FaBrain,
  FaBolt,
  FaMicrochip,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaLaptopCode,
  FaRocket,
  FaWhatsapp,
  FaLinkedin,
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import { Turnstile } from "@/components/sub/turnstile";

// Counter Helper Component
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 2000; // 2 seconds
    const incrementTime = Math.max(Math.floor(duration / end), 15);

    const timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-mono text-4xl md:text-5xl font-bold text-[#00f2fe] drop-shadow-[0_0_8px_#00f2fe]">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const terminalLines = [
  "MISSION CONTROL ONLINE",
  "SCANNING DEVELOPER PROFILE...",
  "LOADING EXPERIENCE...",
  "LOADING PROJECTS...",
  "CHECKING AVAILABILITY...",
  "STATUS: AVAILABLE FOR HIRE",
];

export default function HirePage() {
  // Loading Terminal state
  const [loading, setLoading] = useState(true);
  const [printedLines, setPrintedLines] = useState<string[]>([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < terminalLines.length) {
        setPrintedLines((prev) => [...prev, terminalLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" }[]>([]);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const addToast = (msg: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

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
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTurnstileToken("");
    } catch (err: any) {
      addToast(err.message || "Failed to send message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen text-white bg-transparent overflow-x-hidden">
      
      {/* Background Video 1: Blackhole behind Hero Command Center */}
      <div className="absolute top-0 left-0 w-full h-[100vh] -z-20 overflow-hidden opacity-80">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover"
        >
          <source src="/videos/blackhole.webm" type="video/webm" />
        </video>
      </div>

      {/* Background Video 2: Skills particles behind Why Hire Me, Statistics & Tech Arsenal */}
      <div className="absolute top-[90vh] left-0 w-full h-[240vh] -z-20 overflow-hidden opacity-25">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/skills-bg.webm" type="video/webm" />
        </video>
      </div>

      {/* Background Video 3: Encryption lines behind Launch Timeline & Contact Command Center */}
      <div className="absolute bottom-0 left-0 w-full h-[220vh] -z-20 overflow-hidden opacity-15">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>

      {/* Glowing Ambient Nebula Blobs */}
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-[#7042f8]/15 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[35%] left-[10%] w-[350px] h-[350px] bg-[#00f2fe]/10 blur-[130px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[55%] right-[5%] w-[450px] h-[450px] bg-[#7042f8]/10 blur-[140px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[75%] left-[20%] w-[500px] h-[250px] bg-gradient-to-r from-purple-500/8 to-cyan-500/8 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[#7042f8]/12 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-[5%] left-[5%] w-[350px] h-[350px] bg-[#00f2fe]/8 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <AnimatePresence mode="wait">
        {loading ? (
          /* Opening Animation Terminal Screen */
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030014] px-6"
          >
            <div className="w-full max-w-[500px] p-8 rounded-2xl border border-[#7042f88b] bg-[#030014d0] backdrop-blur-md shadow-2xl shadow-[#2A0E61]/40 font-mono flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-[#7042f850] pb-4 mb-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                <span className="text-xs text-gray-500 ml-4 font-semibold">MISSION_CONTROL_BOOT.sh</span>
              </div>
              <div className="flex flex-col gap-2.5 min-h-[160px]">
                {printedLines.map((line, idx) => (
                  <div key={idx} className="text-green-400 text-sm md:text-base leading-relaxed tracking-wide">
                    &gt; {line}
                    {idx === printedLines.length - 1 && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                        className="ml-1 inline-block w-2 h-4 bg-green-400 align-middle"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Main Dashboard Content */
          <motion.main
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col pt-[80px]"
          >
            {/* Section 1 - Hero Command Center */}
            <section className="min-h-[90vh] flex items-center px-6 md:px-20 py-16">
              <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
                
                {/* Left Side */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInFromLeft(0.3)}
                  className="w-full lg:w-1/2 flex flex-col gap-6"
                >
                  <div className="Welcome-box py-[6px] px-[12px] border border-[#7042f88b] opacity-[0.9]">
                    <h1 className="Welcome-text text-xs tracking-wider">AVAILABLE FOR OPPORTUNITIES</h1>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white">
                    Let&apos;s Build Something<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                      Extraordinary.
                    </span>
                  </h2>

                  <p className="text-[#b49bff] font-mono text-sm tracking-widest uppercase">
                    Software Engineer • Full Stack Developer • AI Developer
                  </p>

                  <div className="flex flex-wrap gap-4 mt-2">
                    {["Open to Internships", "Open to Freelance Projects", "Open to Full-Time Roles", "Open to Collaborations"].map((status) => (
                      <span
                        key={status}
                        className="text-xs font-mono font-medium text-gray-300 px-3 py-1.5 rounded-full border border-purple-500/20 bg-[#7042f810] shadow-[0_0_10px_rgba(112,66,248,0.1)]"
                      >
                        ⚡ {status}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 mt-6 w-full">
                    <Link
                      href="/#projects"
                      className="py-3 px-6 text-center text-white cursor-pointer rounded-lg button-primary font-medium shadow-[0_0_15px_rgba(113,47,255,0.4)] hover:shadow-[0_0_25px_rgba(113,47,255,0.7)] transition-all duration-300 w-full sm:w-auto"
                    >
                      View Projects
                    </Link>
                    <a
                      href="#hire-contact"
                      className="py-3 px-6 text-center text-white cursor-pointer rounded-lg border border-[#00f2fe]/40 bg-[#0300145e] backdrop-blur-md font-medium shadow-[0_0_15px_rgba(0,242,254,0.15)] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:border-[#00f2fe] transition-all duration-300 w-full sm:w-auto"
                    >
                      Contact Me
                    </a>
                    <a
                      href="/resume.pdf"
                      download
                      className="py-3 px-6 text-center text-white cursor-pointer rounded-lg border border-purple-500/40 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 font-medium shadow-[0_0_15px_rgba(112,66,248,0.2)] hover:shadow-[0_0_25px_rgba(112,66,248,0.5)] hover:border-purple-500 transition-all duration-300 w-full sm:w-auto"
                    >
                      Download Resume
                    </a>
                  </div>
                </motion.div>

                {/* Right Side - Holographic profile card */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideInFromRight(0.3)}
                  className="w-full lg:w-1/2 flex justify-center items-center"
                >
                  <div className="relative w-full max-w-[380px] group">
                    <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition duration-500"></div>
                    <div className="relative rounded-2xl bg-[#030014]/90 border-2 border-[#7042f88b] p-8 flex flex-col items-center gap-6 shadow-2xl backdrop-blur-md">
                      <div className="relative w-32 h-32 rounded-full border-2 border-[#00f2fe] p-1 overflow-hidden shadow-[0_0_20px_#00f2fe]">
                        <Image
                          src="/profile.png"
                          alt="Hologram Profile"
                          width={128}
                          height={128}
                          className="rounded-full object-cover select-none filter brightness-95"
                          draggable={false}
                        />
                      </div>
                      
                      <div className="text-center flex flex-col gap-1.5">
                        <h3 className="text-2xl font-bold text-white tracking-wide">Yuktha A R</h3>
                        <p className="text-[#00f2fe] font-mono text-sm tracking-wider font-light">Software Engineer</p>
                        <p className="text-gray-400 text-xs flex items-center justify-center gap-1.5 mt-1 font-light">
                          <FaMapMarkerAlt className="text-purple-500" /> Bengaluru, India
                        </p>
                      </div>

                      <div className="border-t border-[#7042f830] w-full pt-4 flex flex-col gap-3 font-mono text-xs">
                        <div className="flex justify-between items-center text-gray-300">
                          <span>SYSTEM STATUS:</span>
                          <span className="text-green-400 font-semibold flex items-center gap-1.5 animate-pulse">
                            🟢 AVAILABLE FOR WORK
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-gray-400">
                          <span>SECURE_LINK:</span>
                          <span className="text-[#b49bff]">ONLINE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </section>

            {/* Section 2 - Why Hire Me */}
            <section className="px-6 md:px-20 py-20 bg-[#03001427] relative z-[10]">
              <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <div className="text-center flex flex-col gap-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    Why Hire Me
                  </h2>
                  <p className="text-gray-400 text-lg max-w-[600px] mx-auto font-light leading-relaxed">
                    Bringing mission-critical capability, modern tech, and accelerated development to your team.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      title: "Problem Solver",
                      desc: "Translating complex functional requirements into clean, performant, and scalable technical architectures.",
                      icon: FaBrain,
                      color: "hover:border-purple-500 hover:shadow-purple-500/20",
                    },
                    {
                      title: "Fast Learner",
                      desc: "Adapting instantly to new stacks, APIs, and business logic paradigms with speed and agility.",
                      icon: FaBolt,
                      color: "hover:border-cyan-500 hover:shadow-cyan-500/20",
                    },
                    {
                      title: "AI Integration",
                      desc: "Leveraging state-of-the-art LLMs, agents, embeddings, and prompt engineering to automate workflows.",
                      icon: FaMicrochip,
                      color: "hover:border-indigo-500 hover:shadow-indigo-500/20",
                    },
                    {
                      title: "Full Stack Development",
                      desc: "Constructing robust systems across modern UI structures down to optimized query structures.",
                      icon: FaCode,
                      color: "hover:border-violet-500 hover:shadow-violet-500/20",
                    },
                  ].map((panel) => {
                    const Icon = panel.icon;
                    return (
                      <div
                        key={panel.title}
                        className={`flex flex-col gap-4 p-8 rounded-2xl border border-[#7042f835] bg-[#03001460] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] ${panel.color} shadow-lg`}
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#7042f815] border border-[#7042f830]">
                          <Icon className="h-6 w-6 text-[#00f2fe]" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{panel.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">{panel.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Section 3 - Mission Statistics Dashboard */}
            <section className="px-6 md:px-20 py-20 bg-[#03001450] relative z-[10]">
              <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                  Mission Statistics Dashboard
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {[
                    { label: "Projects Completed", value: 15, suffix: "+" },
                    { label: "Technologies Used", value: 24, suffix: "+" },
                    { label: "GitHub Contributions", value: 1200, suffix: "+" },
                    { label: "Certifications", value: 8, suffix: "" },
                    { label: "Years of Learning", value: 4, suffix: "+" },
                    { label: "Internship Experience", value: 2, suffix: "" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-6 rounded-2xl border border-[#7042f830] bg-[#03001470] backdrop-blur-md shadow-md text-center flex flex-col gap-3 justify-center items-center hover:border-[#00f2fe]/50 transition duration-300"
                    >
                      <Counter value={stat.value} suffix={stat.suffix} />
                      <span className="text-gray-400 text-xs font-mono font-light tracking-wide uppercase leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 4 - Tech Arsenal */}
            <section className="px-6 md:px-20 py-20 relative z-[10]">
              <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <div className="text-center flex flex-col gap-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    Tech Arsenal
                  </h2>
                  <p className="text-gray-400 text-lg max-w-[600px] mx-auto font-light leading-relaxed">
                    Deploying standard libraries, frameworks, and modern developer environments.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { category: "Frontend", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"] },
                    { category: "Backend", tools: ["Node.js", "Express.js", "Python", "Go"] },
                    { category: "Database", tools: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Prisma"] },
                    { category: "AI", tools: ["OpenAI API", "LangChain", "TensorFlow", "Prompt Engineering"] },
                    { category: "Cloud", tools: ["Vercel", "AWS", "Docker", "Netlify"] },
                    { category: "Tools", tools: ["Git", "GitHub", "Figma", "VS Code", "Postman"] },
                  ].map((group) => (
                    <div
                      key={group.category}
                      className="p-8 rounded-2xl border border-[#7042f835] bg-[#03001470] backdrop-blur-md shadow-lg flex flex-col gap-5 hover:border-[#9b7bf8]/50 transition duration-300"
                    >
                      <h3 className="text-lg font-bold text-[#b49bff] font-mono tracking-widest uppercase">
                        {group.category}
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {group.tools.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs text-gray-300 font-medium px-3.5 py-2 rounded-lg border border-[#7042f830] bg-[#7042f810] shadow-[inset_0_-2px_6px_rgba(112,66,248,0.1)] hover:border-[#00f2fe]/60 hover:text-[#00f2fe] transition duration-300 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 5 - Opportunities & Engagement Models */}
            <section className="px-6 md:px-20 py-20 bg-[#03001430] relative z-[10]">
              <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <div className="text-center flex flex-col gap-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    Opportunities & Engagement Models
                  </h2>
                  <p className="text-gray-400 text-lg max-w-[600px] mx-auto font-light leading-relaxed">
                    Designed to collaborate smoothly under multiple flexible framework parameters.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Internship Opportunities",
                      desc: "Open to learning-driven roles to apply modern engineer tools to solve critical challenges.",
                      status: "🟢 OPEN TO INTERNSHIPS",
                      collab: "Full-Time / Remote / Hybrid",
                      border: "hover:border-green-500/50 hover:shadow-green-500/10",
                    },
                    {
                      title: "Freelance Projects",
                      desc: "Providing bespoke websites, SaaS models, customized AI automation, and interactive dashboards.",
                      status: "🟢 OPEN TO PROJECTS",
                      collab: "Milestone Contract basis",
                      border: "hover:border-purple-500/50 hover:shadow-purple-500/10",
                    },
                    {
                      title: "Full-Time Roles",
                      desc: "Interested in contributing to dedicated product engineering squads and full-time vacancies.",
                      status: "🟢 OPEN TO OFFERS",
                      collab: "Flexible Hybrid / On-Site",
                      border: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className={`p-8 rounded-2xl border border-[#7042f835] bg-[#03001470] backdrop-blur-md shadow-lg flex flex-col justify-between gap-6 transition-all duration-300 hover:scale-[1.02] ${card.border}`}
                    >
                      <div className="flex flex-col gap-4">
                        <span className="font-mono text-xs font-semibold text-green-400 tracking-wider">
                          {card.status}
                        </span>
                        <h3 className="text-xl font-bold text-white">{card.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">{card.desc}</p>
                      </div>

                      <div className="flex flex-col gap-4 border-t border-[#7042f830] pt-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-gray-500 font-mono">COLLABORATION MODE:</span>
                          <span className="text-gray-300 text-xs font-mono">{card.collab}</span>
                        </div>
                        <a
                          href="#hire-contact"
                          className="py-2.5 px-4 text-center text-xs font-medium text-white button-primary rounded-lg shadow-md mt-2"
                        >
                          Contact Me
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 6 - Mission Launch Timeline */}
            <section className="px-6 md:px-20 py-20 relative z-[10]">
              <div className="max-w-3xl mx-auto flex flex-col gap-12">
                <div className="text-center flex flex-col gap-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    Mission Launch Timeline
                  </h2>
                  <p className="text-gray-400 text-lg font-light leading-relaxed">
                    Checklist progression mapped similarly to a spacecraft launch sequence.
                  </p>
                </div>

                <div className="relative border-l border-[#7042f850] ml-4 md:ml-32 py-8 flex flex-col gap-12">
                  {[
                    { step: "T-01", title: "Initial Discussion", desc: "Aligning on goals, scope, capabilities, and mutual chemistry." },
                    { step: "T-02", title: "Requirement Analysis", desc: "Breaking down feature needs, functional parameters, and tech stacks." },
                    { step: "T-03", title: "Planning & Architecture", desc: "Detailing component layouts, system boundaries, database designs, and deadlines." },
                    { step: "T-04", title: "Development", desc: "Writing modular, performant code backed by consistent Git progressions." },
                    { step: "T-05", title: "Testing & Optimization", desc: "Rigorous debugging, linter validation, responsiveness checks, and speedups." },
                    { step: "T-06", title: "Deployment & Delivery", desc: "Final checklist clearance, server launch, handovers, and scaling monitoring." },
                  ].map((item, idx) => (
                    <div key={item.title} className="relative pl-10 group">
                      {/* Timeline dot */}
                      <div className="absolute left-[-9px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-[#00f2fe] bg-[#030014] shadow-[0_0_8px_#00f2fe] group-hover:scale-125 transition duration-300 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                      </div>

                      {/* Timeline content */}
                      <div className="flex flex-col gap-2 p-6 rounded-2xl border border-[#7042f830] bg-[#03001480] backdrop-blur-md hover:border-[#9b7bf8]/50 transition duration-300">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#00f2fe] bg-[#00f2fe]/10 px-2.5 py-1 rounded">
                            {item.step}
                          </span>
                          <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed font-light mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 7 - Contact Command Center */}
            <section id="hire-contact" className="px-6 md:px-20 py-20 bg-[#03001440] relative z-[10]">
              <div className="max-w-7xl mx-auto flex flex-col gap-12">
                <div className="text-center flex flex-col gap-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    Ready To Start A Project?
                  </h2>
                  <p className="text-gray-400 text-lg max-w-[600px] mx-auto font-light leading-relaxed">
                    Clear the dashboard and launch communication controls below.
                  </p>
                </div>

                <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-12">
                  {/* Left Side - Contact cards */}
                  <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { name: "Email", display: "your-email@example.com", icon: FaEnvelope, text: "Send Email", link: "mailto:your-email@example.com", color: "from-blue-600/30 to-purple-600/10", shadow: "shadow-blue-500/20" },
                      { name: "WhatsApp", display: "+1 (555) 000-0000", icon: FaWhatsapp, text: "Message", link: "https://wa.me/15550000000", color: "from-green-600/30 to-emerald-600/10", shadow: "shadow-green-500/20" },
                      { name: "LinkedIn", display: "linkedin-username", icon: FaLinkedin, text: "Visit Profile", link: "https://linkedin.com/in/linkedin-username", color: "from-sky-600/30 to-blue-600/10", shadow: "shadow-sky-500/20" },
                      { name: "Discord", display: "discord_username", icon: FaDiscord, text: "Open Discord", link: "https://discord.com/users/discord_username", color: "from-indigo-600/30 to-violet-600/10", shadow: "shadow-indigo-500/20" },
                      { name: "GitHub", display: "github-username", icon: FaGithub, text: "View GitHub", link: "https://github.com/github-username", color: "from-gray-600/30 to-slate-600/10", shadow: "shadow-gray-500/20" },
                      { name: "Instagram", display: "instagram_username", icon: FaInstagram, text: "View Profile", link: "https://instagram.com/instagram_username", color: "from-pink-600/30 to-rose-600/10", shadow: "shadow-pink-500/20" },
                    ].map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <a
                          key={platform.name}
                          href={platform.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          className={`relative group flex flex-col justify-between p-6 rounded-2xl border border-[#7042f840] bg-gradient-to-br ${platform.color} backdrop-blur-md shadow-lg ${platform.shadow} hover:border-[#9b7bf8] hover:scale-[1.03] transition-all duration-300`}
                        >
                          <div className="absolute -inset-0.5 rounded-2xl bg-[#7042f8] opacity-0 group-hover:opacity-10 blur transition duration-300 z-[-1]" />
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[#b49bff] font-semibold text-lg">{platform.name}</span>
                              <Icon className="h-6 w-6 text-[#00f2fe] group-hover:scale-110 transition duration-300" />
                            </div>
                            <p className="text-gray-300 text-sm font-light truncate max-w-[200px]">{platform.display}</p>
                          </div>
                          <div className="mt-6">
                            <span className="inline-block py-2 px-4 text-xs font-medium text-white button-primary rounded-lg shadow-md">
                              {platform.text}
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  {/* Right Side - Form */}
                  <div className="w-full lg:w-1/2 flex">
                    <form
                      onSubmit={handleSubmit}
                      className="w-full flex flex-col justify-between p-8 rounded-2xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md shadow-lg shadow-[#2A0E61]/50 shadow-[inset_0_-7px_11px_#a48fff1f] hover:border-[#9b7bf8] transition duration-300 gap-6"
                    >
                      <div className="flex flex-col gap-2">
                        <label htmlFor="hire-subject" className="text-sm font-medium text-gray-300">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="hire-subject"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Project Discussion"
                          className="w-full px-4 py-3 rounded-lg border border-[#7042f840] bg-[#03001480] text-white focus:outline-none focus:border-[#00f2fe] transition duration-300"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="hire-name" className="text-sm font-medium text-gray-300">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="hire-name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-4 py-3 rounded-lg border border-[#7042f840] bg-[#03001480] text-white focus:outline-none focus:border-[#00f2fe] transition duration-300"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="hire-email" className="text-sm font-medium text-gray-300">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="hire-email"
                          required
                          value={email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          placeholder="recruiter@company.com"
                          className={`w-full px-4 py-3 rounded-lg border bg-[#03001480] text-white focus:outline-none transition duration-300 ${
                            emailError ? "border-red-500/80 focus:border-red-500" : "border-[#7042f840] focus:border-[#00f2fe]"
                          }`}
                        />
                        {emailError && (
                          <span className="text-xs text-red-500 font-light mt-1">{emailError}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="hire-message" className="text-sm font-medium text-gray-300">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="hire-message"
                          required
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Hello Yuktha, I would like to discuss..."
                          className="w-full px-4 py-3 rounded-lg border border-[#7042f840] bg-[#03001480] text-white focus:outline-none focus:border-[#00f2fe] transition duration-300 resize-none"
                        />
                      </div>

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

                      <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="w-full py-3 px-6 text-center text-white cursor-pointer rounded-lg button-primary font-medium shadow-[0_0_15px_rgba(113,47,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none hover:shadow-[0_0_25px_rgba(113,47,255,0.6)] transition-all duration-300"
                      >
                        {isSubmitting ? "Sending..." : "Submit Mission"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Floating Toasts */}
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
    </div>
  );
}
