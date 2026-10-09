import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--surface)]">
      <div className="w-full max-w-md space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={16} /> Terug naar start
        </Link>
        
        <div className="bg-[var(--section-bg)] p-8 rounded-xl shadow-sm border border-transparent dark:border-white/5 text-center">
          <h1 className="text-2xl font-bold mb-2 font-heading">Inloggen</h1>
          <p className="opacity-80 mb-8">Ga verder met jouw werkomgeving.</p>
          
          <Suspense fallback={<div className="py-8 text-sm opacity-60">Laden...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
