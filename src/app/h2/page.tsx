import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { H2Client } from "./H2Client";

export default async function Hoofdstuk2Page() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if ((error || !user) && process.env.NODE_ENV !== "development") {
    redirect("/login");
  }

  const userEmail = user?.email || "ondernemer@vinssurvivalgids.nl";

  return <H2Client userEmail={userEmail} />;
}
