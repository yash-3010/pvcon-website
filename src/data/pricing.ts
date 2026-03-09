import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Essential',
        price: 'Custom',
        features: [
            'ICSR case processing',
            'Periodic safety report support',
            'Regulatory intelligence updates',
            'Email support',
        ],
    },
    {
        name: 'Professional',
        price: 'Custom',
        features: [
            'Dedicated QPPV services',
            'PSMF setup & management',
            'Signal detection & evaluation',
            'GxP audit readiness support',
            'Priority support',
        ],
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        features: [
            'End-to-end PV system setup',
            'Full regulatory inspection support',
            'Corporate training programs',
            'Dedicated account manager',
            'Custom compliance solutions',
            'On-site consulting',
        ],
    },
]
