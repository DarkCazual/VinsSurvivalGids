import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { H1Client } from "./H1Client";

export default async function Hoofdstuk1Page() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if ((error || !user) && process.env.NODE_ENV !== "development") {
    redirect("/login");
  }

  const userId = user?.id || "gast-gebruiker";
  const userEmail = user?.email || "ondernemer@vinssurvivalgids.nl";

  return <H1Client userId={userId} userEmail={userEmail} />;
}
