import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Controleer of de gebruiker is ingelogd
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    // Niet ingelogd? Terug naar de inlogpagina
    redirect("/login");
  }

  return (
    <DashboardClient 
      userId={user.id} 
      userEmail={user.email || "ondernemer@vinssurvivalgids.nl"} 
    />
  );
}
