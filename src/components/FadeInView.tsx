"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FadeInView: React.FC<Props> = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInView;
