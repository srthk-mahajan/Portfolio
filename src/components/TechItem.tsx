import { motion } from "framer-motion";

interface TechItemProps {
  name: string;
  reason: string;
  index: number;
}

const TechItem = ({ name, reason, index }: TechItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group py-4 border-b border-border last:border-b-0 hover:border-muted-foreground/30 transition-colors duration-500"
    >
      <div className="flex items-baseline gap-4">
        <span className="text-foreground font-medium min-w-[120px] group-hover:text-primary transition-colors duration-300">
          {name}
        </span>
        <span className="text-secondary-foreground text-sm">{reason}</span>
      </div>
    </motion.div>
  );
};

export default TechItem;
