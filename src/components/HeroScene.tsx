import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import FloatingOrb from "./FloatingOrb";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";
import GlitchText from "./GlitchText";
import { ChevronDown } from "lucide-react";

const HeroScene = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <motion.section
            ref={ref}
            style={{ opacity }}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background orbs */}
            <FloatingOrb
                size={500}
                color="primary"
                delay={0}
                duration={25}
                className="top-1/4 -left-40"
            />
            <FloatingOrb
                size={400}
                color="accent"
                delay={2}
                duration={20}
                className="bottom-1/4 -right-32"
            />
            <FloatingOrb
                size={200}
                color="primary"
                delay={4}
                duration={15}
                className="top-1/3 right-1/4"
            />

            {/* Animated grid */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            {/* Main content */}
            <motion.div style={{ y, scale }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm">
                        <motion.span
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-primary"
                        />
                        <span className="text-sm text-muted-foreground">Developer & Security Researcher</span>
                    </span>
                </motion.div>

                {/* Main headline */}
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-8">
                    <RevealText text="I build software" delay={0.4} />
                    <br />
                    <span className="text-primary">
                        <RevealText text="with an understanding" delay={1.4} />
                    </span>
                    <br />
                    <RevealText text="of how it " delay={2.5} />
                    <span className="inline-block">
                        <GlitchText text="breaks" className="text-primary" delay={3.0} glitchDelay={5.5} />
                    </span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.2, duration: 0.1 }}
                        className="text-primary"
                    >
                        .
                    </motion.span>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 3.8 }}
                    className="text-secondary-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12"
                >
                    Development and security are complementary ways of understanding the same system.
                </motion.p>

                {/* CTA */}
                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 4.6 }}
                >
                    <MagneticButton
                        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-500"
                    >
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            Explore my work
                        </span>
                        <motion.div
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ChevronDown size={16} className="text-primary" />
                        </motion.div>
                    </MagneticButton>
                </motion.div>
            </motion.div>

            {/* Scroll indicator line */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 5.0 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent origin-top"
            />
        </motion.section>
    );
};

export default HeroScene;
