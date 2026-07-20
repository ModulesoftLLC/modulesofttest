import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { VideoBackground } from "@/components/shared/video-background";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <VideoBackground />
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
