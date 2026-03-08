import { Hero } from "@/components/landing/hero";
import { ValueProposition } from "@/components/landing/value-proposition";
import { Services } from "@/components/landing/services";
import { About } from "@/components/landing/about";
import { Contact } from "@/components/landing/contact";
import { Footer } from "@/components/landing/footer";
import { FloatingCTA } from "@/components/landing/floating-cta";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValueProposition />
      <Services />
      <About />
      <Contact />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
