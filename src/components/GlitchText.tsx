import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
    delay?: number;
    glitchDelay?: number;
}

const GlitchText = ({ text, className = "", delay = 0, glitchDelay }: GlitchTextProps) => {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        // Use separate glitch delay if provided, otherwise fall back to appearance delay
        const startDelay = (glitchDelay ?? delay) * 1000;

        const timeout = setTimeout(() => {
            // Trigger immediate glitch upon start
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);

            // Then start the interval
            const interval = setInterval(() => {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 200);
            }, 5000);
            return () => clearInterval(interval);
        }, startDelay);
        return () => clearTimeout(timeout);
    }, [delay, glitchDelay]);

    return (
        <motion.span
            className={`relative inline-block ${className}`}
            initial={{ opacity: 0 }}
            animate={{
                opacity: isGlitching ? [1, 0.8, 1, 0.9, 1] : 1,
                x: isGlitching ? [0, -2, 2, -1, 1, 0] : 0
            }}
            transition={{
                duration: 0.2,
                opacity: { delay: delay, duration: 0.1 } // Initial fade in
            }}
        >
            {text}
            {isGlitching && (
                <>
                    <span className="absolute inset-0 text-primary/50 translate-x-[2px]">{text}</span>
                    <span className="absolute inset-0 text-accent/50 -translate-x-[2px]">{text}</span>
                </>
            )}
        </motion.span>
    );
};

export default GlitchText;
