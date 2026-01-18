import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillDomainProps {
    title: string;
    description: string;
    tools: string[];
    index: number;
    variant?: "neutral" | "red" | "blue";
}

const palette = {
    neutral: {
        card: "skill-card-neutral",
        pill: "border-white/15 bg-white/5 text-secondary-foreground",
        accent: "text-primary",
        glow: "hsl(var(--accent) / 0.25)",
    },
    red: {
        card: "skill-card-red",
        pill: "border-[#ff6b81]/40 bg-[#ff6b81]/10 text-[#ffd6dd]",
        accent: "text-[#ff96a9]",
        glow: "rgba(243, 75, 104, 0.22)",
    },
    blue: {
        card: "skill-card-blue",
        pill: "border-[#6ec0ff]/40 bg-[#6ec0ff]/10 text-[#d7ecff]",
        accent: "text-[#9fd4ff]",
        glow: "rgba(94, 182, 255, 0.22)",
    },
};

const SkillDomain = ({ title, description, tools, index, variant = "neutral" }: SkillDomainProps) => {
    const [hovered, setHovered] = useState(false);
    const { card, pill, accent, glow } = useMemo(() => palette[variant], [variant]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
        >
            <motion.div
                layout
                transition={{ layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                className={`group relative overflow-hidden rounded-2xl p-6 md:p-7 ${card} noise-overlay flex flex-col`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background:
                            variant === "red"
                                ? "radial-gradient(circle at 20% 20%, rgba(243, 75, 104, 0.2), transparent 45%)"
                                : variant === "blue"
                                    ? "radial-gradient(circle at 80% 10%, rgba(94, 182, 255, 0.2), transparent 48%)"
                                    : "radial-gradient(circle at 20% 20%, hsl(var(--accent)/0.12), transparent 45%)",
                    }}
                />

                <div className="relative flex items-start justify-between gap-4 flex-1">
                    <div className="space-y-3">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/70">Conceptual domain</p>
                        <h3 className={`text-2xl md:text-3xl text-foreground ${accent}`}>
                            {title}
                        </h3>
                        <p className="text-secondary-foreground leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <span className={`text-[11px] uppercase tracking-[0.18em] px-3 py-1 rounded-full border ${pill}`}>
                        {variant === "red" && "Red Team"}
                        {variant === "blue" && "Blue Team"}
                        {variant === "neutral" && "Core"}
                    </span>
                </div>

                <motion.div
                    layout
                    className="relative mt-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground/80"
                    animate={{ color: hovered ? "#e5e7eb" : "#9ca3af" }}
                    transition={{ duration: 0.4 }}
                >
                    {hovered ? "Toolkit" : "Hover to reveal toolkit"}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-2 h-px w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent origin-left"
                    />
                </motion.div>

                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 12, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: 10, height: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative mt-4 flex flex-wrap gap-2 overflow-hidden"
                        >
                            {tools.map((tool, i) => (
                                <motion.span
                                    key={tool}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.25, delay: i * 0.04 }}
                                    className="skill-tag bg-white/5 text-foreground border-white/10"
                                    style={{ boxShadow: `0 0 0 1px ${glow}` }}
                                >
                                    {tool}
                                </motion.span>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default SkillDomain;
