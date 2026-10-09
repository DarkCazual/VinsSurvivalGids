import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="p-6 bg-gradient-brand text-[var(--on-primary)] border-b border-black/10 dark:border-white/5">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <BrandLogo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="px-4 py-2 bg-black/20 hover:bg-black/30 text-white rounded-md transition-colors text-sm font-medium shadow-sm border border-white/10">
              Inloggen
            </Link>
          </div>
        </div>
      </header>

      <section className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-2xl text-center space-y-8">
          <h2 className="text-4xl font-extrabold tracking-tight">
            Het boek waarmee jij <span className="text-gradient-brand">ondernemer</span> kunt volhouden
          </h2>
          <p className="text-lg opacity-80 max-w-xl mx-auto">
            Welkom in de online werkomgeving. Je hebt de QR-code gescand. Dit is de plek waar we jouw theorie gaan omzetten in actie. 
            Geen vage plannen meer in je hoofd, we gaan het professioneel en strak opzetten.
          </p>
          
          <div className="bg-[var(--section-bg)] p-8 rounded-xl mt-12 text-left shadow-sm border border-transparent dark:border-white/10">
            <h3 className="font-bold text-xl mb-4">Klaar om te beginnen?</h3>
            <p className="mb-6 opacity-80">Maak een account aan of log in om direct verder te gaan waar je gebleven was in het boek.</p>
            <Link href="/login" className="inline-flex items-center gap-2 bg-gradient-brand text-[var(--on-primary)] px-6 py-3 rounded-md font-bold shadow-md hover:opacity-90 transition-opacity">
              Start jouw plan <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
