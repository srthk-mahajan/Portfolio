import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface TechItemProps {
  name: string;
  reason: string;
  index: number;
}

const TechStackItem = ({ name, reason, index }: TechItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative py-5 cursor-default"
    >
      {/* Animated background */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent origin-left rounded-lg"
      />

      <div className="relative flex items-baseline gap-4 md:gap-8">
        {/* Name */}
        <motion.span
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-foreground font-medium min-w-[140px] md:min-w-[180px] group-hover:text-primary transition-colors duration-300"
        >
          {name}
        </motion.span>

        {/* Connector line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.08 + 0.3 }}
          className="hidden md:block flex-shrink-0 w-12 h-px bg-border origin-left"
        />

        {/* Reason */}
        <span className="text-secondary-foreground text-sm md:text-base">{reason}</span>
      </div>

      {/* Bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: index * 0.08 + 0.1 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-border origin-left"
      />
    </motion.div>
  );
};

interface TechStackProps {
  items: Array<{ name: string; reason: string }>;
}

const TechStack = ({ items }: TechStackProps) => {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <TechStackItem key={item.name} {...item} index={index} />
      ))}
    </div>
  );
};

export default TechStack;
