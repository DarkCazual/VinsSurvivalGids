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

      <main className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        <div className="bg-[var(--section-bg)] p-6 rounded-xl shadow-sm border border-transparent dark:border-white/5">
          <h2 className="font-bold text-lg mb-2">Hoofdstuk 1: Het denkwerk</h2>
          <p className="text-sm opacity-80 mb-6">Je idee concreet, persona en missie.</p>
          <Link href="/h1" className="inline-block bg-[var(--surface)] border border-gray-300 dark:border-gray-600 px-4 py-2 rounded font-medium text-sm hover:border-gray-400 transition-colors shadow-sm">
            Start hoofdstuk 1
          </Link>
        </div>
        
        <div className="bg-[var(--section-bg)] p-6 rounded-xl shadow-sm opacity-60 dark:border-white/5">
          <h2 className="font-bold text-lg mb-2">Hoofdstuk 2: De basis</h2>
          <p className="text-sm mb-6">Naamtester en KvK voorbereiding.</p>
          <span className="inline-block bg-black/10 dark:bg-white/10 text-[var(--text)] px-4 py-2 rounded font-medium text-sm">
            Rond eerst H1 af
          </span>
        </div>
      </main>
    </div>
  );
}
