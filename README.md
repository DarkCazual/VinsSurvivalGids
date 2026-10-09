# Vin's Survival Gids - Online Werkomgeving

Dit is het platform behorende bij het boek *Vin's Survival Gids*. Gebruikers kunnen hier hun bedrijfidee uitwerken, van persona tot visuele identiteit, exact in de stappen van het boek.

## Stack
- Next.js (App Router)
- Tailwind CSS
- Supabase (Auth, Database, Storage)
- Gemini API (AI Logo generatie)

## Lokaal draaien

1. **Installeer afhankelijkheden:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   Kopieer `.env.example` naar `.env.local` en vul de gegevens in.
   * `NEXT_PUBLIC_SUPABASE_URL` en `NEXT_PUBLIC_SUPABASE_ANON_KEY` haal je uit je Supabase project (Project Settings > API).
   * `GEMINI_API_KEY` haal je uit Google AI Studio.

3. **Supabase instellen:**
   - Maak een nieuw project in Supabase (Kies een EU-regio in verband met de AVG).
   - Ga naar Authentication > Providers en zet **Google** en **Email** aan. (Voor e-mail magic links hoef je alleen Email aan te zetten en wachtwoorden evt. uit te zetten of niet te gebruiken in de UI).
   - In Authentication > URL Configuration, voeg `http://localhost:3000/**` toe aan de Site URL / Redirect URLs.

4. **Start de ontwikkelserver:**
   ```bash
   npm run dev
   ```
   Ga naar [http://localhost:3000](http://localhost:3000).

## Deployen (Vercel)
Koppel deze repository aan Vercel. Voeg de environment variables uit `.env.local` toe in de instellingen van Vercel. Supabase OAuth redirect URLs moeten worden aangevuld met de Vercel URL.
