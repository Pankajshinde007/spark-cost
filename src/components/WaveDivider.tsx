import { cn } from "@/lib/utils";

interface WaveDividerProps {
  flip?: boolean;
  className?: string;
  variant?: "primary" | "subtle" | "accent";
}

const variantColors = {
  primary: {
    wave1: "hsl(192 80% 48% / 0.06)",
    wave2: "hsl(172 66% 42% / 0.04)",
    wave3: "hsl(187 85% 50% / 0.03)",
  },
  subtle: {
    wave1: "hsl(192 80% 48% / 0.04)",
    wave2: "hsl(172 66% 42% / 0.03)",
    wave3: "hsl(187 85% 50% / 0.02)",
  },
  accent: {
    wave1: "hsl(172 66% 42% / 0.07)",
    wave2: "hsl(192 80% 48% / 0.05)",
    wave3: "hsl(162 72% 42% / 0.03)",
  },
};

export const WaveDivider = ({ flip = false, className, variant = "primary" }: WaveDividerProps) => {
  const colors = variantColors[variant];
  const transform = flip ? "scaleY(-1)" : undefined;

  return (
    <div className={cn("w-full overflow-hidden pointer-events-none select-none", className)} style={{ transform }}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        {/* Bottom wave - widest, most subtle */}
        <path
          d="M0,60 C180,80 360,40 540,50 C720,60 900,30 1080,45 C1260,60 1350,40 1440,55 L1440,80 L0,80 Z"
          fill={colors.wave3}
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,60 C180,80 360,40 540,50 C720,60 900,30 1080,45 C1260,60 1350,40 1440,55 L1440,80 L0,80 Z;
              M0,55 C180,35 360,65 540,55 C720,45 900,70 1080,50 C1260,35 1350,55 1440,45 L1440,80 L0,80 Z;
              M0,60 C180,80 360,40 540,50 C720,60 900,30 1080,45 C1260,60 1350,40 1440,55 L1440,80 L0,80 Z
            "
          />
        </path>
        {/* Middle wave */}
        <path
          d="M0,50 C240,30 480,65 720,45 C960,25 1200,55 1440,40 L1440,80 L0,80 Z"
          fill={colors.wave2}
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,50 C240,30 480,65 720,45 C960,25 1200,55 1440,40 L1440,80 L0,80 Z;
              M0,40 C240,60 480,30 720,50 C960,65 1200,35 1440,50 L1440,80 L0,80 Z;
              M0,50 C240,30 480,65 720,45 C960,25 1200,55 1440,40 L1440,80 L0,80 Z
            "
          />
        </path>
        {/* Top wave - most visible */}
        <path
          d="M0,45 C360,65 720,25 1080,50 C1260,60 1380,35 1440,42 L1440,80 L0,80 Z"
          fill={colors.wave1}
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,45 C360,65 720,25 1080,50 C1260,60 1380,35 1440,42 L1440,80 L0,80 Z;
              M0,50 C360,30 720,60 1080,40 C1260,30 1380,55 1440,48 L1440,80 L0,80 Z;
              M0,45 C360,65 720,25 1080,50 C1260,60 1380,35 1440,42 L1440,80 L0,80 Z
            "
          />
        </path>
      </svg>
    </div>
  );
};
