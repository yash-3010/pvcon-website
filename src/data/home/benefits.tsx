import {
  FiActivity,
  FiBookOpen,
  FiCheckCircle,
  FiClipboard,
  FiFileText,
  FiGlobe,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import React from "react";

// Non-translatable config: image paths and icons only.
// All text (titles, descriptions) lives in messages/*.json under "benefits.items"
export const benefitsConfig = [
  {
    imageSrc: "/images/service-audit.webp",
    bulletIcons: [
      <FiCheckCircle key="0" size={26} />,
      <FiShield key="1" size={26} />,
      <FiFileText key="2" size={26} />,
    ],
  },
  {
    imageSrc: "/images/service-gxp.webp",
    bulletIcons: [
      <FiActivity key="0" size={26} />,
      <FiShield key="1" size={26} />,
      <FiGlobe key="2" size={26} />,
    ],
  },
  {
    imageSrc: "/images/service-training.webp",
    bulletIcons: [
      <FiClipboard key="0" size={26} />,
      <FiUsers key="1" size={26} />,
      <FiBookOpen key="2" size={26} />,
    ],
  },
];
