
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const steps = ["BUILD", "STRESS", "BREAK", "OBSERVE", "REFINE"];

const ThinkingAxis = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 40,
        restDelta: 0.001
    });

    const indicatorY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="relative h-full min-h-[300px] flex flex-col justify-between py-2 hidden md:flex">
            {/* Vertical Line */}
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border/50" />

            {/* Moving Indicator */}
            <motion.div
                className="absolute left-[5px] top-0 w-[5px] h-[5px] rounded-full bg-primary z-10 box-content border-2 border-background"
                style={{ top: indicatorY }}
            />

            {/* Steps */}
            {steps.map((step, index) => (
                <div key={step} className="relative pl-8 group">
                    {/* Tick Mark */}
                    <div className="absolute left-[5px] top-[10px] w-1 h-px bg-border/50 group-hover:bg-primary/50 transition-colors" />

                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium select-none">
                        {step}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ThinkingAxis;
