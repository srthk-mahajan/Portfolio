import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

interface ProjectCardProps {
  title: string;
  system: string;
  directive: string;
  decisions: string[];
  tradeoffs: string;
  reflection: string;
  index: number;
}

const ProjectCard = ({
  title,
  system,
  directive,
  decisions,
  tradeoffs,
  reflection,
  index,
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="card-interactive cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
            {system}
          </span>
          <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground mt-2"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      <p className="text-secondary-foreground leading-relaxed mb-4">{directive}</p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-border space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Key Decisions
                </h4>
                <ul className="space-y-2">
                  {decisions.map((decision, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-secondary-foreground text-sm flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {decision}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Tradeoffs
                </h4>
                <p className="text-secondary-foreground text-sm">{tradeoffs}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Reflection
                </h4>
                <p className="text-secondary-foreground text-sm italic font-serif">{reflection}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default ProjectCard;
