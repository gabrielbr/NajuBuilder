import { ChaiSiteTheme } from "@chaibuilder/core/nextjs/render";
import "./public.css";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <ChaiSiteTheme />
      </head>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
