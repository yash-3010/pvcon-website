import type { IconType } from "react-icons";
import { FiSearch, FiShield, FiBookOpen, FiFileText } from "react-icons/fi";

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
      { id: "local-qppv-pvoi" },
      { id: "pv-qms" },
      { id: "audit-inspection-readiness" },
      { id: "regulatory-intelligence" },
    ],
  },
  {
    slug: "training-upskilling",
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
      { id: "clinical-safety-documents" },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return serviceCategories.find((s) => s.slug === slug);
}

export function getAllServiceSlugs() {
  return serviceCategories.map((s) => s.slug);
}

export function getSubServiceById(slug: string, subSlug: string) {
  const service = getServiceBySlug(slug);
  if (!service) return undefined;
  return service.subcategories.find((sub) => sub.id === subSlug);
}

export function getAllSubServiceParams() {
  return serviceCategories.flatMap((service) =>
    service.subcategories.map((sub) => ({
      slug: service.slug,
      subSlug: sub.id,
    }))
  );
}
