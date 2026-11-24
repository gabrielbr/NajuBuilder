import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassword, createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";

async function login(formData: FormData) {
  "use server";
  if (!checkPassword(String(formData.get("password") ?? ""))) redirect("/login?erro=1");
  (await cookies()).set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  redirect("/editor");
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "system-ui", background: "#f6f5f2" }}>
      <form action={login} style={{ display: "grid", gap: 12, width: 300, padding: 28, background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px #0001" }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Editor do site</h1>
        <label htmlFor="password" style={{ fontSize: 14 }}>Senha</label>
        <input id="password" name="password" type="password" autoFocus required
          style={{ padding: "10px 12px", border: "1px solid #ccc", borderRadius: 8, fontSize: 16 }} />
        {erro && <p style={{ color: "#b00020", margin: 0, fontSize: 14 }}>Senha incorreta.</p>}
        <button type="submit" style={{ padding: "10px 12px", borderRadius: 8, border: 0, background: "#1f3a5f", color: "#fff", fontSize: 16 }}>
          Entrar
        </button>
      </form>
    </main>
  );
}
