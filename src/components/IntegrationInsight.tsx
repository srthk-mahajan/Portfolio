import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface IntegrationInsightProps {
  quote: string;
  index: number;
}

const IntegrationInsight = ({ quote, index }: IntegrationInsightProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-6 py-2 border-l-2 border-primary/40"
    >
      <p className="font-serif text-secondary-foreground italic text-lg leading-relaxed">
        "{quote}"
      </p>
    </motion.blockquote>
  );
};

export default IntegrationInsight;
