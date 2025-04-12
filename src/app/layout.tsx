export const metadata = {
  title: "Canlı Maç",
  description: "Canlı futbol skorları",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
