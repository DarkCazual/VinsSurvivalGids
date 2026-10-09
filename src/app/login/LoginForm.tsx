"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register" | "magic-link">("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  const searchParams = useSearchParams();
  const supabase = createClient();

  // Lees eventuele foutmeldingen uit de callback URL (?error=...)
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      if (errorParam.includes("rate limit")) {
        setMessage({
          text: "Het e-maillimiet van de gratis e-maildienst is tijdelijk bereikt (max 3-4 per uur). Log in met e-mail en wachtwoord.",
          type: "error",
        });
      } else if (errorParam.includes("auth-callback-failed") || errorParam.includes("code")) {
        setMessage({
          text: "Inloggen via de link of Google is niet voltooid. Probeer opnieuw of log in met een wachtwoord.",
          type: "error",
        });
      } else {
        setMessage({ text: decodeURIComponent(errorParam), type: "error" });
      }
    }
  }, [searchParams]);

  // Google Inloggen
  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ text: `Google login: ${error.message}`, type: "error" });
      setLoading(false);
    }
  };

  // Inloggen met Wachtwoord
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setMessage({ text: "Onjuist e-mailadres of wachtwoord.", type: "error" });
      } else if (error.message.includes("Email not confirmed")) {
        setMessage({ text: "Dit account is nog niet geactiveerd via de e-mailbevestiging.", type: "error" });
      } else {
        setMessage({ text: error.message, type: "error" });
      }
      setLoading(false);
    } else {
      setMessage({ text: "Succesvol ingelogd! Je wordt doorgestuurd...", type: "success" });
      window.location.href = "/dashboard";
    }
  };

  // Nieuw Account Registreren met Wachtwoord
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      if (error.message.includes("User already registered")) {
        setMessage({ text: "Er bestaat al een account met dit e-mailadres. Kies 'Inloggen'.", type: "error" });
      } else if (error.message.includes("Password should be")) {
        setMessage({ text: "Wachtwoord moet minimaal 6 tekens lang zijn.", type: "error" });
      } else if (error.message.includes("rate limit")) {
        setMessage({
          text: "E-maillimiet van de e-maildienst tijdelijk bereikt. Vraag de beheerder of schakel 'Confirm email' uit in Supabase.",
          type: "error",
        });
      } else {
        setMessage({ text: error.message, type: "error" });
      }
      setLoading(false);
    } else if (data.session) {
      setMessage({ text: "Account aangemaakt! Je wordt doorgestuurd...", type: "success" });
      window.location.href = "/dashboard";
    } else {
      setMessage({
        text: "Account aangemaakt! Als e-mailbevestiging aanstaat, controleer je inbox om te activeren.",
        type: "success",
      });
      setLoading(false);
    }
  };

  // Inloglink (Magic link via e-mail)
  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      if (error.message.includes("rate limit")) {
        setMessage({
          text: "Het e-maillimiet van de gratis e-maildienst is tijdelijk bereikt (max 3-4 per uur). Tip: Log in met een wachtwoord of gebruik Google login.",
          type: "error",
        });
      } else {
        setMessage({ text: error.message, type: "error" });
      }
    } else {
      setMessage({
        text: "Check je e-mail voor de inloglink! Tip: Open de link in déze browser om inlogconflicten te voorkomen.",
        type: "success",
      });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {message && (
        <div
          className={`p-3 rounded-lg text-xs leading-relaxed ${
            message.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300 border border-green-500/20"
              : message.type === "info"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-500/20"
              : "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300 border border-red-500/20"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full bg-white text-black border border-gray-200 dark:border-white/10 p-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
        Inloggen met Google
      </button>

      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-black/10 dark:border-white/10"></div>
        <span className="flex-shrink-0 mx-3 text-gray-500 text-[11px] uppercase tracking-wider">Of met e-mail</span>
        <div className="flex-grow border-t border-black/10 dark:border-white/10"></div>
      </div>

      {/* Tabs: Inloggen | Registreren | Inloglink */}
      <div className="grid grid-cols-3 rounded-lg bg-black/5 dark:bg-white/5 p-1 text-[11px] font-semibold gap-1">
        <button
          type="button"
          onClick={() => { setMode("login"); setMessage(null); }}
          className={`py-1.5 rounded-md transition-all ${mode === "login" ? "bg-[var(--surface)] text-[var(--text)] shadow-xs" : "opacity-60 hover:opacity-100"}`}
        >
          Inloggen
        </button>
        <button
          type="button"
          onClick={() => { setMode("register"); setMessage(null); }}
          className={`py-1.5 rounded-md transition-all ${mode === "register" ? "bg-[var(--surface)] text-[var(--text)] shadow-xs" : "opacity-60 hover:opacity-100"}`}
        >
          Registreren
        </button>
        <button
          type="button"
          onClick={() => { setMode("magic-link"); setMessage(null); }}
          className={`py-1.5 rounded-md transition-all ${mode === "magic-link" ? "bg-[var(--surface)] text-[var(--text)] shadow-xs" : "opacity-60 hover:opacity-100"}`}
        >
          Inloglink
        </button>
      </div>

      {/* Formulier: Inloggen met Wachtwoord */}
      {mode === "login" && (
        <form onSubmit={handlePasswordLogin} className="space-y-3 text-left">
          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">E-mailadres</label>
            <input 
              type="email" 
              placeholder="jouw@email.nl" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-black/20 dark:border-white/20 p-2.5 rounded-lg focus:outline-none focus:border-[#dfb25a] bg-transparent text-sm" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Wachtwoord</label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-black/20 dark:border-white/20 p-2.5 rounded-lg focus:outline-none focus:border-[#dfb25a] bg-transparent text-sm" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-brand text-[var(--on-primary)] p-2.5 rounded-lg font-bold shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2 text-sm"
          >
            {loading ? "Bezig met inloggen..." : "Inloggen"}
          </button>
        </form>
      )}

      {/* Formulier: Nieuw Account Registreren */}
      {mode === "register" && (
        <form onSubmit={handleRegister} className="space-y-3 text-left">
          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">E-mailadres</label>
            <input 
              type="email" 
              placeholder="jouw@email.nl" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-black/20 dark:border-white/20 p-2.5 rounded-lg focus:outline-none focus:border-[#dfb25a] bg-transparent text-sm" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Kies een wachtwoord</label>
            <input 
              type="password" 
              placeholder="Minimaal 6 tekens" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border border-black/20 dark:border-white/20 p-2.5 rounded-lg focus:outline-none focus:border-[#dfb25a] bg-transparent text-sm" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-brand text-[var(--on-primary)] p-2.5 rounded-lg font-bold shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2 text-sm"
          >
            {loading ? "Bezig met registreren..." : "Account aanmaken"}
          </button>
        </form>
      )}

      {/* Formulier: Magic link via e-mail */}
      {mode === "magic-link" && (
        <form onSubmit={handleMagicLinkLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">E-mailadres</label>
            <input 
              type="email" 
              placeholder="jouw@email.nl" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-black/20 dark:border-white/20 p-2.5 rounded-lg focus:outline-none focus:border-[#dfb25a] bg-transparent text-sm" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-brand text-[var(--on-primary)] p-2.5 rounded-lg font-bold shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
          >
            {loading ? "Bezig met versturen..." : "Stuur inloglink"}
          </button>
        </form>
      )}
    </div>
  );
}
