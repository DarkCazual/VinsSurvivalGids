import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { H1Client } from "./H1Client";

export default async function Hoofdstuk1Page() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return <H1Client userId={user.id} userEmail={user.email || ""} />;
}
