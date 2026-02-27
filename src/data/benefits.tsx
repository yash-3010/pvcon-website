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

import { IBenefit } from "@/types";

export const benefits: IBenefit[] = [
  {
    title: "Audits & Inspection",
    description:
      "Comprehensive pharmacovigilance audit and quality oversight services designed to ensure global regulatory compliance, operational excellence, and inspection readiness.",
    bullets: [
      {
        title: "Comprehensive PV Audits",
        description:
          "Affiliate Country Office, System, Vendor, and Co-Marketing Partner audits conducted globally with detailed CAPA recommendations and audit certification.",
        icon: <FiCheckCircle size={26} />,
      },
      {
        title: "Quality System Development & Oversight",
        description:
          "Design and implementation of robust PV Quality Management Systems including Master Quality Plans, risk-based internal audit strategies, and technology-enabled management of audits, inspections, and CAPAs.",
        icon: <FiShield size={26} />,
      },
      {
        title: "Inspection Readiness & Regulatory Support",
        description:
          "End-to-end MAH inspection preparation support, including structured response development for regulatory inspection findings and sustained compliance oversight.",
        icon: <FiFileText size={26} />,
      },
    ],
    imageSrc: "/images/mockup-1.webp",
  },
  {
    title: "GxP Auditing",
    description:
      "Comprehensive GxP audit solutions ensuring regulatory compliance, quality assurance, and operational integrity across clinical, laboratory, manufacturing, and vendor environments.",
    bullets: [
      {
        title: "Clinical & Investigator Audits (GCP)",
        description:
          "Investigator site audits, Phase I audits, for-cause audits, sponsor and CRO system audits, and investigational product supply oversight to ensure full GCP compliance.",
        icon: <FiActivity size={26} />,
      },
      {
        title: "Vendor, CRO & IT Qualification",
        description:
          "CRO due diligence audits, vendor qualification audits, data management audits, and IT system qualification reviews to safeguard quality and regulatory alignment.",
        icon: <FiShield size={26} />,
      },
      {
        title: "Laboratory & Manufacturing Compliance",
        description:
          "GCLP, GLP, and GMP audits including archival site audits, drug destruction unit audits, and flexible on-site or remote audit execution to ensure end-to-end lifecycle compliance.",
        icon: <FiGlobe size={26} />,
      },
    ],
    imageSrc: "/images/mockup-2.webp",
  },
  {
    title: "Corporate Training",
    description:
      "Structured pharmacovigilance training programs designed to strengthen regulatory knowledge, operational readiness, and quality culture within MAH and stakeholder environments.",
    bullets: [
      {
        title: "Training Framework & Matrix Development",
        description:
          "Design and implementation of comprehensive training matrices, structured plans, and customized training materials aligned with regulatory expectations.",
        icon: <FiClipboard size={26} />,
      },
      {
        title: "MAH Boot Camps & Stakeholder Training",
        description:
          "Intensive boot camps and focused stakeholder training programs tailored for MAH setups to enhance inspection readiness and operational competence.",
        icon: <FiUsers size={26} />,
      },
      {
        title: "Regulatory & Good PV Practice Updates",
        description:
          "Customized training on Good Pharmacovigilance Practices, evolving safety regulations, and global compliance requirements.",
        icon: <FiBookOpen size={26} />,
      },
    ],
    imageSrc: "/images/mockup-3.webp",
  },
];
