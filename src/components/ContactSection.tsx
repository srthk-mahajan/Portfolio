import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "./MagneticButton";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

const contacts = [
  { icon: Mail, label: "Email", href: "mailto:hello@example.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent"
      />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs uppercase tracking-widest text-primary mb-6 block">Contact</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Let's Connect</h2>
          <p className="text-secondary-foreground mb-12">
            Open to discussing systems, security research, or interesting problems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {contacts.map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-6 py-3 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <contact.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-foreground">{contact.label}</span>
                <ArrowUpRight
                  size={14}
                  className="text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all"
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
