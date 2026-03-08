import { useMemo } from "react";

interface ParticlesProps {
  count?: number;
  colors?: string[];
}

export const Particles = ({ count = 20, colors = [
  "hsl(217 91% 60%)",
  "hsl(262 83% 58%)",
  "hsl(187 92% 43%)",
] }: ParticlesProps) => {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -20,
      color: colors[i % colors.length],
      opacity: Math.random() * 0.3 + 0.1,
    })),
    [count, colors]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
