import { verifiSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await verifiSession();
  if (session) redirect("/dashboard");

  return (
    <main className="container">
      <div className="my-4">
        <h1>home</h1>
      </div>
    </main>
  );
}
