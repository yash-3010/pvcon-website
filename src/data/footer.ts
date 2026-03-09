import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Empowering life sciences organizations with regulatory excellence and quality-driven compliance.",
    quickLinks: [
        {
            text: "Services",
            url: "#services"
        },
        {
            text: "About",
            url: "/about"
        },
        {
            text: "Blog",
            url: "/blog"
        }
    ],
    email: 'support@pvcon.in',
    telephone: '+91 123 456-7890',
    socials: {
        linkedin: 'https://www.linkedin.com/company/pvcon',
    }
}
