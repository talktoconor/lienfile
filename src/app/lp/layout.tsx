export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lp-layout flex flex-col min-h-screen">
      {children}
    </div>
  );
}
