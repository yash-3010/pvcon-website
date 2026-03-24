import { companyConfig } from "@/data/company/config";

export interface TeamMemberConfig {
  id: string;
  imageSrc: string;
  initials: string;
  color: string;
  /** LinkedIn profile URL (used in JSON-LD sameAs) */
  linkedIn?: string;
  /** Location for schema.org */
  location: string;
  /** Nationality for schema.org */
  nationality: string;
}

export const teamMemberConfigs: TeamMemberConfig[] = [
  {
    ...companyConfig.teamMembers[0],
    linkedIn: "https://www.linkedin.com/in/moindon/",
    location: "Mumbai, India",
    nationality: "Indian",
  },
  {
    ...companyConfig.teamMembers[1],
    linkedIn: "https://www.linkedin.com/in/rameezdon/",
    location: "India",
    nationality: "Indian",
  },
  {
    ...companyConfig.teamMembers[2],
    linkedIn: "https://www.linkedin.com/in/nazrulkhan/",
    location: "London, United Kingdom",
    nationality: "British",
  },
];

export function getTeamMemberBySlug(slug: string): TeamMemberConfig | undefined {
  return teamMemberConfigs.find((m) => m.id === slug);
}

export function getAllTeamSlugs(): string[] {
  return teamMemberConfigs.map((m) => m.id);
}
