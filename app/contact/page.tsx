import { Contact } from "@/components/main/contact";

export const metadata = {
  title: "Contact Me | Yuktha A R",
  description: "Get in touch with Yuktha A R, Software Engineer, Full Stack Developer, and AI Developer.",
};

export default function ContactPage() {
  return (
    <main className="h-full w-full pt-[80px]">
      <Contact />
    </main>
  );
}
