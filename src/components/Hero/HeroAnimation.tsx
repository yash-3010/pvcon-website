"use client";
import { motion } from "framer-motion";

interface Props {
  heading: string;
}

const HeroAnimation: React.FC<Props> = ({ heading }) => {
  return (
    <motion.h1
      className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] font-extrabold text-foreground uppercase tracking-tighter"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {heading}
    </motion.h1>
  );
};

export default HeroAnimation;
