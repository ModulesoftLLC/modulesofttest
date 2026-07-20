/**
 * Full-screen looping video background used behind marketing pages.
 * Content must sit above it at z-10.
 */
export function VideoBackground({ dim = true }: { dim?: boolean }) {
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="size-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
      />
      {dim && <div className="absolute inset-0 bg-black/45" />}
    </div>
  );
}
