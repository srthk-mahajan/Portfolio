import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

interface ProjectShowcaseProps {
    title: string;
    system: string;
    directive: string;
    decisions: string[];
    tradeoffs: string;
    reflection: string;
    index: number;
}

const ProjectShowcase = ({
    title,
    system,
    directive,
    decisions,
    tradeoffs,
    reflection,
    index,
}: ProjectShowcaseProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isExpanded, setIsExpanded] = useState(false);
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isEven ? -100 : 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col md:flex-row gap-6 md:gap-10 items-start"
        >
            {/* Number indicator */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="font-sans text-6xl md:text-8xl font-bold select-none z-0 opacity-20 flex-shrink-0 md:w-32 md:text-right md:pt-4"
                style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                0{index + 1}
            </motion.div>

            <div
                className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-10 cursor-pointer group overflow-hidden flex-grow w-full"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Hover gradient */}
                <motion.div
                    animate={{ opacity: isExpanded ? 0.05 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
                />

                {/* Header */}
                <div className="relative flex items-start justify-between gap-4 mb-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: 0.3 }}
                            className="inline-block text-xs uppercase tracking-widest text-primary mb-3"
                        >
                            {system}
                        </motion.span>
                        <h3 className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-500">
                            {title}
                        </h3>
                    </div>
                    <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                    >
                        <ArrowRight size={24} />
                    </motion.div>
                </div>

                {/* Directive */}
                <p className="relative text-secondary-foreground leading-relaxed mb-6">{directive}</p>

                {/* Expanded content */}
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                >
                    <div className="pt-6 border-t border-border space-y-8">
                        {/* Decisions */}
                        <div>
                            <h4 className="text-xs uppercase tracking-widest text-primary mb-4">Key Decisions</h4>
                            <ul className="space-y-3">
                                {decisions.map((decision, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ delay: i * 0.1 + 0.2 }}
                                        className="flex items-start gap-3 text-secondary-foreground"
                                    >
                                        <motion.span
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                            className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"
                                        />
                                        {decision}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Tradeoffs */}
                        <div>
                            <h4 className="text-xs uppercase tracking-widest text-primary mb-4">Tradeoffs</h4>
                            <p className="text-secondary-foreground">{tradeoffs}</p>
                        </div>

                        {/* Reflection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.4 }}
                            className="relative pl-6 border-l-2 border-primary/30"
                        >
                            <p className="font-serif text-foreground/80 italic leading-relaxed">
                                "{reflection}"
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom accent line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent origin-center"
                />
            </div>
        </motion.div>
    );
};

export default ProjectShowcase;
