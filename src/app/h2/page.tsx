import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { H2Client } from "./H2Client";

export default async function Hoofdstuk2Page() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return <H2Client userId={user.id} userEmail={user.email || ""} />;
}
