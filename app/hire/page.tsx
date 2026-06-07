import Link from "next/link";

export default function HirePage() {
  return (
    <main className="h-full w-full flex flex-col items-center justify-center min-h-screen px-4 md:px-20 py-40 relative z-[20]">
      <div className="w-full max-w-[600px] rounded-2xl border border-[#7042f88b] bg-[#0300145e] backdrop-blur-md shadow-lg shadow-[#2A0E61]/50 shadow-[inset_0_-7px_11px_#a48fff1f] overflow-hidden p-8 md:p-12 hover:border-[#9b7bf8] transition duration-300 flex flex-col items-center text-center gap-6">
        
        {/* Available opportunities badge */}
        <div className="Welcome-box py-[8px] px-[12px] border border-[#7042f88b] opacity-[0.9]">
          <h1 className="Welcome-text text-[13px]">Available for Opportunities</h1>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 leading-tight">
          Work with Yuktha
        </h2>

        {/* Content paragraph */}
        <p className="text-gray-300 text-lg leading-relaxed font-light">
          Thank you for your interest! This page will soon feature a contact form and details on how to collaborate, request consulting, or schedule a call.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
          <Link
            href="/"
            className="py-3 px-6 text-center text-white cursor-pointer rounded-lg button-primary font-medium shadow-[0_0_15px_rgba(113,47,255,0.4)] hover:shadow-[0_0_25px_rgba(113,47,255,0.7)] transition-all duration-300 w-full sm:w-auto"
          >
            Back to Home
          </Link>
          <a
            href="mailto:contact@example.com"
            className="py-3 px-6 text-center text-white cursor-pointer rounded-lg border border-[#00f2fe]/40 bg-[#0300145e] backdrop-blur-md font-medium shadow-[0_0_15px_rgba(0,242,254,0.15)] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:border-[#00f2fe] transition-all duration-300 w-full sm:w-auto"
          >
            Send Email
          </a>
        </div>

      </div>
    </main>
  );
}
