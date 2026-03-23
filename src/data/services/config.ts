import type { IconType } from "react-icons";
import { FiSearch, FiShield, FiBookOpen, FiFileText, FiFolder } from "react-icons/fi";

export interface SubService {
  id: string;
}

export interface ServiceCategory {
  slug: string;
  icon: IconType;
  isProduct?: boolean;
  subcategories: SubService[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "gxp-audits",
    icon: FiSearch,
    subcategories: [
      { id: "pv-audits" },
      { id: "gcp-audits" },
      { id: "other-gxp-audits" },
    ],
  },
  {
    slug: "pv-consulting",
    icon: FiShield,
    subcategories: [
      { id: "pv-qms" },
      { id: "audit-inspection-readiness" },
      { id: "local-qppv-pvoi" },
      { id: "regulatory-intelligence" },
    ],
  },
  {
    slug: "training-capability-development",
    icon: FiBookOpen,
    subcategories: [
      { id: "training-matrix" },
      { id: "pv-boot-camp" },
      { id: "regulatory-compliance-training" },
      { id: "customized-learnings" },
    ],
  },
  {
    slug: "medical-writing",
    icon: FiFileText,
    subcategories: [
      { id: "rmp-rems-writing" },
      { id: "aggregate-report-writing" },
      { id: "global-labeling" },
      { id: "clinical-safety-documents" },
    ],
  },
  {
    slug: "psmf",
    icon: FiFolder,
    isProduct: true,
    subcategories: [],
  },
];

export function getServiceBySlug(slug: string) {
  return serviceCategories.find((s) => s.slug === slug);
}

export function getAllServiceSlugs() {
  return serviceCategories.map((s) => s.slug);
}
