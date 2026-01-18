import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import HeroScene from "@/components/HeroScene";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedLine from "@/components/AnimatedLine";
import SkillDomain from "@/components/SkillDomain";
import ProjectShowcase from "@/components/ProjectShowcase";
import ContactSection from "@/components/ContactSection";
import IntegrationInsight from "@/components/IntegrationInsight";
import ParallaxSection from "@/components/ParallaxSection";
import ThinkingAxis from "@/components/ThinkingAxis";

const skillDomains = [
    {
        title: "Engineering Foundations",
        description:
            "Understanding systems from first principles — execution flow, memory models, network protocols, and OS boundaries.",
        tools: [
            "C/C++ & memory models",
            "Linux internals",
            "TCP/IP & TLS",
            "Process isolation",
            "Concurrency & race analysis",
            "Observability baselines",
        ],
    },
    {
        title: "System Construction",
        description:
            "Designing software that manages complexity gracefully with attention to state, failure handling, and long-term maintainability.",
        tools: [
            "React / SPA architecture",
            "API design & contracts",
            "State orchestration",
            "Resilience patterns",
            "Performance profiling",
            "CI/CD discipline",
        ],
    },

    // 🔴 RED TEAM
    {
        title: "Red Team ",
        description:
            "Thinking like an attacker to expose the assumptions systems rely on. Focused on how design decisions crumble under malicious pressure.",
        tools: [
            "Recon & target profiling",
            "Nmap / Masscan",
            "Burp Suite Pro",
            "OWASP Top 10 coverage",
            "Payload crafting & obfuscation",
            "Initial access playbooks",
            "Privilege escalation chains",
            "C2 planning (emulated)",
            "MITRE ATT&CK mapping",
        ],
        variant: "red" as const,
    },

    // 🔵 BLUE TEAM
    {
        title: "Blue Team ",
        description:
            "Designing systems that detect, withstand, and recover from abuse. Emphasis on visibility, response, resilience, and cloud controls.",
        tools: [
            "Elastic / Splunk SIEM",
            "Zeek / Suricata",
            "Sigma & detection engineering",
            "CloudTrail / GuardDuty",
            "AWS/Azure IAM least privilege",
            "EDR triage & IR playbooks",
            "Threat hunting hypotheses",
            "Cloud security posture mgmt",
        ],
        variant: "blue" as const,
    },
];


const projects = [
    {
        title: "Secure Authentication System",
        system: "Web Application",
        directive: "Design an authentication system that handles token lifecycle, session management, and graceful degradation under adversarial conditions.",
        decisions: [
            "JWT with short-lived access tokens and rotating refresh tokens",
            "Server-side session validation as a fallback trust boundary",
            "Rate limiting and anomaly detection at the gateway layer",
        ],
        tradeoffs: "Increased complexity in token management for stronger security guarantees. Stateful session backup adds infrastructure overhead but eliminates single points of failure.",
        reflection: "Token revocation at scale remains an unsolved problem. The system works, but I'd explore different approaches to session binding.",
    },
    {
        title: "Vulnerability Research Lab",
        system: "Security Research",
        directive: "Build a controlled environment for studying exploitation techniques, from memory corruption to web application vulnerabilities.",
        decisions: [
            "Isolated network segments with controlled egress",
            "Version-pinned vulnerable applications for reproducible research",
            "Automated logging of all system calls and network traffic",
        ],
        tradeoffs: "Realism vs. safety. The more realistic the environment, the harder to contain. Chose containment over perfect fidelity.",
        reflection: "Understanding exploitation deeply changed how I write defensive code. The patterns of failure are now visible during construction.",
    },
    {
        title: "Real-time Monitoring Dashboard",
        system: "Full-Stack Application",
        directive: "Create a system for visualizing infrastructure health, with emphasis on latency, failure modes, and actionable alerting.",
        decisions: [
            "WebSocket connections for sub-second updates",
            "Client-side data aggregation to reduce server load",
            "Threshold-based alerting with configurable sensitivity",
        ],
        tradeoffs: "Real-time guarantees increase infrastructure cost. Balanced immediacy with practical refresh intervals.",
        reflection: "Dashboards reveal what you choose to measure. The harder problem was deciding what deserved attention.",
    },
];

const insights = [
    "Implementing authentication highlighted how difficult token revocation becomes at scale.",
    "Exploiting this vulnerability was trivial once I understood how the framework constructed queries.",
    "The security review revealed three assumptions that held in testing but failed in production.",
];

const Index = () => {
    const aboutRef = useRef(null);
    const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            <ScrollProgress />
            <Navigation />

            {/* Hero */}
            <HeroScene />

            {/* About Section */}
            <section id="about" className="relative py-48 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -left-24 top-10 w-80 h-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(160,200,255,0.16),transparent_60%)] blur-3xl" />
                    <div className="absolute right-[-18%] top-1/3 w-96 h-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,130,170,0.12),transparent_65%)] blur-3xl" />
                    <div className="absolute inset-0 noise-overlay opacity-60" />
                </div>

                <div className="section-container relative">
                    <motion.div
                        ref={aboutRef}
                        initial={{ opacity: 0 }}
                        animate={aboutInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.6 }}
                            className="text-xs uppercase tracking-widest text-primary mb-8 block"
                        >
                            About
                        </motion.span>

                        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
                                    How I Think About{" "}
                                    <span className="text-primary">Systems</span>
                                </h2>
                            </motion.div>

                            <div className="hidden md:block h-full min-h-[400px]">
                                <ThinkingAxis />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="space-y-6 text-secondary-foreground leading-relaxed pl-4 md:pl-0 border-l md:border-l-0 border-border/50"
                            >
                                <p>
                                    My work lives at the intersection of construction and scrutiny — designing systems
                                    that solve real problems, then questioning how they behave under stress.
                                </p>
                                <p>
                                    I think in layers. A web application is not just UI and API calls — it is execution
                                    flow, state transitions, trust boundaries, and failure modes.
                                </p>
                                <p className="text-foreground font-medium border-l-2 border-primary/50 pl-4">
                                    I value clarity over cleverness, depth over novelty, and decisions I can explain under scrutiny.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <AnimatedLine />

            {/* Skills Section */}
            <AnimatedSection className="py-48" delay={0} variant="mask-reveal">
                <div className="section-container" id="skills">
                    <div className="text-center mb-16">
                        <span className="text-xs uppercase tracking-widest text-primary mb-4 block">Skills</span>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                            Conceptual Domains
                        </h2>
                        <p className="text-secondary-foreground max-w-xl mx-auto">
                            These are not categories — they are facets of the same discipline.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 items-start">
                        {skillDomains.map((domain, index) => (
                            <SkillDomain key={domain.title} {...domain} index={index} />
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedLine />

            {/* Projects Section */}
            <section id="projects" className="py-64">
                <div className="section-container">
                    <ParallaxSection offset={30}>
                        <div className="text-center mb-20">
                            <span className="text-xs uppercase tracking-widest text-primary mb-4 block">Projects</span>
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                                Systems I've Worked With
                            </h2>
                            <p className="text-secondary-foreground max-w-xl mx-auto">
                                Each project is a case study. Depth matters more than quantity.
                            </p>
                        </div>
                    </ParallaxSection>

                    <div className="space-y-8">
                        {projects.map((project, index) => (
                            <ProjectShowcase key={project.title} {...project} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <AnimatedLine />

            {/* Integration Insights */}
            <AnimatedSection className="py-48" delay={0.1} variant="mask-reveal">
                <div className="section-container">
                    <div className="max-w-3xl mx-auto">
                        <span className="text-xs uppercase tracking-widest text-primary mb-8 block text-center">
                            Perspective
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 text-center">
                            Where Development Meets Security
                        </h2>

                        <div className="space-y-8">
                            {insights.map((insight, index) => (
                                <IntegrationInsight key={index} quote={insight} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedLine />

            {/* Contact */}
            <ContactSection />

            {/* Footer */}
            <footer className="py-8 border-t border-border">
                <div className="section-container flex items-center justify-between">
                    <p className="text-muted-foreground text-xs">
                        © {new Date().getFullYear()} — Built with intention
                    </p>
                    <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-primary"
                    />
                </div>
            </footer>
        </div>
    );
};

export default Index;
