"use client";
import { motion } from "framer-motion";

interface Props {
  heading: string[];
  subheading: string;
}

const HeroAnimation: React.FC<Props> = ({ heading, subheading }) => {
  return (
    <>
      <motion.div
        className="text-4xl md:text-7xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto flex flex-wrap justify-center gap-x-3"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.4 } },
        }}
        initial="hidden"
        animate="visible"
      >
        {heading.map((word, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        className="mt-4 text-foreground max-w-lg mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 1.5 }}
      >
        {subheading}
      </motion.p>
    </>
  );
};

export default HeroAnimation;