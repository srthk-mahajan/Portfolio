import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const AnimatedSection = ({
    children,
    className = "",
    delay = 0,
    variant = "fade-up", // fade-up | mask-reveal | zoom-out
}: AnimatedSectionProps & { variant?: "fade-up" | "mask-reveal" | "zoom-out" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const variants = {
        "fade-up": {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
        },
        "mask-reveal": {
            hidden: { filter: "blur(12px)", scale: 0.95, opacity: 0 },
            visible: { filter: "blur(0px)", scale: 1, opacity: 1 }
        },
        "zoom-out": {
            hidden: { scale: 1.05, opacity: 0 },
            visible: { scale: 1, opacity: 1 }
        }
    };

    return (
        <motion.section
            ref={ref}
            initial={variants[variant].hidden}
            animate={isInView ? variants[variant].visible : variants[variant].hidden}
            transition={{
                duration: 0.9,
                delay: delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.section>
    );
};

export default AnimatedSection;
