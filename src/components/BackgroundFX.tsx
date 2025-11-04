import { memo } from "react";

const BackgroundFX = memo(() => {
  return (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Animated subtle gradient */}
  <div className="absolute inset-0 animate-gradient-slow bg-[radial-gradient(120%_80%_at_10%_10%,rgba(254,178,26,0.06),transparent_60%),radial-gradient(100%_70%_at_90%_20%,rgba(19,70,134,0.05),transparent_60%),radial-gradient(100%_70%_at_50%_100%,rgba(52,79,31,0.05),transparent_60%)]" />

      {/* Blurry color blobs */}
  <div className="bg-blob left-[-10%] top-[-10%] w-[40rem] h-[40rem]" style={{ background: "#FEB21A", opacity: 0.06 }} />
  <div className="bg-blob right-[-10%] top-[-5%] w-[36rem] h-[36rem]" style={{ background: "#134686", opacity: 0.05, animationDelay: "-6s" }} />
  <div className="bg-blob left-[10%] bottom-[-15%] w-[38rem] h-[38rem]" style={{ background: "#344F1F", opacity: 0.05, animationDelay: "-12s" }} />

      {/* Subtle grid overlay */}
  <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.3) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
});

BackgroundFX.displayName = "BackgroundFX";

export default BackgroundFX;
