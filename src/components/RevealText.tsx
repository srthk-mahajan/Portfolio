
import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    staggeer?: number;
    once?: boolean;
}

const RevealText = ({
    text,
    className,
    delay = 0,
    duration = 0.45,
    staggeer = 0.02,
    once = true,
}: RevealTextProps) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-10%" });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else if (!once) {
            controls.start("hidden");
        }
    }, [isInView, controls, once]);

    const wrapperVariants: Record<string, Variant> = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggeer,
                delayChildren: delay,
            },
        },
    };

    const itemVariants: Record<string, Variant> = {
        hidden: {
            y: "120%",
            opacity: 0,
            rotateZ: 5,
        },
        visible: {
            y: "0%",
            opacity: 1,
            rotateZ: 0,
            transition: {
                duration,
                ease: [0.33, 1, 0.68, 1], // Cubic bezier for "cinematic" feel
            },
        },
    };

    return (
        <motion.span
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={wrapperVariants}
            className={cn("inline-block overflow-hidden align-bottom leading-[1.1]", className)}
        >
            <span
                style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    border: 0,
                }}
            >
                {text}
            </span>
            {text.split("").map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    variants={itemVariants}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default RevealText;
