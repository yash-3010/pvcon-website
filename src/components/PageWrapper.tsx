import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  ariaLabel?: string;           // e.g. "About PVCON"
  id?: string;                  // e.g. "about"
  className?: string;           // extra classes if needed
  as?: keyof JSX.IntrinsicElements; // "section" | "article" | "div" etc
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  ariaLabel,
  id,
  className = "",
  as: Tag = "section",
}) => {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={`
        pt-32 pb-16          
        px-4 sm:px-6 lg:px-8 
        max-w-7xl            
        mx-auto              
        w-full               
        ${className}
      `}
    >
      {children}
    </Tag>
  );
};

export default PageWrapper;