import Link from "next/link";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Controleer of de gebruiker is ingelogd
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    // Niet ingelogd? Terug naar de inlogpagina
    redirect("/login");
  }

  // Server Action voor het uitloggen
  const signOut = async () => {
    "use server";
    const supabaseServer = await createClient();
    await supabaseServer.auth.signOut();
    redirect("/login");
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] p-6">
      <header className="max-w-4xl mx-auto flex justify-between items-center py-6 mb-8 border-b border-gray-200 dark:border-white/10">
        <BrandLogo title="Dashboard" />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/account" className="text-sm font-medium hover:opacity-70 transition-opacity">
            {user.email}
          </Link>
          <form action={signOut}>
            <button type="submit" className="text-sm font-medium text-red-600 dark:text-red-400 hover:opacity-70 transition-opacity">
              Uitloggen
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">

        {/* Voortgangsoverzicht */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Hoofdstuk 1 */}
          <div className="bg-[var(--section-bg)] p-6 rounded-2xl shadow-sm border border-black/10 dark:border-white/10 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#dfb25a] uppercase tracking-wider">
                  Hoofdstuk 1 • Het Denkwerk
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
                  Actief
                </span>
              </div>
              <h2 className="font-black text-xl mb-1 text-[var(--text)]">Je idee, Persona &amp; Belofte</h2>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                Maak je idee concreet, ontwerp je ideale klantpaspoort in de Persona Studio en formuleer je belofte.
              </p>
            </div>

            <Link
              href="/h1"
              className="inline-flex items-center justify-center gap-2 bg-[var(--surface)] border border-black/15 dark:border-white/15 px-4 py-2.5 rounded-xl font-bold text-xs hover:border-[#dfb25a] hover:text-[#dfb25a] transition-all shadow-sm"
            >
              Open Hoofdstuk 1 (Persona Studio) →
            </Link>
          </div>

          {/* Hoofdstuk 2: Nu Ontgrendeld! */}
          <div className="bg-gradient-to-br from-[var(--section-bg)] to-amber-950/20 p-6 rounded-2xl shadow-lg border-2 border-[#dfb25a]/50 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#dfb25a] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#dfb25a] animate-pulse" />
                  Hoofdstuk 2 • De Basis
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#dfb25a]/20 text-[#dfb25a] font-black border border-[#dfb25a]/40">
                  Klaar om te starten 🚀
                </span>
              </div>
              <h2 className="font-black text-xl mb-1 text-[var(--text)]">De Naamtester &amp; KvK Gids</h2>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                Test je bedrijfsnaam in de 3-namen battle, ontdek je rechtsvorm, doorloop de KOR-wijzer en print je KvK-spiekbriefje.
              </p>
            </div>

            <Link
              href="/h2"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#dfb25a] to-[#f7d57f] text-black px-4 py-2.5 rounded-xl font-black text-xs shadow-md hover:brightness-110 transition-all uppercase tracking-wider"
            >
              Start Hoofdstuk 2 (Naam &amp; KvK) →
            </Link>
          </div>

        </div>

        {/* Volgende fasen preview */}
        <div className="grid gap-6 md:grid-cols-2 opacity-50">
          <div className="bg-[var(--section-bg)] p-5 rounded-2xl border border-black/5 dark:border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Hoofdstuk 3</span>
            <h3 className="font-bold text-sm text-[var(--text)]">De Visuele Identiteit</h3>
            <p className="text-xs opacity-75 mt-0.5">Logo-generator, kleurenpalet &amp; typografie.</p>
          </div>
          <div className="bg-[var(--section-bg)] p-5 rounded-2xl border border-black/5 dark:border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Hoofdstuk 4</span>
            <h3 className="font-bold text-sm text-[var(--text)]">Schrijfstijl voor AI</h3>
            <p className="text-xs opacity-75 mt-0.5">Brand-voice, tone of voice &amp; contentprompts.</p>
          </div>
        </div>

      </main>
    </div>
  );
}
