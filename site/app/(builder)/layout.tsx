import "@chaibuilder/core/styles";
import "./editor.css";

export const metadata = { title: "Editor do site", robots: { index: false } };

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
