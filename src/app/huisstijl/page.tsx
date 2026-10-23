import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { H3Client } from "../h3/H3Client";

export default async function HuisstijlPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return <H3Client userId={user.id} userEmail={user.email || ""} initialTab="huisstijl" />;
}
