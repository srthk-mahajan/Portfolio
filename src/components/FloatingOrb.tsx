import { motion } from "framer-motion";

interface FloatingOrbProps {
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const FloatingOrb = ({
  size = 300,
  color = "primary",
  delay = 0,
  duration = 20,
  className = "",
}: FloatingOrbProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0.15, 0.25, 0.15],
        scale: [1, 1.2, 1],
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, hsl(var(--${color}) / 0.4) 0%, transparent 70%)`,
      }}
    />
  );
};

export default FloatingOrb;
