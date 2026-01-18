import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedLineProps {
  className?: string;
}

const AnimatedLine = ({ className = "" }: AnimatedLineProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`flex items-center justify-center py-24 ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent origin-center"
      />
    </div>
  );
};

export default AnimatedLine;
