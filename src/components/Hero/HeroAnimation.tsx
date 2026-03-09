"use client";
import { motion } from "framer-motion";

interface Props {
  heading: string[];
}

const HeroAnimation: React.FC<Props> = ({ heading }) => {
  return (
    <motion.h1
      className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[1.05] font-bold text-foreground uppercase tracking-tight"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.25 } },
      }}
      initial="hidden"
      animate="visible"
    >
      {heading.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`inline-block mr-4 md:mr-6 ${word === "Consulting" ? "text-primary" : ""}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default HeroAnimation;
